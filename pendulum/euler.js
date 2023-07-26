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