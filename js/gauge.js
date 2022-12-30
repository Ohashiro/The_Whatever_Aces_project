import {animationFilter} from "./animation_components.js";

export const gaugeChart = (data) => {
    let scores = averageScore(data);
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


     // Add event listener to the year slider
     d3.select("#yearSlider").on("change", function(e) {
        // Update the chart
        updateGaugesChart(data);
    });

    // Add event listener to the sort dropdown
    d3.select("#gdp").on("change", function(e) {
        updateGaugesChart(data);
    });
    // Add event listener to the sort dropdown
    d3.select("#selectCountry").on("change", function(e) {
        updateGaugesChart(data);
    });
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
        //   delta: { reference: 380 },
          gauge: {
            axis: { range: [null, maxvalue] },
            threshold: {
              line: { color: "red", width: 2 },
              thickness: 0.75,
              value: meanvalue
      
            }
          }
        }
      ];
    
    var layout = { width: 300, height: 250, margin: { t: 0, b: 0 } };
    Plotly.newPlot(divname, gaugeChart, layout);
}

function updateGaugesChart(data) {
    // Get the selected year and sorting method
    console.log("year chosen",d3.select("#yearSlider").node().value);
    let newData = animationFilter(data);

    let scores = averageScore(data);
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