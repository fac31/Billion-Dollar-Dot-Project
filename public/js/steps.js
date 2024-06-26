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

export function enterStepZero() {
  console.log("enterStepZero");
  fadeOutSVG(dataViz1.firstChild, 1, 1);
}

export function exitStepZeroDown() {
  console.log("exitStepZeroDown");
  introCircles.style.opacity = 0;
  fadeInSVG(dataViz1.firstChild, 1, 1);
}

export function enterStepOne() {
  console.log("enterStepOne");
  hideLinesAndText();
  startDataViz1();
}

export function revertToStepOne() {
  console.log("revertToStepOne");
  hideLinesAndText();
  revertChangeSize();
  restartDataViz1();
}

export function exitStepOneDown() {
  // placeholder
}

export function enterStepTwo() {
  console.log("enterStepTwo");
  changeSize();
}

export function revertToStepTwo() {
  console.log("revertToStepTwo");
  fadeInSVG(dataViz1.firstChild, 1, 1);
  hideLinesAndText();
  revertChangeSize();
  showLinesAndText();
}

export function enterStepThree() {
  console.log("enterStepThree");
  hideDataPoints();
  moveBlueCircle();
}

export function revertToStepThree() {
  console.log("revertToStepThree");
  fadeInSVG(dataViz1.firstChild, 1, 1);
  hideDataPoints();
  moveBlueCircle();
}

export function exitStepThreeDown() {
  console.log("exitStepThreeDown");
  fadeOutSVG(dataViz1.firstChild, 0, 1);
}
