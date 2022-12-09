export const indicesChart = (data) => {
    /* Set the dimensions and margins of the graph */
    const width = 900, height = 400;
    const margins = {top: 50, right: 40, bottom: 120, left: 40};

    /* Create the SVG container */
    const svg = d3.select("#bar")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    /* Define x-axis, y-axis, and color scales
        Ref: https://observablehq.com/@d3/introduction-to-d3s-scales */
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([margins.left, width-margins.right])
        .paddingInner(0.2);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.haq)])
        .range([height-margins.bottom, margins.top])


    /* Working with Color: https://observablehq.com/@d3/working-with-color
        Color schemes: https://observablehq.com/@d3/color-schemes 
        d3-scale-chromatic: https://github.com/d3/d3-scale-chromatic */
    const countries = data.map(d => d.country);
    const areas = data.map(d => d.area);
    var color=d3.scaleOrdinal()
        .domain(areas)
        .range(d3.schemeTableau10); // work for less than 10 categories, if more, cycle
    

    // Legend creation
    var legend = d3.legendColor()
        .scale(color);
    const svg_legend = d3.select("#bar")
        .append("svg")
        .attr("viewBox", [0, 0, width, 150]);

    svg_legend.append("g")
        .attr("transform", "translate(50,0)")
        .call(legend);

    svg.append("title")
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")
        .text("HAQ score by country");
    /* Create the bar elements and append to the SVG group
        Ref: https://observablehq.com/@d3/bar-chart */
    const bar=svg.append("g")
        .attr("class", "bars")
        .style('opacity', 0.7)
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => xScale(d.country))
        .attr("y", d => yScale(d.haq))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(0) - yScale(d.haq))
        .attr("fill", "lightgrey")
        .attr("fill", d => color(d.area))
        .call(legend)

    /* Add the tooltip when hover on the bar */
    bar.append("title").text(d => (d.country));

    /* Create the x and y axes and append them to the chart
        Ref: https://www.d3indepth.com/axes/ and https://github.com/d3/d3-axis */
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const xGroup = svg.append("g")
        .attr("transform",`translate(0, ${height-margins.bottom})`)
        .call(xAxis);

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

    
  // HDI index

  /* Define x-axis, y-axis, and color scales */
  const yScaleLine = d3.scaleLinear()
    .domain([0, d3.max(data, d=>d.hdi)])
    .range([height-margins.bottom, margins.top]);

 
  /* Construct a line generator
    Ref: https://observablehq.com/@d3/line-chart and https://github.com/d3/d3-shape */
  const line = d3.line()
    .curve(d3.curveLinear)
    .x(d => xScale(d.country))
    .y(d => yScaleLine(d.hdi) - yScaleLine(0));

  /* Group the data for each country
    Ref: https://observablehq.com/@d3/d3-group */
  for (let j = 0; j < data.length; j++){
    if (data[j].hdi != 'Unknown'){
        data[j]['group'] = 1;
    } else{
        data[j]['group'] = 0;
    }
    
  }
  let group = d3.group(data, d =>  d.group );
  console.log("group",group);
  

  /* Create line paths for each country */
  const path = svg.selectAll('path')
    .data(group)
    .join('path')
      .attr('d', ([i, d]) => line(d)) 
      .style('stroke', 'darkblue')
      .style('stroke-width', 2)
      .style('fill', 'transparent')
      .style('opacity', 1); // [NEW] Add opacity to the line

  path.append('title').text(([i, d]) => i);
  const yAxisLine = d3.axisRight(yScaleLine);

  svg.append("g")
    .attr("transform", `translate(${width - margins.right},0)`)
    .call(yAxisLine)

  /* [NEW] Add text labels on the right of the chart */
  const data2020 = data.filter(data => data.year === 2020);
  svg.selectAll('text.label')
    .data(data2020)
    .join('text')
      .attr('x', width - margins.right + 5)
      .attr('y', d => yScaleLine(d.hdi))
      .attr('dy', '0.35em')
      .style('font-family', 'sans-serif')
      .style('font-size', 12)
      .style('fill', d => color(d.country))
    .text(d => d.country);

}

/*
TO DO:

Add title
Add axis labels
Handle the case where HDI = 0
*/