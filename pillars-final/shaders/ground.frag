precision highp float;
varying vec2 vTexCoord;
// uniform sampler2D depth;
uniform vec2 resolution;
uniform float time;

void main() {
  // float d = 1.0 - texture2D(depth, vTexCoord).r;
  // gl_FragColor = vec4(d,d,d,1.0);
  vec2 coord = vTexCoord;
  float period = sin(time)/2.0;
  gl_FragColor = vec4(coord.x,coord.x,0.5+period,1.0);
}