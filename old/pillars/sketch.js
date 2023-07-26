let toggle = false;
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

function mousePressed(){
  toggle = !toggle;
}

function draw() {
  background(0);
  if(toggle){
    if (Math.abs(accelerationX)>1){
      accX += accelerationX*7;
    }
    if (Math.abs(accelerationY)>1){
      accY += -accelerationY*5;
    }
  }
  roll = radians(rotationZ);
  push();
  rotateZ(roll);
  translate(accX,0,0);
  translate(0,accY,0);
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
  camX = constrain(-camZ*tan(radians(rotationY))/5,-300,300);//parallax
  if (toggle){
    camY = -constrain(-camZ*tan(radians(rotationX)-PI*0.3)/5,-300,300);//parallax
  }else{
    camY = constrain(-camZ*tan(radians(rotationX)-PI*0.3)/5,-300,300);//parallax
  }
  camZ = camHeight + accelerationZ*5;
  if(!toggle){
    camX += accelerationX*20;//truck
    camY += accelerationY*20;//truck
  }
  // upX = -sin(roll);
  // upY = cos(roll);
  // push();
  // fill(255,0,0);
  // translate(0,0,r*2.1);
  // text(accelerationX,0,100);
  // text(rotationZ,0,150);
  // text(rotationX,0,200);
  // text(rotationY,0,250);
  // pop();
  camera(camX, camY, camZ, obX, obY, obZ,upX,upY,0);
}