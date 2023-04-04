// import { Background, GlowCircle } from "./glowing_circles.js";

import { Background } from "./glowing_circles.js";

const fr = 30;

const bg = new Background();

function setup() {
  // Create the canvas fullscreen size
  createCanvas(window.innerWidth, window.innerHeight);

  frameRate(fr);

  bg.drawBackground();

  bg.createCircles();
  
}

function draw() {

  background(210);

  ellipse(200, 200, 200, 200);

  bg.drawBackground();
  bg.drawCircles();

}

// For some reason I had to add this to make it work
// see: https://forum.processing.org/two/discussion/24662/script-type-module-draw-and-setup-not-working.html
window.setup = setup;
window.draw = draw;