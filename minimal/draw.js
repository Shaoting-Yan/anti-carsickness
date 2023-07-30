function pillars(c,m,r){
    noStroke();
    let cell = (windowWidth-2*r-2*m)/c;
    for(i=-20;i<20;i+=1){
      for(j=-20;j<20;j+=1){
        push();
        translate(i*cell,j*cell,r*2);
        rotateX(HALF_PI);
        cylinder(r,r*4);
        pop();
      }
    }
    toplevel = r*5;
  }

  function boxs(c,m,r){
    let cell = (windowWidth-2*r-2*m)/c;
    for(i=-20;i<20;i+=1){
      for(j=-20;j<20;j+=1){
        push();
        translate(i*cell,j*cell,r*2);
        box(r*2,r*2,r*2);
        pop();
      }
    }
    toplevel = r*3;
  }

  function dots(c,m,r){
    push()
    noStroke();
    let cell = (windowWidth-2*r-2*m)/c;
    for(i=-20;i<20;i+=1){
      for(j=-20;j<20;j+=1){
        push();
        // fill(randomColor(i,j));
        fill(255,255,255,128);
        circle(i*cell,j*cell,r*2);
        pop();
      }
    }
    toplevel = r*5;
    pop();
  }


  function showdata(toplevel, messages){
    push();
    fill('red');
    textSize(20);
    translate(0,0,toplevel);
    for(let i = 0; i< messages.length; i++){
      text(messages[i].toFixed(2), 10, -100+i*25);
    }    
    pop();
  }

  function frame(Rx){
    push();
    rotateZ(HALF_PI-Rz);
    fill(0,0,0,0);
    strokeWeight(10);
    stroke(0,0,0,128);
    if (currRx != Rx){
      currRx += (Rx-currRx)/da; //Ease back
    }
    rotateX(Rx-currRx);
    rectMode(CENTER);
    rect(0,0,width,10);
    pop();
  }

  function horizon(c,r,d){
    let fullcount = int(2*PI*camHeight/c);
    push();
    fill(0,0,0,128);
    strokeWeight(0);
    if (currRx != Rx){
      currRx += (Rx-currRx)/da; //Ease back
    }
    rotateX(HALF_PI+Rx-currRx);
    rectMode(CENTER);
    translate(0,-d/2,0);
    for (let i = -fullcount/2; i<fullcount/2;i++){
      push();
      translate(i*c,0,0);
      rect(0,0,r,d);
      strokeWeight(4);
      strokeCap(SQUARE);
      translate(0,d/2,0);
      line(-r/2,0,0,r/2,0,0);
      pop();
    }
    pop();
  }
