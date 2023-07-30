// sketch.js
let layer, fogShader, fog;
function preload() {
  fogShader = loadShader('fog.vert', 'fog.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  layer = createFramebuffer();
  fog = color('#b2bdcf');
  noStroke();
}

function draw() {
  // Draw a scene to a framebuffer
  layer.begin();
  clear();
  lights();
  for (let i = 0; i < 12; i++) {
    push()
    translate(
      sin(frameCount*0.050 + i*1)*150,
      sin(frameCount*0.051 + i*2)*150,
      sin(frameCount*0.049 + i*3)*175-75
    );
    sphere(50);
    pop();
  }
  camera(0, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  perspective(PI/3, width/height,1000,10000);
  layer.end();

  // Apply fog to the scene
  shader(fogShader);
  fogShader.setUniform('fog', [red(fog), green(fog), blue(fog)]);
  fogShader.setUniform('img', layer.color);
  fogShader.setUniform('depth', layer.depth);
  rect(0, 0, width, height);
}

