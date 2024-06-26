import {
  enterStepOne,
  enterStepThree,
  enterStepTwo,
  enterStepZero,
  exitStepOneDown,
  exitStepThreeDown,
  exitStepZeroDown,
  revertToStepOne,
  revertToStepThree,
  revertToStepTwo,
} from "./steps.js";

const THRESHOLD = 0.5;
let inProgress = 0;

export function handleStepProgress({ index: step, direction, progress }) {
  // console.log(step, direction, progress);
  if (progress < THRESHOLD || inProgress === step) return;

  inProgress = step;

  switch (step) {
    case 0: {
      enterStepZero();
      break;
    }
    case 1:
      if (direction == "up") {
        revertToStepOne();
      }
      if (direction === "down") {
        enterStepOne();
      }
      break;
    case 2:
      if (direction === "up") {
        revertToStepTwo();
      }
      if (direction === "down") {
        enterStepTwo();
      }
      break;
    case 3:
      if (direction === "up") {
        revertToStepThree();
      }
      if (direction === "down") {
        enterStepThree();
      }
      break;
  }
}

export function handleStepExit({ index: step, direction }) {
  switch (step) {
    case 0:
      if (direction == "down") {
        exitStepZeroDown();
      }
      break;
    case 1:
      if (direction === "down") {
        exitStepOneDown();
      }
      break;
    case 3:
      if (direction === "down") {
        inProgress = null;
        exitStepThreeDown();
      }
      break;
  }
}
