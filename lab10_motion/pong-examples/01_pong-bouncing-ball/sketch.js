var x = 0;
var y = 0;
var xSpeed = 0;
var ySpeed = 0;
var backgroundColor;

  // var inside = color(204, 102, 0);

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  textAlign(CENTER);
  
    x = random(10, width-10);
    y = random(10, height-80);
    xSpeed = random(5, 5);
    ySpeed = random(5, 5);
    changeColor();
}

function draw() {
  // background(128, 128, 0);
  background(backgroundColor);

  x+= xSpeed;
  y+= ySpeed;
  
    // left wall
    if (x <= 10 || x >= width-10){
      xSpeed *= -1;      
      changeColor();
    }


    // top wall 
    if (y <= 10 || y >= height-10){
      ySpeed *= -1;
      changeColor();
    }

    // ball
    ellipse(x, y, 20, 20);
 
}
function changeColor(){
  backgroundColor = color(random(255), random(255), 150);
}
