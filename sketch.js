const fr = 30;

let brightness;
let newBrightness;
let p = 0;


let x = 0;

let hue = 0;



function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    frameRate(fr);
    
    ellipseMode(CORNER);

    brightness = 0;
    newBrightness = 1;

}

const createCircles = () => {

  ellipseMode(CORNER);
  colorMode(HSL);
  noStroke();

  // Brightness transition logic
  if (p <=1 ) {
    p += 0.02;
  } else {
    brightness = newBrightness
    newBrightness = Math.random();
    p = 0;
  }

  inter = lerp(brightness, newBrightness, p);

  for (let i = 0; i < window.innerHeight; i+=50) {
    for(let j = 0; j < window.innerWidth; j+=50) {
      fill(360, 0, 100, inter);
      ellipse(j, i, 50, 50); 
    } 
  }
}


class glowCircle {
  constructor(x, y, size) {
    this._x = x;
    this._y = y;
    this._size = size;
    //this._color = color;
  }

  set x (x) {
    this._x = x;
  }

  set y (y) {
    this._y = y;
  }

  changeColor() {
    this._hue = Math.random() * 360;
  }

  drawCircle() {
    ellipse(this._x, this._y, this._size, this._size);
  }

};

  
function draw() {
 
  colorMode(HSL);
  background(color(223, 100, 72, 1));

  /*
  let circleA = new glowCircle(x, 200, 200);
  circleA.drawCircle();

  x += 1;
  //createCircles();

  */

  createCircles();
  
  
}
  