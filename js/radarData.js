
//Generates data for the radar chart grouped by HAQ level
export const dataPerHAQLevel=(data)=>{
    const data2015=data.filter((data)=>data.year===2015 && data.nb_hospitals!=0 && data.nb_hospitals!=+data && data.nb_general_practitionners!=0 && data.nb_general_practitionners!=+data );
    const lowHAQLimit= (d3.max(data2015, d=>d.haq)-d3.min(data2015, d=>d.haq))/3+d3.min(data2015, d=>d.haq);
    console.log({lowHAQLimit})
    const midHAQLimit= (d3.max(data2015, d=>d.haq)-d3.min(data2015, d=>d.haq))*2/3+d3.min(data2015, d=>d.haq);;
    console.log({midHAQLimit})
    const dataLowHAQ=data2015.filter((data)=>data.haq<lowHAQLimit);
    const dataMidHAQ=data2015.filter((data)=>data.haq>lowHAQLimit && data.haq<midHAQLimit);
    const dataHighHAQ=data2015.filter((data)=>data.haq>midHAQLimit);
    const lowHAQ={className: "lowHAQ", axes: [
        {axis: "Number of hospitals per 100,000 people", value: d3.mean(dataLowHAQ, d=>d.nb_hospitals/d.population*100000)},
        {axis: "Number of beds per 1,000 people", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_beds/d.population*1000)},
        {axis: "Number of general practitionners per 10,000 people", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_general_practitionners/d.population*10000)},
        {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_specialists/d.population*10000)},
        {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.remuneration_general_practitionners/10000)},
        {axis: "Number of schools", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.nb_schools)},
        {axis: "Government health expenses share of GDP", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.share_gov_expenses)},
        {axis: "Out-of-pocket health expenses share of GDP", value: d3.mean(dataLowHAQ.filter(d=>d !== +d && d!=0), d=>d.share_outpocket_expenses)},]};
    const midHAQ={className: "midHAQ", axes: [
        {axis: "Number of hospitals per 100,000 people", value: d3.mean(dataMidHAQ, d=>d.nb_hospitals/d.population*100000)},
        {axis: "Number of beds per 1,000 people", value: d3.mean(dataMidHAQ, d=>d.nb_beds/d.population*1000)},
        {axis: "Number of general practitionners per 10,000 people", value: d3.mean(dataMidHAQ, d=>d.nb_general_practitionners/d.population*10000)},
        {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(dataMidHAQ, d=>d.nb_specialists/d.population*10000)},
        {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(dataMidHAQ, d=>d.remuneration_general_practitionners/10000)},
        {axis: "Number of schools", value: d3.mean(dataMidHAQ, d=>d.nb_schools)},
		{axis: "Government health expenses share of GDP", value: d3.mean(dataMidHAQ.filter(d=>d !== +d && d!=0), d=>d.share_gov_expenses)},
        {axis: "Out-of-pocket health expenses share of GDP", value: d3.mean(dataMidHAQ.filter(d=>d !== +d && d!=0), d=>d.share_outpocket_expenses)},]};

    const highHAQ={className: "highHAQ", axes: [
        {axis: "Number of hospitals per 100,000 people", value: d3.mean(dataHighHAQ, d=>d.nb_hospitals/d.population*100000)},
        {axis: "Number of beds per 1,000 people", value: d3.mean(dataHighHAQ, d=>d.nb_beds/d.population*1000)},
        {axis: "Number of general practitionners per 10,000 people", value: d3.mean(dataHighHAQ, d=>d.nb_general_practitionners/d.population*10000)},
        {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(dataHighHAQ, d=>d.nb_specialists/d.population*10000)},
        {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(dataHighHAQ, d=>d.remuneration_general_practitionners/10000)},
        {axis: "Number of schools", value: d3.mean(dataHighHAQ, d=>d.nb_schools)},
		{axis: "Government health expenses share of GDP", value: d3.mean(dataHighHAQ.filter(d=>d !== +d && d!=0), d=>d.share_gov_expenses)},
        {axis: "Out-of-pocket health expenses share of GDP", value: d3.mean(dataHighHAQ.filter(d=>d !== +d && d!=0), d=>d.share_outpocket_expenses)},]};
    const worldAverage={className: "worldAverage", axes: [
        {axis: "Number of hospitals per 100,000 people", value: d3.mean(data2015, d=>d.nb_hospitals/d.population*100000)},
        {axis: "Number of beds per 1,000 people", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.nb_beds/d.population*1000)},
        {axis: "Number of general practitionners per 10,000 people", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.nb_general_practitionners/d.population*10000)},
        {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.nb_specialists/d.population*10000)},
        {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.remuneration_general_practitionners/10000)},
        {axis: "Number of schools", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.nb_schools)},
        {axis: "Government health expenses share of GDP", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.share_gov_expenses)},
        {axis: "Out-of-pocket health expenses share of GDP", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.share_outpocket_expenses)},]};

        return [lowHAQ, midHAQ, highHAQ,worldAverage];
    }
//Generates data for the radar chart grouped by GDP level
export const dataPerGDPLevel=(data)=>{
        const data2015=data.filter((data)=>data.year===2015 && data.nb_hospitals!=0 && data.nb_hospitals!=+data && data.nb_general_practitionners!=0 && data.nb_general_practitionners!=+data );
        // const lowGDPLimit= (d3.max(data2015, d=>d.gdp/d.population)-d3.min(data2015, d=>d.gdp/d.population))/3+d3.min(data2015, d=>d.gdp/d.population);
        // const midGDPLimit= (d3.max(data2015, d=>d.gdp/d.population)-d3.min(data2015, d=>d.gdp/d.population))*2/3+d3.min(data2015, d=>d.gdp/d.population);;
        const lowGDPLimit=d3.quantile(data2015, 1/3, d=>d.gdp/d.population);
        const midGDPLimit=d3.quantile(data2015, 2/3, d=>d.gdp/d.population);
        console.log({lowGDPLimit: lowGDPLimit})
        console.log({midGDPLimit: midGDPLimit})
        const dataLowGDP=data2015.filter((data)=>data.gdp/data.population<lowGDPLimit);
        const dataMidGDP=data2015.filter((data)=>data.gdp/data.population>lowGDPLimit && data.gdp/data.population<midGDPLimit);
        const dataHighGDP=data2015.filter((data)=>data.gdp/data.population>midGDPLimit);
        console.log({dataLowGDP: dataLowGDP})
        console.log({dataMidGDP: dataMidGDP})
        console.log({dataHighGDP: dataHighGDP})
        const lowGDP={className: "lowGDP", axes: [
            {axis: "Number of hospitals per 100,000 people", value: d3.mean(dataLowGDP, d=>d.nb_hospitals/d.population*100000)},
            {axis: "Number of beds per 1,000 people", value: d3.mean(dataLowGDP.filter(d=>d !== +d && d!=0), d=>d.nb_beds/d.population*1000)},
            {axis: "Number of general practitionners per 10,000 people", value: d3.mean(dataLowGDP.filter(d=>d !== +d && d!=0), d=>d.nb_general_practitionners/d.population*10000)},
            {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(dataLowGDP.filter(d=>d !== +d && d!=0), d=>d.nb_specialists/d.population*10000)},
            {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(dataLowGDP.filter(d=>d !== +d && d!=0), d=>d.remuneration_general_practitionners/10000)},
            {axis: "Number of schools", value: d3.mean(dataLowGDP.filter(d=>d !== +d && d!=0), d=>d.nb_schools)},
            {axis: "Government health expenses share of GDP", value: d3.mean(dataLowGDP.filter(d=>d !== +d && d!=0), d=>d.share_gov_expenses)},
            {axis: "Out-of-pocket health expenses share of GDP", value: d3.mean(dataLowGDP.filter(d=>d !== +d && d!=0), d=>d.share_outpocket_expenses)},]};
        const midGDP={className: "midGDP", axes: [
            {axis: "Number of hospitals per 100,000 people", value: d3.mean(dataMidGDP, d=>d.nb_hospitals/d.population*100000)},
            {axis: "Number of beds per 1,000 people", value: d3.mean(dataMidGDP, d=>d.nb_beds/d.population*1000)},
            {axis: "Number of general practitionners per 10,000 people", value: d3.mean(dataMidGDP, d=>d.nb_general_practitionners/d.population*10000)},
            {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(dataMidGDP, d=>d.nb_specialists/d.population*10000)},
            {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(dataMidGDP, d=>d.remuneration_general_practitionners/10000)},
            {axis: "Number of schools", value: d3.mean(dataMidGDP, d=>d.nb_schools)},
            {axis: "Government health expenses share of GDP", value: d3.mean(dataMidGDP.filter(d=>d !== +d && d!=0), d=>d.share_gov_expenses)},
            {axis: "Out-of-pocket health expenses share of GDP", value: d3.mean(dataMidGDP.filter(d=>d !== +d && d!=0), d=>d.share_outpocket_expenses)},]};
    
        const highGDP={className: "highGDP", axes: [
            {axis: "Number of hospitals per 100,000 people", value: d3.mean(dataHighGDP, d=>d.nb_hospitals/d.population*100000)},
            {axis: "Number of beds per 1,000 people", value: d3.mean(dataHighGDP, d=>d.nb_beds/d.population*1000)},
            {axis: "Number of general practitionners per 10,000 people", value: d3.mean(dataHighGDP, d=>d.nb_general_practitionners/d.population*10000)},
            {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(dataHighGDP, d=>d.nb_specialists/d.population*10000)},
            {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(dataHighGDP, d=>d.remuneration_general_practitionners/10000)},
            {axis: "Number of schools", value: d3.mean(dataHighGDP, d=>d.nb_schools)},
            {axis: "Government health expenses share of GDP", value: d3.mean(dataHighGDP.filter(d=>d !== +d && d!=0), d=>d.share_gov_expenses)},
            {axis: "Out-of-pocket health expenses share of GDP", value: d3.mean(dataHighGDP.filter(d=>d !== +d && d!=0), d=>d.share_outpocket_expenses)},]};
        const worldAverage={className: "worldAverage", axes: [
            {axis: "Number of hospitals per 100,000 people", value: d3.mean(data2015, d=>d.nb_hospitals/d.population*100000)},
            {axis: "Number of beds per 1,000 people", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.nb_beds/d.population*1000)},
            {axis: "Number of general practitionners per 10,000 people", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.nb_general_practitionners/d.population*10000)},
            {axis: "Number of specialist practitionners per 10,000 people", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.nb_specialists/d.population*10000)},
            {axis: "Remuneration of general practionners in 10,000K USD", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.remuneration_general_practitionners/10000)},
            {axis: "Number of schools", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.nb_schools)},
            {axis: "Government health expenses share of GDP", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.share_gov_expenses)},
            {axis: "Out-of-pocket health expenses share of GDP", value: d3.mean(data2015.filter(d=>d !== +d && d!=0), d=>d.share_outpocket_expenses)},]};
    
        return [lowGDP, midGDP, highGDP,worldAverage];
        }
    