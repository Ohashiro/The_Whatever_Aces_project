import {indicesChart} from "./indicesChart.js";
import {hospitalsChart} from "./hospitalsChart.js";
import {gaugeChart} from "./gauge.js"
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
    'tuition_fee_and_average_salary.csv',
    'DatasetMerged.csv'
];


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
    // 9
    // Clé,Country Code,Country Name,Region,Year,GDP (US$),Population (number),HDI,rank legatum index,score legatum,HAQ,Life expectancy,NumbeEasternr of Hospitals,Number of General hospitals,Number of Publicly owned hospitals,Number of Not-for-profit privately owned hospitals,Number of For-profit privately owned hospitals,Total hospital beds,Number of Beds in publicly owned hospitals,Number of Beds in not-for-profit privately owned hospitals,Number of Beds in for-profit privately owned hospitals,Number of Generalist medical practitioners,Number of Specialist medical practitioners,Number of Medical doctors not further defined,Number of Practising nurses,Remuneration of hospital nurses,Remuneration of specialists,Remuneration of general practitioners, Share of gross domestic product (in %) -  All financing schemes, Share of current expenditure on health (in %) -  Government/compulsory schemes, Share of gross domestic product (in %) -  Government/compulsory schemes, Share of current expenditure on health (in %) -  Household out-of-pocket payments, Share of gross domestic product (in %) -  Household out-of-pocket payments, Share of current expenditure on health (in %) - Voluntary health care payment schemes, Share of gross domestic product (in %) -   Voluntary health care payment schemes, Share of current expenditure on health (in %) -  Voluntary schemes/household out-of-pocket payments, Share of gross domestic product (in %) -  Voluntary schemes/household out-of-pocket payments,R&D expenses as PC_GDP (total GOV),R&D expenses as PC_GDP (total HES),R&D expenses as PC_GDP (total BES),R&D expenses as PC_GDP (total),Number schools,Total Fees per Year (USD) MIN,Total Fees per Year (USD) MAX
    d3.csv("../data/DatasetMerged.csv", d => {
        return {
            'country': d['Country Name'],
            'code': d['Country Code'],
            'year': +d.Year,
            'area': d['Region'],
            'hdi': +d['HDI'],
            'haq': +d['HAQ'],
            'gdp': +d['GDP (US$)'],
            'life': +d['Life expectancy'],
            
        }
    })
]).then(function(files) {
    for (let i = 0; i < files.length; i++){
        console.log("data from "+i+" "+data_sets[i]);
        let file = files[i];
        console.log(file[0]);
        console.log(file.length);
    }
    //let indicesData = prepareDataIndicesChart([files[3],files[4],files[2]])
    //indicesChart(indicesData);
    indicesChart(prepareDataIndicesChart(files[9]));
    hospitalsChart(files[5]);
    gaugeChart(files[9]);
    
}).catch(function(err) {
    console.log(err);
})

function prepareDataIndicesChart(file) {

    let prepared_data = [];
    for (let i = 0; i<file.length; i++){
        if (file[i].haq){
            prepared_data.push(file[i]);
        } else {
        }
    }
    return prepared_data
}

function prepareDataIndicesChar_old(files) {
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
