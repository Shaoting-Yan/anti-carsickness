precision highp float;
const float EPSILON = 1e-13;
varying vec2 vTexCoord;
uniform sampler2D img;
uniform sampler2D depth;
uniform vec2 resolution;
uniform float time;

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

float cap(float d){
  if(d<0.99){
    return 1.0;
  }
  return 0.0;
}

void main() {
  // float d = 1.0 - texture2D(depth, vTexCoord).r;
  // gl_FragColor = vec4(d,d,d,1.0);
  float d = texture2D(depth, vTexCoord).r;
  vec2 coord = vTexCoord;
  vec3 RGB = vec3(texture2D(img, vTexCoord)).rgb;
  vec3 HSV = rgb2hsv(RGB);
  float H = HSV.x;
  float S = HSV.y*(1.0-d);//the nearer the more saturated
  float V = HSV.z;
  vec3 final = hsv2rgb(vec3(H,S,V));
  gl_FragColor = vec4(final,1.0);
}