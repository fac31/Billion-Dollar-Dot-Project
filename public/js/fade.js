export function fadeOut(element, delay) {
  let opacity = element.style.opacity;
  let timer = setInterval(function () {
    if (opacity > 0) {
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

export function fadeOutSVG(svg, delay) {
  svg.setAttribute("opacity", "0.5");
  let opacity = parseFloat(svg.getAttribute("opacity"));
  let timer = setInterval(function () {
    if (opacity > 0) {
      opacity -= 0.015;
      svg.setAttribute("opacity", opacity);
    } else {
      clearInterval(timer);
    }
  }, delay);
}

export function fadeInSVG(svg, delay, maxOpacity) {
  let opacity = Math.max(parseFloat(svg.getAttribute("opacity")), 0);

  let timer = setInterval(function () {
    if (opacity < maxOpacity) {
      opacity += 0.015;
      svg.setAttribute("opacity", opacity);
    } else {
      clearInterval(timer);
    }
  }, delay);
}
