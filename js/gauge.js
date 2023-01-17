import {animationFilter} from "./animation_components.js";

export const gaugeChart = (data) => {
    // let year = d3.select("#yearSlider").node().value;
    // let worldData = data.filter(data => data.year == year);
    let worldData = data.filter(data => data.year == 2015);
    let scores = averageScore(worldData);
    let meanHAQ = scores[0];
    let meanHDI = scores[1];
    let meanLifeEx = scores[2];

    let newData = animationFilter(data);
    let newScores = averageScore(newData);
    let newHAQ = newScores[0];
    let newHDI = newScores[1];
    let newLifeEx = newScores[2];

    gaugeLayout(newHAQ,100,meanHAQ,'gaugeHAQ','HAQ score');
    gaugeLayout(newHDI,1,meanHDI,'gaugeHDI', 'HDI score');
    gaugeLayout(newLifeEx,100,meanLifeEx,'gaugeLifeExpectancy', 'Life expectancy');
    draw();
}

function averageScore(data) {
    let meanHAQ = 0;
    let meanHDI = 0;
    let meanLifeEx = 0;
    let totalHDI = 0;
    let totalHAQ = 0;
    let totalLifeEx = 0;
    for (let i = 0; i<data.length; i++) {
        if (data[i].haq) {
            meanHAQ += data[i].haq;
            totalHAQ += 1;
        }
        if (data[i].hdi) {
            meanHDI += data[i].hdi;
            totalHDI += 1;
        }
        if (data[i].life) {
            meanLifeEx += data[i].life;
            totalLifeEx += 1;
        }
    }
    return [meanHAQ/totalHAQ,meanHDI/totalHDI,meanLifeEx/totalLifeEx];
}

function gaugeLayout(indicatedvalue,maxvalue,meanvalue,divname,title) {
    var gaugeChart = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: indicatedvalue,
          title: { text: title },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: meanvalue },
          gauge: {
            axis: { range: [null, maxvalue] },
            bar: { color: "#68D47A" },
            threshold: { // world average
              line: { color: "red", width: 3 },
              thickness: 0.75,
              value: meanvalue
      
            }
          }
        }
      ];
    
    var layout = { width: 300, height: 200, margin: { t: 0, b: 0 } };
    Plotly.newPlot(divname, gaugeChart, layout);
}

export const updateGaugesChart = (data) => {
    let newData = animationFilter(data);

    // let year = d3.select("#yearSlider").node().value;
    // let worldData = data.filter(data => data.year == year);
    // let worldData = data.map((x) => x);
    let worldData = data.filter(data => data.year == 2015);
    let scores = averageScore(worldData);
    let meanHAQ = scores[0];
    let meanHDI = scores[1];
    let meanLifeEx = scores[2];

    let newScores = averageScore(newData);
    let newHAQ = newScores[0];
    let newHDI = newScores[1];
    let newLifeEx = newScores[2];

    gaugeLayout(newHAQ,100,meanHAQ,'gaugeHAQ','HAQ score');
    gaugeLayout(newHDI,1,meanHDI,'gaugeHDI', 'HDI score');
    gaugeLayout(newLifeEx,100,meanLifeEx,'gaugeLifeExpectancy', 'Life expectancy');
    
  }

  function draw() {
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // set line stroke and line width
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(10, 5);
    ctx.lineTo(30, 5);
    ctx.stroke();

}