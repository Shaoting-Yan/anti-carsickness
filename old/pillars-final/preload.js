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
    //for framebuffer
    fogShader = loadShader('shaders/fog.vert', 'shaders/fog.frag');
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