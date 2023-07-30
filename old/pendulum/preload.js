function preload(){
    if (typeof(DeviceOrientationEvent) !== 'undefined' && 
    typeof(DeviceOrientationEvent.requestPermission) === 'function'){
      DeviceOrientationEvent.requestPermission().catch(()=>{
        let button = createButton('allow g-sensors');
        button.style('font-size','24px');
        button.center();
        button.mousePressed(requestAccess);
        throw error;
      }).then(()=>{
        permissionGranted = true;
      })
    }
  
    helvetica = loadFont('assets/Helvetica.ttf');
    gradient = loadImage('assets/gradient.jpg');
    // //for framebuffer
    // fogShader = loadShader('fog.vert', 'fog.frag');
  }
  
  function requestAccess(){
    DeviceOrientationEvent.requestPermission().then(
      response => {if(response == 'granted'){
        permissionGranted = true;
      }else{
        permissionGranted = false;
      }}
    ).catch(console.error);
    this.remove();
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