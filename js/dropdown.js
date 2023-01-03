Promise.all([
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
            'population': +d['Population (number)'],
            'life': +d['Life expectancy'],
            "nb_hospitals": +d['Number of Hospitals'],
            "nb_beds": +d['Total hospital beds'],
            "nb_general_practitionners": +d['Number of Generalist medical practitioners'],
            "nb_specialists": +d['Number of Specialist medical practitioners'],
            "RD_expenses_as_PC_GDP": +d['R&D expenses as PC_GDP (total)'],
            "nb_schools": +d['Number schools'],
            "remuneration_general_practitionners": +d['Remuneration of general practitioners'],
            
        }
    })
]).then(function(files) {
    const countries = country_list(files[0]);
    console.log("countries are: ", countries)
    var select = document.getElementById("selectCountry");
    var options = countries;//["Denmark","Austria","Japan","Australia","France"];
    
    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
    
}).catch(function(err) {
    console.log(err);
})

function country_list(file) {
    var country_list = []
    for (let i = 0; i<file.length; i++){
        if (file[i].haq && file[i].hdi && !country_list.includes(file[i].country)){
            country_list.push(file[i].country);
        }
    }
    return country_list
}