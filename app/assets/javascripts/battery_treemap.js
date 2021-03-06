$(document).ready(function(){
  var margin = {top: 40, right: 10, bottom: 10, left: 10},
      width = 960 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var color = d3.scale.category20c();

  var treemap = d3.layout.treemap()
      .size([width, height])
      .sticky(true)
      .value(function(d) { return d.joule; });

  var div = d3.select("#battery-treemap").append("div")
      .style("position", "relative")
      .style("width", (width + margin.left + margin.right) + "px")
      .style("height", (height + margin.top + margin.bottom) + "px")
      .style("left", margin.left + "px")
      .style("top", margin.top + "px");

  var url = window.location.pathname.split('/');

  d3.json("/reports/" + url[url.length - 1] + "/battery.json", function(error, root) {
      var node = div.datum(root).selectAll(".node")
          .data(treemap)
          .enter().append("div")
          .attr("class", "node")
          .call(position)
          .style("background", function(d) { return color(d.name); })
          .text(function(d) { return d.name; });
  });

  function position() {
      this.style("left", function(d) { return d.x + "px"; })
          .style("top", function(d) { return d.y + "px"; })
          .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
          .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
  }
});
