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
    textSize(10);
    translate(0,0,toplevel);
    for(let i = 0; i< messages.length; i++){
      text(messages[i].toFixed(2), 10, i*25);
    }    
    pop();
  }

function ground(w,d,h,sth){
  push();
  noStroke();
  rotateX(HALF_PI);
  translate(currX,0,-h);
  rectMode(CENTER);
  texture(sth);
  rect(0,0,w,d);
  pop();
}

function flap(w,h,sth){
  push();

  noStroke();
  if (currRx != Rx){
    currRx += (Rx-currRx)/da*3; //Ease back
  }
  push();
  fill(0);
  box(50,20,20);
  pop();
  rotateX(Rx-currRx);
  texture(sth);
  rect(-w/2,0,w,h);
  pop();
  inkz = h*asin(Rx-currRx);
}

function drawPendulum(board,color){
  let w = board.width;
  let h = board.height;
  let l = h*0.7;
  let r = 10;
  let tw = 30;
  let th = 80;
  if (currRz != Rz){
    currRz += (Rz-currRz)/3; //Ease back
  }
  board.push();
  board.clear();
  board.translate(w/2,0);
  board.rotate(HALF_PI-currRz);
  board.strokeWeight(2);
  board.line(0,0,0,l);
  board.fill(0);
  board.circle(0,l+r/2,r);
  l += r/2;
  board.fill(color);
  board.triangle(-tw/2,l,tw/2,l,0,l+th);
  l += th;
  board.pop();
  inkx = -h*asin(HALF_PI-currRz);
}

function drawInks(board,color,offset){
  let w = board.width;
  let h = board.height;
  let mapx = -offset/2+w/2+inkx/2;
  let mapy = h/2+inkz/2;
  color = setAlpha(color,50);
  board.push();
  board.noStroke();
  board.background(255,255,255,1);
  board.fill(color);
  // board.circle(mapx,mapy,accY+10);
  board.push();
  board.strokeWeight(accY/2+5);
  color = setAlpha(color,abs(accY)*2+50);
  board.stroke(color);
  board.line(prevx,prevy,mapx,mapy);
  board.pop();
  prevx = mapx;
  prevy = mapy;
  board.pop();
}

function showUI(){
  let gap = 40;
  heave = createSlider(0, 6, 3, 0);
  heave.position(120, 500);
  heave.style('width', '200px');
  sway = createSlider(0, 6, 3, 0);
  sway.position(120, 500+gap);
  sway.style('width', '200px');
  surge = createSlider(0, 6, 3, 0);
  surge.position(120, 500+gap*2);
  surge.style('width', '200px');
  damp = createSlider(0, 50, 3, 0);
  damp.position(120, 500+gap*3);
  damp.style('width', '200px');

  p1 = createP('heave');
  p1.style('font-size', '20px');
  p1.position(330, 475);
  p2 = createP('sway');
  p2.style('font-size', '20px');
  p2.position(330, 475+gap);
  p3 = createP('surge');
  p3.style('font-size', '20px');
  p3.position(330, 475+gap*2);
  p4 = createP('damp');
  p4.style('font-size', '20px');
  p4.position(330, 475+gap*3);
}
