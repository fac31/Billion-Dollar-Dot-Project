import { fadeInSVG, fadeOutSVG } from "./fade.js";
import {
  changeSize,
  hideDataPoints,
  hideLinesAndText,
  moveBlueCircle,
  restartDataViz1,
  revertChangeSize,
  showLinesAndText,
  startDataViz1,
} from "./dataViz.js";
const introCircles = document.getElementById("circles-intro");
const dataViz1 = document.getElementById("dataviz_one");

export function exitStepZeroDown() {
  console.log("exitStepZeroUp");
  introCircles.style.opacity = 0;
  fadeInSVG(dataViz1.firstChild, 10, 1);
}

export function enterStepOne() {
  hideLinesAndText();
  startDataViz1();
}

export function revertToStepOne() {
  hideLinesAndText();
  revertChangeSize();
  restartDataViz1();
}

export function exitStepOneDown() {
  // placeholder
}

export function enterStepTwo() {
  changeSize();
}

export function revertToStepTwo() {
  fadeInSVG(dataViz1.firstChild, 10, 1);
  hideLinesAndText();
  revertChangeSize();
  showLinesAndText();
}

export function enterStepThree() {
  hideDataPoints();
  moveBlueCircle();
}

export function revertToStepThree() {
  fadeInSVG(dataViz1.firstChild, 10, 1);
  hideDataPoints();
  moveBlueCircle();
}

export function exitStepThreeDown() {
  fadeOutSVG(dataViz1.firstChild, 10, 1);
}
