const axesDefinitionMean = (data2015, axisName) => {
  data2015 = data2015.filter((d) => d !== +d && d != 0);
  const axes = {
    className: axisName,
    axes: [
      {
        axis: "Number of hospitals per 100,000 people",
        value: d3.mean(
          data2015,
          (d) => (d.nb_hospitals / d.population) * 100000
        ),
      },
      {
        axis: "Number of beds per 1,000 people",
        value: d3.mean(data2015, (d) => (d.nb_beds / d.population) * 1000),
      },
      {
        axis: "Number of general practitionners per 10,000 people",
        value: d3.mean(
          data2015,
          (d) => (d.nb_general_practitionners / d.population) * 10000
        ),
      },
      {
        axis: "Number of specialist practitionners per 10,000 people",
        value: d3.mean(
          data2015,
          (d) => (d.nb_specialists / d.population) * 10000
        ),
      },
      {
        axis: "Remuneration of general practionners in 10,000K USD",
        value: d3.mean(
          data2015,
          (d) => d.remuneration_general_practitionners / 10000
        ),
      },
      {
        axis: "Number of schools",
        value: d3.mean(data2015, (d) => d.nb_schools),
      },
      {
        axis: "Government health expenses share of GDP",
        value: d3.mean(data2015, (d) => d.share_gov_expenses),
      },
      {
        axis: "Out-of-pocket health expenses share of GDP",
        value: d3.mean(data2015, (d) => d.share_outpocket_expenses),
      },
    ],
  };
  return axes;
};

//Generates data for the radar chart grouped by HAQ level
export const countryListString = (data) => {
  const countries = data.map((d) => d.country);
  const countriesString = countries.reduce(
    (countriesString, country) => (countriesString += country + ", "),
    ""
  );
  return countriesString.slice(0, -2);
};

export const dataForCountryData = (dataCountry, country) => {
  return {
    className: country.toString(),
    axes: [
      {
        axis: "Number of hospitals per 100,000 people",
        value: (dataCountry.nb_hospitals / dataCountry.population) * 100000,
      },
      {
        axis: "Number of beds per 1,000 people",
        value: (dataCountry.nb_beds / dataCountry.population) * 1000,
      },
      {
        axis: "Number of general practitionners per 10,000 people",
        value:
          (dataCountry.nb_general_practitionners / dataCountry.population) *
          10000,
      },
      {
        axis: "Number of specialist practitionners per 10,000 people",
        value: (dataCountry.nb_specialists / dataCountry.population) * 10000,
      },
      {
        axis: "Remuneration of general practionners in 10,000K USD",
        value: dataCountry.remuneration_general_practitionners / 10000,
      },
      { axis: "Number of schools", value: dataCountry.nb_schools },
      {
        axis: "Government health expenses share of GDP",
        value: dataCountry.share_gov_expenses,
      },
      {
        axis: "Out-of-pocket health expenses share of GDP",
        value: dataCountry.share_outpocket_expenses,
      },
    ],
  };
};
export const worldAverageData = (data2015) => {
  return axesDefinitionMean(data2015, "World average");
};
const LastColumn = (data2015) => {
  data2015 = data2015.filter((d) => d !== +d && d != 0);
  let homeCountry = document.getElementById("homeCountryItems").value;
  const worldAverage = worldAverageData(data2015);
  if (homeCountry == "Not selected" || !homeCountry) {
    return worldAverage;
  }
  const dataCountryObject = data2015.filter(
    (data) => data.country === homeCountry
  );
  const dataCountry = dataCountryObject[0];
  let dataForCountry = dataForCountryData(dataCountry, homeCountry);
  return dataForCountry;
};

export const dataPerHAQLevel = (data2015) => {
  let homeCountry = document.getElementById("homeCountryItems").value;
  data2015 = data2015.filter((d) => d !== +d && d != 0);
  const lowHAQLimit =
    (d3.max(data2015, (d) => d.haq) - d3.min(data2015, (d) => d.haq)) / 3 +
    d3.min(data2015, (d) => d.haq);
  const midHAQLimit =
    ((d3.max(data2015, (d) => d.haq) - d3.min(data2015, (d) => d.haq)) * 2) /
      3 +
    d3.min(data2015, (d) => d.haq);
  const dataLowHAQ = data2015
    .filter((data) => data.haq < lowHAQLimit)
    .filter((d) => d !== +d && d != 0);
  const dataMidHAQ = data2015
    .filter((data) => data.haq > lowHAQLimit && data.haq < midHAQLimit)
    .filter((d) => d !== +d && d != 0);
  const dataHighHAQ = data2015
    .filter((data) => data.haq > midHAQLimit)
    .filter((d) => d !== +d && d != 0);
  const lowHAQ = axesDefinitionMean(dataLowHAQ, "Low HAQ");
  const midHAQ = axesDefinitionMean(dataMidHAQ, "Mid HAQ");
  const highHAQ = axesDefinitionMean(dataHighHAQ, "High HAQ");
  const lastColumn = LastColumn(data2015);
  const legend = [
    ["Low HAQ countries", countryListString(dataLowHAQ)],
    ["Mid HAQ countries", countryListString(dataMidHAQ)],
    ["High HAQ countries", countryListString(dataHighHAQ)],
    homeCountry == "Not selected"
      ? ["World Average", countryListString(data2015)]
      : [homeCountry, homeCountry],
  ];
  return [[lowHAQ, midHAQ, highHAQ, lastColumn], legend];
};
//Generates data for the radar chart grouped by GDP level
export const dataPerGDPLevel = (data2015) => {
  data2015 = data2015.filter((d) => d !== +d && d != 0);
  let homeCountry = document.getElementById("homeCountryItems").value;
  const lowGDPLimit = d3.quantile(data2015, 1 / 3, (d) => d.gdp / d.population);
  const midGDPLimit = d3.quantile(data2015, 2 / 3, (d) => d.gdp / d.population);
  const dataLowGDP = data2015.filter(
    (data) => data.gdp / data.population < lowGDPLimit
  );
  const dataMidGDP = data2015.filter(
    (data) =>
      data.gdp / data.population > lowGDPLimit &&
      data.gdp / data.population < midGDPLimit
  );
  const dataHighGDP = data2015.filter(
    (data) => data.gdp / data.population > midGDPLimit
  );
  const lowGDP = axesDefinitionMean(dataLowGDP, "Low GDP");
  const midGDP = axesDefinitionMean(dataMidGDP, "Mid GDP");

  const highGDP = axesDefinitionMean(dataHighGDP, "High GDP");
  const lastColumn = LastColumn(data2015);
  let lastColumnLegend = ["World Average", countryListString(data2015)];
  if (homeCountry != "Not selected") {
    lastColumnLegend = [homeCountry, homeCountry];
  }
  const legend = [
    ["Low GDP countries (per capita)", countryListString(dataLowGDP)],
    ["Mid GDP countries (per capita)", countryListString(dataMidGDP)],
    ["High GDP countries (per capita)", countryListString(dataHighGDP)],
    lastColumnLegend,
  ];
  return [[lowGDP, midGDP, highGDP, lastColumn], legend];
};

export const dataComparisonCountries = (data2015) => {
  data2015 = data2015.filter((d) => d !== +d && d != 0);
  let homeCountry = document.getElementById("homeCountryItems").value;
  let homeCountryAxes = {};
  let selectedCountryAxes = {};
  if (homeCountry != "Not selected") {
    const homeCountryObject = data2015.filter(
      (data) => data.country === homeCountry
    );
    const homeCountryData = homeCountryObject[0];
    homeCountryAxes = dataForCountryData(homeCountryData, homeCountry);
  }

  let selectedCountry = document.getElementById("radarCountryItems").value;
  if (selectedCountry != "Not selected") {
    const selectedCountryObject = data2015.filter(
      (data) => data.country === selectedCountry
    );
    const selectedCountryData = selectedCountryObject[0];
    selectedCountryAxes = dataForCountryData(
      selectedCountryData,
      selectedCountry
    );
  }
  let worldAverage = worldAverageData(data2015);
  if (homeCountry === "Not selected" && selectedCountry === "Not selected") {
    return [[worldAverage], [["World Average", countryListString(data2015)]]];
  }
  if (homeCountry != "Not selected" && selectedCountry === "Not selected") {
    return [
      [homeCountryAxes, worldAverage],
      [
        [homeCountry, homeCountry],
        ["World Average", countryListString(data2015)],
      ],
    ];
  }
  if (homeCountry === "Not selected" && selectedCountry != "Not selected") {
    return [
      [selectedCountryAxes, worldAverage],
      [
        [selectedCountry, selectedCountry],
        ["World Average", countryListString(data2015)],
      ],
    ];
  }
  if (homeCountry != "Not selected" && selectedCountry != "Not selected") {
    return [
      [homeCountryAxes, selectedCountryAxes, worldAverage],
      [
        [homeCountry, homeCountry],
        [selectedCountry, selectedCountry],
        ["World Average", countryListString(data2015)],
      ],
    ];
  }
};
