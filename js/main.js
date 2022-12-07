// data sets list

data_sets = [
    'Average_Monthly_Net_salary.csv',
    'Cost_of_education - Sheet1.csv',
    'generalData-processed.csv', //GDP, Population, HDI
    'health_care_index_legatum.csv',
    'health_care_index_with_access.csv',
    'MedicalRessourcesOECD_processed.csv',
    'number_of_medical_school_and_population.csv',
    'number_of_school_and_health_index.csv',
    'OECD_health_exp_processed.csv',
    'R_D-expend-processed.csv',
    'tuition_fee_and_average_salary.csv'
]

data_structures = {
    'Average_Monthly_Net_salary.csv':{},
    'Cost_of_education - Sheet1.csv':{},
    'generalData-processed.csv':{},
    'health_care_index_legatum.csv':{},
    'health_care_index_with_access.csv':{},
    'MedicalRessourcesOECD_processed.csv':{},
    'number_of_medical_school_and_population.csv':{},
    'number_of_school_and_health_index.csv':{},
    'OECD_health_exp_processed.csv':{},
    'R_D-expend-processed.csv':{},
    'tuition_fee_and_average_salary.csv':{},
}

/* Load the dataset and formatting variables*/
Promise.all([
    d3.csv("../data/Average_Monthly_Net_salary.csv", d => {
        return {
            'Rank': d.rank_salary,
            'Country': d.country,
            'Average Monthly Net Salary (US$)': d.salary
        }
    }),
    d3.csv("../data/Cost_of_education - Sheet1.csv", d => {
        return {
            'Country': d.country,
            'Number schools': d.nb_of_schools,
            'Total Fees per Year (USD) MIN': d.min_fees,
            'Total Fees per Year (USD) MAX': d.max_fees
        }
    }),
    d3.csv("../data/generalData-processed.csv", d => {
        return {
            'Country Code': d.code,
            'Country Name': d.country,
            'Year': +d.year,
            'GDP (US$)': +d.gdp,
            'Population (number)': +d.pop,
            'HDI': +d.hdi
        }
    }),
    d3.csv("../data/health_care_index_legatum.csv", d => {
        return {
            'id': d.id,
            'Country': d.country,
            'Area': d.area,
            'rank_2010': d.rank_2010,
            'rank_2015': d.rank_2015,
            'rank_2020': d.rank_2020,
            'rank_2021': d.rank_2021,
            'score_2010': d.score_2010,
            'score_2015': d.score_2015,
            'score_2020': d.score_2020,
            'score_2021': d.score_2021,
            'Year': d.year,
            'HAQ index (IHME (2017))': d.haq_2017,
            'Code': d.code,
            'Life expectancy': d.life_expectancy,
        }
    }),
    d3.csv("../data/health_care_index_with_access.csv", d => {
        return {
            'id': d.id,
            'Rank': d.rank,
            'Country': d.country,
            'Health Care Index (Overall)': +d.haq,
            'Infrastructure': +d.infra,
            'Professionals': +d.pro,
            'Cost': +d.cost,
            'Medicine Availability': +d.medicine,
            'Government Readiness': +d.readiness,
            'Year': +d.year,
            'HAQ index (IHME (2017))': +d.haq_2017,
            'Code': +d.code,
            'Life expectancy': +d.life_expectancy,
        }
    }),
    d3.csv("../data/MedicalRessourcesOECD_processed.csv", d => {
        return {
        }
    }),
    d3.csv("../data/number_of_medical_school_and_population.csv", d => {
        return {
        }
    }),
    d3.csv("../data/number_of_school_and_health_index.csv", d => {
        return {
        }
    }),
    d3.csv("../data/OECD_health_exp_processed.csv", d => {
        return {
        }
    }),
    d3.csv("../data/R_D-expend-processed.csv", d => {
        return {
        }
    }),
    d3.csv("../data/tuition_fee_and_average_salary.csv", d => {
        return {
        }
    }),
]).then(function(files) {
    for (let i = 0; i < files.length; i++){
        console.log("data from "+data_sets[i])
        console.log(files[i]);
    }
}).catch(function(err) {
    console.log(err)
})

const createBarChart = (data) => {
    /* Set the dimensions and margins of the graph */
    const width = 900, height = 400;
    const margins = {top: 20, right: 40, bottom: 80, left: 40};

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
        .domain([0, d3.max(data, d => d.value)])
        .range([height-margins.bottom, margins.top])


    /* Working with Color: https://observablehq.com/@d3/working-with-color
        Color schemes: https://observablehq.com/@d3/color-schemes 
        d3-scale-chromatic: https://github.com/d3/d3-scale-chromatic */
    const countries = data.map(d => d.country);
    const color=d3.scaleOrdinal()
        .domain(countries)
        .range(d3.schemeTableau10); // work for less than 10 categories, if more, cycle

    /* Create the bar elements and append to the SVG group
        Ref: https://observablehq.com/@d3/bar-chart */
    const bar=svg.append("g")
        .attr("class", "bars")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => xScale(d.country))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(0) - yScale(d.value))
        .attr("fill", "lightgrey")
        .attr("fill", d => color(d.country));

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
}

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