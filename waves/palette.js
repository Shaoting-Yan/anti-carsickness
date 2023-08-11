class Sun{
  constructor(suncolor,r,height,diff){
    this.color = color(addPound(suncolor));
    this.r = r;
    this.height = height;
    this.diff = diff;
  }
}

class Palette{
    constructor(name,fill,stroke,sky,sun){
      this.fill = turnColor(fill);
      this.stroke = turnColor(stroke);
      this.up = color('#'+sky[1]);
      this.down = color('#'+sky[0]);
      this.sun = sun;
      this.name = name;
    }
  }

function loadSun(){
  risingSun = new Sun('BE3D07',75,200,-150);
  noonSun = new Sun('F2C37E',50,-150,-300);
  risingMoon = new Sun('FFFFFF',75,200,-150);
  midnightMoon = new Sun('FFFFFF',50,-150,-300);
}

function loadPalettes(){
    sunrise = new Palette('sunrise',['09445F', '144F68','2F5F77','476F86','5A839B','6A90A7','6B90A8'],
    ['426C7E', '497182','7B98AC','7D9CAC','AFC1CB','E3EFEB','D7E6EF'],
    ['F48134','FFFFFF'],risingSun);
    
    noon = new Palette('noon',['49636F','5D7683','859FAD','99B4C2','AFC9D8','CFE2EC','D3E3E8'],
    ['6D8195','8699AE','9CB0BF','B6C7D1','C3D3DC','E5EDF1','FFFFFF'],
    ['FFFFFF','528BAB'],noonSun);
    
    dusk = new Palette('dusk',['34718E','3E81A1','5694B3','679EBF','75A3BE','83ACC5','8AADC4'],
    ['549DBE', '67A9C9','71B0CE','93BDD7','A2C0D2','B3CCDB','B2CADA'],
    ['FFFFFF','3D7594'],null);
    
    moonrise = new Palette('moonrise',['042635','183747','2A4959','3D5B6C','506E80','648294','7896A8'],
          ['375562','3C5F71','4F6D7D','667A86','6E8C9E','9CAAB2','B4C2CB'],
          ['98AEBB','162A35'],null);
    
    dawn = new Palette('dawn',['042635','183747','2A4959','3D5B6C','506E80','648294','7896A8'],
    ['375562','3C5F71','4F6D7D','667A86','6E8C9E','9CAAB2','C0D8E7'],
    ['B7C2C8','164460'],null);
    
    midnight = new Palette('midnight',['111B21','212C32','323D43','444F55','525E65','5D686E','61666A'],
    ['44525B','555F64','676767','738086','78868D','96ADA7','6F6F6F'],
    ['24292C','778B98'],null);

    sequence = [sunrise,noon,dusk,moonrise,midnight,dawn];
}
