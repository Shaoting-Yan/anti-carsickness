p5.disableFriendlyErrors = true;
let permissionGranted = false;

//for the shader;
let layer, Shader,contactShadowRenderer;

//for camera integrate
let accX, accY, accZ;
let currRx = 0;

//motion parameter
let he = 3;
let sw = 3;
let su = 2;
let da = 15;
let shown = false;

//colors
palette = ['3C504E','3C504E','46605D','5D867E','6B9B91','7BB0A8','ADD5CA','D8E4E0'];
strokePalette = ['59716E','59716E','67948F','8AAEA7','97B7B0','C5DCD8','E3EFEB','FFFFFF'];

//wave parameter
let precision = 10;
let all = [];
let numLayers = 8;
let vert = 1;
let waveWidth = 0; 

function setup() {
  pixelDensity(2);
  createCanvas(windowWidth,windowHeight,WEBGL);
  blurRenderer = createGaussianBlurRenderer();
  blurRenderer.setIntensity(0.1);
  blurRenderer.setSamples(20);
  blurRenderer.setDof(50);

  sunLayer = createFramebuffer(width,height,WEBGL);

  textFont(helvetica);

  background('darkslategray');

  camHeight = height/2/tan(PI/6);
  //framebuffer
  layer = createFramebuffer();
  
  tweak = createButton('tweak');
  tweak.position(300,600);
  tweak.mousePressed(showUI);

  //prepare waves
  for (let i = 0; i < numLayers; i++) {
    all.push(new wave(i));
  }
  waveWidth = width*6;

  let a = createA('https://shaoting-yan.github.io/anti-carsickness/waves-overlay/', 'to pure mode');
  a.position(10, 10);
}

function draw() {
  clear();
  let rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
  Rz = rotation[0];
  Ry = rotation[2];
  Rx = rotation[1];  

  if (shown){
    he = heave.value();
    sw = sway.value();
    su = surge.value();
    da = damp.value();
  }

  let currX = Ry*camHeight;

  blurRenderer.draw(() => {
    clear();  
    background(0,0,0,0);
    moveCamera(accelerationX,accelerationY,accelerationZ);

    let p = 60;

    sun(0,-200+breath(p,300),p);//x,y,period

    waves(currX,accY/25,numLayers);
  
    //breathing focus
    push();
    translate(0,0,200+breath(10,50)); //focus distance
    blurRenderer.focusHere();
    pop();
  });  
}
