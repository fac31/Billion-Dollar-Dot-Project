import * as d3 from "d3";
import scrollama from "scrollama";

// Define data visualization functions
function dataViz1() {
  console.log("Running DataViz1");
  d3.select("#dataviz").text("Data Visualization 1");
}

function dataViz2() {
  console.log("Running DataViz2");
  d3.select("#dataviz").text("Data Visualization 2");
}

function dataViz3() {
  console.log("Running DataViz3");
  d3.select("#dataviz").text("Data Visualization 3");
}

// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight;
  figure.style("height", figureHeight + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  console.log(response);
  // response = { element, direction, index }

  // add color to current step only
  step.classed("is-active", function (d, i) {
    return i === response.index;
  });

  // Trigger data visualizations based on step index
  if (response.index === 0) {
    dataViz1();
  } else if (response.index === 1) {
    dataViz2();
  } else if (response.index === 2) {
    dataViz3();
  }
}

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.5,
      debug: false,
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();
