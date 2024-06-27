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

const DOWN_THRESHOLD = 0.5;
const UP_THRESHOLD = 0.4;
// how many animations
const LAST_STEP = 3;
let inProgress = 0;

export function handleStepProgress({ index: step, direction, progress }) {
  // we need to to know the active and next step
  // first set nextStep equal to the step
  let nextStep = step;

  if (direction === "down") {
    // Don't trigger the animation if the progress < threshold or we have already trigger it
    if (progress < DOWN_THRESHOLD || inProgress === nextStep) return;
    // Set in progress to the next animation we want to run so we know we are inProgress on the next execution (for the condition above)
    inProgress = step;
  }

  if (direction === "up") {
    // step !== LAST_STEP: If we are scrolling up to the last animation we want to trigger that animation
    // OR
    // progress < UP_THRESHOLD: If we are pas the threshold we want to trigger the presvious
    if (step !== LAST_STEP || progress < UP_THRESHOLD) {
      nextStep = step - 1;
    }

    // Don't trigger the animation if the progress > threshold or we have already trigger it
    // If we are on the last step ignore the threshold because we want to start it as soon as you enter
    if (
      (progress > UP_THRESHOLD && nextStep !== LAST_STEP) ||
      inProgress === nextStep
    ) {
      return;
    }

    inProgress = nextStep || 0;
  }

  // Depending on the rules aboce the case will run for the next step we want to trigger
  //
  // aside from the last step
  // - when scrolling down it will the step we are on
  // - when scrolling up it will be the previous steps animation
  switch (nextStep) {
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
