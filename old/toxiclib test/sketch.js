let physics;

let tailp = []; //tail particles
let tails = []; //tail strings

function setup() {
  sliceW = 500;
  sliceH = 500;
  createCanvas(sliceW, sliceH); 
  w = sliceH*0.6; //length of wire

  physics = new VerletPhysics2D();

  //gravity
  gravity = new Vec2D(0, 1.5);
  gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);

  //attractor
  mousePos = new Vec2D(mouseX, mouseY);
  mouseAttractor = new AttractionBehavior(mousePos,sliceH, 1);
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
    let r = (10-i)*5;//radius getting smaller
    let p = new Particle(sliceW/2,w+i*10,r);
    physics.addParticle(p);
    tailp.push(p);
    let s = new Tail(tailp[i-1],p,20);
    physics.addSpring(s);
  }
}

function draw() {
  background(200);
  mousePos.set(mouseX, mouseY);

  physics.update();

  topend.display();
  buttonend.display();
  w1.display();

  for (let p of tailp) {
    p.display();
  }
}