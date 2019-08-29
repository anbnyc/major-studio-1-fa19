/*
  Exercise 5
  Analyzing a dataset
*/

const fs = require("fs");

// Task
// Copy in the function from Exercise 4
function getIrisData() {
  fs.readFile("./iris_json.json", "utf8", (err, data) => {
    if (err) console.log(err);

    let results = {};
    JSON.parse(data).forEach(e => {
      if (!results[e.class]) {
        results[e.class] = 0;
      }
      results[e.class] += e.petallength;
    });

    console.log(results);

    let longestClass = "";
    let longestLength = 0;
    for (var k in results) {
      if (results[k] > longestLength) {
        longestLength = results[k];
        longestClass = k;
      }
    }

    console.log(longestClass, longestLength);
  });
}

getIrisData();

// Task
// Replace the console.log statement with new code to determine which class of Iris (a variable in the data) has the longest average petal length
// HINT: Break down the problem into steps
// Don't forget to execute your function
