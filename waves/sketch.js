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

//wave parameter
let precision = 10;
let all = [];
let numLayers = 7;
let vert = 1;
let waveWidth = 0; 

//timechange
let changing = false;
let paletteIndex = 0;

function setup() {
  pixelDensity(2);
  createCanvas(windowWidth,windowHeight,WEBGL);
  blurRenderer = createGaussianBlurRenderer();
  blurRenderer.setIntensity(0.1);
  blurRenderer.setSamples(20);
  blurRenderer.setDof(50);

  bg = createGraphics(width/4,height/4);
  bg.pixelDensity(1);

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
    let hasBoat = true;
    let t = random(-1,1);
    all.push(new wave(i,t,hasBoat));
  }
  waveWidth = width*6;

  let a = createA('https://shaoting-yan.github.io/anti-carsickness/waves-overlay/', 'to pure mode');
  a.position(10, 10);

  loadSun();
  loadPalettes();

  myDiv = createDiv();
  myDiv.position(0, 0);
  myDiv.size(windowWidth,windowHeight);
  myDiv.style('z-index', -1);
  myDiv.style('display', 'block');
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
    moveCamera(accelerationX,accelerationY,accelerationZ);

    let p = 60;

    let place = 50 + int(accY/height*100)//for gradient positioning

    let ratio = 2; //ratio between stable palette and changing palette time
    let period = frameCount%2000/2000;
    let stage = map(period,0,1,0,sequence.length*ratio-1);
    currPalette = sequence[paletteIndex];
    if (Math.floor(stage)%ratio==0 && changing == false){
      paletteIndex = (paletteIndex+1)%sequence.length;
      prevPalette = currPalette;
      currfill = currPalette.fill;
      currstroke = currPalette.stroke;
      changing = true;
    }else if(Math.floor(stage)%ratio == 0){//during the changing phase
      decimalPart = stage - Math.floor(stage);
      currfill = mixPalette(prevPalette.fill,currPalette.fill,decimalPart);
      currstroke = mixPalette(prevPalette.stroke,currPalette.stroke,decimalPart);
      myDiv.style('background',mixSky(prevPalette,currPalette,decimalPart,degrees(HALF_PI-Rz),place));//background changing
      prevSun = prevPalette.sun;
      currSun = currPalette.sun;
      if (currSun != null && prevSun != null){
        let prevHeight = prevSun.height+prevSun.diff;
        let nextHeight = currSun.height;

        let suncol = lerpColor(prevSun.color,currSun.color,decimalPart);

        let currHeight = map(decimalPart,0,1,prevHeight,nextHeight);
        let currR = map(decimalPart,0,1,prevSun.r,currSun.r);
        drawSun(0,currHeight,currR,suncol);
      }
    }else{
      changing = false;
      currfill = currPalette.fill;
      currstroke = currPalette.stroke;
      myDiv.style('background',makeStyle(currPalette.up,currPalette.down,degrees(HALF_PI-Rz),place));

      currSun = currPalette.sun;
      if (currSun != null){
        let nextHeight = currSun.height+currSun.diff;
        currHeight = map(stage%ratio,1,ratio,currSun.height,nextHeight);
        drawSun(0,currHeight,currSun.r,currSun.color);
      }
    }
    
    waves(currX,accY/25,numLayers,currfill,currstroke);

    //breathing focus
    push();
    translate(0,0,200+breath(10,50)); //focus distance
    blurRenderer.focusHere();
    pop();
  });  
}
