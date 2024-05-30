import { fadeIn, fadeOut, fadeOutSVG, fadeInSVG } from "./fade.js";
import { changeSize, hideDataPoints, startDataViz } from "./dataViz.js";
const introCircles = document.getElementById("circles-intro");
const dataViz1 = document.getElementById("dataviz_one").firstChild;
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
// const stepOneCircles = document.getElementById("circles-1");
export function enterStepOne() {
  for (const circle of introCircles.children) {
    fadeOut(circle, 20);
  }
  dataViz1.setAttribute("opacity", "1");
  startDataViz();
}

export function exitStepOne() {
  for (const circle of introCircles.children) {
    fadeIn(circle, 20, 0.5);
  }
}

export function enterStepTwo() {
  dataViz1.setAttribute("opacity", "0");
  dataViz1.setAttribute("height", "600px");
  step2.append(dataViz1);
  fadeInSVG(dataViz1, 10, 1);
  changeSize();
}
export function exitStepTwo() {}

export function enterStepThree() {
  dataViz1.setAttribute("opacity", "0");
  step3.append(dataViz1);
  fadeInSVG(dataViz1, 10, 1);
  hideDataPoints();
}
