function pillars(c,m,r){
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
  
function buttons(c,m,r){
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

function showdata(toplevel, messages){
    push();
    fill('red');
    textSize(20);
    translate(0,0,toplevel);
    for(let i = 0; i< messages.length; i++){
      text(messages[i].toFixed(2), 10, i*25);
    }    
    pop();
  }

function ground(w,d,h){
  push();
  rotateX(HALF_PI);
  translate(0,0,-h);
  rectMode(CENTER);
  rect(0,0,w,d);
  pop();
}

function flap(w,h,sth){
  push();
  texture(sth);
  noStroke();
  if (currRx != Rx){
    currRx += (Rx-currRx)/da; //Ease back
  }
  rotateX(Rx-currRx);
  rect(-w/2,0,w,h);
  pop();
}

function drawPendulum(board){
  let w = board.width;
  let h = board.height;
  if (currRz != Rz){
    currRz += (Rz-currRz)/da; //Ease back
  }
  board.push();
  board.clear();
  board.fill(0);
  board.translate(w/2,0);
  board.rotate(HALF_PI-currRz);
  board.line(0,0,0,h*0.7);
  board.pop();
}
