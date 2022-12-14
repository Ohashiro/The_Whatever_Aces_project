import {RadarChart} from './d3-spider-chart/src/radar-chart.js';


export const radarChart = (dataProcessed,LegendOptions) => {
var colorscale =d3.scaleOrdinal(d3.schemeCategory10)

var w=600, h=600;
var mycfg = {
    w: w,
    h: h,
    maxValue: 0.6,
    levels: 7,
    ExtraWidthX: 300,
  }
RadarChart.draw("#radar", dataProcessed, mycfg);
var svg = d3.select('#radar')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)
//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("Countries grouped by HAQ level");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	
}

// draw one
