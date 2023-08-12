p5.disableFriendlyErrors = true;
let permissionGranted = false;

//for the shader;
let layer, Shader;
let count = 0;

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
  noStroke();

  background('darkslategray');

  tweak = createButton('tweak');
  tweak.position(300,600);
  tweak.mousePressed(showUI);

  ground = createFramebuffer();
  ground.resize(10,10);

  camHeight = height/2/tan(PI/6);
  //framebuffer
  layer = createFramebuffer();

  buffer = ground.get(0,0,ground.width-1,ground.height-1).pixels;
}

function draw() {

  if (frameCount%1 == 0){//update rate
    buffer = ground.get(0,0,ground.width,ground.height).pixels;//update buffer
  }

  groundShader.setUniform('resolution', [100,100]);
  groundShader.setUniform('time', frameCount*0.01);
  groundShader.setUniform('img', ground.color);

  ground.begin();
  clear();
  shader(groundShader);
  rect(0,0,ground.width,ground.height);
  ground.end();

  clear();

  orbitControl();

  push();
  fill(255);
  pillars(3,-25,width/12);
  pop();

  imageMode(CENTER);
  image(ground,0,0,1000,1000);
}


  // let rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  // Rz = rotation[0];
  // Ry = rotation[2];
  // Rx = rotation[1];  
  
  // if (shown){
  //   he = heave.value();
  //   sw = sway.value();
  //   su = surge.value();
  //   da = damp.value();
  // }

  // clear();

  // orbitControl();

  // texture(ground);

  // // pillars(3,-25,width/12);
  
  // rectMode(CENTER);
  // rect(0,0,width,height);

  // //start framebuffer
  // layer.begin();
  
  // clear();
  // noStroke();
  // background(0);
  // lights();

  // push();

  // moveObject(Rx,Ry,Rz);
  // pillars(3,-25,windowWidth/12); //(cell,margin,radius)

  // pop();

  // moveCamera(accelerationX,accelerationY,accelerationZ);

  // // showdata(200,[he,sw,su,da]);

  // layer.end(); //end frame buffer

  //apply depth buffer
  // shader(Shader);
  // Shader.setUniform('resolution', [width, height]);
  // Shader.setUniform('depth', layer.depth);
  // Shader.setUniform('img', layer.color);
  // Shader.setUniform('time', frameCount*0.1);
  // rect(0,0,width,height);