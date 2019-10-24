// using constants makes it easy to update when values change
// many editors also autocomplete variable names
// by convention, constants in JS have UPPERCASE names
const CONSTANTS = {
  CLASS: "class",
  PETAL_LENGTH: "petallength",
  PETAL_WIDTH: "petalwidth",
  SEPAL_LENGTH: "sepallength",
  SEPAL_WIDTH: "sepalwidth",
  TOOLTIP_WIDTH: 100,
  TOOLTIP_HEIGHT: 20,
};

const {
  CLASS,
  PETAL_LENGTH,
  PETAL_WIDTH,
  SEPAL_LENGTH,
  SEPAL_WIDTH,
  TOOLTIP_HEIGHT,
  TOOLTIP_WIDTH,
} = CONSTANTS;

// we can set up our state schema before we have any data
let state = {
  data: [],
  filters: {
    menu: [],
    checked: [],
  },
  sizeBy: {
    menu: [PETAL_LENGTH, PETAL_WIDTH, SEPAL_LENGTH, SEPAL_WIDTH],
    selected: PETAL_LENGTH,
  },
  tooltip: {
    value: "",
    visible: false,
    coordinates: [0, 0],
  },
  dimensions: [window.innerWidth, window.innerHeight],
};

// initializing these globally will be useful later
let xScale, yScale, colorScale;

async function dataLoad() {
  // this function contains anything that does not depend on the data
  initializeLayout();
  const data = await d3.json("./iris_json.json");

  // once data is on state, we can access it from any other function
  // because state is a global variable
  const checkboxValues = Array.from(new Set(data.map(d => d[CLASS])));
  setState({
    data: data.map((d, i) => ({
      ...d,
      id: d[CLASS] + "_" + i, // each object should have a unique ID
    })),
    filters: {
      menu: checkboxValues,
      checked: checkboxValues,
    },
  });
}

function setState(nextState) {
  console.log("state updated");
  state = Object.assign({}, state, nextState);
  draw();
}

function onCheckboxChange(d) {
  const index = state.filters.checked.indexOf(d);
  const isBoxChecked = index > -1;
  let nextCheckedValues;
  // if box is checked, uncheck it
  if (isBoxChecked) {
    nextCheckedValues = [
      ...state.filters.checked.slice(0, index),
      ...state.filters.checked.slice(index + 1),
    ];
  } else {
    nextCheckedValues = [...state.filters.checked, d];
  }
  setState({
    filters: {
      ...state.filters,
      checked: nextCheckedValues,
    },
  });
}

function onRadioChange() {
  const nextSelected = d3.event.target.value;
  setState({
    sizeBy: {
      ...state.sizeBy,
      selected: nextSelected,
    },
  });
}

function onMouseEvent(d) {
  if (d3.event.type === "mouseenter") {
    setState({
      tooltip: {
        value: d.id,
        visible: true,
        coordinates: [
          +d3.select(d3.event.target).attr("width") + TOOLTIP_WIDTH / 2 + 10,
          +d3.select(d3.event.target).attr("y") - TOOLTIP_HEIGHT / 2,
        ],
      },
    });
  } else if (d3.event.type === "mouseleave") {
    setState({
      tooltip: {
        ...state.tooltip,
        value: "",
        visible: false,
      },
    });
  }
}

function initializeLayout() {
  const svgWidth = 0.5 * state.dimensions[0];
  const svgHeight = state.dimensions[1];
  const margin = 50;

  const parent = d3.select(".interactive");
  const svg = parent
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // remember, we initialized these variables at the top
  xScale = d3.scaleLinear().range([margin, svgWidth - margin]);
  yScale = d3
    .scaleBand()
    .paddingInner(0.1)
    .range([margin, svgHeight - margin]);
  colorScale = d3.scaleOrdinal(d3.schemeDark2);

  // add x axis
  svg
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${svgHeight - margin})`);

  // add y axis
  svg
    .append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(${margin}, 0)`);

  svg.append("g").attr("class", "bars");

  const tooltip = svg.append("g").attr("class", "tooltip");
  tooltip
    .append("rect")
    .attr("height", TOOLTIP_HEIGHT)
    .attr("width", TOOLTIP_WIDTH)
    .attr("fill", "#888");
  tooltip
    .append("text")
    .attr("x", 5)
    .attr("y", 14)
    .attr("font-size", 12);

  // add left menu
  const leftMenu = parent.append("div").attr("class", "left-menu");

  // add right menu
  const rightMenu = parent
    .append("form")
    .attr("class", "right-menu")
    .html(
      state.sizeBy.menu
        .map(
          d =>
            `<input type="radio" name="sizeby" value="${d}" ${
              state.sizeBy.selected === d ? "checked" : ""
            }>${d}<br>`
        )
        .join("")
    )
    .on("change", onRadioChange);
}

function draw() {
  const filteredData = state.data
    .filter(d => state.filters.checked.indexOf(d[CLASS]) > -1)
    .sort((a, b) =>
      d3.descending(a[state.sizeBy.selected], b[state.sizeBy.selected])
    );
  xScale.domain([0, d3.max(filteredData, d => d[state.sizeBy.selected])]);
  yScale.domain(filteredData.map(d => d.id));
  colorScale.domain(state.filters.menu);
  const barHeight = yScale.bandwidth();

  d3.select(".x-axis").call(d3.axisBottom(xScale));
  d3.select(".y-axis").call(d3.axisLeft(yScale).tickValues([]));
  const checkRow = d3
    .select(".left-menu")
    .selectAll(".check-row")
    .data(state.filters.menu)
    .join("div")
    .attr("class", "check-row")
    .html(
      d => `
      <input name="${d}" type="checkbox" ${
        state.filters.checked.indexOf(d) > -1 ? "checked" : ""
      }></input>
      <label for="${d}">${d}</label>
    `
    );
  checkRow.select("input").on("change", onCheckboxChange);

  d3.select(".bars")
    .selectAll("rect")
    .data(filteredData)
    .join("rect")
    .attr("x", xScale.range()[0])
    .attr("width", d => xScale(d[state.sizeBy.selected]))
    .attr("height", barHeight)
    .attr("y", d => yScale(d.id))
    .attr("fill", (d, i) => colorScale(d[CLASS]))
    .on("mouseenter", onMouseEvent)
    .on("mouseleave", onMouseEvent);

  const tooltip = d3.select(".tooltip");
  tooltip
    .attr(
      "transform",
      `translate(${state.tooltip.coordinates[0]}, ${
        state.tooltip.coordinates[1]
      })`
    )
    .classed("visible", state.tooltip.visible);
  tooltip.select("text").text(state.tooltip.value);
}

// this function is only called once
dataLoad();
