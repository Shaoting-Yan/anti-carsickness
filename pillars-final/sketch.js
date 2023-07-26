let permissionGranted = false;
let pressed = false;
let toggle = false;
let c,m,r,cell;
let toplevel = 0;
let camX, camY, camZ;
let obX, obY, obZ;
let upX, upY;
let currX = 0;
let currY = 0;
let currZ = 0;
//for the shader;
let layer, fogShader, fog;

function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  noStroke();
  background(0);
  textFont(helvetica);
  c = 3;
  m = -25;
  r = windowWidth/12;
  camHeight = height/2/tan(PI/6);
  cell = (windowWidth-2*r-2*m)/c;
  camX = 0;
  camY = 0;
  camZ = camHeight;
  obX = 0;
  obY = 0;
  obZ = 0;
  upX = 0;
  upY = 1;
  upZ = 0;
  toplevel = 4*r;

  //framebuffer
  layer = createFramebuffer();
}

function draw() {

  var rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  Rz = rotation[0];
  Ry = rotation[2];
  Rx = rotation[1];  

  layer.begin();
  clear();
  background(0);
  lights();

  //for left right rotation
  currX = camHeight*Ry;  

  //for up down bump
  dy = -Math.sign(accelerationY)*(abs(accelerationY)**1.8);
  currY += dy;
  if (currY != 0){
    currY -= currY/(abs(currY)**0.8);//damping
  }

  rotateZ(Rz-HALF_PI); 
  translate(currX,-currY,0);     

  drawPillars();   

  //camera move due to acceleration and brake
  dz = Math.sign(accelerationZ)*(abs(accelerationZ)**2);
  currZ = constrain(currZ+dz,-camHeight/2,camHeight*5);
  if (currZ != 0){                                        //damping
    currZ -= currZ/(abs(currZ)**0.5);
  }

  camZ = camHeight + currZ;//front,back

  //camera move due to left right acceleration
  dx = 2*Math.sign(accelerationX)*(abs(accelerationX)**2);
  camX = dx;

  //trigonometry for depth of field
  normal = atan(camX/camZ);//normal angle or the eyesight\
  far = camZ/cos(normal);

  camera(camX, camY, camZ, obX, obY, obZ,upX,upY,0);
  
  perspective(PI/3, width/height, camZ-r*5, far);

  layer.end();  

  //apply depth buffer
  shader(fogShader);
  fogShader.setUniform('depth', layer.depth);
  fogShader.setUniform('img', layer.color);
  rect(0,0,width,height);
}
