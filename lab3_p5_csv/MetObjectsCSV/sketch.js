var table;

var allYears = [];

var minObjects, maxObjects, minYear, maxYear;
var margin = 150;

function preload() {
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
    // we want to create a bar chart for each year
    // for that we need to find out how many items per year there are

    var yearNow = {};
    yearNow.year = int(table.getString(0,3));
    yearNow.items = table.findRows(String(yearNow.year),3);
    append(allYears, yearNow);

    minObjects = 100000;
    maxObjects = 0;
    minYear = null;
    maxYear = null;


  for (var i=0; i<table.getRowCount(); i++) {
      var year = int(table.getString(i,3));

      if(year!=yearNow.year){
        var yearNow = {};
        yearNow.year = year;
        yearNow.items = table.findRows(String(yearNow.year),3);
        append(allYears, yearNow);

        if(yearNow.items.length>maxObjects){
          maxObjects = yearNow.items.length;
          maxYear = allYears.length-1;
        }
        if(yearNow.items.length<minObjects){
          minObjects = yearNow.items.length;
          minYear = allYears.length-1;
        }
     }
  }
  console.log("The Year " + allYears[maxYear].year + " has the most objects with " + allYears[maxYear].items.length + " items.");
  console.log("The Year " + allYears[minYear].year + " has the least objects with " + allYears[minYear].items.length + " items.");
}


function displayData(){
  noStroke();
  fill(255,0,0);
  for(var i=0; i<allYears.length; i++){
    var x = map(i,0,allYears.length, margin, width-margin);
    for(var j=0; j<allYears[i].items.length; j++){
      var y = map(j,0,maxObjects,height-margin, margin);
      rect(x,y, 1, 1);
    }
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
    var y = height-margin+30;
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
    var x = margin-20;
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
