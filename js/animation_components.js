export const animationFilter = (data) => {
    let year = d3.select("#yearSlider").node().value;
    let gdp_profile = d3.select("#gdp").node().value;
    let country = d3.select("#selectCountry").node().value;
    
    // Filter and sorting the new data
    let newData = data.filter(data => data.year == year);

    if (country != "All") {
        newData = data.filter(data => data.country == country);
    } else {
        let gdp_limit = 12000000000;
        if (gdp_profile == 'low') {
            newData = data.filter(data => data.gdp <= 2*gdp_limit);
        } 
        if (gdp_profile == 'mid') {
            newData = data.filter(function(item) {
                if (7*gdp_limit >= item.gdp && item.gdp  > 2*gdp_limit) {
                    return true;
                }
                return false;
              })
        } 
        if (gdp_profile == 'high') {
            newData = data.filter(data => data.gdp  > 7*gdp_limit);
        } 
    }
    return newData;
}