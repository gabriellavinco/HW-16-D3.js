// @TODO: YOUR CODE HERE!
// svg container
width = parseInt(d3.select("#scatter").style("width"));
   height = width - width / 3.9;

// margins
var margin = {
  top: 30,
  right: 120,
  bottom: 60,
  left: 70
};

// chart area minus margins
var chartHeight = height - margin.top - margin.bottom;
var chartWidth = width - margin.left - margin.right;

// create svg container
var svg = d3.selectAll("#scatter").append("svg")
    .attr("height", height)
    .attr("width", width)
    .attr("class", "graph-svg-component");

// // background color
//     svg.append("rect")
//     .attr("width", "70%")
//     .attr("height", "70%")
//     .attr("fill", "white");

// shift everything over by the margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data) {
    //if (error) throw error;

    //console.log(data);
    data.forEach(function(data) {
        data.state = data.state;
        data.abbrev=data.abbrev;
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income=+data.income;
        data.obesity=+data.obesity;
    });
    
    // Create scaling functions
    var xLinearScale1 = d3.scaleLinear()
        .domain([18, d3.max(data, d => d.obesity)])
        .range([0, chartWidth]);

    var yLinearScale1 = d3.scaleLinear()
        .domain([6, d3.max(data, d => d.poverty)])
        .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale1)
    var leftAxis = d3.axisLeft(yLinearScale1);


    // Add x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    // Add y-axis to the left side of the display
    chartGroup.append("g")
    // Define the color of the axis text
        .classed("black", true)
        .call(leftAxis);

    // x-axis label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width - 550)
        .attr("y", height - 10)
        .text("Poverty Level");

    // y-axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 10)
        .attr("x", -350)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Obesity Level");

    chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        //.attr("cx", (d, i) => xLinearScale1(d.obesity))
        //.attr("cy", d => yLinearScale1(d.poverty))
        .attr("r", "5")
        .attr("fill", "cadetblue")//;

    chartGroup.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("cx", (d, i) => xLinearScale1(d.obesity))
        .attr("cy", d => yLinearScale1(d.poverty))
        //.append("text",(d,i)=>d.abbrev).attr("dx",(d, i) => xLinearScale1(d.obesity))
        //.attr("dy",(d, i) => yLinearScale1(d.poverty))
    
        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Poverty Level") ;

    });