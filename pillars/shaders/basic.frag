precision highp float;
varying vec2 vTexCoord;
uniform sampler2D img;
uniform sampler2D depth;
uniform vec3 fog;

// vec4 trim(vec4 depth){
//   if (depth > )
// }

void main() {
  // float d = 1.0 - texture2D(depth, vTexCoord).r;
  // // gl_FragColor = vec4(d,d,d,1.0);
  // gl_FragColor = texture2D(img, vTexCoord);
  gl_FragColor = mix(
  // Original color
  texture2D(img, vTexCoord),
  // Fog color
  vec4(fog/255., 1.),
  // Mix between them based on the depth.
  // The pow() makes the light falloff a bit steeper.
  texture2D(depth, vTexCoord).r
  );
}