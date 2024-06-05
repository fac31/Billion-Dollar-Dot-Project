import { fadeOut, fadeInSVG } from "./fade.js";
import {
  changeSize,
  hideDataPoints,
  moveBlueCircle,
  restartDataViz,
  revertChangeSize,
  startDataViz,
} from "./dataViz.js";
const introCircles = document.getElementById("circles-intro");
const dataViz1 = document.getElementById("dataviz_one");
const step1Viz = document.getElementById("step1Viz");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");

export function enterStepOne() {
  for (const circle of introCircles.children) {
    fadeOut(circle, 20);
  }
  transitionToStep(step1Viz);
  dataViz1.firstChild.setAttribute("height", "300px");
  startDataViz();
}
export function revertToStepOne() {
  transitionToStep(step1Viz);
  restartDataViz();
}

export function enterStepTwo() {
  dataViz1.setAttribute("height", "600px");
  transitionToStep(step2);
  changeSize();
}
export function revertToStepTwo() {
  transitionToStep(step2);
  revertChangeSize();
}

export function enterStepThree() {
  transitionToStep(step3);
  hideDataPoints();
  moveBlueCircle();
}
export function enterStepFour() {
  transitionToStep(step4);
}

function transitionToStep(step) {
  dataViz1.firstChild.setAttribute("opacity", "0");
  step.append(dataViz1);

  fadeInSVG(dataViz1.firstChild, 10, 1);
}
