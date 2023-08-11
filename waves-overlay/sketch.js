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
palette = ['D77597','7DF1E6','BEF190','AFD98A','F2F2F2'];
// palette = ['126BEB','1B8BBB','79BE60','D8A531','EF3837'];
//wave parameter
let precision = 10;
let all = [];
let numLayers = 5;
let vert = 1;
let waveWidth = 0; 

function setup() {
  pixelDensity(2);
  createCanvas(windowWidth,windowHeight,WEBGL);
  
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

  let a = createA('https://shaoting-yan.github.io/anti-carsickness/waves/', 'to pure mode');
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

  moveCamera(accelerationX,accelerationY,accelerationZ);
  orbitControl();
  // sun(0,0,p);//x,y,period

  waves(currX,accY/25,numLayers);

}
