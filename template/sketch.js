p5.disableFriendlyErrors = true;
let permissionGranted = false;

//for the shader;
let layer, Shader;
//for camera integrate
let accX, accY, accZ;

function showUI(){
  let gap = 40;
  heave = createSlider(1, 6, 3, 0);
  heave.position(120, 500);
  heave.style('width', '200px');
  sway = createSlider(1, 6, 3, 0);
  sway.position(120, 500+gap);
  sway.style('width', '200px');
  surge = createSlider(1, 6, 3, 0);
  surge.position(120, 500+gap*2);
  surge.style('width', '200px');
  damp = createSlider(1, 6, 3, 0);
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
  //framebuffer
  layer = createFramebuffer();
  
  showUI();
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

  //start framebuffer
  layer.begin();

  clear();
  noStroke();
  background(0);
  lights();

  push();

  moveObject(Rx,Ry,Rz);
  pillars(3,-25,windowWidth/12); //(cell,margin,radius)

  pop();

  moveCamera(accelerationX,accelerationY,accelerationZ);

  showdata(200,[heave.value(),sway.value(),surge.value()]);

  layer.end(); //end frame buffer

  //apply depth buffer
  shader(Shader);
  Shader.setUniform('depth', layer.depth);
  Shader.setUniform('img', layer.color);
  rect(0,0,width,height);
}
