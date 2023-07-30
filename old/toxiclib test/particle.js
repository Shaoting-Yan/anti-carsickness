
class Particle extends VerletParticle2D {

  constructor( x,  y, r) {
    super(x, y);
    this.r = r;
  }

   display() {
    fill(0,0,0,200);
    ellipse(this.x, this.y, this.r, this.r);
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