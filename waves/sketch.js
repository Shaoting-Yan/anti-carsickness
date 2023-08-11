p5.disableFriendlyErrors = true;
let permissionGranted = false;

var mic;
let pressed;
let vol = 1;
let volLevel = 1;

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

  moon = createGraphics(50,50);

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

  getAudioContext().suspend();
  // mic = new p5.AudioIn();
  // mic.start();
  String.prototype.convertToRGB = function(){
    var aRgbHex = this.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
  }
}

function draw() {
  // vol = mic.getLevel();
  // volLevel = map(vol,0,1,1,10);
  // console.log(vol);

  if (mouseIsPressed == true){
    vol = constrain(vol+0.2,1,4);
    volLevel = map(noise(frameCount),0,1,0.6,1.2)*vol;
  }else{
    vol += (1-vol)/10;
    volLevel = vol;
  }

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
    let speed = 2000;
    let period = frameCount%speed/speed;
    let stage = map(period,0,1,0,sequence.length*ratio-1);
    currPalette = sequence[paletteIndex];

    iceberg = color('white');

    if (Math.floor(stage)%ratio==0 && changing == false){//switching palette
      paletteIndex = (paletteIndex+1)%sequence.length;
      prevPalette = currPalette;
      currfill = currPalette.fill;
      currstroke = currPalette.stroke;
      changing = true;
    }else if(Math.floor(stage)%ratio == 0){//during the changing phase
      decimalPart = stage - Math.floor(stage);
      currfill = mixPalette(prevPalette.fill,currPalette.fill,decimalPart);
      currstroke = mixPalette(prevPalette.stroke,currPalette.stroke,decimalPart);
      [finalStyle,iceberg] = mixSky(prevPalette,currPalette,decimalPart,degrees(HALF_PI-Rz),place);
      myDiv.style('background',finalStyle);//background changing
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
      if(currPalette.name == 'moonrise'){
        drawMoon(1,decimalPart*255);
      }
      if(currPalette.name == 'midnight'){
        drawMoon(map(decimalPart,0,1,1,0),255);
      }
      if(currPalette.name == 'dawn'){
        drawMoon(1,map(decimalPart,0,1,255,0));
      }

    }else{ //for normal stage
      changing = false;
      currfill = currPalette.fill;
      currstroke = currPalette.stroke;
      [finalStyle,iceberg] = makeStyle(currPalette.up,currPalette.down,degrees(HALF_PI-Rz),place)
      myDiv.style('background',finalStyle);
      currSun = currPalette.sun;
      if (currSun != null){
        let nextHeight = currSun.height+currSun.diff;
        currHeight = map(stage%ratio,1,ratio,currSun.height,nextHeight);
        drawSun(0,currHeight,currSun.r,currSun.color);
      }else if (currPalette.name == 'midnight'){        
        drawMoon(map(stage%ratio,1,ratio,0,-1),255);
      }else if(currPalette.name == 'moonrise'){
        drawMoon(1,255);
      }
    }
    
    waves(currX,accY/25,numLayers,currfill,currstroke,volLevel,iceberg);

    //breathing focus
    push();
    translate(0,0,200+breath(10,50)); //focus distance
    blurRenderer.focusHere();
    pop();
  });  
}



