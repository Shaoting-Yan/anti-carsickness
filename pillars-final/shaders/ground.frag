precision highp float;
varying vec2 vTexCoord;
// uniform sampler2D depth;
uniform vec2 resolution;
uniform float time;
uniform float currX;
uniform vec3 startColor;
uniform vec3 endColor;
uniform vec3 breathColor;
uniform vec2 touch;
uniform float strength;

const float EPSILON = 1e-13;

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

void main() {
  vec2 coord = vTexCoord;
  vec2 st = gl_FragCoord.xy/resolution;
  vec2 target = vec2(0.5+sin(time)/4.0,0.5+cos(time)/4.0);

  vec2 breathTarget = vec2(currX,0.5);

  float radius = 0.2;
  float gradientd = pow(distance(st,breathTarget)*12.0,strength);

  vec3 endColor = mix(vec3(1.0),endColor,distance(st,target)*5.0);
  vec3 color = mix(startColor, endColor, gradientd);

  // color = mix(breathColor, vec3(0), breathd);
  gl_FragColor = vec4(color,1.0);
}