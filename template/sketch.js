p5.disableFriendlyErrors = true;
let permissionGranted = false;

//for the shader;
let layer, Shader;

function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  textFont(helvetica);

  background('darkslategray');

  camHeight = height/2/tan(PI/6);
  //framebuffer
  layer = createFramebuffer();

  accZ = 0;
}

function moveObject(Rx,Ry,Rz,Ax,Ay,Az){
  let currX = camHeight*Ry;   //for left right rotation
  rotateZ(Rz-HALF_PI);        //tilting
  translate(0,0,0);     
}

function moveCamera(Ax,Ay,Az){
  //camera move due to acceleration and brake
  let dz = Math.sign(accelerationZ)*(abs(accelerationZ)**2);
  accZ = constrain(accZ+dz,-camHeight/2,camHeight*5);
  if (accZ != 0){                                        
    accZ -= accZ/(abs(accZ)**0.5); //damping
  }
  let camZ = camHeight + accZ;

  //camera move due to up down acceleration
  let dy = -2*Math.sign(accelerationY)*(abs(accelerationY)**2);
  let camY = dy;
  let obY = dy;

  //camera move due to left right acceleration
  let dx = -2*Math.sign(accelerationX)*(abs(accelerationX)**2);
  let camX = dx;
  let obX = dx;
  camera(camX, camY, camZ, obX, obY, 0,0,1,0);
}

// function changePerspective(){
//   //trigonometry for depth of field
//   normal = atan(camX/camZ);//normal angle or the eyesight\
//   far = camZ/cos(normal);
//   perspective(PI/3, width/height, camZ-toplevel*1.2, far); //toplevel defined in visual cores
// }

function draw() {

  let rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  Rz = rotation[0];
  Ry = rotation[2];
  Rx = rotation[1];  

  //start framebuffer
  layer.begin();

  clear();
  noStroke();
  background(0);
  lights();

  moveObject(Rx,Ry,Rz,accelerationX,accelerationY,accelerationZ);

  drawPillars(3,-25,windowWidth/12); //(cell,margin,radius)
  
  moveCamera(accelerationX,accelerationY,accelerationZ);

  layer.end(); //end frame buffer

  //apply depth buffer
  shader(Shader);
  Shader.setUniform('depth', layer.depth);
  Shader.setUniform('img', layer.color);
  rect(0,0,width,height);
}
