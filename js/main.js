import {createBarChart} from "./barChart.js";

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
    d3.csv("../data/Average_Monthly_Net_salary.csv", d => {
        return {
            'rank_salary': d.Rank,
            'country': d.Country,
            'salary': +d['Average Monthly Net Salary (US$)']
        }
    }),
    d3.csv("../data/Cost_of_education - Sheet1.csv", d => {
        return {
            'country': d.Country,
            'nb_of_schools': +d['Number schools'],
            'min_fees': +d['Total Fees per Year (USD) MIN'],
            'max_fees': +d['Total Fees per Year (USD) MAX']
        }
    }),
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
            'code': +d.Code,
            'life_expectancy': +d['Life expectancy'],
        }
    }),
    d3.csv("../data/MedicalRessourcesOECD_processed.csv", d => {
        //TO DO: precise that the csv is formatted with ";" rather than ","
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
        }
    }),
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
    d3.csv("../data/tuition_fee_and_average_salary.csv"),
]).then(function(files) {
    for (let i = 0; i < files.length; i++){
        console.log("data from "+data_sets[i]);
        let file = files[i];
        console.log(file[0]);
        console.log(file.length);
    }

    createBarChart(files[0]);
}).catch(function(err) {
    console.log(err);
})

const createLineChart = (data, colors) => {
    /* Set the dimensions and margins of the graph */
    const width = 900, height = 400;
    const margin = {top: 20, right: 40, bottom: 80, left: 40};

    /* Create the SVG container */
    const svg = d3.select("#bar")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    /* Define x-axis, y-axis, and color scales */
    const yScale = d3.scaleLinear()
        .domain([0,d3.max(data, d=>d.value)])
        .range([margin.left, width-margin.right]);


    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d=>d.date))
        .range([height-margin.bottom, margin.top]);

    /* Construct a line generator
        Ref: https://observablehq.com/@d3/line-chart and https://github.com/d3/d3-shape */
    const line = d3.line()
        .curve(d3.curveLinear)
        .x(d => xScale(d.date))
        .y(d => yScale(d.value));

    /* Group the data for each country
        Ref: https://observablehq.com/@d3/d3-group */
    const group = d3.group(data, d => d.country);

    /* Create line paths for each country */
    const path = svg.selectAll('path')
        .data(group)
        .join('path')
        .attr('d',([i,d]) => line(d))
        .style('stroke','lightgrey')
        .style('stroke-width',2)
        .style('fill','transparent');

    /* Add the tooltip when hover on the line */


    /* Create the x and y axes and append them to the chart */


    /* Add text labels on the right of the chart */

}