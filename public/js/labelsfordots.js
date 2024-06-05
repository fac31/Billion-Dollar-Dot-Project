/* Importing D3*/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/* LABEL FOR THE FIRST DOT */
const data1 = [
  { x: "100", y: "100", label: "This dot is worth a Billion Dollars" },
];

const svg1 = d3.select("#billion-dollar-dot");
const circles1 = svg1.selectAll("circle");

circles1.data(data1);

// Create a tooltip element
const tooltip1 = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "5px");

// Show tooltip on hover
circles1
  .on("mouseover", function (event, d) {
    tooltip1.transition().duration(200).style("opacity", 0.9);
    tooltip1
      .html(d.label)
      .style("left", event.pageX + "px")
      .style("top", event.pageY - 28 + "px");
  })
  .on("mouseout", function () {
    tooltip1.transition().duration(500).style("opacity", 0);
  });

/* LABELS FOR THE LARGE VIZ */
d3.csv(
  "https://raw.githubusercontent.com/fac31/Lucy-Jack-Final/main/data-for-dataviz-two-v2.csv",
).then(function (data2) {
  const svg2 = d3.select("#billions-of-dots");
  const circles2 = svg2.selectAll("circle");

  circles2.data(data2);

  // Create a tooltip element
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  // Show tooltip on hover
  circles2
    .on("mouseover", function (event, d) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(`This Billion Dollars belongs to ${d.name}`)
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      tooltip.transition().duration(500).style("opacity", 0);
    });
});

/* LABELS FOR THE LAST VIZ */
d3.csv(
  "https://raw.githubusercontent.com/fac31/Lucy-Jack-Final/main/data-for-dataviz-three.csv",
).then(function (data2) {
  const svg2 = d3.select("#tax-available");
  const circles2 = svg2.selectAll("circle");

  circles2.data(data2);

  // Create a tooltip element
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  // Show tooltip on hover
  circles2
    .on("mouseover", function (event, d) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(`This Billion Dollars could belong to ${d.country}`)
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      tooltip.transition().duration(500).style("opacity", 0);
    });
});
