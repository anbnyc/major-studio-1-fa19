AFRAME.registerComponent("add-boxes", {
  init: function() {
    var sceneEl = this.el;

    const data = d3
      .cross(d3.range(0, 4), d3.range(0, 4))
      .map(d => [...d, Math.random() + 0.25]);

    d3.select(sceneEl)
      .selectAll("a-box")
      .data(data)
      .join("a-box")
      .attr("position", d => `${d[0] / 2 - 0.75} ${d[2] / 2} ${d[1] / 2 - 4}`)
      .attr("width", 0.25)
      .attr("height", d => d[2])
      .attr("depth", 0.25)
      .attr("color", "#4CC4D9");
  },
});
