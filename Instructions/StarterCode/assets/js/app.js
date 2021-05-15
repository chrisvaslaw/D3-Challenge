// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var tip = d3.tip()
            .attr("class", "d3-tip")
            .html(function(d){
              console.log(d)
            return `${d.state}<br> Healthcare: ${d.healthcare}%<br> Poverty: ${d.poverty}%`
            })
            .direction("nw")
            .offset([0,3])
            
// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
    .call(tip);

// Get the data
d3.csv("./assets/data/data.csv").then(function(data) {
  data.forEach(function(d) { 
      d.healthcare = +d.healthcare
      d.poverty = +d.poverty
  })

  // Scale the range of the data
  x.domain([d3.min(data, function(d) {
    return d.healthcare}) - 1,
    d3.max(data, function(d) {
    return d.healthcare}
    )]);
  y.domain([d3.min(data, function(d) {
    return d.poverty}) - 1,
    d3.max(data, function(d) {
    return d.poverty}
    )]);
      
  // Add the scatterplot
  svg.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("cx", function(d) { return x(d.healthcare); })
      .attr("cy", function(d) { return y(d.poverty); })
      .style("fill", "#333")
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)

  svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d.abbr)
      .attr("x", function(d) { return x(d.healthcare); })
      .attr("y", function(d) { return y(d.poverty); })
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .style("stroke", "#fff")
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
  
  svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0-margin.left)
     .attr("x", 0-(height/2))
     .attr("dy", "1em")
     .attr("text-anchor", "middle")
     .text("Poverty")

  svg.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + 
                      (height + margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text("Healthcare");

});