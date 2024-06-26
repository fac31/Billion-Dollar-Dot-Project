/* Importing D3*/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Set the dimensions and margins of the graph
const width = 1000;
const height = 1000;
let hasDataVizStarted = false;
let svg;
export function stopDataViz3() {
  svg.remove();
}

export function startDataViz3() {
  if (!hasDataVizStarted) {
    hasDataVizStarted = true;
    // Append the SVG object to the body of the page
    svg = d3
      .select("#dataviz_three")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Read data
    d3.csv(
      "https://raw.githubusercontent.com/fac31/Lucy-Jack-Final/main/data-for-dataviz-three.csv",
    )
      .then(function (data) {
        // console.log("Data loaded");

        // Create a tooltip
        var Tooltip = d3
          .select("#dataviz_three")
          .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip")
          .style("background-color", "white")
          .style("border", "solid")
          .style("border-width", "2px")
          .style("border-radius", "5px")
          .style("padding", "5px")
          .style("position", "absolute");

        // Three functions that change the tooltip when user hover / move / leave a cell
        var mouseover = () => {
          Tooltip.style("opacity", 1);
        };

        var mousemove = function (event, d) {
          if (!d.country || !d["total-tax"]) return;
          Tooltip.html(
            `This Billion Dollar Dot could be owned by ${d.country}. Their total revenue from a 2% minimum tax would be approximately ${d["total-tax"]}`,
          )
            .style("left", event.pageX + 20 + "px")
            .style("top", event.pageY + "px")
            .style("color", "black");
        };

        var mouseleave = () => {
          Tooltip.style("opacity", 0);
        };

        var simulation = d3
          .forceSimulation(data)
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("charge", d3.forceManyBody().strength(0.05)) // Adjust charge strength for less space
          .force(
            "collide",
            d3
              .forceCollide()
              .radius(3 + 0.5)
              .iterations(1),
          ); // Adjust collision radius for less space

        // Append circles with initial opacity of 0
        var circles = svg
          .selectAll(".node")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "node")
          .attr("r", 3) // Small circles radius
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .style("fill", "#003D2B")
          .style("fill-opacity", 0)
          .style("stroke-width", 1)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave);

        // Start the simulation
        simulation.nodes(data).on("tick", function () {
          circles
            .attr("cx", function (d) {
              return d.x;
            })
            .attr("cy", function (d) {
              return d.y;
            });
        });

        // Fade in the circles
        circles.transition().duration(1000).style("fill-opacity", 0.5);
      })
      .catch(function (error) {
        console.error("Error loading or processing data:", error);
      });
  }
}
