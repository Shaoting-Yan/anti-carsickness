precision highp float;
varying vec2 vTexCoord;
uniform sampler2D img;
uniform sampler2D depth;
void main() {
  float d = 1.0 - texture2D(depth, vTexCoord).r;
  gl_FragColor = vec4(d,d,d,1.0);
}