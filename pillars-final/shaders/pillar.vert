precision highp float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.x = positionVec4.x * 2.0 - 1.0; //adapt p5js coordinate
  positionVec4.y = 1.0 - positionVec4.y*2.0;

  gl_Position = positionVec4;
  vTexCoord = aTexCoord;
}
