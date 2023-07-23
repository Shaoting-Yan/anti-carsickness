class Particle extends VerletParticle2D {

    constructor( x,  y) {
      super(x, y);
    }
  
     display() {
      fill(255);
      ellipse(this.x, this.y, 10, 10);
    }
  }