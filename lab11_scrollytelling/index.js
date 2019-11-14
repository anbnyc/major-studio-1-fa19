const margin = 20;

d3.json("./jabberwocky.json").then(data => {
  const section = d3
    .select(".sections")
    .selectAll(".section")
    .data(data)
    .join("div")
    .attr("class", (d, i) => "section section-" + i)
    .html(d => d.join("<br>"));

  let sectionPositions = [];
  section.each(function() {
    const { top } = this.getBoundingClientRect();
    sectionPositions.push(top);
  });

  // https://vallandingham.me/scroll_talk/
  function position() {
    var pos = window.pageYOffset - 10;
    var sectionIndex = d3.bisect(sectionPositions, pos);
    sectionIndex = Math.min(section.size() - 1, sectionIndex);

    if (state.currentIndex !== sectionIndex) {
      setState({
        currentIndex: sectionIndex,
      });
    }
  }

  window.addEventListener("scroll", position);

  draw();
});

function setup() {
  const viz = d3.select(".viz");
  const svg = viz
    .append("svg")
    .attr("height", 500)
    .attr("width", 500);

  svg.append("g").attr("class", "bars");

  const xAxis = svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${margin})`);
  const yAxis = svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin}, 0)`);
}

let state = {
  currentIndex: 0,
};

function setState(nextState) {
  console.log(nextState);
  state = { ...state, ...nextState };
  draw();
}

function draw() {
  const { currentIndex } = state;
  const section = d3
    .selectAll(".section")
    .classed("current", (d, i) => i === currentIndex);

  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const sectionText = section
    .filter((_, i) => i === currentIndex)
    .text()
    .toUpperCase();
  const data = alpha.map(letter => ({
    letter,
    value: [...sectionText.matchAll(letter)].length,
  }));
  console.log(data);

  const svg = d3.select("svg");

  const xScale = d3
    .scaleLinear()
    .domain([0, 15])
    .range([margin, 500 - margin]);

  const yScale = d3
    .scaleBand()
    .paddingInner(0.1)
    .domain(alpha)
    .range([margin, 500 - margin]);

  svg
    .select(".bars")
    .selectAll("rect.bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", xScale(0))
    .attr("y", d => yScale(d.letter))
    .attr("height", yScale.bandwidth())
    .transition()
    .attr("width", d => xScale(d.value) - margin);

  svg
    .select(".bars")
    .selectAll("text.bar")
    .data(data)
    .join("text")
    .attr("class", "bar")
    .attr("y", d => yScale(d.letter) + 12)
    .text(d => d.value || "")
    .transition()
    .attr("x", d => xScale(d.value) - 5);

  svg.select(".x-axis").call(d3.axisTop(xScale));
  svg.select(".y-axis").call(d3.axisLeft(yScale));
}

setup();
