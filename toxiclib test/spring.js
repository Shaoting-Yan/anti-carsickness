class Spring extends VerletSpring2D {

  constructor(a, b) {
    super(a, b, w, 1);
  }
  
  display() {
    stroke(0);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  } 
}

class Tail extends VerletSpring2D {

  constructor(a, b, h) {//h for the interval of tail
    super(a, b, h, 1);
  }
  
  display() {
    stroke(0);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  } 
}
