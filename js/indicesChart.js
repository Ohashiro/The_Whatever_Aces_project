import {animationFilter} from "./animation_components.js";
import { updateGaugesChart } from "./gauge.js";

export const indicesChart = (data) => {
    /* Set the dimensions and margins of the graph */
    const width = 1200, height = 400;
    const margins = {top: 50, right: 40, bottom: 120, left: 40};

    // Filter the data from the year 2020
    let newData = data.filter(data => data.year == 2015);
    initializeFilters();

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
        //.range(d3.schemeTableau10); // work for less than 10 categories, if more, cycle
        .range(["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]);

    let legend = barLegend(svg,color,margins,width,height);

    let bar=svg.append("g")
        .selectAll("rect")
        .data(newData, data => data.code)
        .join("rect")
        .attr("class", d => d.code)
        //.attr("class", "bars")
        .style('opacity', 0.6)
        .attr("x", d => xScale(d.country))
        .attr("y", d => yScale(d.haq))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(0) - yScale(d.haq))
        //.attr("fill", "lightgrey")
        .attr("fill", d => color(d.area))
        .call(legend)

    function mouseover() {
        // Get the haq and color of the selected bar
        const code = d3.select(this).attr('class');
        console.log("code",code);
        console.log(d3.select(`text.${code}`));
        const colors = d3.select(this).attr('fill');
    
        // Highlight the bar with black stroke
        // bar.select("this").style("stroke","#333")
        //     .style("stroke-width",2);
    
        // Highlight the line with the color
        d3.select(this)//select(`path.${code}`)
            .style("stroke",colors)
            .style("opacity",1)
    
        // Make the text label visible
        d3.select(`text.${code}`).style("visibility","visible");
        }
    bar.on("mouseover", mouseover);

    function mouseout() {
        // Get the haq of the selected bar
        const code = d3.select(this).attr('class');
        // Change the highlight stroke in the bar back to normal
        
        bar.select("this").style("stroke",null);
    
        // Change the line color to lightgrey
        d3.select(this)//.select(`path.${code}`)
        .style("stroke",null)
        .style("opacity",0.6)
    
        // Make the text label invisible again
        d3.select(`text.${code}`).style("visibility","hidden");
        // d3.select(this.text).style("visibility","hidden");
    }
    bar.on("mouseout", mouseout);

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
    let yScaleLine = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d.hdi)])
        .range([height-margins.bottom, margins.top]);

 
    /* Construct a line generator
        Ref: https://observablehq.com/@d3/line-chart and https://github.com/d3/d3-shape */
    let line = d3.line()
        .curve(d3.curveLinear)
        .x(d => width/(newData.length*3)+xScale(d.country))
        .y(d => yScaleLine(d.hdi) - yScaleLine(0));

    /* Group the data for each country
        Ref: https://observablehq.com/@d3/d3-group */
    for (let j = 0; j < newData.length; j++){
        if (newData[j].hdi){
            newData[j]['group'] = 1;
        } else{
            newData[j]['group'] = 0;
        }
        
    }
    let group = d3.group(newData, d =>  d.group );
    console.log("group",group);
  

    /* Create line paths for each country */
    var path = svg.selectAll('path')
        .data(group)
        .join('path')
        .attr('d', ([i, d]) => line(d)) 
        .style('stroke', '#576CC2')
        .style('stroke-width', 2)
        .style('fill', 'transparent')
        .style('opacity', 1); // [NEW] Add opacity to the line

    path.append('title').text(([i, d]) => i);
    const yAxisLine = d3.axisRight(yScaleLine);

    svg.append("g")
        .attr("transform", `translate(${width - margins.right},0)`)
        .call(yAxisLine)

  /* [NEW] Add text labels on the right of the chart */
    const data2020 = data.filter(data => data.year === 2015);
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
    // d3.select("#yearSlider").on("change", function(e) {
    //     // Update the chart
    //     bar = updateBarChart(bar,data,color,margins,height,width,xGroup,yGroup,mouseover,mouseout);
    //     updateGaugesChart(data);
    //     path,line = updateLineChart(path,line,data,margins,height,width,yGroup);
    // });

    d3.select("#generalForm").on("change", function(e) {
        // when gdp profile is selected, we set country to "All"
        // var selectCountriesText = document.getElementById("selectCountriesText");
        // let selectedCountries = setCountries("All");
        // selectCountriesText.value = selectedCountries.join();

        bar = updateBarChart(bar,data,color,margins,height,width,xGroup,yGroup,mouseover,mouseout);
        updateGaugesChart(data);
        path,line = updateLineChart(path,line,data,margins,height,width,yGroup);
    });
    d3.selectAll("input").on("change", function(e) {
        bar = updateBarChart(bar,data,color,margins,height,width,xGroup,yGroup,mouseover,mouseout);
        updateGaugesChart(data);
        path,line = updateLineChart(path,line,data,margins,height,width,yGroup);
    });
    d3.select("#sortSelectorDiv").on("change", function(e) {
        bar = updateBarChart(bar,data,color,margins,height,width,xGroup,yGroup,mouseover,mouseout);
        updateGaugesChart(data);
        path,line = updateLineChart(path,line,data,margins,height,width,yGroup);
    });
}

function barLegend(svg,color,margins,width,height) {
    // Legend creation
    var legend = d3.legendColor()
        .scale(color);
    const svg_legend = d3.select("#bar-legend")
        .append("svg")
        .attr("viewBox", [0, 0, width/5, height]);

    svg_legend.append("g")
        .attr("transform", "translate(0,110)")
        .call(legend);

    // svg.append("text")
    //     .attr("x", width/2)             
    //     .attr("y", 0 + 2*(margins.top)/3)
    //     .attr("text-anchor", "middle")  
    //     .style("font-size", "25px")
    //     .text("HAQ and HDI score by country");
    return legend
}

function setCountries(value) {
    var myCountries = document.querySelectorAll('.country');
    //var selectCountriesText = document.getElementById("selectCountriesText");
    let selectCountriesText = d3.select("#selectCountriesText").node().value;
    var selectedCountries = selectCountriesText.split(",");
    for (let i = 0; i < myCountries.length; ++i) {
        let selectedCountry = myCountries[i];
        if (selectedCountry.value != value && selectedCountries.includes(selectedCountry.value)){
            selectedCountry.classList.remove('selected');
            selectedCountry.checked = false;
            // remove from selectedCountries
            let index = selectedCountries.indexOf(selectedCountry.value);
            if (index > -1) {
                selectedCountries.splice(index, 1);
            }
        }
        if (selectedCountry.value == value && !selectedCountries.includes(value)) {
            selectedCountry.classList.add('selected');
            // add to selectedCountries
            selectedCountries.push(selectedCountry.value);
        }
    }
    return selectedCountries;
}

function setGDPprofile(gdp_value) {
    document.getElementById(gdp_value).checked = true;
}

function setSort(value) {
    document.getElementById(value).checked = true;
}

// function setYear(value) {
//     var ddl = document.getElementById('yearSlider');
//     ddl.value = value;
//     ddl = document.getElementById('yearText');
//     ddl.value = value.toString();
// }

function initializeFilters() {
    // setCountry("All");
    setGDPprofile("all");
    setSort("alphabet");
    // setYear(2015);
}

function updateBarChart(bar,data,color,margins,height,width,xGroup,yGroup,mouseover,mouseout) {
    let newData = animationFilter(data);

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
      .data(newData, d => d.code)
      .join(
        enter => enter.append("rect")
          .attr("class", d => d.code)
          .attr("x", d => xScale(d.country))
          .attr("y", d => yScale(d.haq))
          .attr("height", d => - yScale(d.haq))
          .attr("width", xScale.bandwidth())
          .attr("fill", d => color(d.area))
          .attr("opacity", 0.7)
          .on("mouseover",mouseover)
          .on("mouseout",mouseout)
          .call(enter => enter.transition(t)
            .attr("height",d => yScale(0) - yScale(d.haq))),
        update => update.transition(t)
          .attr("x", d => xScale(d.country))
          .attr("y", d => yScale(d.haq))
          .attr("height", d => yScale(0) - yScale(d.haq))
          .attr("opacity", 0.7)
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
    return bar;
}

function updateLineChart(path,line,data,margins,height,width,yGroup) {
    console.log('update line chart...')
    // Get the selected year and sorting method
    let newData = animationFilter(data);

    // Define new x and y scales
    const xScale = d3.scaleBand()
        .domain(newData.map(d => d.country))
        .range([margins.left, width - margins.right])
        .padding(0.2);

    // Define a transition.
    const t = d3.transition().duration(1000);
    
    // Update the line chart with enter, update, and exit pattern
    for (let j = 0; j < newData.length; j++){
        if (newData[j].hdi){
            newData[j]['group'] = 1;
        } else{
            newData[j]['group'] = 0;
        }
    }
    let group = d3.group(newData, d =>  d.group );
  
    let newyScaleLine = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d.hdi)])
        .range([height-margins.bottom, margins.top]);
 
    /* Construct a line generator
        Ref: https://observablehq.com/@d3/line-chart and https://github.com/d3/d3-shape */
    let newline = d3.line()
        .curve(d3.curveLinear)
        .x(d => width/(newData.length*3)+xScale(d.country))
        .y(d => newyScaleLine(d.hdi) - newyScaleLine(0));
    

    /* Create line paths for each country */
    path = path
        .data(group)
        .join(
            enter => enter.selectAll('path')//append("rect")
                .attr("class", d => d.code)
                .style('stroke', '#576CC2')
                .style('stroke-width', 2)
                .style('fill', 'transparent')
                .style('opacity', 1)
                //.attr('d', ([i, d]) => line(d))
                .call(enter => enter.transition(t)
                    .attr('d', ([i, d]) => newline(d))),
            update => update.transition(t)
                .attr('d', ([i, d]) => newline(d)),
            exit => exit.transition(t)
                .attr('d', ([i, d]) => - newline(0)) 
                .remove()
          )
    
    path.append('title').text(([i, d]) => i);
    return path,newline
    }



