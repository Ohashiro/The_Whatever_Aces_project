import {createBarChart} from "./barChart.js";
import {indicesChart} from "./indicesChart.js";import {hdiChart} from "./hdiChart.js";
import {hospitalsChart} from "./hospitalsChart.js";
// data sets list
let data_sets = [
    'Average_Monthly_Net_salary.csv',
    'Cost_of_education - Sheet1.csv',
    'generalData-processed.csv', //GDP, Population, HDI
    'health_care_index_legatum.csv',
    'health_care_index_with_access.csv',
    'MedicalRessourcesOECD_processed.csv',
    'OECD_health_exp_processed.csv',
    'R_D-expend-processed.csv',
    'tuition_fee_and_average_salary.csv'
];

let data_structures = {
    'Average_Monthly_Net_salary.csv':{},
    'Cost_of_education - Sheet1.csv':{},
    'generalData-processed.csv':{},
    'health_care_index_legatum.csv':{},
    'health_care_index_with_access.csv':{},
    'MedicalRessourcesOECD_processed.csv':{},
    'OECD_health_exp_processed.csv':{},
    'R_D-expend-processed.csv':{},
    'tuition_fee_and_average_salary.csv':{},
};

/* Load the dataset and formatting variables*/
Promise.all([
    // 0
    d3.csv("../data/Average_Monthly_Net_salary.csv", d => {
        return {
            'rank_salary': d.Rank,
            'country': d.Country,
            'salary': +d['Average Monthly Net Salary (US$)']
        }
    }),
    // 1
    d3.csv("../data/Cost_of_education - Sheet1.csv", d => {
        return {
            'country': d.Country,
            'nb_of_schools': +d['Number schools'],
            'min_fees': +d['Total Fees per Year (USD) MIN'],
            'max_fees': +d['Total Fees per Year (USD) MAX']
        }
    }),
    // 2
    d3.csv("../data/generalData-processed.csv", d => {
        return {
            'code': d['Country Code'],
            'country': d['Country Name'],
            'year': +d['Year'],
            'gdp': +d['GDP (US$)'],
            'pop': +d['Population (number)'],
            'hdi': +d['HDI']
        }
    }),
    // 3
    d3.csv("../data/health_care_index_legatum.csv", d => {
        return {
            'country': d.Country,
            'area': d.Area,
            'rank_2010': +d.rank_2010,
            'rank_2015': +d.rank_2015,
            'rank_2020': +d.rank_2020,
            'rank_2021': +d.rank_2021,
            'score_2010': +d.score_2010,
            'score_2015': +d.score_2015,
            'score_2020': +d.score_2020,
            'score_2021': +d.score_2021,
            'year': +d.Year,
            'haq_2017': +d['HAQ index (IHME (2017))'],
            'code': d.Code,
            'life_expectancy': +d['Life expectancy']
        }
    }),
    // 4
    d3.csv("../data/health_care_index_with_access.csv", d => {
        return {
            'rank': d.Rank,
            'country': d.Country,
            'haq': +d['Health Care Index (Overall)'],
            'infra': +d['Infrastructure'],
            'pro': +d['Professionals'],
            'cost': +d.Cost,
            'medicine': +d['Medicine Availability'],
            'readiness': +d['Government Readiness'],
            'year': +d.Year,
            'haq_2017': +d['HAQ index (IHME (2017))'],
            'code': d['Code'],
            'life_expectancy': +d['Life expectancy'],
        }
    }),
    // 5
    d3.csv( "../data/MedicalRessourcesOECD_processed.csv", d => {
        return {
            'code': d['CountryCode'],
            'country': d['CountryName'],
            'year': +d['Year'],
            'nb_hospitals': +d['Number of Hospitals'],
            'nb_public_hospitals': +d['Number of Publicly owned hospitals'],
            'nb_non_profit_hospitals': +d['Number of Not-for-profit privately owned hospitals'],
            'nb_profit_hospitals': +d['Number of For-profit privatey owned hospitals'],
            'nb_beds': +d['Total hospital beds'],
            'nb_public_beds': +d['Number of Beds in publicly owned hospitals'],
            'nb_non_profit_beds': +d['Number of beds in not-for-profit privately owned hospitals'],
            'nb_profit_beds': +d['Number of beds in for-profit privatey owned hospitals'],
            'nb_generalists': +d['Number of Generalist medical practitioners'],
            'nb_specialists': +d['Number of Specialist medical practitioners'],
            'nb_doctors': +d['Number of Medical doctors not further defined'],
            'nb_nurses': +d['Number of Practising nurses'],
            'nurses_salary': +d['Remuneration of hospital nurses'],
            'specialists_salary': +d['Remuneration of specialists'],
            'generalists_salary': +d['Remuneration of general practitioners'],
            'haq': +d['HAQ'],
            'hospitals_per_capita':+d["Number of hospitals per capita"],
            'area': d['Area'],
        }
    }),
    // 6
    d3.csv("../data/OECD_health_exp_processed.csv", d => {
        return {
            'code': d["'Country code'"],
            'year': +d[" 'Year'"],
            'financing_scheme': d[" 'Financing scheme'"],
            'function': d[" 'Function'"],
            'provider': d[" 'Provider'"],
            'share_health_expenses': +d[" 'Share of current expenditure on health (in %)'"],
            'share_gdp': +d[" 'Share of gross domestic product (in %)'"],
        }
    }),
    // 7
    d3.csv("../data/R_D-expend-processed.csv", d => {
        return {
            'country': d["'Country'"],
            'code': d["'Country Code'"],
            'year': +d["'Year'"],
            'r_d_category': d["'Category of R&D'"],
            'r_d_expenses_GOV': +d["'R&D expenses as PC_GDP (total GOV)'"],
            'r_d_expenses_HES': +d["'R&D expenses as PC_GDP (total HES)''"],
            'r_d_expenses_BES': +d["'R&D expenses as PC_GDP (total BES)''"],
            'r_d_expenses_total': +d["'R&D expenses as PC_GDP (total)''"]
        }
    }),
    // 8
    d3.csv("../data/tuition_fee_and_average_salary.csv"),
]).then(function(files) {
    for (let i = 0; i < files.length; i++){
        console.log("data from "+i+" "+data_sets[i]);
        let file = files[i];
        console.log(file[0]);
        console.log(file.length);
    }
    let indicesData = prepareDataIndicesChart([files[3],files[4],files[2]])
    createBarChart(files[0]);
    indicesChart(indicesData);
    hospitalsChart(files[5]);

    
}).catch(function(err) {
    console.log(err);
})


function prepareDataIndicesChart(files) {
    let legatum_file = files[0];
    let HAQ_file = files[1];
    let HDI_file = files[2];
    let prepared_data = [];
    for (let i = 0; i < HAQ_file.length; i++){
        let country = HAQ_file[i]["code"];
        let area_found = false;
        let hdi_found = false;
        for (let j = 0; j < legatum_file.length; j++){
            
            if (legatum_file[j].code == country){
                var area = legatum_file[j].area;

                if (area == 'Western Europe' || area == 'Eastern Europe') {
                    area = 'Europe';
                }
                HAQ_file[i]['area'] = area;
                area_found = true;
                break;
            }
        }
        for (let j = 0; j < HDI_file.length; j++){
            
            if (HDI_file[j].code == country){
                var hdi = HDI_file[j].hdi;
                HAQ_file[i]['hdi'] = hdi;
                hdi_found = true;
                break;
            }
        }
        if (!area_found){
            var area = 'Unknown';
            if (country == 'TWN') {
                area = 'Asia-Pacific';
            }
            if (country == 'PRI') {
                area = 'Latin America and the Caribbean';
            }
            HAQ_file[i]['area'] = area;
        }
        if (hdi_found && HAQ_file[i]['hdi'] != 0){
            prepared_data.push(HAQ_file[i]);
        }
    }
    return prepared_data
}

const createLineChart = (data, color) => {
    /* Set the dimensions and margins of the graph */
    const width = 900, height = 400;
    // [NEW] Change the right margin to show the country names
    //const margins = {top: 20, right: 40, bottom: 80, left: 40};
    const margins = {top: 20, right: 100, bottom: 80, left: 40};
  
    /* Create the SVG container */
    const svg = d3.select("#line")
      .append("svg")
        .attr("viewBox", [0, 0, width, height]);
  
    console.log(data);
  
    /* Define x-axis, y-axis, and color scales */
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d=>d.value)])
      .range([height - margins.bottom, margins.top]);
  
    console.log(yScale(22));
  
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margins.left, width - margins.right]); 
  
    /* Construct a line generator
      Ref: https://observablehq.com/@d3/line-chart and https://github.com/d3/d3-shape */
    const line = d3.line()
      .curve(d3.curveLinear)
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));
  
    /* Group the data for each country
      Ref: https://observablehq.com/@d3/d3-group */
    const group = d3.group(data, d => d.country);
    console.log(group);
  
    /* Create line paths for each country */
    const path = svg.selectAll('path')
      .data(group)
      .join('path')
        .attr('d', ([i, d]) => line(d))
        .style('stroke', ([i, d]) => color(i)) // [NEW] Change the stroke color to align with bar chart
        .style('stroke-width', 2)
        .style('fill', 'transparent')
        .style('opacity', 0.8); // [NEW] Add opacity to the line
  
    /* [NEW] Add the tooltip when hover on the line */
    path.append('title').text(([i, d]) => i);
  
    /* [NEW] Create the x and y axes and append them to the chart */
    const xAxis = d3.axisBottom(xScale);
  
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
        .attr('y', d => yScale(d.value))
        .attr('dy', '0.35em')
        .style('font-family', 'sans-serif')
        .style('font-size', 12)
        .style('fill', d => color(d.country))
      .text(d => d.country);
  }