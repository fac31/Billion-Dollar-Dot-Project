import { handleStepEnter, handleStepExit } from "./stepHandler.js";

export function startIntersectionObserver() {
  let lastDirection;
  let direction;
  let callback = (entries) => {
    entries.forEach((entry) => {
      console.log({ id: entry.target.id });
      if (entry.boundingClientRect.top > 0) {
        lastDirection = direction;
        direction = "up";
      } else {
        lastDirection = direction;
        direction = "down";
      }

      if (entry.isIntersecting) {
        handleStepEnter({
          index: parseInt(entry.target.dataset.step),
          direction: lastDirection,
        });
        return;
      }

      if (entry.boundingClientRect.top > 0) {
        handleStepExit({
          index: parseInt(entry.target.dataset.step),
          direction: "down",
        });
      } else {
        handleStepExit({
          index: parseInt(entry.target.dataset.step),
          direction: "up",
        });
      }
    });
  };

  let options = {
    root: document.getElementById("#container"),
    threshold: 1.0,
  };

  let observer = new IntersectionObserver(callback, options);
  let targets = document.querySelectorAll(".step");

  for (const target of targets) {
    observer.observe(target);
  }
}
