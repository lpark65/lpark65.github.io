let drops = [];
let dropCount = 300;
let baseR, baseG, baseB;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');

  baseR = random(0, 100);
  baseG = random(0, 100);
  baseB = random(100, 255);

  for (let i = 0; i < dropCount; i++) {
    drops[i] = new Drop();
  }
}

function draw() {
  let brightnessOffset = map(mouseY, 0, height, -30, 30);
  background(baseR + brightnessOffset, baseG + brightnessOffset, baseB + brightnessOffset);

  for (let drop of drops) {
    drop.fall();
    drop.show();
  }
}

class Drop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(-500, -50);
    this.z = random(0, 20);
    this.len = map(this.z, 0, 20, 10, 20);
    this.yspeed = map(this.z, 0, 20, 4, 10);
  }

  fall() {
    this.y += this.yspeed * map(mouseY, 0, height, 0.5, 2);
    if (this.y > height) {
      this.reset();
    }
  }

  show() {
    let thick = map(this.z, 0, 20, 1, 3);
    strokeWeight(thick);
    stroke(138, 43, 226, 200); 
    line(this.x, this.y, this.x, this.y + this.len);
  }
}
