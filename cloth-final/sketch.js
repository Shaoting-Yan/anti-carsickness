let cols = 18;
let rows = 34;

let particles = make2DArray(cols,rows);
let springs = [];

let w = 30;

let physics;

let pressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight); 
  physics = new VerletPhysics2D();
  gravity = new Vec2D(0, 0.2);
  gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);
  mousePos = new Vec2D(mouseX, mouseY);
  mouseAttractor = new AttractionBehavior(mousePos,150, 2);
  physics.addBehavior(mouseAttractor);

  let x = 25;
  for (let i = 0; i < cols; i++) {
    let y = 10;
    for (let j = 0; j < rows; j++) {
      let p = new Particle(x, y);
      particles[i][j] = p;
      physics.addParticle(p);
      y = y + w;
    }
    x = x + w;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = particles[i][j];
      if (i != cols-1) {
        let b1 = particles[i+1][j];
        let s1 = new Spring(a, b1);
        springs.push(s1);
        physics.addSpring(s1);
      }
      if (j != rows-1) {
        let b2 = particles[i][j+1];
        let s2 = new Spring(a, b2);
        springs.push(s2);
        physics.addSpring(s2);
      }
    }
  }

  particles[0][0].lock();
  particles[cols-1][0].lock();
  particles[cols-1][rows-1].lock();
  particles[0][rows-1].lock();
}

function mousePressed(){
  pressed = true;
}

function mouseReleased(){
  pressed = false;
}

function draw() {
  background(0);
  if(pressed){
    mousePos.set(mouseX, mouseY);
  }

  physics.update();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //particles[i][j].display();
    }
  }


  for (let s of springs) {
    s.display();
  }
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
