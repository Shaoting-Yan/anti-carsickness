precision highp float;
varying vec2 vTexCoord;
uniform sampler2D img;
uniform sampler2D depth;
void main() {
  gl_FragColor = texture2D(img, vTexCoord);
}