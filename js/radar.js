import {RadarChart} from './d3-spider-chart/src/radar-chart.js';

// RadarChart.defaultConfig.color = function() {};
// RadarChart.defaultConfig.radius = 3;
// RadarChart.defaultConfig.w = 400;
// RadarChart.defaultConfig.h = 400;


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
        {axis: "nb_hospitals", value: d3.mean(dataLowHAQ, d=>d.nb_hospitals/d.population*100000)},
        {axis: "nb_beds", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_beds/d.population*1000)},
        {axis: "nb_general_practitionners", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_general_practitionners/d.population*10000)},
        {axis: "nb_specialists", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_specialists/d.population*10000)},
        {axis: "remuneration_general_practitionners", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.remuneration_general_practitionners/10000)},
        {axis: "nb_schools", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_schools)},]};
    const midHAQ={className: "midHAQ", axes: [
        {axis: "nb_hospitals", value: d3.mean(dataMidHAQ, d=>d.nb_hospitals/d.population*100000)},
        {axis: "nb_beds", value: d3.mean(dataMidHAQ, d=>d.nb_beds/d.population*1000)},
        {axis: "nb_general_practitionners", value: d3.mean(dataMidHAQ, d=>d.nb_general_practitionners/d.population*10000)},
        {axis: "nb_specialists", value: d3.mean(dataMidHAQ, d=>d.nb_specialists/d.population*10000)},
        {axis: "remuneration_general_practitionners", value: d3.mean(dataMidHAQ, d=>d.remuneration_general_practitionners/10000)},
        {axis: "nb_schools", value: d3.mean(dataMidHAQ, d=>d.nb_schools)},]};
    const highHAQ={className: "highHAQ", axes: [
        {axis: "nb_hospitals", value: d3.mean(dataHighHAQ, d=>d.nb_hospitals/d.population*100000)},
        {axis: "nb_beds", value: d3.mean(dataHighHAQ, d=>d.nb_beds/d.population*1000)},
        {axis: "nb_general_practitionners", value: d3.mean(dataHighHAQ, d=>d.nb_general_practitionners/d.population*10000)},
        {axis: "nb_specialists", value: d3.mean(dataHighHAQ, d=>d.nb_specialists/d.population*10000)},
        {axis: "remuneration_general_practitionners", value: d3.mean(dataHighHAQ, d=>d.remuneration_general_practitionners/10000)},
        {axis: "nb_schools", value: d3.mean(dataHighHAQ, d=>d.nb_schools)},]};
    return [lowHAQ, midHAQ, highHAQ];
    }

export const radarChart = (data) => {

var dataProcessed = dataPerHAQLevel(data);
console.log(dataProcessed,"dataProcessed")
// var d = [
//      [
//            {axis: "strength", value: 13}, 
//            {axis: "intelligence", value: 1}, 
//            {axis: "charisma", value: 8},  
//            {axis: "dexterity", value: 4},  
//            {axis: "luck", value: 9}
//           ],[
//            {axis: "strength", value: 3}, 
//            {axis: "intelligence", value: 15}, 
//            {axis: "charisma", value: 4}, 
//            {axis: "dexterity", value: 1},  
//            {axis: "luck", value: 15}
//           ],[
//            {axis: "strength", value: 5}, 
//            {axis: "intelligence", value: 1}, 
//            {axis: "charisma", value: 16}, 
//            {axis: "dexterity", value: 10},  
//            {axis: "luck", value: 5}
//      ]
// ];

// RadarChart.draw("#chart", d);

   


// var chart = RadarChart.chart();
// var cfg = chart.config(); // retrieve default config
// var svg = d3.select('body').select("#radar").append('svg')
//     .attr('width', cfg.w)
//     .attr('height', cfg.h + cfg.h / 4);
// svg.enter().append('g').classed('single', 1).datum(dataProcessed).call(chart);

// var chart = RadarChart.chart();
// var cfg = chart.config(); // retrieve default config
// var svg = d3.select("body")
//   .select("#radar")
//   .append("svg")
//   .attr("width", 600)
//   .attr("height", 800);
//   svg.append("g").datum(dataProcessed).enter().append("g").classed("focus", 1).call(chart)
//     RadarChart.defaultConfig.levelTick = true;  
RadarChart.draw("#radar", dataProcessed);
  }

// draw one
