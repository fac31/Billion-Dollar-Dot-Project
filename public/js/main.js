/* eslint-disable no-undef */
// We are importing scrollama through a cdn in index.html
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

function test() {
  // Check d3 is working
  const adder = new d3.Adder();
  adder.add(4);
  console.log(adder.valueOf());

  // Check scrollama is working
  const scroller = scrollama();

  // setup the instance, pass callback functions
  scroller
    .setup({
      step: "#scrolly .step", // required
      //container: ".scroll", // required (for sticky)
      //graphic: ".scroll__graphic", // required (for sticky)
      offset: 0.5, // optional, default = 0.5
      debug: false, // optional, default = false
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

  window.addEventListener("resize", scroller.resize);
}

function handleStepEnter(res) {
  res.element.classList.add("is-active");
}
function handleStepExit(res) {
  res.element.classList.remove("is-active");
}
test();
