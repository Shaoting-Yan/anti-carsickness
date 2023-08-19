p5.disableFriendlyErrors = true;
let permissionGranted = false;

//for the shader;
let layer, Shader;
let near,far;
let strength = 0.0;
let bu = 1.0;

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

  // tweak = createButton('tweak');
  // tweak.position(300,600);
  // tweak.mousePressed(showUI);

  ground = createFramebuffer();
  ground.resize(100,100);

  camHeight = height/2/tan(PI/6)*1.5;
  //framebuffer
  layer = createFramebuffer();
  bottom = createFramebuffer();

  buffer = ground.get(0,0,ground.width-1,ground.height-1).pixels;
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
    bu = burn.value();
  }

  //mimic breath behavior
  if (mouseIsPressed){
    bu = constrain(bu+0.1,1.0,3.0);
    strength = constrain(strength+0.1,0.0,3.3);
  }else{
    bu += (1.0-bu)/10;
    strength += (0.0-strength)/10;
  } 

  if (frameCount%1 == 0){//update rate
    buffer = ground.get(0,0,ground.width,ground.height).pixels;//update buffer
  }

  groundShader.setUniform('resolution', [ground.width,ground.height]);
  groundShader.setUniform('time', frameCount*0.01);
  groundShader.setUniform('img', ground.color);
  groundShader.setUniform('startColor', [1.0,0.0,1.0]);
  groundShader.setUniform('endColor', [0.0,1.0,1.0]);
  groundShader.setUniform('breathColor', [1.0,1.0,1.0]);
  groundShader.setUniform('touch', [mouseX/width,mouseY/height]);
  groundShader.setUniform('currX', 0.5-Ry/(2*PI));
  groundShader.setUniform('strength', strength);

  ground.begin();
  clear();
  shader(groundShader);
  rect(0,0,ground.width,ground.height);
  ground.end();

  clear();

  layer.begin();
  clear();
  ambientLight(255);
  push();
  moveObject(Rx,Ry,Rz);
  pillars(3,-25,width/10.5);
  pop();
  moveCamera(accelerationX,accelerationY,accelerationZ);
  layer.end();

  pillarShader.setUniform('uImg', layer.color);
  pillarShader.setUniform('uDepth', layer.depth);
  pillarShader.setUniform('time', frameCount*0.08);
  pillarShader.setUniform('uSize', [width, height]);
  pillarShader.setUniform('uIntensity', 0.02);
  pillarShader.setUniform('uNumSamples', 25);
  pillarShader.setUniform('uTargetZ', far*0.4);
  pillarShader.setUniform('uNear', near/2);
  pillarShader.setUniform('uFar', far);
  pillarShader.setUniform('uGround',ground.color);
  pillarShader.setUniform('burn',bu);

  basicShader.setUniform('img', ground.color);//for testing
  shader(pillarShader);
  rect(0,0,width,height);
}