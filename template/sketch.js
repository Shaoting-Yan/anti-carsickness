p5.disableFriendlyErrors = true;
let permissionGranted = false;

//for the shader;
let layer, Shader;
//for camera integrate
let accX, accY, accZ;

function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  textFont(helvetica);

  background('darkslategray');

  camHeight = height/2/tan(PI/6);
  //framebuffer
  layer = createFramebuffer();
  
  heave = createSlider(1, 6, 3, 0);
  heave.position(0, 0);
  sway = createSlider(1, 6, 3, 0);
  sway.position(0, 30);
  surge = createSlider(1, 6, 3, 0);
  surge.position(0, 60);
}

function draw() {

  let rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  Rz = rotation[0];
  Ry = rotation[2];
  Rx = rotation[1];  
  he = heave.value();
  sw = sway.value();
  su = surge.value();

  //start framebuffer
  layer.begin();

  clear();
  noStroke();
  background(0);
  // lights();
  ambientLight('white');

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
