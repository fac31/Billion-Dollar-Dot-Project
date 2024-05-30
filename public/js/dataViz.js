/* Importing D3*/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Bringing data in as an array
const data = [2, 22, 76, 38, 19.4, 11.2, 6.4, 3.5, 1.1];

// Bringing colours in in the same order as the data
const colours = [
  "#0E8BCD",
  "#003D2B",
  "#E1B52F",
  "#CB026E",
  "#919191",
  "#5B8F77",
  "#01608A",
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
//const height = 500;
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

//   .on("end", function (d, i) {
// //    Check if all transitions are done
//     if (i === data.length - 1) {
//       changeSize();
//     }
//   });

export function startDataViz() {
  circles
    .transition()
    .duration(3000)
    .delay((d, i) => i * 750)
    // Transition to final positions based on data
    .attr("cx", (_, i) => x(i));
}

export function changeSize() {
  circles
    .transition()
    .duration(3000)
    .attr("cy", (d) => startHeight - radiusScale(d))
    .attr("r", (d) => radiusScale(d))
    .on("end", function (d, i) {
      // After resizing, add lines under the circles
      const cx = x(i);
      const colour = colours[i];
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

      d3.select(this.parentNode)
        .append("text")
        .attr("x", cx)
        .attr("y", startHeight + lineLength + 15)
        .attr("fill", colour)
        .attr("fill-opacity", 0.5)
        .attr("text-anchor", "middle")
        .text(labels[i])
        .attr("class", "data-text");

      // After text appears, wait 2 seconds, then hide all except the first data point
      //   if (i === data.length - 1) {
      //     setTimeout(() => {
      //       hideDataPoints();
      //     }, 2000);
      //   }
    });
}

export function hideDataPoints() {
  // Hide all circles except the one at index 0
  circles.each(function (d, i) {
    if (i !== 0) {
      d3.select(this)
        .transition()
        .duration(3000)
        .attr("opacity", 0)
        .attr("r", 0);
    }
  });

  // Hide all lines except the one associated with the circle at index 0
  hideLines();

  // Hide all text except the one associated with the circle at index 0
  hideText();
}

function hideLines() {
  svg.selectAll(".data-line").each(function (_, i) {
    if (i !== 0) {
      d3.select(this).transition().duration(500).attr("opacity", 0);
    }
  });
}

function hideText() {
  svg.selectAll(".data-text").each(function (_, i) {
    if (i !== 0) {
      d3.select(this).transition().duration(500).attr("opacity", 0);
    }
  });
}
