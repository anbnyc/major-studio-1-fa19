// this variable will contain the csv table
let table;

// this array will be our working array  containing every year and count
let allYears = [];

// variables for the min and max values of this data set
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
  // displayData();
}

function analyzeData(){
  // Let's get the number of objects within the years from 1970 - 2017
  for(var i=1970; i< /* COMPLETE ME */; i++){
    // creating a new object for each year that contains year and count
    let yearNow = {};
    yearNow.year = i;
    yearNow.count = table.findRows(String(i),3).length;
    append(allYears, /* COMPLETE ME */);
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
      minObjects = /* COMPLETE ME */;
      minYear = /* COMPLETE ME */;
    }
  }
  console.log("The Year " + allYears[maxYear].year + " has the most objects with " + allYears[maxYear].count + " items.");
  console.log("The Year " + /* COMPLETE ME */ + " has the least objects with " + /* COMPLETE ME */ + " items.");
  console.log(allYears);
}


function displayData(){
  noStroke();
  fill(255,0,0);
  for(var i=0; i<allYears.length; i++){
    let h = map(allYears[i].count,0,maxObjects,0, height);
    let x = map(/* COMPLETE ME */);
    rect(x,height-h,20, /* COMPLETE ME */);
  }
}
