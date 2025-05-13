let carImage;
let roadY;
let totalMinutes = 60;

let minutePosition, carX, displayHour, ampm;

function preload() {
  carImage = loadImage("car.png"); // Ensure car.png is in your project folder
}

function setup() {
  createCanvas(windowWidth, 200);
  roadY = height / 2 + 40;
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(14);
  frameRate(30);
}

function draw() {
  background('#e6f7ff');

  // Title with a hint of humor
  fill(0);
  textSize(24);
  text("Time’s Driving in Reverse (EST)", width / 2, 30);

  drawRoad();
  drawReversedMinuteMarkers();

  // Time calculation for Eastern Standard Time
  let now = new Date();
  let utc = now.getTime() + now.getTimezoneOffset() * 60000;
  let estOffset = -4; // EDT = UTC-4
  let est = new Date(utc + 3600000 * estOffset);

  trackMinutes(est);
  trackSeconds(est);
  trackHours(est);

  // Car position from right (0 min) to left (60 min)
  carX = map(minutePosition, 0, totalMinutes, width, 0);
  image(carImage, carX, roadY - 45, 100, 60);

  // Time label above car
  fill(0);
  textSize(18);
  textAlign(CENTER, BOTTOM);
  text(`${displayHour} ${ampm}`, carX, roadY - 60);
}

function drawRoad() {
  fill(30);
  noStroke();
  rect(0, roadY - 25, width, 50);
}

function drawReversedMinuteMarkers() {
  fill(255);
  noStroke();

  for (let i = 0; i <= totalMinutes; i += 5) {
    let x = map(i, 0, totalMinutes, width, 0);
    ellipse(x, roadY, 32, 32);
    fill(0);
    textAlign(CENTER, CENTER);
    text(i, x, roadY);
    fill(255);
  }
}

// Minute progression
function trackMinutes(est) {
  let min = est.getMinutes();
  minutePosition = min;
}

// Smooth seconds interpolation
function trackSeconds(est) {
  let sec = est.getSeconds();
  let ms = est.getMilliseconds();
  let fractionalSecond = (sec + ms / 1000) / 60;
  minutePosition += fractionalSecond;
}

// Format hour + AM/PM
function trackHours(est) {
  let hour = est.getHours(); // 0–23
  displayHour = hour % 12 || 12;
  ampm = hour >= 12 ? "PM" : "AM";
}

// Responsive canvas
function windowResized() {
  resizeCanvas(windowWidth, 200);
  roadY = height / 2 + 40;
}
