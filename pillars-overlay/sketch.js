let cell;
let c,m,r;
let permissionGranted = false;
let camX, camY, camZ;
let obX, obY, obZ;
let upX, upY;
let toggle = false;
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  background(0,0,0,0);
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

function mousePressed(){
  toggle = !toggle;
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
  background(0,0,0,0);
  if (Math.abs(accelerationX)>0.1){
    accX += accelerationX*2;
  }
  if (Math.abs(accelerationY)>0.1){
    accY += accelerationY*2;
  }
  push();
  translate(accX,0,0);
  translate(0,accY,0);
  for(i=-20;i<30;i+=1){
    for(j=-20;j<30;j+=1){
      push();
      noStroke();
      fill(255,255,255,128);
      translate(i*cell,j*cell,r*2);
      circle(0,0,r*2);
      if (toggle){
        translate(0,0,-r*2);
        fill(0,0,0,128);
        circle(0,0,r*2);
      }
      pop();
    }
  }
  pop();
  if (Math.abs(accelerationX) > 0.1){

  }
  // camX = constrain(-camZ*tan(radians(rotationY))/5,-300,300);//parallax
  // camY = constrain(-camZ*tan(radians(rotationX)-PI*0.45)/5,-300,300);//parallax
  camZ = camHeight + accelerationZ*2;
  roll = radians(rotationZ);
  upX = sin(roll);
  upY = cos(roll);
  camera(camX, camY, camZ, obX, obY, obZ,upX,upY,0);
}