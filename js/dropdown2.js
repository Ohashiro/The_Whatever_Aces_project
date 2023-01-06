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
    console.log("countries are: ", countries);
    selectCountriesText.value = "All";
    var select = document.getElementById("countrySelector").getElementsByClassName("items")[0];
    console.log("select",select);
    var options = countries;
    options = ["All"].concat(countries);

    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var li = document.createElement("li");
        var el = document.createElement("input");
        el.value = opt;
        el.type = "checkbox";
        el.setAttribute("class", "country");
        let countryText = document.createTextNode(opt);
        select.appendChild(li);
        li.appendChild(el);
        li.appendChild(countryText);
    }
    // dropdownDisplay();
    dropdownSelection();

    
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

function dropdownDisplay () {
    var checkList = document.getElementById('countrySelector');
    checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
        if (checkList.classList.contains('visible'))
        checkList.classList.remove('visible');
        else
        checkList.classList.add('visible');
    }
}

function dropdownSelection() {
    var myCountries = document.querySelectorAll('.country');
    var selectCountriesText = document.getElementById("selectCountriesText");
    var selectedCountries = [];
    for (let i = 1; i < myCountries.length; ++i) {
        let selectedCountry = myCountries[i];
        selectedCountry.addEventListener('click', function(e) {
            
            if (selectedCountry.classList.contains('selected')){
                selectedCountry.classList.remove('selected');
                // remove from selectedCountries
                let index = selectedCountries.indexOf(selectedCountry.value);
                if (index > -1) {
                    selectedCountries.splice(index, 1);
                }

            } else {
                selectedCountry.classList.add('selected');
                myCountries[0].checked = false;
                let index = selectedCountries.indexOf(myCountries[0].value);
                if (index > -1) {
                    selectedCountries.splice(index, 1);
                }
                // add to selectedCountries
                selectedCountries.push(selectedCountry.value);
            }
            console.log("selected countries:",selectedCountries);
            selectCountriesText.value = selectedCountries.join();
        })
    }
    // for i=0, the all the countries are selected
    let selectedCountry = myCountries[0];
    selectedCountry.addEventListener('click', function(e) {
        selectedCountries = setCountries("All");
        console.log("selected countries:",selectedCountries);
        selectCountriesText.value = selectedCountries.join();
    })
}

function setCountries(value) {
    var myCountries = document.querySelectorAll('.country');
    //var selectCountriesText = document.getElementById("selectCountriesText");
    let selectCountriesText = d3.select("#selectCountriesText").node().value;
    var selectedCountries = selectCountriesText.split(",");
    for (let i = 0; i < myCountries.length; ++i) {
        let selectedCountry = myCountries[i];
        if (selectedCountry.value != value && selectedCountries.includes(selectedCountry.value)){
            selectedCountry.classList.remove('selected');
            selectedCountry.checked = false;
            // remove from selectedCountries
            let index = selectedCountries.indexOf(selectedCountry.value);
            if (index > -1) {
                selectedCountries.splice(index, 1);
            }
        }
        if (selectedCountry.value == value && !selectedCountries.includes(value)) {
            selectedCountry.classList.add('selected');
            // add to selectedCountries
            selectedCountries.push(selectedCountry.value);
        }
    }
    return selectedCountries;
}