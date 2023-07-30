function randomColor(x,y){
    var names = Object.keys(palette);
    let index = int(map(noise(x,y),0,1,0,names.length));
    let result = palette[names[index]];
    return result;
  }
  
  function dimmer(c,f){
    return color(hue(c),saturation(c),constrain(brightness(c)*f,0,255));
  }