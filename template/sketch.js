p5.disableFriendlyErrors = true;
let permissionGranted = false;

//for the shader;
let layer, Shader;
//for camera integrate
let accX, accY, accZ;

let currRx = 0;

//motion parameter
let he = 3;
let sw = 3;
let su = 2;
let da = 15;
let shown = false;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth,windowHeight,WEBGL);
  textFont(helvetica);

  background('darkslategray');

  tweak = createButton('tweak');
  tweak.position(300,600);
  tweak.mousePressed(showUI);

  camHeight = height/2/tan(PI/6);
  //framebuffer
  layer = createFramebuffer();
}

function draw() {

  let rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  Rz = rotation[0];
  Ry = rotation[2];
  Rx = rotation[1];  
  
  if (shown){
    he = heave.value();
    sw = sway.value();
    su = surge.value();
    da = damp.value();
  }

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

  // showdata(200,[he,sw,su,da]);

  layer.end(); //end frame buffer

  //apply depth buffer
  shader(Shader);
  Shader.setUniform('depth', layer.depth);
  Shader.setUniform('img', layer.color);
  rect(0,0,width,height);
}
