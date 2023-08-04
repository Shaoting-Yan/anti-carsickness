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

  function dot(){
    sphere(50,50,50);
  }

  function showUI(){
    shown = true;
    let gap = 40;
    heave = createSlider(0.1, 6, he, 0);
    heave.position(120, 500);
    heave.style('width', '200px');
    sway = createSlider(0.1, 6, sw, 0);
    sway.position(120, 500+gap);
    sway.style('width', '200px');
    surge = createSlider(0.1, 6, su, 0);
    surge.position(120, 500+gap*2);
    surge.style('width', '200px');
    damp = createSlider(1, 30, da, 0);
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
    tweak.remove();
  }