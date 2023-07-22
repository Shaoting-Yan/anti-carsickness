let permissionGranted = false;
let databoard = false;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
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

function getRotationMatrix( alpha, beta, gamma ) {
  const degtorad = Math.PI / 180; // Degree-to-Radian conversion
  var cX = Math.cos( beta  * degtorad );
  var cY = Math.cos( gamma * degtorad );
  var cZ = Math.cos( alpha * degtorad );
  var sX = Math.sin( beta  * degtorad );
  var sY = Math.sin( gamma * degtorad );
  var sZ = Math.sin( alpha * degtorad );

  var m11 = cZ * cY - sZ * sX * sY;
  var m12 = - cX * sZ;
  var m13 = cY * sZ * sX + cZ * sY;

  var m21 = cY * sZ + cZ * sX * sY;
  var m22 = cZ * cX;
  var m23 = sZ * sY - cZ * cY * sX;

  var m31 = - cX * sY;
  var m32 = sX;
  var m33 = cX * cY;
  return [
    m13, m12, m11,
    m23, m22, m21,
    m33, m32, m31
  ];
}

function getEulerAngles( matrix ) {
  var radtodeg = 180 / Math.PI; // Radian-to-Degree conversion
  var sy = Math.sqrt(matrix[0] * matrix[0] +  matrix[3] * matrix[3] );

  var singular = sy < 1e-6; // If

  if (!singular) {
      var x = Math.atan2(matrix[7] , matrix[8]);
      var y = Math.atan2(-matrix[6], sy);
      var z = Math.atan2(matrix[3], matrix[0]);
  } else {
      var x = Math.atan2(-matrix[5], matrix[4]);
      var y = Math.atan2(-matrix[6], sy);
      var z = 0;
  }
  return [radtodeg * x, radtodeg * y, radtodeg * z];
}

function showdata(){
  fill(255);
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
    text(rotation[i].toFixed(2),50,400+i*50);
  }
}

function draw() {
  background(0);
  showdata();
}
