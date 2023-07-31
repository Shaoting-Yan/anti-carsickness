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
    return [x, y, z];
  }

  function randomColor(x,y){
    var names = Object.keys(palette);
    let index = int(map(noise(x,y),0,1,0,names.length));
    let result = palette[names[index]];
    return result;
  }
  
  function dimmer(c,f){
    return color(hue(c),saturation(c),constrain(brightness(c)*f,0,255));
  }

  function moveObject(Rx,Ry,Rz){
    let currX = camHeight*Ry;   //for left right rotation
    rotateZ(HALF_PI-Rz);        //tilting
    translate(currX,0,0);     
  }
  
  function moveCamera(Ax,Ay,Az,offset){
    //camera move due to acceleration and brake
    let dz = su*Math.sign(Az)*(abs(Az)**1.5);
    accZ = accZ == null ? camHeight : constrain(accZ+dz,-camHeight/2,camHeight*5);
    if (accZ != 0){                                        
      accZ -= accZ/(abs(accZ)**0.5); //damping
    }
    let camZ = camHeight + accZ;

    //camera move due to up and down
    let dy = he*Math.sign(Ay)*(abs(Ay)**1.5);
    accY = accY == null ? 0 : accY+dy;
    if (accY != 0){                                        
      accY -= accY/20; //damping
    }
    let camY = accY;
    let obY = accY;

    //camera move due to left and right
    let dx = sw*Math.sign(Ax)*(abs(Ax)**1.5);
    accX = accX == null ? 0 : accX+dx;
    if (accX != 0){                                        
      accX -= accX/10; //damping
    }
    let camX = accX;
    let obX = accX;

    camera(camX, camY+offset, camZ, obX, obY+offset, 0,0,1,0);
    // perspective(PI / 3.0, width / height, camZ-140, camZ);
  }