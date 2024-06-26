import {
  enterStepOne,
  enterStepThree,
  enterStepTwo,
  exitStepOneUp,
  exitStepThreeUp,
  exitStepZeroUp,
  revertToStepOne,
  revertToStepThree,
  revertToStepTwo,
} from "./steps.js";

export function handleStepEnter({ index: step, direction }) {
  switch (step) {
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
      if (direction == "up") {
        exitStepZeroUp();
      }
      break;
    case 1:
      if (direction === "up") {
        exitStepOneUp();
      }
      break;
    case 3:
      if (direction === "up") {
        exitStepThreeUp();
      }
      break;
  }
}
