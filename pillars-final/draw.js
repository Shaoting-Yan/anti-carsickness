function pillars(c,m,r){
    let cell = (windowWidth-2*r-2*m)/c;
    let size = int(camHeight*PI/cell)+1;//cover full view range
    above = 4*r;
    below = 6*r;
    let diff = (above+below)/2-below;
    for(i=-size;i<size;i+=1){
      for(j=-size;j<size;j+=1){
        push();
        let currX = i*cell;
        let currY = j*cell;
        translate(currX,currY,diff);
        rotateX(HALF_PI);
        let x = (i+size)/(size*2);
        let y = (j+size)/(size*2);//normalize cordinates
        let currColor = getColor(x,y);
        fill(currColor);
        cylinder(r,above+below);
        pop();
      }
    }
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
    let top = 450;
    heave = createSlider(0.1, 6, he, 0);
    heave.position(120, top);
    heave.style('width', '200px');
    sway = createSlider(0.1, 6, sw, 0);
    sway.position(120, top+gap);
    sway.style('width', '200px');
    surge = createSlider(0.1, 6, su, 0);
    surge.position(120, top+gap*2);
    surge.style('width', '200px');
    damp = createSlider(1, 30, da, 0);
    damp.position(120, top+gap*3);
    damp.style('width', '200px');
    burn = createSlider(0.0, 5.0, bu, 0);
    burn.position(120, top+gap*4);
    burn.style('width', '200px');
  
    p1 = createP('heave');
    p1.style('font-size', '20px');
    p1.position(330, top-25);
    p2 = createP('sway');
    p2.style('font-size', '20px');
    p2.position(330, top-25+gap);
    p3 = createP('surge');
    p3.style('font-size', '20px');
    p3.position(330, top-25+gap*2);
    p4 = createP('damp');
    p4.style('font-size', '20px');
    p4.position(330, top-25+gap*3);
    p5 = createP('burn');
    p5.style('font-size', '20px');
    p5.position(330, top-25+gap*4);
    tweak.remove();
  }