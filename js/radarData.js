//Generates data for the radar chart grouped by HAQ level

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
  return {
    className: "worldAverage",
    axes: [
      {
        axis: "Number of hospitals per 100,000 people",
        value: d3.mean(
          data2015.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_hospitals / d.population) * 100000
        ),
      },
      {
        axis: "Number of beds per 1,000 people",
        value: d3.mean(
          data2015.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_beds / d.population) * 1000
        ),
      },
      {
        axis: "Number of general practitionners per 10,000 people",
        value: d3.mean(
          data2015.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_general_practitionners / d.population) * 10000
        ),
      },
      {
        axis: "Number of specialist practitionners per 10,000 people",
        value: d3.mean(
          data2015.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_specialists / d.population) * 10000
        ),
      },
      {
        axis: "Remuneration of general practionners in 10,000K USD",
        value: d3.mean(
          data2015.filter((d) => d !== +d && d != 0),
          (d) => d.remuneration_general_practitionners / 10000
        ),
      },
      {
        axis: "Number of schools",
        value: d3.mean(
          data2015.filter((d) => d !== +d && d != 0),
          (d) => d.nb_schools
        ),
      },
      {
        axis: "Government health expenses share of GDP",
        value: d3.mean(
          data2015.filter((d) => d !== +d && d != 0),
          (d) => d.share_gov_expenses
        ),
      },
      {
        axis: "Out-of-pocket health expenses share of GDP",
        value: d3.mean(
          data2015.filter((d) => d !== +d && d != 0),
          (d) => d.share_outpocket_expenses
        ),
      },
    ],
  };
};
const LastColumn = (data2015) => {
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
  const lowHAQLimit =
    (d3.max(data2015, (d) => d.haq) - d3.min(data2015, (d) => d.haq)) / 3 +
    d3.min(data2015, (d) => d.haq);
  const midHAQLimit =
    ((d3.max(data2015, (d) => d.haq) - d3.min(data2015, (d) => d.haq)) * 2) /
      3 +
    d3.min(data2015, (d) => d.haq);
  const dataLowHAQ = data2015.filter((data) => data.haq < lowHAQLimit);
  const dataMidHAQ = data2015.filter(
    (data) => data.haq > lowHAQLimit && data.haq < midHAQLimit
  );
  const dataHighHAQ = data2015.filter((data) => data.haq > midHAQLimit);
  const lowHAQ = {
    className: "lowHAQ",
    axes: [
      {
        axis: "Number of hospitals per 100,000 people",
        value: d3.mean(
          dataLowHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_hospitals / d.population) * 100000
        ),
      },
      {
        axis: "Number of beds per 1,000 people",
        value: d3.mean(
          dataLowHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_beds / d.population) * 1000
        ),
      },
      {
        axis: "Number of general practitionners per 10,000 people",
        value: d3.mean(
          dataLowHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_general_practitionners / d.population) * 10000
        ),
      },
      {
        axis: "Number of specialist practitionners per 10,000 people",
        value: d3.mean(
          dataLowHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_specialists / d.population) * 10000
        ),
      },
      {
        axis: "Remuneration of general practionners in 10,000K USD",
        value: d3.mean(
          dataLowHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.remuneration_general_practitionners / 10000
        ),
      },
      {
        axis: "Number of schools",
        value: d3.mean(
          dataLowHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.nb_schools
        ),
      },
      {
        axis: "Government health expenses share of GDP",
        value: d3.mean(
          dataLowHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.share_gov_expenses
        ),
      },
      {
        axis: "Out-of-pocket health expenses share of GDP",
        value: d3.mean(
          dataLowHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.share_outpocket_expenses
        ),
      },
    ],
  };
  const midHAQ = {
    className: "midHAQ",
    axes: [
      {
        axis: "Number of hospitals per 100,000 people",
        value: d3.mean(
          dataMidHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_hospitals / d.population) * 100000
        ),
      },
      {
        axis: "Number of beds per 1,000 people",
        value: d3.mean(
          dataMidHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_beds / d.population) * 1000
        ),
      },
      {
        axis: "Number of general practitionners per 10,000 people",
        value: d3.mean(
          dataMidHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_general_practitionners / d.population) * 10000
        ),
      },
      {
        axis: "Number of specialist practitionners per 10,000 people",
        value: d3.mean(
          dataMidHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_specialists / d.population) * 10000
        ),
      },
      {
        axis: "Remuneration of general practionners in 10,000K USD",
        value: d3.mean(
          dataMidHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.remuneration_general_practitionners / 10000
        ),
      },
      {
        axis: "Number of schools",
        value: d3.mean(
          dataMidHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.nb_schools
        ),
      },
      {
        axis: "Government health expenses share of GDP",
        value: d3.mean(
          dataMidHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.share_gov_expenses
        ),
      },
      {
        axis: "Out-of-pocket health expenses share of GDP",
        value: d3.mean(
          dataMidHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.share_outpocket_expenses
        ),
      },
    ],
  };

  const highHAQ = {
    className: "highHAQ",
    axes: [
      {
        axis: "Number of hospitals per 100,000 people",
        value: d3.mean(
          dataHighHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_hospitals / d.population) * 100000
        ),
      },
      {
        axis: "Number of beds per 1,000 people",
        value: d3.mean(
          dataHighHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_beds / d.population) * 1000
        ),
      },
      {
        axis: "Number of general practitionners per 10,000 people",
        value: d3.mean(
          dataHighHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_general_practitionners / d.population) * 10000
        ),
      },
      {
        axis: "Number of specialist practitionners per 10,000 people",
        value: d3.mean(
          dataHighHAQ.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_specialists / d.population) * 10000
        ),
      },
      {
        axis: "Remuneration of general practionners in 10,000K USD",
        value: d3.mean(
          dataHighHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.remuneration_general_practitionners / 10000
        ),
      },
      {
        axis: "Number of schools",
        value: d3.mean(
          dataHighHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.nb_schools
        ),
      },
      {
        axis: "Government health expenses share of GDP",
        value: d3.mean(
          dataHighHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.share_gov_expenses
        ),
      },
      {
        axis: "Out-of-pocket health expenses share of GDP",
        value: d3.mean(
          dataHighHAQ.filter((d) => d !== +d && d != 0),
          (d) => d.share_outpocket_expenses
        ),
      },
    ],
  };
  const worldAverage = LastColumn(data2015);

  return [
    [lowHAQ, midHAQ, highHAQ, worldAverage],
    [
      "low HAQ countries",
      "mid HAQ countries",
      "high HAQ countries",
      homeCountry == "Not selected" ? "World Average" : homeCountry,
    ],
  ];
};
//Generates data for the radar chart grouped by GDP level
export const dataPerGDPLevel = (data2015) => {
  let homeCountry = document.getElementById("homeCountryItems").value;
  // const lowGDPLimit= (d3.max(data2015, d=>d.gdp/d.population)-d3.min(data2015, d=>d.gdp/d.population))/3+d3.min(data2015, d=>d.gdp/d.population);
  // const midGDPLimit= (d3.max(data2015, d=>d.gdp/d.population)-d3.min(data2015, d=>d.gdp/d.population))*2/3+d3.min(data2015, d=>d.gdp/d.population);;
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
  const lowGDP = {
    className: "lowGDP",
    axes: [
      {
        axis: "Number of hospitals per 100,000 people",
        value: d3.mean(
          dataLowGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_hospitals / d.population) * 100000
        ),
      },
      {
        axis: "Number of beds per 1,000 people",
        value: d3.mean(
          dataLowGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_beds / d.population) * 1000
        ),
      },
      {
        axis: "Number of general practitionners per 10,000 people",
        value: d3.mean(
          dataLowGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_general_practitionners / d.population) * 10000
        ),
      },
      {
        axis: "Number of specialist practitionners per 10,000 people",
        value: d3.mean(
          dataLowGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_specialists / d.population) * 10000
        ),
      },
      {
        axis: "Remuneration of general practionners in 10,000K USD",
        value: d3.mean(
          dataLowGDP.filter((d) => d !== +d && d != 0),
          (d) => d.remuneration_general_practitionners / 10000
        ),
      },
      {
        axis: "Number of schools",
        value: d3.mean(
          dataLowGDP.filter((d) => d !== +d && d != 0),
          (d) => d.nb_schools
        ),
      },
      {
        axis: "Government health expenses share of GDP",
        value: d3.mean(
          dataLowGDP.filter((d) => d !== +d && d != 0),
          (d) => d.share_gov_expenses
        ),
      },
      {
        axis: "Out-of-pocket health expenses share of GDP",
        value: d3.mean(
          dataLowGDP.filter((d) => d !== +d && d != 0),
          (d) => d.share_outpocket_expenses
        ),
      },
    ],
  };
  const midGDP = {
    className: "midGDP",
    axes: [
      {
        axis: "Number of hospitals per 100,000 people",
        value: d3.mean(
          dataMidGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_hospitals / d.population) * 100000
        ),
      },
      {
        axis: "Number of beds per 1,000 people",
        value: d3.mean(
          dataMidGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_beds / d.population) * 1000
        ),
      },
      {
        axis: "Number of general practitionners per 10,000 people",
        value: d3.mean(
          dataMidGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_general_practitionners / d.population) * 10000
        ),
      },
      {
        axis: "Number of specialist practitionners per 10,000 people",
        value: d3.mean(
          dataMidGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_specialists / d.population) * 10000
        ),
      },
      {
        axis: "Remuneration of general practionners in 10,000K USD",
        value: d3.mean(
          dataMidGDP.filter((d) => d !== +d && d != 0),
          (d) => d.remuneration_general_practitionners / 10000
        ),
      },
      {
        axis: "Number of schools",
        value: d3.mean(
          dataMidGDP.filter((d) => d !== +d && d != 0),
          (d) => d.nb_schools
        ),
      },
      {
        axis: "Government health expenses share of GDP",
        value: d3.mean(
          dataMidGDP.filter((d) => d !== +d && d != 0),
          (d) => d.share_gov_expenses
        ),
      },
      {
        axis: "Out-of-pocket health expenses share of GDP",
        value: d3.mean(
          dataMidGDP.filter((d) => d !== +d && d != 0),
          (d) => d.share_outpocket_expenses
        ),
      },
    ],
  };

  const highGDP = {
    className: "highGDP",
    axes: [
      {
        axis: "Number of hospitals per 100,000 people",
        value: d3.mean(
          dataHighGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_hospitals / d.population) * 100000
        ),
      },
      {
        axis: "Number of beds per 1,000 people",
        value: d3.mean(
          dataHighGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_beds / d.population) * 1000
        ),
      },
      {
        axis: "Number of general practitionners per 10,000 people",
        value: d3.mean(
          dataHighGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_general_practitionners / d.population) * 10000
        ),
      },
      {
        axis: "Number of specialist practitionners per 10,000 people",
        value: d3.mean(
          dataHighGDP.filter((d) => d !== +d && d != 0),
          (d) => (d.nb_specialists / d.population) * 10000
        ),
      },
      {
        axis: "Remuneration of general practionners in 10,000K USD",
        value: d3.mean(
          dataHighGDP.filter((d) => d !== +d && d != 0),
          (d) => d.remuneration_general_practitionners / 10000
        ),
      },
      {
        axis: "Number of schools",
        value: d3.mean(
          dataHighGDP.filter((d) => d !== +d && d != 0),
          (d) => d.nb_schools
        ),
      },
      {
        axis: "Government health expenses share of GDP",
        value: d3.mean(
          dataHighGDP.filter((d) => d !== +d && d != 0),
          (d) => d.share_gov_expenses
        ),
      },
      {
        axis: "Out-of-pocket health expenses share of GDP",
        value: d3.mean(
          dataHighGDP.filter((d) => d !== +d && d != 0),
          (d) => d.share_outpocket_expenses
        ),
      },
    ],
  };
  const worldAverage = LastColumn(data2015);
  let lastColumnLegend = "World Average";
  if (homeCountry != "Not selected") {
    lastColumnLegend = homeCountry;
  }
  return [
    [lowGDP, midGDP, highGDP, worldAverage],
    [
      "low GDP countries",
      "mid GDP countries",
      "high GDP countries",
      lastColumnLegend,
    ],
  ];
};

export const dataComparisonCountries = (data2015) => {
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
    return [[worldAverage], ["World Average"]];
  }
  if (homeCountry != "Not selected" && selectedCountry === "Not selected") {
    return [
      [homeCountryAxes, worldAverage],
      [homeCountry, "World Average"],
    ];
  }
  if (homeCountry === "Not selected" && selectedCountry != "Not selected") {
    return [
      [selectedCountryAxes, worldAverage],
      [selectedCountry, "World Average"],
    ];
  }
  if (homeCountry != "Not selected" && selectedCountry != "Not selected") {
    return [
      [homeCountryAxes, selectedCountryAxes, worldAverage],
      [homeCountry, selectedCountry, "World Average"],
    ];
  }
};
