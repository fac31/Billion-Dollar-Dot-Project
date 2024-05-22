import * as d3 from "d3";
function test() {
  const adder = new d3.Adder();
  adder.add(42);
  console.log(adder.valueOf());
}
test();
