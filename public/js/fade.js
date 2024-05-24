export function fadeOut(element, delay, minOpacity) {
  let timer = setInterval(function () {
    var opacity = element.style.opacity;
    if (opacity > minOpacity) {
      opacity -= 0.01;
      element.style.opacity = opacity;
    } else {
      clearInterval(timer);
    }
  }, delay);
}

export function fadeIn(element, delay, maxOpacity) {
  element.style.opacity = 0;
  let opacity = 0;

  let timer = setInterval(function () {
    if (opacity < maxOpacity) {
      opacity = opacity + 0.01;
      element.style.opacity = opacity;
    } else {
      clearInterval(timer);
    }
  }, delay);
}
