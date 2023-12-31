
function pillars(c,m,r){
    let cell = (windowWidth-2*r-2*m)/c;
    let fullcount = int(PI*camHeight/cell);
    for(i=-fullcount;i<fullcount;i+=1){
      for(j=-10;j<10;j+=1){
        push();
        let currColor = radialColor((i+fullcount)/(fullcount*2),(j+10)/20);
        emissiveMaterial(currColor);
        translate(i*cell,j*cell,-r*10);
        rotateX(HALF_PI);
        cylinder(r,r*10);
        // scale(3);
        // model(pillar);
        pop();
      }
    }
    toplevel = r*5;
  }

function dots(c,m,r){
    let cell = (windowWidth-2*r-2*m)/c;
    let fullcount = int(PI*camHeight/cell);
    for(i=-fullcount;i<fullcount;i+=1){
      for(j=-20;j<20;j+=1){
        push();
        translate(i*cell,j*cell,0);
        circle(0,0,r*2);
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