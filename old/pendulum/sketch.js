p5.disableFriendlyErrors = true; // disables FES
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
let currRx = 0;
let pitch = 0;

//for pendulum buffer
let hori, verti;

//for toxilib
let physics;

let tailp = []; //tail particles
let tails = []; //tail strings

let sliceW,sliceH;
let groundSize;

//for the shader;
let layer, fogShader, fog;



function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  noStroke();
  background(0);
  textFont(helvetica);
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

  sliceW = 500;
  sliceH = windowHeight*0.8;

  groundSize = 1000;

  graphics = createGraphics(sliceW,sliceH);
  inks = createGraphics(camHeight*2*PI,groundSize);

  //for toxiclib
  w = sliceH*0.6; //length of wire

  physics = new VerletPhysics2D();

  //attractor
  mousePos = new Vec2D(0, 1);
  mouseAttractor = new AttractionBehavior(mousePos,sliceH, 100);
  physics.addBehavior(mouseAttractor);

  //The two ends of pendulum
  topend = new End(sliceW/2, 0);
  physics.addParticle(topend);
  topend.lock();

  buttonend = new End(sliceW/2, w);
  physics.addParticle(buttonend);
  //wire of pendulum
  w1 = new Spring(topend, buttonend);
  physics.addSpring(w1);

  tailp.push(buttonend);
  for(let i=1; i<10;i++){
    let r = (10-i)*3;//radius getting smaller
    let p = new Particle(sliceW/2,w+i*10,r);
    physics.addParticle(p);
    tailp.push(p);
    let s = new Tail(tailp[i-1],p,15);
    physics.addSpring(s);
  }

  //for buffer gravity
  hori = 0;
  verti = 0;
}

function draw() {

  var rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  Rz = rotation[0];
  Ry = rotation[2];
  Rx = rotation[1];  

  //the entire background
  background(255);
  // sphere(10);//origin

  //drop inks
  push();
  translate(0,0,0)
  inks.noStroke();
  noise()
  inks.fill(random(0,255),random(0,255),random(0,255));
  inks.circle(-camZ*Ry+groundSize/2+hori-sliceW/2,groundSize/2+verti*sin(pitch),20);
  inks.fill(255,255,255,10);
  inks.rect(0,0,groundSize,groundSize);
  pop();

  // lights();

  //ground plane
  push();
  rotateX(HALF_PI);
  rectMode(CENTER);

  translate(camZ*Ry,0,0);//for yaw

  translate(0,0,-sliceH);
  texture(inks);
  rect(0,0,groundSize,groundSize);
  pop();

  //start graphics
  graphics.clear();
  graphics.background(0,0,0,0);
  
  //toxiclib
  hori = (sliceW/2+sin(Rz-HALF_PI)*sliceH);
  verti = (cos(Rz-HALF_PI)*sliceH);
  mousePos.set(hori, verti);

  physics.update();

  topend.display();
  buttonend.display();
  w1.display();

  // for (let p of tailp) {
  //   p.display();
  //   // p.getx();
  // }
  //toxiclib

  //plane that pendulum is on
  push();
  fill(0);
  cylinder(25,5);//top fix point
  pop();

  push();
  texture(graphics);
  translate(-sliceW/2,0,0);

  if (currRx != Rx){
    currRx += (Rx-currRx)/10; //Ease back
  }

  pitch = -(currRx-Rx);
  rotateX(pitch); //for pitch

  rect(0,0,sliceW,sliceH);
  pop();

  //ink drop

  obY = height/2;
  camY = height/2;

  //camera move due to acceleration and brake
  dz = Math.sign(accelerationZ)*(abs(accelerationZ)**2);
  currZ = constrain(currZ+dz,-camHeight/2,camHeight*5);
  if (currZ != 0){                                        //damping
    currZ -= currZ/(abs(currZ)**0.5);
  }

  camZ = camHeight + currZ;//front,back

  // camera move due to left right acceleration
  dx = 2*Math.sign(accelerationX)*(abs(accelerationX)**2);
  camX = -dx;
  obX = -dx;
  camera(camX, camY, camZ, obX, obY, obZ,upX,upY,0);
}
