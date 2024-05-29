/* eslint-disable no-undef */
// We are importing scrollama through a cdn in index.html
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { intro } from "../js/intro.js";
import { enterStepOne, exitStepOne } from "./stepOne.js";

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
      step: "#scrolly-one .step", // required
      offset: 0.5, // optional, default = 0.5
      debug: false, // optional, default = false
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

  window.addEventListener("resize", scroller.resize);
}

function handleStepEnter(res) {
  switch (res.index) {
    case 0:
      enterStepOne();
      break;
  }
}
function handleStepExit(res) {
  switch (res.index) {
    case 0:
      exitStepOne();
      break;
  }
}
test();

function main() {
  intro();
}
main();
