const objectEndpoint =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

let objects;

function setup() {
  d3.selectAll(".ex")
    .select("button")
    .attr("disabled", true)
    // we can set event handlers on D3 selections with `.on`
    .on("click", (_, i) => {
      runExercise(i + 1);
    });

  // D3 has some convenience methods for making API calls (from d3-fetch)
  d3.json(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?q=mountain&isHighlight=true"
  ).then(data => {
    console.log(data.objectIDs.length);
    // Promises are a feature of asynchronous JavaScript
    // Promise.all() starts multiple asynchronous functions
    // and waits for them all to finish before going on to the `.then`
    Promise.all(
      data.objectIDs.map(objectId => d3.json(objectEndpoint + objectId))
    ).then(data => {
      console.log(data);
      objects = data;
      d3.selectAll(".ex")
        .select("button")
        .attr("disabled", null);
    });
  });
}

function runExercise(number) {
  if (number === 1) {
    draw1(objects);
  } else if (number === 2) {
    draw2(objects);
    let lens = [6, 5, 4, 5, 6, 7];
    let i = 0;
    d3.interval(() => {
      draw2(objects.slice(0, lens[i]));
      i = (i + 1) % lens.length;
    }, 2000);
  } else if (number === 3) {
    draw3(objects);
  } else {
    return;
  }
}

function draw1(objects) {
  const svg = d3.select(".ex-1 svg"); // this is a D3 selection
  const rect = svg
    .selectAll("rect") // this creates an empty selection of all the `rect` elements in svg -- but there aren't any yet!
    .data(objects) // bind data to `rect` elements
    .join("rect") // this enters and exits `rect` DOM elements to align with `objects`
    .attr("width", 30) // set some SVG attributes on `rect`
    .attr("height", (d, i) => (2019 - d.objectBeginDate) / 20)
    .attr("x", (d, i) => i * 40)
    .attr("y", 0);
}

function draw2(objects) {
  const svg = d3.select(".ex-2 svg");
  const rect = svg
    .selectAll("rect")
    .data(objects, d => d.objectID) // the second argument is the key
    .join(
      // if we want different behavior for entering rects, we can set it here
      enter =>
        enter
          .append("rect")
          .attr("fill", "green")
          .attr("width", 30)
          .attr("height", (d, i) => (2019 - d.objectBeginDate) / 20)
          .attr("x", (d, i) => i * 40)
          .attr("y", 0),
      // update selection contains DOM elements that are still in the data
      update => update.attr("fill", "black")
    );
}

function draw3(objects) {
  const svg = d3.select(".ex-3 svg");
  const years = d3.extent(objects, d => d.objectBeginDate); // what does `d3.extent` do? (from d3-array)
  console.log("years", years);
  const yScale = d3
    .scaleLinear() // d3-scale has a variety of different types of scales
    .domain(years)
    .range([130, 10]); // we assign bigger then smaller because 0 is at the top in SVG

  const g = svg
    .selectAll("g")
    .data(objects)
    .join("g")
    // when we are grouping elements together, it makes more sense to translate them as a group
    // rather than assigning the same `x` and `y` to both rect and text below
    .attr(
      "transform",
      (d, i) => `translate(${i * 40}, ${150 - yScale(d.objectBeginDate)})`
    ); // why do we subtract here?
  g.selectAll("rect")
    .data(d => [d]) // .data expects an Array, so even if we are just passing down the same object, put it in brackets
    .join("rect")
    .attr("width", 30)
    .attr("height", d => yScale(d.objectBeginDate));
  g.selectAll("text")
    .data(d => [d])
    .join("text")
    .attr("y", -5)
    .text(d => d.objectBeginDate);
}

setup();
