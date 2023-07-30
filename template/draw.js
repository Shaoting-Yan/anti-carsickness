function drawPillars(c,m,r){
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

  function drawBoxs(c,m,r){
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
  
  function drawButtons(c,m,r){
    for(i=-20;i<20;i+=1){
      for(j=-20;j<20;j+=1){
        push();
        colorMode(HSB,255);
        var currColor = color(randomColor(i,j));
        fill(dimmer(currColor,0.5));
  
        translate(i*cell,j*cell,0);
        rotateX(HALF_PI);
  
        cylinder(r,r*4,24,1,false,false);
  
        rotateX(-HALF_PI);
        translate(0,0,r*2);
        
        fill(currColor);
  
        circle(0,0,r*2);
        pop();
      }
    }
  }

  function showdata(){
    push();
    translate(-100,-275,toplevel);
    noStroke();
    fill(255,255,255,200);
    rect(40,30,60,485,15);
    fill(0);
    text(rotationX.toFixed(2),50,50);
    text(rotationY.toFixed(2),50,100);
    text(rotationZ.toFixed(2),50,150);
    text(accelerationX.toFixed(2),50,200);
    text(accelerationY.toFixed(2),50,250);
    text(accelerationZ.toFixed(2),50,300);
    var rotation = getEulerAngles(getRotationMatrix(rotationZ,rotationX,rotationY));
    for (i=0;i<3;i++){
      text(degrees((rotation[i])).toFixed(2),50,400+i*50);
    }
    pop();
  }