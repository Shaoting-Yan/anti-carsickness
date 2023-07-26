// fog.frag
// fog.frag
precision highp float;
varying vec2 vTexCoord;
uniform sampler2D depth;
uniform sampler2D img;

float mapdepth(float d){
  float md;
  if (d < 0.2){
    md = 0.0;
  }else{
    md = (d-0.2)/0.8;
  }
 return md;
}

void main() {
//   gl_FragColor = mix(
//     // Original color
//     texture2D(img, vTexCoord),
//     // Fog color
//     vec4(fog/255., 1.),
//     // Mix between them based on the depth.
//     // The pow() makes the light falloff a bit steeper.
//     pow(texture2D(depth, vTexCoord).r, 6.)
//   );
  float d = texture2D(depth, vTexCoord).r;
  float r = 1.0 - mapdepth(d);
  gl_FragColor = vec4(r,r,r,1.0);
}