/* Importing D3*/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Bringing data in as an array
const data = [2, 22, 76, 38, 19.4, 11.2, 6.4, 3.5, 1.1];

// Bringing colours in in the same order as the data
const colours = [
  "#0E8BCD",
  "#003D2B",
  "#E1B52F",
  "#919191",
  "#5B8F77",
  "#01608A",
  "#CB026E",
  "#D86C01",
  "#8B3076",
];

// bringing labels in in the same order as the data
const labels = [
  "Bottom 50%",
  "Middle 40%",
  "Top 10%",
  "Top 1%",
  "Top 0.1%",
  "Top 0.01%",
  "Top 0.001%",
  "Top 0.0001%",
  "Top 0.00001%",
];

// Setting the width, height and radius of the svg, circles and lines
const width = window.innerWidth;
const height = 200;
const initialRadius = 95;
const lineLength = 50;
const startHeight = 200;

// Creates the SVG element inside the correct div and sets its dimensions
const svg = d3
  .select("#dataviz_one")
  .append("svg")
  .attr("width", width)
  .attr("height", height + lineLength);

// Positions circles evenly across the page. Padding would bring them closer together
const x = d3
  .scalePoint()
  .domain(d3.range(data.length))
  .range([0, width])
  .padding(0.5);

// setting up the
const radiusScale = d3
  .scaleSqrt()
  .domain([0, d3.max(data)])
  .range([0, 50]);

// Binds the data to circles then sets where they start and move to, and then what they look like
const circles = svg
  .selectAll("circle")
  .data(data)
  .join("circle")
  .attr("cx", width - initialRadius) // Initial position to the right
  .attr("cy", startHeight - initialRadius) // Initial top alignment
  .attr("r", initialRadius) // Initial radius
  .attr("fill", (_, i) => colours[i]) // Apply colors
  .attr("opacity", 0.5); // Set opacity to 50%

//  STEP ONE FUNCTIONS
export function startDataViz() {
  circles
    // Reset positions of circles
    .attr("cx", width - initialRadius) // Initial position to the right
    .attr("cy", startHeight - initialRadius) // Initial top alignment
    .attr("r", initialRadius) // Initial radius
    .transition()
    .duration(3000)
    .delay((d, i) => i * 750)
    // Transition to final positions based on data
    .attr("cx", (_, i) => x(i))
    .attr("opacity", 0.5);
}
export function restartDataViz() {
  hideLines();
  hideText();
  circles
    .transition()
    .duration(3000)
    .attr("cy", startHeight - initialRadius)
    .attr("r", initialRadius)
    .attr("cx", (_, i) => x(i))
    .attr("opacity", 0.5);
}

//  STEP TWO FUNCTIONS

export function changeSize() {
  circles
    .transition()
    .duration(3000)
    .attr("cx", (_, i) => x(i))
    .attr("cy", (d) => startHeight - radiusScale(d))
    .attr("r", (d) => radiusScale(d));
  showLines();
  showText();
}
export function revertChangeSize() {
  x.range([0, width]);
  hideLines();
  hideText();
  circles.each(function (d, i) {
    d3.select(this)
      .transition()
      .duration(3000)
      .attr("opacity", 0.5)
      .attr("cx", x(i))
      .attr("cy", (d) => startHeight - radiusScale(d))
      .attr("r", (d) => radiusScale(d));
  });
  showLines();
  showText();
}

//  STEP THREE FUNCTIONS
export function hideDataPoints() {
  // Hide all circles except the ones at index 0 and 6
  circles.each(function (d, i) {
    if (i !== 0 && i !== 6) {
      d3.select(this)
        .transition()
        .duration(3000)
        .attr("opacity", 0)
        .attr("r", 0);
    }
  });

  hideLines();
  hideText();
}

export function moveBlueCircle() {
  //  Updates width so blue circle is in the middle of the page
  x.range([width / 4, (width * 3) / 4]);

  //  Moves blue circle and makes it correct radius
  circles
    .filter((_, i) => i === 0)
    .transition()
    .duration(3000)
    .delay((_, i) => i * 750)
    .attr("cx", () => x(0))
    .attr("cy", (d) => startHeight - radiusScale(d) * 1.5)
    .attr("r", (d) => radiusScale(d) * 1.5);

  //  Moves circle with value 6.4 and makes it correct radius
  circles
    .filter((_, i) => i === 6)
    .transition()
    .duration(3000)
    .delay((_, i) => i * 750)
    .attr("cx", () => x(1))
    .attr("cy", (d) => startHeight - radiusScale(d) * 1.5)
    .attr("r", (d) => radiusScale(d) * 1.5);

  //  Add blue circle line and text
  const cx1 = x(0);
  const colour1 = colours[0];
  svg
    .append("line")
    .attr("x1", cx1)
    .attr("y1", startHeight)
    .attr("x2", cx1)
    .attr("y2", startHeight + lineLength)
    .attr("stroke", colour1)
    .attr("stroke-opacity", 0.5)
    .attr("stroke-width", 1)
    .attr("class", "data-line");
  svg
    .append("text")
    .attr("x", cx1)
    .attr("y", startHeight + lineLength + 15)
    .attr("fill", colour1)
    .attr("fill-opacity", 0.5)
    .attr("text-anchor", "middle")
    .text(labels[0])
    .attr("class", "data-text");

  //  Add circle line and text for value 6.4
  const cx2 = x(1);
  const colour2 = colours[6];
  svg
    .append("line")
    .attr("x1", cx2)
    .attr("y1", startHeight)
    .attr("x2", cx2)
    .attr("y2", startHeight + lineLength)
    .attr("stroke", colour2)
    .attr("stroke-opacity", 0.5)
    .attr("stroke-width", 1)
    .attr("class", "data-line");
  svg
    .append("text")
    .attr("x", cx2)
    .attr("y", startHeight + lineLength + 15)
    .attr("fill", colour2)
    .attr("fill-opacity", 0.5)
    .attr("text-anchor", "middle")
    .text(labels[6])
    .attr("class", "data-text");
}

export function growCircles() {
  circles
    .filter((_, i) => i === 0 || i === 6)
    .transition()
    .duration(3000)
    .attr("cy", (d) => startHeight - radiusScale(d) * 3)
    .attr("r", (d) => radiusScale(d) * 3);

  // Move the lines and text accordingly
  svg
    .selectAll(".data-line")
    .transition()
    .duration(3000)
    .attr("y1", startHeight)
    .attr("y2", startHeight + lineLength * 2);

  svg
    .selectAll(".data-text")
    .transition()
    .duration(3000)
    .attr("y", startHeight + lineLength * 2 + 15);
}

function hideLines() {
  svg.selectAll(".data-line").transition().duration(500).attr("opacity", 0);
}

function hideText() {
  svg.selectAll(".data-text").transition().duration(500).attr("opacity", 0);
}

function showLines() {
  circles.each(function (d, i) {
    // After resizing, add lines under the circles
    const cx = x(i);
    d3.select(this.parentNode)
      .append("line")
      .attr("x1", cx)
      .attr("y1", startHeight)
      .attr("x2", cx)
      .attr("y2", startHeight + lineLength)
      .attr("stroke", colours[i])
      .attr("stroke-opacity", 0.5)
      .attr("stroke-width", 1)
      .attr("class", "data-line");
  });
}

function showText() {
  circles.each(function (d, i) {
    // After resizing, add lines under the circles
    const cx = x(i);
    const colour = colours[i];
    d3.select(this.parentNode)
      .append("text")
      .attr("x", cx)
      .attr("y", startHeight + lineLength + 15)
      .attr("fill", colour)
      .attr("fill-opacity", 0.5)
      .attr("text-anchor", "middle")
      .text(labels[i])
      .attr("class", "data-text");
  });
}
