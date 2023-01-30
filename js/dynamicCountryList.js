//Computes the list of countries selected in the selector of the gauges component.
export const dynamicCountryList = (countries) => {
  var countrySelectedList = document.getElementById("countrySelectedList");
  var ulList = document.createElement("ul");
  ulList.style.display = "grid";
  ulList.style.gridTemplateColumns = " 200px 200px 200px 200px";
  for (var i = 0; i < countries.length; i++) {
    var liList = document.createElement("li");
    liList.appendChild(document.createTextNode(countries[i]));
    ulList.appendChild(liList);
  }
  if (countries.length == 0) {
    var liList = document.createElement("li");
    liList.appendChild(document.createTextNode("All"));
    ulList.appendChild(liList);
  }
  countrySelectedList.replaceChildren(ulList);
};
