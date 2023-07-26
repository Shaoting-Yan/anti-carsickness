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

function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  noStroke();
  background(0);
  textFont(helvetica);
  c = 3;
  m = -50;
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
  toplevel = 4*r;
}

function preload(){
  if (typeof(DeviceOrientationEvent) !== 'undefined' && 
  typeof(DeviceOrientationEvent.requestPermission) === 'function'){
    DeviceOrientationEvent.requestPermission().catch(()=>{
      let button = createButton('allow g-sensors');
      button.style('font-size','24px');
      button.center();
      button.mousePressed(requestAccess);
      throw error;
    }).then(()=>{
      permissionGranted = true;
    })
  }
  helvetica = loadFont('assets/Helvetica.ttf');
  gradient = loadImage('assets/gradient.jpg');
  palette =  loadJSON('./assets/palette.json');
}

function requestAccess(){
  DeviceOrientationEvent.requestPermission().then(
    response => {if(response == 'granted'){
      permissionGranted = true;
    }else{
      permissionGranted = false;
    }}
  ).catch(console.error);
  this.remove();
}

function getRotationMatrix( alpha, beta, gamma ) {
  const degtorad = Math.PI / 180; // Degree-to-Radian conversion
  var cX = Math.cos( beta  * degtorad );
  var cY = Math.cos( gamma * degtorad );
  var cZ = Math.cos( alpha * degtorad );
  var sX = Math.sin( beta  * degtorad );
  var sY = Math.sin( gamma * degtorad );
  var sZ = Math.sin( alpha * degtorad );

  var m11 = cZ * cY - sZ * sX * sY;
  var m12 = - cX * sZ;
  var m13 = cY * sZ * sX + cZ * sY;

  var m21 = cY * sZ + cZ * sX * sY;
  var m22 = cZ * cX;
  var m23 = sZ * sY - cZ * cY * sX;

  var m31 = - cX * sY;
  var m32 = sX;
  var m33 = cX * cY;
  return [
    m13, m12, m11,
    m23, m22, m21,
    m33, m32, m31
  ];
}

function getEulerAngles( matrix ) {
  var radtodeg = 180 / Math.PI; // Radian-to-Degree conversion
  var sy = Math.sqrt(matrix[0] * matrix[0] +  matrix[3] * matrix[3] );

  var singular = sy < 1e-6; // If

  if (!singular) {
      var x = Math.atan2(matrix[7] , matrix[8]);
      var y = Math.atan2(-matrix[6], sy);
      var z = Math.atan2(matrix[3], matrix[0]);
  } else {
      var x = Math.atan2(-matrix[5], matrix[4]);
      var y = Math.atan2(-matrix[6], sy);
      var z = 0;
  }
  return [x, y, z];
}

function mousePressed(){
  pressed = true;
  toggle = !toggle;
}

function mouseReleased(){
  pressed = false;
}

function randomColor(x,y){
  var names = Object.keys(palette);
  let index = int(map(noise(x,y),0,1,0,names.length));
  let result = palette[names[index]];
  return result;
}

//must be HSB color
function dimmer(c,f){
  return color(hue(c),saturation(c),constrain(brightness(c)*f,0,255));
}

function showdata(){
  push();
  translate(-100,-275,toplevel);
  noStroke();
  fill(255,255,255,200);
  rect(40,30,60,485,15);
  fill(0);
  text(rotationX.toFixed(2),50,50);
  text(rotationY.toFixed(2),50,100);
  text(rotationZ.toFixed(2),50,150);
  text(accelerationX.toFixed(2),50,200);
  text(accelerationY.toFixed(2),50,250);
  text(accelerationZ.toFixed(2),50,300);
  var rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  for (i=0;i<3;i++){
    text(degrees((rotation[i])).toFixed(2),50,400+i*50);
  }
  pop();
}

function drawPillars(){
  for(i=-20;i<20;i+=1){
    for(j=-20;j<20;j+=1){
      push();
      translate(i*cell,j*cell,0);
      rotateX(HALF_PI);
      cylinder(r,r*4,24,1,false,false);
      pop();
    }
  }
}

function drawButtons(){
  for(i=-20;i<20;i+=1){
    for(j=-20;j<20;j+=1){
      push();
      colorMode(HSB,255);
      var currColor = color(randomColor(i,j));
      fill(dimmer(currColor,0.5));

      translate(i*cell,j*cell,0);
      rotateX(HALF_PI);

      cylinder(r,r*4,24,1,false,false);

      rotateX(-HALF_PI);
      translate(0,0,r*2);
      
      fill(currColor);

      circle(0,0,r*2);
      pop();
    }
  }
}

function draw() {
  var rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  Rz = rotation[0];
  Ry = rotation[2];
  Rx = rotation[1];  

  if(toggle){
    background(0,0,0,0);
  }else{
    background(50);
  }
  if(pressed){
    showdata();
  }

  push();

  //for left right rotation
  currX = camHeight*Ry; 

  //for up down bump
  dy = -Math.sign(accelerationY)*(abs(accelerationY)**2);
  currY += dy;
  if (currY != 0){
    currY -= currY/(abs(currY)**0.8);//damping
  }

  translate(0,0,0);         

  drawButtons();//core visual

  pop();

  //parallax due to left right acceleration
  dx = -10*Math.sign(accelerationX)*(abs(accelerationX)**2);
  camX = dx;

  dy = 10*Math.sign(accelerationY)*(abs(accelerationY)**2);
  camY = dy;

  //parallax due to acceleration and brake
  dz = Math.sign(accelerationZ)*(abs(accelerationZ)**2);
  currZ = constrain(currZ+dz,0,camHeight*5);
  if (currZ != 0){                                        //damping
    currZ -= currZ/(abs(currZ)**0.5);
  }
  camZ = camHeight + currZ;//front,back

  //camera roll
  upX = sin(HALF_PI-Rz);
  upY = cos(HALF_PI-Rz);
  camera(camX, camY, camZ, obX, obY, obZ,upX,upY,0);
  ortho();
}
