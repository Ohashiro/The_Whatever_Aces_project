export const animationFilter = (data) => {
    let year = d3.select("#yearSlider").node().value;
    let country = d3.select("#selectCountry").node().value;
    
    // Filter and sorting the new data
    let newData = data.filter(data => data.year == year);

    if (country != "All") {
      newData = newData.filter(data => data.country == country);
    } else {
      newData = filter_data_on_gdp_profile(newData);
    }

    let sort = d3.select("#sort").node().value;
    
    if (sort == 'alphabet') {
      newData = newData.sort((a, b) => d3.ascending(a.country, b.country));
    }
    else if (sort == 'pctAsce') {
      newData = newData.sort((a, b) => d3.ascending(a.haq, b.haq));
    }
    else {
      newData = newData.sort((a, b) => d3.descending(a.haq, b.haq));
    }
    return newData;
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

function filter_data_on_gdp_profile(data) {
  let gdp_profile = d3.select("#gdp").node().value;
  let lowGDPLimit = compute_gdp_profiles(data)[0];
  let midGDPLimit = compute_gdp_profiles(data)[1];
  if (gdp_profile == 'low') {
    let newData = data.filter(data => data.gdp/data.population <= lowGDPLimit);
    return newData
  } 
  if (gdp_profile == 'mid') {
    let newData = data.filter(function(item) {
        if (midGDPLimit >= item.gdp/item.population && item.gdp/item.population  > lowGDPLimit) {
            return true;
        }
        return false;
      })
    return newData
  } 
  if (gdp_profile == 'high') {
    let newData = data.filter(data => data.gdp/data.population  > midGDPLimit);
    return newData
  } 
  return data
}