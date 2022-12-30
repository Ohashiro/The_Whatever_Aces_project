import {animationFilter} from "./animation_components.js";

export const indicesChart = (data) => {
    /* Set the dimensions and margins of the graph */
    const width = 900, height = 400;
    const margins = {top: 50, right: 40, bottom: 120, left: 40};

    // Filter the data from the year 2020
    let newData = data.filter(data => data.year == 2015);

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

    svg.append("text")
        .attr("x", width/2)             
        .attr("y", 0 + 2*(margins.top)/3)
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")
        .text("HAQ and HDI score by country");
    /* Create the bar elements and append to the SVG group
        Ref: https://observablehq.com/@d3/bar-chart */
    let bar=svg.append("g")
        .selectAll("rect")
    // TODO: Add geo as id to refer to the data point
        .data(newData, data => data.haq)
        .join("rect")
        .attr("class", d => d.haq)
        //.attr("class", "bars")
        .style('opacity', 0.7)
        //.data(data)
        .join("rect")
        .attr("x", d => xScale(d.country))
        .attr("y", d => yScale(d.haq))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(0) - yScale(d.haq))
        .attr("fill", "lightgrey")
        .attr("fill", d => color(d.area))
        .call(legend)

    function mouseover() {
        // Get the haq and color of the selected bar
        const haq = d3.select(this).attr('class');
        const color = d3.select(this).attr('fill');
    
        // Highlight the bar with black stroke
        bar.select("this").style("stroke","#333")
            .style("stroke-width",2);
    
        // Highlight the line with the color
        d3.select(`path.${haq}`)
            .style("stroke",color)
            .style("opacity",1)
    
        // Make the text label visible
        d3.select(`text.${haq}`).style("visibility","visible");
        }
    
    //bar.on("mouseover", mouseover);

    function mouseout() {
        // Get the haq of the selected bar
        const haq = d3.select(this).attr('class');
        // Change the highlight stroke in the bar back to normal
        
        bar.select("this").style("stroke",null);
    
        // Change the line color to lightgrey
        d3.select(`path.${haq}`)
        .style("stroke","lightgrey")
        .style("opacity",0.5)
    
        // Make the text label invisible again
        d3.select(`text.${haq}`).style("visibility","hidden");
      }
    //bar.on("mouseout", mouseout);

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


    // Update the bar chart based on new inputs
  function updateBarChart() {
    // Get the selected year and sorting method
    console.log("year chosen",d3.select("#yearSlider").node().value);
    let newData = animationFilter(data);

    // if (sort == 'alphabet') {
    //   newData = newData.sort((a, b) => d3.ascending(a.country, b.country));
    // }
    // else if (sort == 'pctAsce') {
    //   newData = newData.sort((a, b) => d3.ascending(a.haq, b.haq));
    // }
    // else {
    //   newData = newData.sort((a, b) => d3.descending(a.haq, b.haq));
    // }

    // Define new x and y scales
    const xScale = d3.scaleBand()
        .domain(newData.map(d => d.country))
        .range([margins.left, width - margins.right])
        .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(newData, d => d.haq)])
      .range([height - margins.bottom, margins.top]);

    // Define a transition.
    const t = d3.transition().duration(1000);
    
    // Update the bar chart with enter, update, and exit pattern
    bar = bar
      .data(newData, d => d.haq)
      .join(
        enter => enter.append("rect")
          .attr("class", d => d.haq)
          .attr("x", d => xScale(d.country))
          .attr("y", d => yScale(d.haq))
          .attr("height", d => - yScale(d.haq))
          .attr("width", xScale.bandwidth())
          .attr("fill", d => color(d.country))
          //.on("mouseover",mouseover)
          //.on("mouseout",mouseout)
          .call(enter => enter.transition(t)
            .attr("height",d => yScale(0) - yScale(d.haq))),
        update => update.transition(t)
          .attr("x", d => xScale(d.country))
          .attr("y", d => yScale(d.haq))
          .attr("height", d => yScale(0) - yScale(d.haq))
          .attr("width", xScale.bandwidth()),
        exit => exit.transition(t)
          .attr("y", yScale(0))
          .attr("height", 0)
          .remove()
      )
      
    // Transition on the x and y axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    xGroup.transition(t)
      .call(xAxis)
      .call(g => g.selectAll(".tick"));

    xGroup.selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    yGroup.transition(t)
        .call(yAxis)
      .selection()
        .call(g => g.select(".domain").remove());
  }
    
  // HDI index

  /* Define x-axis, y-axis, and color scales */
  const yScaleLine = d3.scaleLinear()
    .domain([0, d3.max(data, d=>d.hdi)])
    .range([height-margins.bottom, margins.top]);

 
  /* Construct a line generator
    Ref: https://observablehq.com/@d3/line-chart and https://github.com/d3/d3-shape */
  let line = d3.line()
    .curve(d3.curveLinear)
    .x(d => 4+xScale(d.country))
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

    function updateLineChart(){
        // Get the selected year and sorting method
        let newData = animationFilter(data);
        // if (sort == 'alphabet') {
        //     newData = newData.sort((a, b) => d3.ascending(a.country, b.country));
        // }
        // else if (sort == 'pctAsce') {
        //     newData = newData.sort((a, b) => d3.ascending(a.haq, b.haq));
        // }
        // else {
        //     newData = newData.sort((a, b) => d3.descending(a.haq, b.haq));
        // }

        // Define new x and y scales
        const xScale = d3.scaleBand()
            .domain(newData.map(d => d.country))
            .range([margins.left, width - margins.right])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(newData, d => d.haq)])
            .range([height - margins.bottom, margins.top]);

        // Define a transition.
        const t = d3.transition().duration(1000);
        
        // Update the line chart with enter, update, and exit pattern
        // TO DO
            
        // Transition on the x and y axes
        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

        xGroup.transition(t)
            .call(xAxis)
            .call(g => g.selectAll(".tick"));

        xGroup.selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        yGroup.transition(t)
            .call(yAxis)
            .selection()
            .call(g => g.select(".domain").remove());
        }
        
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", -40)
        .attr("y",2)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("HAQ score (bars)");

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", -40)
        .attr("y", 0 + width - margins.right/3)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("HDI score (line)");

    // Add event listener to the year slider
    d3.select("#yearSlider").on("change", function(e) {
        // Update the chart
        updateBarChart();
        updateLineChart();
    });

    // Add event listener to the sort dropdown
    d3.select("#gdp").on("change", function(e) {
        updateBarChart();
        updateLineChart();
    });
    // Add event listener to the sort dropdown
    d3.select("#selectCountry").on("change", function(e) {
        updateBarChart();
        updateLineChart();
    });
}
