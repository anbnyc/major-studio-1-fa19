let table;

let allYears = [];

let minObjects, maxObjects, minYear, maxYear;
let margin = 150;

function preload() {
  // load the data
  //table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable('data/MetObjects-sorted-1970-2017.csv', 'csv', 'header');
}

function setup() {
  // width and height of the browser window
  createCanvas(windowWidth, windowHeight);
  console.log("hello world");
  analyzeData();
  displayData();
  drawLabels();
}

function analyzeData(){
  // Let's get the number of objects within each year
  for(var i=1970; i<2018; i++){
    let yearNow = {};
    yearNow.year = i;
    yearNow.count = table.findRows(String(i),3).length;
    append(allYears, yearNow);
  }

  // Let's find out which year has the most items and which one has the least
  minObjects = 100000;
  maxObjects = 0;
  minYear = null;
  maxYear = null;

  for(var i =0; i< allYears.length; i++){
    if(allYears[i].count > maxObjects){
      maxObjects = allYears[i].count;
      maxYear = i;
    }
    if(allYears[i].count < minObjects){
      minObjects = allYears[i].count;
      minYear = i;
    }
  }
  console.log("The Year " + allYears[maxYear].year + " has the most objects with " + allYears[maxYear].count + " items.");
  console.log("The Year " + allYears[minYear].year + " has the least objects with " + allYears[minYear].count + " items.");
}


function displayData(){
  noStroke();
  fill(255,0,0);
  for(var i=0; i<allYears.length; i++){
    let x = map(i,0,allYears.length, margin, width-margin);
    let h = map(allYears[i].count,0,maxObjects,0, height-(margin*2));
    rect(x,height-margin-h,20, h);
  }
}

function drawLabels(){
    // 1. Let's draw the x axis
  stroke(0);
  // just the line
  line(margin,height-margin,width-margin,height-margin);
  noStroke();
  textAlign(CENTER);

  // draw the sections and add text for each section

  for(var i=0; i<allYears.length; i+=5){
    let y = height-margin+30;
    x = map(i,0, allYears.length,margin, width-margin);
    noStroke();
    fill(0);
    text(allYears[i].year, x, y);
    stroke(0);
    line(x,y-12,x, y-30);
  }

  // label the whole axis
  textAlign(RIGHT);
  noStroke();
  textStyle(BOLD);
  text("Year", width-margin,height-margin+70);

  // 2. Let's draw the y Axis
  stroke(0);
  line(margin,height-margin ,margin,margin);
  noStroke();
  textAlign(RIGHT);
  textStyle(NORMAL);

  for(var i=0; i<maxObjects; i+=1000){
    let x = margin-20;
    y = map(i,0, maxObjects,height-margin, margin);
    noStroke();
    fill(0);
    text(i, x, y+5);
    stroke(0);
    line(x+5,y,x+20,y);
  }
  textStyle(BOLD);
  noStroke();
  text("Objects", margin-60,margin);

  // 3. Let's add the overall title
  textStyle(BOLD);
  noStroke();
  textAlign(LEFT);
  textSize(20);
  text("Number of items in the Met data set", margin,margin-30);
  textSize(10);
  textStyle(NORMAL);
  text("1970 - 2017", margin,margin-15);
}
