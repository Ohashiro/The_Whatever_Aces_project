import {RadarChart} from './d3-spider-chart/src/radar-chart.js';

const dataPerHAQLevel=(data)=>{
    const data2015=data.filter((data)=>data.year===2015 && data.nb_hospitals!=0 && data.nb_hospitals!=+data && data.nb_general_practitionners!=0 && data.nb_general_practitionners!=+data );
    const lowHAQLimit= (d3.max(data2015, d=>d.haq)-d3.min(data2015, d=>d.haq))/3+d3.min(data2015, d=>d.haq);
    console.log({lowHAQLimit})
    const midHAQLimit= (d3.max(data2015, d=>d.haq)-d3.min(data2015, d=>d.haq))*2/3+d3.min(data2015, d=>d.haq);;
    console.log({midHAQLimit})
    const dataLowHAQ=data2015.filter((data)=>data.haq<lowHAQLimit);
    const dataMidHAQ=data2015.filter((data)=>data.haq>lowHAQLimit && data.haq<midHAQLimit);
    const dataHighHAQ=data2015.filter((data)=>data.haq>midHAQLimit);
    const lowHAQ={className: "lowHAQ", axes: [
        {axis: "Number of hospitals per 100,000 people", value: d3.mean(dataLowHAQ, d=>d.nb_hospitals/d.population*100000)},
        {axis: "Number of beds per 1,000 people", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_beds/d.population*1000)},
        {axis: "Number of general practitionners per 10,000 people", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_general_practitionners/d.population*10000)},
        {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_specialists/d.population*10000)},
        {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.remuneration_general_practitionners/10000)},
        {axis: "Number of schools", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_schools)},]};
    const midHAQ={className: "midHAQ", axes: [
        {axis: "Number of hospitals per 100,000 people", value: d3.mean(dataMidHAQ, d=>d.nb_hospitals/d.population*100000)},
        {axis: "Number of beds per 1,000 people", value: d3.mean(dataMidHAQ, d=>d.nb_beds/d.population*1000)},
        {axis: "Number of general practitionners per 10,000 people", value: d3.mean(dataMidHAQ, d=>d.nb_general_practitionners/d.population*10000)},
        {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(dataMidHAQ, d=>d.nb_specialists/d.population*10000)},
        {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(dataMidHAQ, d=>d.remuneration_general_practitionners/10000)},
        {axis: "Number of schools", value: d3.mean(dataMidHAQ, d=>d.nb_schools)},]};
    const highHAQ={className: "highHAQ", axes: [
        {axis: "Number of hospitals per 100,000 people", value: d3.mean(dataHighHAQ, d=>d.nb_hospitals/d.population*100000)},
        {axis: "Number of beds per 1,000 people", value: d3.mean(dataHighHAQ, d=>d.nb_beds/d.population*1000)},
        {axis: "Number of general practitionners per 10,000 people", value: d3.mean(dataHighHAQ, d=>d.nb_general_practitionners/d.population*10000)},
        {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(dataHighHAQ, d=>d.nb_specialists/d.population*10000)},
        {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(dataHighHAQ, d=>d.remuneration_general_practitionners/10000)},
        {axis: "Number of schools", value: d3.mean(dataHighHAQ, d=>d.nb_schools)},]};
    return [lowHAQ, midHAQ, highHAQ];
    }

export const radarChart = (data) => {
var LegendOptions = ['low HAQ countries','mid HAQ countries','high HAQ countries'];
var colorscale =d3.scaleOrdinal(d3.schemeCategory10)

var w=600, h=600;
var mycfg = {
    w: w,
    h: h,
    maxValue: 0.6,
    levels: 6,
    ExtraWidthX: 300
  }
var dataProcessed = dataPerHAQLevel(data);
console.log(dataProcessed,"dataProcessed")
RadarChart.draw("#radar", dataProcessed, mycfg);

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
