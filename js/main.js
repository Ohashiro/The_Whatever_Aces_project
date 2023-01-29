import { indicesChart } from "./indicesChart.js";
// import {hospitalsChart} from "./hospitalsChart.js";
import { gaugeChart } from "./gauge.js";
import { radarChart, RadarDraw } from "./radar.js";
import { dataPerHAQLevel, dataPerGDPLevel } from "./radarData.js";
import { fillRadarSelectSelector } from "./dropdown2.js";
// data sets list
let data_sets = ["DatasetMerged.csv"];

/* Load the dataset and formatting variables*/
Promise.all([
  // Clé,Country Code,Country Name,Region,Year,GDP (US$),Population (number),HDI,rank legatum index,score legatum,HAQ,Life expectancy,NumbeEasternr of Hospitals,Number of General hospitals,Number of Publicly owned hospitals,Number of Not-for-profit privately owned hospitals,Number of For-profit privately owned hospitals,Total hospital beds,Number of Beds in publicly owned hospitals,Number of Beds in not-for-profit privately owned hospitals,Number of Beds in for-profit privately owned hospitals,Number of Generalist medical practitioners,Number of Specialist medical practitioners,Number of Medical doctors not further defined,Number of Practising nurses,Remuneration of hospital nurses,Remuneration of specialists,Remuneration of general practitioners, Share of gross domestic product (in %) -  All financing schemes, Share of current expenditure on health (in %) -  Government/compulsory schemes, Share of gross domestic product (in %) -  Government/compulsory schemes, Share of current expenditure on health (in %) -  Household out-of-pocket payments, Share of gross domestic product (in %) -  Household out-of-pocket payments, Share of current expenditure on health (in %) - Voluntary health care payment schemes, Share of gross domestic product (in %) -   Voluntary health care payment schemes, Share of current expenditure on health (in %) -  Voluntary schemes/household out-of-pocket payments, Share of gross domestic product (in %) -  Voluntary schemes/household out-of-pocket payments,R&D expenses as PC_GDP (total GOV),R&D expenses as PC_GDP (total HES),R&D expenses as PC_GDP (total BES),R&D expenses as PC_GDP (total),Number schools,Total Fees per Year (USD) MIN,Total Fees per Year (USD) MAX
  d3.csv("data/DatasetMerged.csv", (d) => {
    return {
      country: d["Country Name"],
      code: d["Country Code"],
      year: +d.Year,
      area: d["Region"],
      hdi: +d["HDI"],
      haq: +d["HAQ"],
      gdp: +d["GDP (US$)"],
      population: +d["Population (number)"],
      life: +d["Life expectancy"],
      nb_hospitals: +d["Number of Hospitals"],
      nb_beds: +d["Total hospital beds"],
      nb_general_practitionners:
        +d["Number of Generalist medical practitioners"],
      nb_specialists: +d["Number of Specialist medical practitioners"],
      RD_expenses_as_PC_GDP: +d["R&D expenses as PC_GDP (total)"],
      nb_schools: +d["Number schools"],
      remuneration_general_practitionners:
        +d["Remuneration of general practitioners"],
      remuneration_specialists: +d["Remuneration of specialists"],
      share_gov_expenses:
        +d[
          "Share of gross domestic product (in %) -  Government/compulsory schemes"
        ],
      share_outpocket_expenses:
        +d[
          "Share of gross domestic product (in %) -  Household out-of-pocket payments"
        ],
    };
  }),
])
  .then(function (files) {
    for (let i = 0; i < files.length; i++) {
      console.log("data from " + i + " " + data_sets[i]);
      let file = files[i];
      console.log(file[0]);
      console.log(file.length);
    }
    let mergedDataset = files[0];
    const data2015 = mergedDataset.filter(
      (data) =>
        data.year === 2015 &&
        data.nb_hospitals != 0 &&
        data.nb_hospitals != +data &&
        data.nb_general_practitionners != 0 &&
        data.nb_general_practitionners != +data
    );
    let countries = data2015.map((data) => data.country);
    indicesChart(prepareDataIndicesChart(mergedDataset));
    gaugeChart(mergedDataset);
    radarChart(dataPerHAQLevel(data2015)[0], dataPerHAQLevel(data2015)[1]);
    document
      .getElementById("selectorRadar")
      .addEventListener("click", function () {
        fillRadarSelectSelector(countries);
      });

    document
      .getElementById("selectorRadar")
      .addEventListener("click", function () {
        RadarDraw(data2015);
      });
    document
      .getElementById("radarCountrySelector")
      .addEventListener("change", function () {
        RadarDraw(data2015);
      });
    document
      .getElementById("homeCountryItems")
      .addEventListener("change", function () {
        RadarDraw(data2015);
      });
  })
  .catch(function (err) {
    console.log(err);
  });

function prepareDataIndicesChart(file) {
  let prepared_data = [];
  file = file.filter((data) => data.year == 2015);
  let lowGDPLimit = compute_gdp_profiles(file)[0];
  let midGDPLimit = compute_gdp_profiles(file)[1];
  for (let i = 0; i < file.length; i++) {
    let area = "";
    if (file[i].area) {
      area = file[i].area;
      if (area == "Western Europe" || area == "Eastern Europe") {
        area = "Europe";
      }
    } else {
      let country = file[i].code;
      if (country == "TWN") {
        area = "Asia-Pacific";
      }
      if (country == "PRI") {
        area = "Latin America and the Caribbean";
      }
    }
    file[i].area = area;

    if (file[i].gdp/file[i].population <= lowGDPLimit){
      file[i].gdpProfile = "Low";
    } 
    if (file[i].gdp/file[i].population <= midGDPLimit && file[i].gdp/file[i].population > lowGDPLimit){
      file[i].gdpProfile = "Mid";
    } 
    if (file[i].gdp/file[i].population > midGDPLimit){
      file[i].gdpProfile = "High";
    }
    if (file[i].haq && file[i].hdi) {
      prepared_data.push(file[i]);
    } else {
    }
  }
  return prepared_data;
}

function compute_gdp_profiles(data) {
  let gdp_per_capita_array = [];
  for (let i = 0; i < data.length; i++) {
    gdp_per_capita_array.push(data[i].gdp/data[i].population);
  }
  const lowGDPLimit= d3.quantile(gdp_per_capita_array,0.33);
  const midGDPLimit= d3.quantile(gdp_per_capita_array,0.66);
  return [lowGDPLimit,midGDPLimit]
}
