export const hospitalsChart = (data) => {

    const countries = data.map(d => d.country);
    
    const areas = data.map(d => d.area);
    var color=d3.scaleOrdinal()
        .domain(areas)
        .range(d3.schemeTableau10); // work for less than 10 categories, if more, cycle
    // Legend creation
    var legend = d3.legendColor()
        .scale(color);

    
/* Set the dimensions and margins of the graph */
    const width = 800, height = 600  
// [NEW] Change the right margin to show the country names
    const margins = {top: 100, right: 40, bottom: 100, left: 40};
    const svg = d3.select("#scatterplot").append("svg").attr("viewBox", [0, 0, width, height])
    
    const svg_legend = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", [0, 0, width, 115]);

    svg_legend.append("g")
        .attr("transform", "translate(50,0)")
        .call(legend);

    const xScale=d3.scaleLinear()
    .domain([0,d3.max(data, d => d.hospitals_per_capita)+0.001])
    .range([margins.left, width-margins.right])

    const yScale = d3.scaleLinear()
        .domain([40, d3.max(data, d => d.haq)])
        .range([height-margins.bottom, margins.top])


    svg.append("text")
    .attr("x", width/2)             
    .attr("y", 2*(margins.top)/3)
    .attr("text-anchor", "middle")  
    .style("font-size", "18px")
    .text("Correlation between HAQ and number of hospitals per capita");
    const data2015 = data.filter(data => data.year === 2015);
    const data2015n0 = data2015.filter(data => data.hospitals_per_capita != 0);
        
    svg.append('g')
    .selectAll("dot")
    .data(data2015n0)
    .enter()
    .append("circle")
    .attr("cx",function(d){
        return xScale(d.hospitals_per_capita);})
    .attr("cy",function(d){return yScale(d.haq);})
    .attr("r",5)
    .style("fill", d =>  color(d.area))
    .attr("x", d => xScale(d.hospitals_per_capita))
    .attr("y", d => yScale(d.haq))
    .append("title").text(d => (d.country));


    /* Create the x and y axes and append them to the chart
    Ref: https://www.d3indepth.com/axes/ and https://github.com/d3/d3-axis */
    //Title
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width-50)
    .attr("y", height - 12)
    .text("Number of Hospitals per capita");
    
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 0)
    .attr("dy", ".75em")
    .attr("x", -100)
    .attr("transform", "rotate(-90)")
    .text("HAQ index");
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    
    const xGroup = svg.append("g")
        .attr("transform",`translate(0, ${height-margins.bottom})`)
        .call(xAxis)
    

    xGroup.selectAll("text")
        .style("text-anchor","end")
        .attr("dx","-.8em")
        .attr("dy",".15em")
        .attr("transform",`rotate(-65)`);

    const yGroup = svg.append("g")
        .attr("transform",`translate(${margins.left},0)`)
        .call(yAxis);

    yGroup.selectAll("text")
        .style("text-anchor","end")

}