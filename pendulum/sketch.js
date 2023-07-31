p5.disableFriendlyErrors = true;
let permissionGranted = false;

//for the shader;
let layer, Shader;
//for camera integrate
let accX, accY, accZ;

let currRx = 0;
let currRz = 0;

let currColor = 0;

let inkx = 0;
let inkz = 0;

let prevx = 0;
let prevy = 0;

function showUI(){
  let gap = 40;
  heave = createSlider(0, 6, 3, 0);
  heave.position(120, 500);
  heave.style('width', '200px');
  sway = createSlider(0, 6, 3, 0);
  sway.position(120, 500+gap);
  sway.style('width', '200px');
  surge = createSlider(0, 6, 3, 0);
  surge.position(120, 500+gap*2);
  surge.style('width', '200px');
  damp = createSlider(0, 6, 3, 0);
  damp.position(120, 500+gap*3);
  damp.style('width', '200px');

  p1 = createP('heave');
  p1.style('font-size', '20px');
  p1.position(330, 475);
  p2 = createP('sway');
  p2.style('font-size', '20px');
  p2.position(330, 475+gap);
  p3 = createP('surge');
  p3.style('font-size', '20px');
  p3.position(330, 475+gap*2);
  p4 = createP('damp');
  p4.style('font-size', '20px');
  p4.position(330, 475+gap*3);
}

function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  textFont(helvetica);

  background('darkslategray');

  camHeight = height/2/tan(PI/6);
  groundDepth = 1000;
  sliceW = width;
  sliceH = height*0.85;

  //framebuffer
  layer = createFramebuffer();

  inks = createGraphics(camHeight*2*PI/2,groundDepth/2);
  pendulum = createGraphics(sliceW,sliceH);
  showUI();
  button1 = createButton('view drawing');
  button1.position(200, 450);
}

function draw() {
  let rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  Rz = rotation[0];
  Ry = rotation[2];
  Rx = rotation[1];  
  
  he = heave.value();
  sw = sway.value();
  su = surge.value();
  da = damp.value();

  button1.mousePressed(saveDrawing);

  layer.begin();
  clear();
  background(255);
  ambientLight(255);

  currX = camHeight*Ry;   //for left right rotation

  currColor = getColor(frameCount);
  drawPendulum(pendulum,currColor);
  drawInks(inks,currColor,currX);

  ground(camHeight*2*PI,groundDepth,sliceH,inks);
  flap(sliceW,sliceH,pendulum);

  moveCamera(accelerationX,accelerationY,accelerationZ,height/2);

  layer.end(); //end frame buffer

  //apply depth buffer
  shader(Shader);
  Shader.setUniform('depth', layer.depth);
  Shader.setUniform('img', layer.color);
  rect(0,0,width,height);
}
