//import d3 from "../../node_modules/d3/dist/d3.min.js";
//import * as scrollama from "../../node_modules/scrollama/build/scrollama.min.js";
function test() {
  //  Check d3 is working
  const adder = new d3.Adder();
  adder.add(4);
  console.log(adder.valueOf());

  //  Check scrollama is working
  const scroller = scrollama();

  // setup the instance, pass callback functions
  scroller
    .setup({
      step: ".scroll__text .step", // required
      container: ".scroll", // required (for sticky)
      graphic: ".scroll__graphic", // required (for sticky)
      offset: 0.5, // optional, default = 0.5
      debug: false, // optional, default = false
    })
    .onStepEnter(handleStepEnter);
}

function handleStepEnter() {
  console.log("hello");
}
test();
