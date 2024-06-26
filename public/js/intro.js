import { fadeIn, fadeOut } from "./fade.js";
const circles = document.getElementById("circles-intro");
let circleMargin = -85;

export function runIntroAnimation() {
  const arrowElement = document.getElementById("fade-elements");

  setTimeout(() => fadeIn(arrowElement, 10, 1), 2000);
  let maxMargin = -85;
  for (const circle of circles.children) {
    setTimeout(() => fadeIn(circle, 20, 0.5), 1000);
    circle.maxM = maxMargin += 100;
    setTimeout(() => {
      let timer = setInterval(function () {
        if (circleMargin < circle.maxM) {
          circleMargin = circleMargin + 1;
          circle.style.marginTop = circleMargin + "px";
        } else {
          clearInterval(timer);
          setTimeout(() => fadeOut(circle, 20, 0.5), 1000);
        }
      }, 10);
    }, 1000);
  }
}
