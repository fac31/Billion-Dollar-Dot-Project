/* eslint-disable no-undef */
// We are importing scrollama through a cdn in index.html
import { runIntroAnimation } from "../js/intro.js";
import { startIntersectionObserver } from "./observer.js";

function main() {
  console.log("main");
  const dataviz_one = document.getElementById("dataviz_one");
  dataviz_one.firstChild.setAttribute("height", "300px");

  startIntersectionObserver();

  runIntroAnimation();

  window.addEventListener("resize", () => {
    document.getElementById("hero-text").style.transform =
      `scale(${math.max(1, window.innerWidth * 0.001)})`;
  });
}

main();
