/* eslint-disable no-undef */
// We are importing scrollama through a cdn in index.html

import { intro } from "../js/intro.js";
import {
  enterStepOne,
  enterStepThree,
  enterStepTwo,
  exitStepOne,
  exitStepTwo,
} from "./stepOne.js";

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
      enterStepOne();
      break;
    case 1:
      enterStepTwo();
      break;
    case 2:
      enterStepThree();
      break;
  }
}
function handleStepExit(res) {
  switch (res.index) {
    case 0:
      exitStepOne();
      break;
    case 1:
      exitStepTwo();
      break;
  }
}

main();
