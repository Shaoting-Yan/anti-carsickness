precision highp float;

#define PI 3.14159265358979323846

const float EPSILON = 1e-10;
varying vec2 vTexCoord;
uniform sampler2D uImg;
uniform sampler2D uGround;
uniform sampler2D uDepth;
uniform vec2 resolution;
uniform float time;
uniform float burn;

//https://gist.github.com/983/e170a24ae8eba2cd174f
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

//code from https://www.davepagurek.com/blog/depth-of-field/

const int MAX_NUM_SAMPLES = 20;
uniform vec2 uSize;
uniform float uIntensity;
uniform int uNumSamples;
uniform float uTargetZ;
uniform float uNear;
uniform float uFar;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float depthToZ(float depth) {
  float depthNormalized = 2.0 * depth - 1.0;
  return 2.0 * uNear * uFar / (uFar + uNear - depthNormalized * (uFar - uNear));
}

float calcBlur(float z, float pixelScale) {
  return clamp(abs(z - uTargetZ), 0.0, 0.5*pixelScale);//maximum half screen sampling range
}

//saturation change with depth
vec4 changeSaturation(vec4 color, float d, float alpha){
  vec3 RGB = color.rgb;
  vec3 HSV = rgb2hsv(RGB);
  float H = HSV.x;
  /*
  the nearer the more saturated,but keep the ground saturated,
  the ground will be use to sample blur
  */
  float S = HSV.y*mix(1.0,(1.0-d),alpha);
  float V = HSV.z;
  vec4 final = vec4(hsv2rgb(vec3(H,S,V)),1.0);
  return final;
}

void main() {
  vec4 rawColor = texture2D(uImg, vTexCoord).rgba;
  // vec4 groundColor = texture2D(uGround, vTexCoord).rgba;//use flow gradient as background
  float alpha = rawColor.a;

//code from https://www.davepagurek.com/blog/depth-of-field/
  float pixelScale = max(uSize.x, uSize.y);
  float total = 1.0;

  vec4 color = vec4(rawColor.rgb,1.0);

  float origZ = depthToZ(texture2D(uDepth, vTexCoord).x);
  float blurAmt = calcBlur(origZ, pixelScale);
  for (int i = 0; i < MAX_NUM_SAMPLES; i++) {
    if (i >= uNumSamples) break;
    float t = (float(i + 1) / float(uNumSamples));
    float angle = (t*4.0)*(2.0*PI);
    float radius = 1.0 - (t*t*t); // Sample more on the outer edge
    angle += 1.*rand(gl_FragCoord.xy);
    vec2 offset = (vec2(cos(angle),sin(angle)) * radius * uIntensity * blurAmt)/pixelScale;
    float z = depthToZ(texture2D(uDepth, vTexCoord + offset).x);
    float sampleBlur = calcBlur(z, pixelScale);

    //float weight = float(z >= origZ);
    float weight = float((z >= origZ) || (sampleBlur >= blurAmt*radius + 0.));
    
    vec4 rawSample = texture2D(uImg, vTexCoord + offset).rgba;
    vec4 sample = vec4(rawSample.rgb,1.0);

    color += weight * sample;
    total += weight;
  }
  color /= total;

  //extract depth info
  float d = clamp(pow(texture2D(uDepth, vTexCoord).r,0.3),0.0,1.0);

  // d = pow(d,burn);
  color = changeSaturation(color,d,alpha);

  gl_FragColor = color;
  // gl_FragColor = vec4(vec3(d),1.0);
}