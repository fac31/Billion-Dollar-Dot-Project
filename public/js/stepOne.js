import { fadeIn, fadeOut } from "./fade.js";
const introCircles = document.getElementById("circles-intro");
const stepOneCircles = document.getElementById("circles-1");
export function enterStepOne() {
  for (const circle of introCircles.children) {
    fadeOut(circle, 20);
  }
  for (const circle of stepOneCircles.children) {
    fadeIn(circle, 30, 0.5);
  }
}

export function exitStepOne() {
  for (const circle of introCircles.children) {
    fadeIn(circle, 20, 0.5);
  }
  for (const circle of stepOneCircles.children) {
    fadeOut(circle, 20);
  }
}
