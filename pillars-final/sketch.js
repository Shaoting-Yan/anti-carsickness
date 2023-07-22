let permissionGranted = false;
let pressed = false;
let toggle = false;
let c,m,r,cell;
let toplevel = 0;
let camX, camY, camZ;
let obX, obY, obZ;
let upX, upY;
let currX;
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  background(0);
  helvetica = loadFont('assets/Helvetica.ttf');
  textFont(helvetica);
  gradient = loadImage('assets/gradient.jpg');
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

function showdata(){
  // translate(-windowWidth/2,-windowHeight/2,toplevel);
  translate(-100,-275,toplevel);
  noStroke();
  fill(255,255,255,200);
  rect(40,30,60,485,15);
  fill(255);
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
}

function draw() {
  var rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  Rz = rotation[0];
  Ry = rotation[2];
  Rx = rotation[1];  
  background(0);
  push();
  currX = camZ*Ry;
  translate(currX,0,0);
  for(i=-20;i<20;i+=1){
    for(j=-20;j<20;j+=1){
      push();
      noStroke();
      // texture(gradient);
      translate(i*cell,j*cell,0);
      rotateX(HALF_PI);
      cylinder(r,r*4);
      pop();
    }
  }
  pop();
  if(pressed){
    showdata();
  }
  dx = 2*Math.sign(accelerationX)*(abs(accelerationX)**2);
  dz = Math.sign(accelerationZ)*(abs(accelerationZ)**1.5);
  camX = dx;//parallax
  camZ = camHeight + dz;//front,back
  upX = sin(HALF_PI-Rz);//roll
  upY = cos(HALF_PI-Rz);
  camera(camX, camY, camZ, obX, obY, obZ,upX,upY,0);
}
