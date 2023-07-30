#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform vec2 u_mouse;

float plot(vec2 st) {    
    return smoothstep(0.01, 0.0, abs(st.y - st.x));
}

void main() {

  // position of the pixel divided by resolution, to get normalized positions on the canvas
  vec2 st = gl_FragCoord.xy/u_resolution.xy; 

  gl_FragColor = vec4(st.x,st.y,st.x,1.0); 
}