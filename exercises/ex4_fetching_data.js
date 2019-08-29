/*
  Exercise 4
  Retrieving a dataset from the web
*/

// Task
// Explore the dataset that is console logged:
// How many entries are in the dataset? What data structure is returned? What properties are available? What data types do you see?
function getIrisData() {
  fetch(
    "https://pkgstore.datahub.io/machine-learning/iris/iris_json/data/23a7b3de91da915b506f7ca23f6d1141/iris_json.json"
  )
    .then(data => data.json())
    .then(data => {
      console.log(data);
      console.table(data);
    });
}
