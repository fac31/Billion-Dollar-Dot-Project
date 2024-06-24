/* eslint-disable no-undef */
// We are importing scrollama through a cdn in index.html

import { intro } from "../js/intro.js";
import {
  enterStepOne,
  enterStepThree,
  enterStepTwo,
  enterStepFour,
  revertToStepOne,
  revertToStepTwo,
} from "./steps.js";

import { startDataViz2, stopDataViz2 } from "./dataViz2.js";
import { startDataViz3 } from "./dataViz3.js";

function main() {
  intro();
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
      if (res.direction == "up") {
        revertToStepOne();
      } else {
        enterStepOne();
      }
      break;
    case 1:
      if (res.direction == "up") {
        revertToStepTwo();
      } else {
        enterStepTwo();
      }
      break;
    case 2:
      enterStepThree();
      break;
    case 3:
      enterStepFour();
      break;
    case 4:
      startDataViz2();
      break;
    case 5:
      startDataViz3();
      break;
  }
}
function handleStepExit(res) {
  switch (res.index) {
    case 4:
      stopDataViz2();
      break;
  }
}

main();
