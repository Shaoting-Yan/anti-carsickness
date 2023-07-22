
let precision = 10;
let all = [];
let numLayers = 8;
let vert = 1;


function setup(){
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numLayers; i++) {
    all.push(new wave(i));
  }
}

function draw(){
  background(255);
  translate(0,height/2);
  for(let i = 0;i<numLayers;i++){
    all[i].render(i+1);
  }
}

function wave(i){
  this.yoff = i*0.1;
  this.xoff = 0;
  this.waveh = 10*i;
  this.render = function render(i){
    fill(175,175,255,50); //transparency
    strokeWeight(2);
    stroke(120,120,200,255);
    beginShape();
    this.xoff = 0;
    for(let x = -100; x<=width*10;x += precision){
      y = map(noise(this.xoff, this.yoff),
                    0,1,
                    -this.waveh,
                    this.waveh); /// generate 2-d noise values
      vertex(x,y); /// construct wave form
      this.xoff += 0.02;
    }
    this.yoff += 0.005;
    vertex(width, this.wavey+(i+1)*(this.waveh*0.75)); /// complete the wave layer
    vertex(width, height); /// tie the last x to the side if not perfect x10 width
    vertex(0, height);
    endShape(CLOSE);
  }
}


