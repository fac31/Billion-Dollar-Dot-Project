/* eslint-disable no-undef */
// We are importing scrollama through a cdn in index.html
import { runIntroAnimation } from "../js/intro.js";
import { handleStepProgress, handleStepExit } from "./stepHandler.js";

import { startDataViz2 } from "./dataViz2.js";

import { startDataViz3 } from "./dataViz3.js";

function main() {
  const dataviz_one = document.getElementById("dataviz_one");
  dataviz_one.firstChild.setAttribute("height", "300px");

  /* UNCOMMENT OUT FOR JS ANIMATION */
  // runIntroAnimation();


  const scroller = scrollama();

  // setup the instance, pass callback functions
  scroller
    .setup({
      step: ".step", // required
      offset: 0.5, // optional, default = 0.5
      debug: false, // optional, default = false
      progress: true,
    })
    .onStepProgress(handleStepProgress)
    .onStepExit(handleStepExit);

  startDataViz2();
  startDataViz3();
  window.addEventListener("resize", () => {
    scroller.resize();

    document.getElementById("hero-text").style.transform =
      `scale(${math.max(1, window.innerWidth * 0.001)})`;
  });
}

main();
