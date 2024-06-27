import { fadeInSVG, fadeOutSVG } from "./fade.js";
import {
  changeSize,
  hideCircles,
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

export function enterStepZero() {
  console.log("enterStepZero");
  hideCircles();
  fadeOutSVG(dataViz1.firstChild, 10, 1);
}

export function exitStepZeroDown() {
  console.log("exitStepZeroDown");
  introCircles.style.opacity = 0;
  hideCircles();
  fadeInSVG(dataViz1.firstChild, 10, 1);
}

export function enterStepOne() {
  console.log("enterStepOne");
  fadeInSVG(dataViz1.firstChild, 10, 1);
  hideLinesAndText();
  startDataViz1();
}

export function revertToStepOne() {
  console.log("revertToStepOne");
  fadeInSVG(dataViz1.firstChild, 10, 1);
  hideLinesAndText();
  revertChangeSize();
  restartDataViz1();
}

export function exitStepOneDown() {
  // placeholder
}

export function enterStepTwo() {
  console.log("enterStepTwo");
  fadeInSVG(dataViz1.firstChild, 10, 1);
  changeSize();
}

export function revertToStepTwo() {
  console.log("revertToStepTwo");
  fadeInSVG(dataViz1.firstChild, 10, 1);
  hideLinesAndText();
  revertChangeSize();
  showLinesAndText();
}

export function enterStepThree() {
  console.log("enterStepThree");
  fadeInSVG(dataViz1.firstChild, 10, 1);
  hideDataPoints();
  moveBlueCircle();
}

export function revertToStepThree() {
  console.log("revertToStepThree");
  fadeInSVG(dataViz1.firstChild, 10, 1);
  hideDataPoints();
  moveBlueCircle();
}

export function exitStepThreeDown() {
  console.log("exitStepThreeDown");
  fadeOutSVG(dataViz1.firstChild, 0, 1);
}
