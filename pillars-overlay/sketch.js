let cell;
let c,m,r;
let permissionGranted = false;
let camX, camY, camZ;
let obX, obY, obZ;
let upX, upY;
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
  accX = 0;
  accY = 0;
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

function draw() {
  background(0);
  if (Math.abs(accelerationX)>0.1){
    accX += accelerationX*2;
  }
  if (Math.abs(accelerationY)>0.1){
    accY += accelerationY*2;
  }
  push();
  translate(accX,0,0);
  translate(0,accY,0);
  // rotate(0,0,rotateY);
  for(i=-20;i<30;i+=1){
    for(j=-20;j<30;j+=1){
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
  if (Math.abs(accelerationX) > 0.1){

  }
  camX = constrain(-camZ*tan(radians(rotationY))/5,-300,300);//parallax
  camX = constrain(-camZ*tan(radians(rotationY))/5,-300,300);//parallax
  camZ = camHeight + accelerationZ*2;
  roll = radians(rotationZ);
  upX = -sin(roll);
  upY = cos(roll);
  fill(255);
  text(rz,0,50);
  text(rotationZ,0,100);
  camera(camX, camY, camZ, obX, obY, obZ,upX,upY,0);
}