let table;

let allYears = [];

let minObjects, maxObjects, minYear, maxYear;

function preload() {
  // load the data
  //table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable('data/MetObjects-sorted-1970-2017.csv', 'csv', 'header');
}

function setup() {
  // width and height of the browser window
  createCanvas(windowWidth, windowHeight);
  analyzeData();
  displayData();
}

function analyzeData(){
  // Let's get the number of objects within the years from 1970 - 2017
  for(var i=1970; i<2018; i++){
    let yearNow = {};
    yearNow.year = i;
    yearNow.count = table.findRows(String(i),3).length;
    append(allYears, yearNow);
  }

  // Let's find out which year has the most items and which one has the least
  // in order to do that we start with extreme values:
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
  console.log(allYears);
}


function displayData(){
  noStroke();
  fill(255,0,0);
  for(var i=0; i<allYears.length; i++){
    let h = map(allYears[i].count,0,maxObjects,0, height);
    let x = map(i,0,allYears.length, 0, width);
    rect(x,height-h,20, h);
  }
}
