let met_data;
let fishies = []; // Global array to hold all fish objects
let colors = {"American Decorative Arts": "#e6194b", "Ancient Near Eastern Art": "#3cb44b", "Arms and Armor": "#ffe119", "Arts of Africa, Oceania, and the Americas": "#4363d8", "Asian Art": "#f58231", "Drawings and Prints": "#f032e6", "Egyptian Art": "#bcf60c", "European Paintings": "#fabebe", "European Sculpture and Decorative Arts": "#008080", "Greek and Roman Art": "#e6beff", "Islamic Art": "#9a6324", "Medieval Art": "#aaffc3", "Modern Art": "#000075", "Musical Instruments": "#808000",
"Photographs": "#ffd8b1", "The Cloisters": "#911eb4", "The Costume Institute": "#46f0f0","Costume Institute": "#46f0f0", "The Libraries": "#800000", "Robert Lehman Collection": "#fffac8",
"The Libraries": "#263238","Medieval Art": "#ffe0b2", "Modern Art":"#c5e1a5", "Modern and Contemporary Art":"#c5e1a5", "The American Wing":"#ff1744"};
const base_url = 'https://www.metmuseum.org/art/collection/search/';

function preload() {
  met_data = loadJSON("data/data.json");
}
function setup() {
 	createCanvas(windowWidth,windowHeight);
  createFish();
}



function createFish(){
  met_data.forEach(e => {
    if(e.isPublicDomain==true){
    let x = random(20, width-20);
    let y = random(20, height-20);
    let color = colors[e.department];
    // let opacity =  random(0,255);
    let opacity = map(e.objectBeginDate,-3000,2019, 0,100);
    let diameter = map(e.objectBeginDate,-3000,2019, 2,16);
    let speed = map(e.objectBeginDate,-3000,2019, 0.01,0.6);
    let label = e.title;
    let objectID = e.objectID;
    let isHighlight = e.isHighlight;

    fishies.push(new Fish(x, y, diameter, speed, color,opacity, label, objectID, isHighlight));
    }
  });
}
function draw() {
  background("#01132c");

  // Display all circles
  for (let i = 0; i < fishies.length; i++) {
    // for (let i = 0; i < 10; i++) {
    fishies[i].update();
    fishies[i].display();
    fishies[i].rollover(mouseX, mouseY);
  }

  // Label directions at bottom
  textAlign(LEFT);
  fill(0);
  text('Click to add bubbles.', 10, height - 10);
}

function mouseReleased() {
  console.log("released")
  for(let i=0 ; i<fishies.length; i++){
    fishies[i].openLink();
  }
}


// Bubble class
class Fish {
  constructor(x, y, diameter,speed, col, opacity, name, objectID, isHighlight) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.radius = diameter / 2;
    this.name = name;
    this.color = color(convertHex(col, opacity));
    this.opacity = opacity;
    this.objectID = objectID;
    this.isHighlight = isHighlight;
    this.speedX = random(-1,1) *speed;
    this.speedY = random(-1,1) *speed;
    this.over = false;

  }

  // Check if mouse is over the circle
  rollover(px, py) {
    let d = dist(px, py, this.x, this.y);
    this.over = d < this.radius;
  }
  openLink(){
    // console.log(this.name);
    if(this.over){
      window.open(base_url + this.objectID, "_blank");
      // console.log(this.name);
    }

  }
  update(){
    this.x +=this.speedX;
    this.y +=this.speedY;

    // left and right boundary
    if (this.x <= this.diameter/2 || this.x >= width - this.diameter/2) {
      this.speedX *= -1;
    }
    // top boundary
    if (this.y <= this.diameter/2  || this.y >= height - this.diameter/2) {
      this.speedY *= -1;
    }

  }
  // Display the Circle
  display() {
    noStroke(0);
    // strokeWeight(0.8);
    // noFill();
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    if (this.over) {
      fill(255);
      textAlign(CENTER);
      text(this.name, this.x, this.y + this.radius + 20);
    }
    if (this.isHighlight) {
      stroke(255);
      strokeWeight(0.8);
      noFill();
      ellipse(this.x, this.y, this.diameter*3, this.diameter*3);

    }
  }
}

function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}
