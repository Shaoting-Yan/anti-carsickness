

let water = []; /// hold waterwave objects
let nolayers = 8; /// how many layers of water
let floatl = 1; /// which layer does bobber float on
let d2n = 75; /// change from day to night to day
let timepass = 0.05; /// how fast to change day-2-night
let bobx = 0; /// bobber's horizontal position mover 
let boby = 0; /// bobber's vertical position mover
let bobsize = 10; /// bobber's size
let floatz = 3; /// change the layer bobber is on
let showtime = ''; /// display time option = string holder
let bobxoff = 0.0; /// bob's horizontal noise movement offset
let wlook;
let slook;
let timeh = 0.5;
let merid = '';
let smoothfall = 0;
let smoothrange = 0;

function setup() {
  createCanvas(windowWidth,
    windowHeight);
  boby = height*0.75; /// bob's initial height
  floatl = int(nolayers/2); /// bob's initial layer - halfway
  for (let i = 0; i < nolayers; i++) { /// instantiate waterwave layers
    water.push(new waterwave(i)); /// put waterwave object into water variable
  }
  wlook = new colormaker();
  slook = new colormaker();
  rectMode(CENTER); /// center drawn geometries
  smoothrange = (height*0.75)-(height*0.15);
  smoothfall = 60/smoothrange*0.0075;
}

function draw() {
  wlook.update();
  slook.update();
  let h = hour(); /// optional display time as bob
  let m = minute(); /// check min and hour for single 0's & 24-hour
  let s = second(); /// check seconds for lowering tide

  if (s === 0) {
      smoothfall = 60/smoothrange*0.0075;
  } /// reset smoothfall value at top of minute
  
  /// modify smoothfall value during minute
  if (m/2 === int(m/2)) { /// fall during even minute
    timeh += smoothfall;
  }
  if (m/2 !== int(m/2)){ /// rise during odd minute
    timeh -= smoothfall;
  }
  if (timeh < 0.15){
    smoothfall = 0;
  }
  if (timeh > 0.75){
    smoothfall = 0;
  }
  
  if (m < 10){  /// add 0 to string if only 1 zero is offered
   m = '0'+m;
  } 
  if (h > 12){  /// convert 24-hour to 12-hour & change 0 hour to 12
  h -= 12;
  merid = 'PM';
  }
  if (h === 0){
  h = 12;
  merid = 'AM';
  }
  showtime = h+':'+m; /// combine times into string conversions
  bobxoff += 0.0025; /// how fast does horizontal change for bob
  d2n += timepass; /// change from day to night to day
  bobx = noise(bobxoff) * width; /// move bob's horizontal position
  if (d2n > 200 ||
      d2n < 75) { /// constrain change in time within bounds
    timepass *= -1; /// toggle time step polarity
  } /// check for bounds to cycle time and change background
    /// and change water color to contrast.
  
  background(255-slook.r, 255-slook.g-d2n, 255-slook.b-d2n, 255); /// show day-to-night
  bobsize = map(floatz,75, 200,10,75); /// set size to layer
  for (let i = 0; i < water.length; i++) { /// show water layers
  if (floatl === i){ /// show back layers - then, bob - then, front layers
  push(); /// encapsulate bobber display aspects for rotational effects
    rectMode(CENTER); /// center bob
    translate(bobx,boby); /// set origin to bob's position
    rotate(PI*(bobx*0.0075)); /// rotate bob by noise value 
    fill(0,355-d2n);  /// bob's color
    stroke(255-wlook.r,(wlook.g+30-(1+i)*10)-d2n,
         (wlook.b+30-(1+i)*10)-d2n,
         125); /// adjust stroke color for contrast
    strokeWeight(3);
    rect(0,0,100,100,10); /// draw bob
    fill(0, 255); /// time's color
    stroke(255,255); /// no outline for time text
    textSize(28);
    strokeWeight(1);
    textAlign(CENTER);
    text(showtime,0,-8); /// print time on Bob at top.
    textSize(30);
    text(merid,0,18);
    textSize(22);
    if (s < 10){
    text(':0'+s,0,40);
    } else {
    text(':'+s,0,40);
    }
    pop(); /// close encapsulation
  }
  water[i].render(i); /// show layers 
    /// condition will seperate out which are in front and in back of bob
  }
}


function waterwave(i) { /// create wave layers - use i for scale and shading
  this.yoff = (i + 1) * 0.1; /// manage bob's change in y
  this.xoff = 0; /// manage wave movement pattern speed
  this.waveh = 30; /// hold wave height for scaling
  this.wavex = bobx; /// calculates and holds bob's associated horizontal
  this.wavey = boby; /// calcualtes and holds bob's associated vertical
  
  this.render = function(i) { /// method for moving and drawing waves
    fill(wlook.r-(i+1)*25,(wlook.g-(1+i)*18)-d2n,
         (wlook.b-(1+i)*18)-d2n,
         225-(i+1)*25); /// calculate shading using day-to-night 
    strokeWeight((i+1)*5.80); /// adjust stroke width to scale
    stroke(255-wlook.r,(wlook.g+30-(1+i)*10)-d2n,
         (wlook.b+30-(1+i)*10)-d2n,
         40); /// adjust stroke color for contrast
    beginShape(); /// encapsulate wave layer shape construction
    this.xoff = 0; /// reset x before looping noise
    for (let x = 0; x <= width; x += 10) { /// loop through noise values
      this.wavex = x; /// assign function variable to handle bob's x in the wave
      this.wavey = map(noise(this.xoff, this.yoff),
                       0, 1,
                       height*(timeh),
                       height*(timeh)-(i+1)*this.waveh); /// generate 2-d noise values
      vertex(this.wavex,
             this.wavey+(i+1)*(this.waveh*0.75)); /// construct wave form
      this.xoff += 0.02; /// slide through noise values as wave's x moves
      if (i === floatl &&
          bobx>this.wavex-5 &&
          bobx<this.wavex+5){
        boby = this.wavey+(i+1)*(this.waveh*0.75);
      } /// look for associated y that will match bob
        /// to wave height at bob's x position
      
    }
    this.yoff += 0.005; /// how fast is the wave layer moving
    vertex(width, this.wavey+(i+1)*(this.waveh*0.75)); /// complete the wave layer
    vertex(width, height); /// tie the last x to the side if not perfect x10 width
    vertex(0, height); /// carry line down to right corner, back to left and close
    endShape(CLOSE);
  }
}

/// Optional Add-on
/// Click to Go Fullscreen
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}


function colormaker(){
  let rndcolor = random(75,175);
  this.r = rndcolor;
  this.g = rndcolor;
  this.b = rndcolor;
  this.roff = 1.1//random(1)*random(1);
  this.goff = 1.2//random(1)*random(1);
  this.boff = 1.3//random(1)*random(1);
  
  this.update = function() {
    this.roff += 0.0015;
    this.goff += 0.0025;
    this.boff += 0.0035;
    
    this.r = sin(this.roff)*255;
    this.g = sin(this.goff)*255;
    this.b = sin(this.boff)*255;
    
  }

}