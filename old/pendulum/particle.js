
class Particle extends VerletParticle2D {

  constructor( x,  y, r) {
    super(x, y);
    this.r = r;
    this.x = x;
  }

   display() {
    graphics.fill(0,0,0,200);
    graphics.ellipse(this.x, this.y, this.r, this.r);
  }

   getx(){
    return this.x;
  }
}

class End extends VerletParticle2D {

  constructor( x,  y) {
    super(x, y);
  }

   display() {
    // fill(0);
    // ellipse(this.x, this.y, 20, 20);
  }
}