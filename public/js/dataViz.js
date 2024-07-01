/* Importing D3 */
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const NORMAL_SPEED = 750;
const FAST_SPEED = 250;

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

// Bringing labels in in the same order as the data
const labels = [
  "Poorest Half",
  "Middle 40%",
  "Top 10% Richest",
  "Top 1%",
  "Top 0.1%",
  "Top 0.01%",
  "Top 0.001%",
  "Top 0.0001%",
  "Top 0.00001%",
];

// Setting the width, height and radius of the svg, circles and lines
const svgWidth = 758;
const svgHeight = 758;
const initialRadius = svgWidth / 2 / 9;
const startHeight = initialRadius * 2;
const lineLength = 50;
const fontSize = `11px`;

// Creates the SVG element inside the correct div and sets its dimensions
const svg = d3
  .select("#dataviz_one")
  .append("svg")
  .attr("opacity", 0)
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`); // Set viewBox for scaling

// Scale for x positions
const x = d3
  .scalePoint()
  .domain(d3.range(data.length))
  .range([0, svgWidth])
  .padding(1);

// Define final positions and radii for the circles based on your Observable code
const positions = [
  {
    cx: 250.731,
    cy: 363.5,
    r: 246.9,
    label: "TOP 10% RICHEST",
    pathId: "top10RichestPath",
  }, // Top 10% Richest
  {
    cx: 612.316,
    cy: 363.5,
    r: 110.853,
    label: "MIDDLE 40%",
    pathId: "middle40Path",
  }, // Middle 40%
  { cx: 363.5, cy: 363.5, r: 363.5, fill: "#f9efde" }, // Root circle
  { cx: 148.317, cy: 363.5, r: 140.654, label: "Top 1%" }, // Top 1%
  { cx: 393.301, cy: 363.5, r: 100.499, label: "Top 0.1%" }, // Top 0.1%
  { cx: 303.717, cy: 520.42, r: 76.361, label: "Top 0.01%" }, // Top 0.01%
  { cx: 300.662, cy: 230.537, r: 57.723, label: "Top\n0.001%" }, // Top 0.001%
  { cx: 206.589, cy: 185.63, r: 42.687, label: "Top\n0.0001%" }, // Top 0.0001%
  {
    cx: 513.85,
    cy: 477.694,
    r: 36.1,
    label: "POOREST HALF",
    pathId: "poorestHalfPath",
  }, // Poorest Half of the World
  { cx: 199.652, cy: 523.902, r: 23.931, label: "Top\n0.00001%" }, // Top 0.00001%
];

// Binds the data to circles then sets where they start and move to, and then what they look like
const circles = svg
  .selectAll("circle")
  .data(data)
  .join("circle")
  .attr("cx", svgWidth - initialRadius) // Initial position to the right
  .attr("cy", startHeight - initialRadius) // Initial top alignment
  .attr("r", initialRadius) // Initial radius
  .attr("fill", (_, i) => colours[i]) // Apply colors
  .attr("opacity", 0); // Set opacity to 50%

export function hideCircles() {
  circles.transition().attr("opacity", 0);
}

// STEP ONE FUNCTIONS
export function startDataViz1() {
  circles
    .attr("cx", svgWidth - initialRadius) // Initial position to the right
    .attr("cy", startHeight - initialRadius) // Initial top alignment
    .attr("r", initialRadius) // Initial radius
    .transition()
    .duration(NORMAL_SPEED)
    .delay((d, i) => i * 750)
    .attr("cx", (_, i) => x(i))
    .attr("opacity", 0.5)
    .on("end", function (_, i) {
      if (i === data.length - 1) {
        changeSize();
      }
    });
}

export function restartDataViz1() {
  hideLines();
  hideText();

  circles
    .transition()
    .duration(NORMAL_SPEED)
    .attr("cx", svgWidth - initialRadius) // Reset position to the right
    .attr("cy", startHeight - initialRadius) // Reset top alignment
    .attr("r", initialRadius) // Reset radius
    .attr("opacity", 0.5);
}

// STEP TWO FUNCTIONS

export function changeSize() {
  // Transition circles to new positions and radii
  circles
    .transition()
    .duration(NORMAL_SPEED)
    .attr("cx", (_, i) => positions[i].cx)
    .attr("cy", (_, i) => positions[i].cy)
    .attr("r", (_, i) => positions[i].r)
    .attr("opacity", 0.5)
    .end()
    .then(showLabels); // Show labels after transition
}

function showLabels() {
  svg.selectAll("g.label-group").remove(); // Clear existing labels

  positions.forEach((pos, i) => {
    if (pos.visible === false) return; // Skip invisible circles

    const labelGroup = svg
      .append("g")
      .attr("class", "label-group")
      .attr("transform", `translate(${pos.cx},${pos.cy})`);

    if (pos.label) {
      if (pos.pathId) {
        const pathId = `${pos.pathId}`;
        labelGroup
          .append("path")
          .attr("id", pathId)
          .attr("d", `M-${pos.r},0 A${pos.r},${pos.r} 0 1,1 ${pos.r},0`)
          .style("fill", "none");

        labelGroup
          .append("text")
          .append("textPath")
          .attr("href", `#${pathId}`)
          .attr("startOffset", "50%")
          .style("text-anchor", "middle")
          .style("font-weight", "bold")
          .style("font-size", "11px")
          .style("fill", "#003d2b")
          .text(pos.label);
      } else {
        const lines = pos.label.split("\n");
        lines.forEach((line, index) => {
          labelGroup
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 6.3 + index * 20)
            .style("font-size", "21px")
            .style("font-weight", "normal")
            .style("fill", "#003d2b")
            .text(line);
        });
      }
    }
  });
}

export function revertChangeSize() {
  circles
    .each(function (d, i) {
      d3.select(this)
        .transition()
        .duration(NORMAL_SPEED)
        .attr("opacity", 0.5)
        .attr("cx", positions[i].cx)
        .attr("cy", positions[i].cy)
        .attr("r", positions[i].r);
    })
    .end()
    .then(showLabels);
}

// STEP THREE FUNCTIONS
export function hideDataPoints() {
  // Hide all circles except the ones at index 0 and 6
  circles.each(function (d, i) {
    if (i !== 0 && i !== 6) {
      d3.select(this)
        .transition()
        .duration(FAST_SPEED)
        .attr("opacity", 0)
        .attr("r", 0);
    }
  });

  hideLines();
  hideText();
}

export function moveBlueCircle() {
  // Updates width so blue circle is in the middle of the page
  const newPositions = [
    { cx: svgWidth / 4, cy: positions[0].cy, r: positions[0].r * 1.5 },
    { cx: (svgWidth * 3) / 4, cy: positions[6].cy, r: positions[6].r * 1.5 },
  ];

  // Moves blue circle and makes it correct radius
  circles
    .filter((_, i) => i === 0)
    .transition()
    .duration(FAST_SPEED)
    .delay((_, i) => i * 750)
    .attr("cx", newPositions[0].cx)
    .attr("cy", newPositions[0].cy)
    .attr("r", newPositions[0].r)
    .attr("opacity", 0.5);

  // Moves circle with value 6.4 and makes it correct radius
  circles
    .filter((_, i) => i === 6)
    .transition()
    .duration(FAST_SPEED)
    .delay((_, i) => i * 750)
    .attr("cx", newPositions[1].cx)
    .attr("cy", newPositions[1].cy)
    .attr("r", newPositions[1].r)
    .attr("opacity", 0.5);

  // Add blue circle line and text
  const cx1 = newPositions[0].cx;
  const colour1 = colours[0];
  svg
    .append("line")
    .attr("x1", cx1)
    .attr("y1", positions[0].cy + positions[0].r)
    .attr("x2", cx1)
    .attr("y2", positions[0].cy + positions[0].r + lineLength)
    .attr("stroke", colour1)
    .attr("stroke-opacity", 0.5)
    .attr("stroke-width", 1)
    .attr("class", "data-line");
  svg
    .append("text")
    .attr("font-size", fontSize)
    .attr("x", cx1)
    .attr("y", positions[0].cy + positions[0].r + lineLength + 15)
    .attr("fill", colour1)
    .attr("fill-opacity", 0.5)
    .attr("text-anchor", "middle")
    .text(labels[0])
    .attr("class", "data-text");

  // Add circle line and text for value 6.4
  const cx2 = newPositions[1].cx;
  const colour2 = colours[6];
  svg
    .append("line")
    .attr("x1", cx2)
    .attr("y1", positions[6].cy + positions[6].r)
    .attr("x2", cx2)
    .attr("y2", positions[6].cy + positions[6].r + lineLength)
    .attr("stroke", colour2)
    .attr("stroke-opacity", 0.5)
    .attr("stroke-width", 1)
    .attr("class", "data-line");
  svg
    .append("text")
    .attr("font-size", fontSize)
    .attr("x", cx2)
    .attr("y", positions[6].cy + positions[6].r + lineLength + 15)
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
    .duration(NORMAL_SPEED)
    .attr("cy", (d) => positions[0].cy - (positions[0].r - positions[6].r) * 3)
    .attr("r", (d) => positions[0].r * 3);

  // Move the lines and text accordingly
  svg
    .selectAll(".data-line")
    .transition()
    .duration(NORMAL_SPEED)
    .attr("y1", positions[0].cy + positions[0].r)
    .attr("y2", positions[0].cy + positions[0].r + lineLength * 2);

  svg
    .selectAll(".data-text")
    .transition()
    .duration(NORMAL_SPEED)
    .attr("y", positions[0].cy + positions[0].r + lineLength * 2 + 15);
}

export function hideLines() {
  svg
    .selectAll(".data-line")
    .transition()
    .duration(FAST_SPEED)
    .attr("opacity", 0);
}

export function hideText() {
  svg
    .selectAll(".data-text")
    .transition()
    .duration(FAST_SPEED)
    .attr("opacity", 0);
}

export function hideLinesAndText() {
  hideLines();
  hideText();
}

function showLines() {
  circles.each(function (d, i) {
    // After resizing, add lines under the circles
    const cx = positions[i].cx;
    d3.select(this.parentNode)
      .append("line")
      .attr("x1", cx)
      .attr("y1", positions[i].cy + positions[i].r)
      .attr("x2", cx)
      .attr("y2", positions[i].cy + positions[i].r + lineLength)
      .attr("stroke", colours[i])
      .attr("stroke-opacity", 0.5)
      .attr("stroke-width", 1)
      .attr("class", "data-line");
  });
}

function showText() {
  circles.each(function (d, i) {
    // After resizing, add lines under the circles
    const cx = positions[i].cx;
    const colour = colours[i];
    d3.select(this.parentNode)
      .append("text")
      .attr("font-size", fontSize)
      .attr("x", cx)
      .attr("y", positions[i].cy + positions[i].r + lineLength + 15)
      .attr("fill", colour)
      .attr("fill-opacity", 0.5)
      .attr("text-anchor", "middle")
      .text(labels[i])
      .attr("class", "data-text");
  });
}

export function showLinesAndText() {
  showLines();
  showText();
}
