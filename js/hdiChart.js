export const hdiChart = (data) => {

    const countries = data.map(d => d.country);
    
    const color = d3.scaleOrdinal()
        .domain(countries)
        .range(d3.schemeTableau10);

    
  /* Set the dimensions and margins of the graph */
  const width = 1200, height = 400;
  // [NEW] Change the right margin to show the country names
  const margins = {top: 20, right: 100, bottom: 120, left: 40};

  /* Create the SVG container */
  const svg = d3.select("#line")
    .append("svg")
      .attr("viewBox", [0, 0, width, height]);

  /* Define x-axis, y-axis, and color scales */
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d=>d.hdi)])
    .range([height - margins.bottom, margins.top]);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([margins.left, width-margins.right])
        .paddingInner(0.2);
    
  /* Construct a line generator
    Ref: https://observablehq.com/@d3/line-chart and https://github.com/d3/d3-shape */
  const line = d3.line()
    .curve(d3.curveLinear)
    .x(d => xScale(d.country))
    .y(d => yScale(d.hdi));

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
      .style('stroke', 'steelblue')
      .style('stroke-width', 2)
      .style('fill', 'transparent')
      .style('opacity', 1); // [NEW] Add opacity to the line

  /* [NEW] Add the tooltip when hover on the line */
  path.append('title').text(([i, d]) => i);

  /* [NEW] Create the x and y axes and append them to the chart */
  const xAxis = d3.axisBottom(xScale);
  const xGroup = svg.append("g")
        .attr("transform",`translate(0, ${height-margins.bottom})`)
        .call(xAxis);

    xGroup.selectAll("text")
        .style("text-anchor","end")
        .attr("dx","-.8em")
        .attr("dy",".15em")
        .attr("transform",`rotate(-65)`);


  svg.append("g")
    .attr("transform", `translate(0,${height - margins.bottom})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .attr("transform", `translate(${margins.left},0)`)
    .call(yAxis)

  /* [NEW] Add text labels on the right of the chart */
  const data2020 = data.filter(data => data.year === 2020);
  svg.selectAll('text.label')
    .data(data2020)
    .join('text')
      .attr('x', width - margins.right + 5)
      .attr('y', d => yScale(d.hdi))
      .attr('dy', '0.35em')
      .style('font-family', 'sans-serif')
      .style('font-size', 12)
      .style('fill', d => color(d.country))
    .text(d => d.country);
}