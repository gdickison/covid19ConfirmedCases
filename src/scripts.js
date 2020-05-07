const sortByCountry = (property) => {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

const createOptions = (data) => {
    const allCountries = document.getElementById("allCountries")
    for(var i = 0; i < data.length; i++){
        const countryOption = document.createElement("option");
        countryOption.value = data[i].Slug;
        countryOption.innerHTML = data[i].Country.includes('Taiwan')
            ? 'Taiwan'
            : data[i].Country;
        allCountries.appendChild(countryOption);
    }
};

function getCovidByCountry(){
    const selectedCountry = document.getElementById("allCountries");
    const selectedCountrySlug = selectedCountry.options[selectedCountry.selectedIndex].value;
    console.log(selectedCountrySlug);

    fetch('https://api.covid19api.com/total/dayone/country/' + selectedCountrySlug + "/status/confirmed")
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            createHeadline(data);
            appendDayOneConfirmedData(data);
            drawChart(data);
        });
};

function createHeadline(data){
    const selectedCountry = document.getElementById("allCountries");
    const selectedCountryName = selectedCountry.options[selectedCountry.selectedIndex].text.includes('Taiwan')
        ? 'Taiwan'
        : selectedCountry.options[selectedCountry.selectedIndex].text;

    const headlineContainer = document.getElementById("chart-headline");
    headlineContainer.innerHTML = '';

    const dataTableHeadline = document.createElement("h3");

    if(data.length === 0){
        dataTableHeadline.innerHTML = selectedCountryName + " has not reported any confirmed cases";
        headlineContainer.appendChild(dataTableHeadline);
    }

    else {
        dataTableHeadline.innerHTML = "Total confirmed cases in " + selectedCountryName;
        headlineContainer.appendChild(dataTableHeadline);
    }
}

function appendDayOneConfirmedData(data){

    const dataTableContainer = document.getElementById("data-table");
    dataTableContainer.innerHTML = '';

    const dataTable = document.createElement("table");

    const dataTableHeader = dataTable.createTHead();
    const headerRow = dataTableHeader.insertRow(0);
    const headerCellDay = headerRow.insertCell(0);
    const headerCellNewCases = headerRow.insertCell(1)
    const headerCellCumulativeCases = headerRow.insertCell(2);
    headerCellDay.innerHTML = "Day";
    headerCellNewCases.innerHTML = "New Confirmed Cases"
    headerCellCumulativeCases.innerHTML = "Total Confirmed Cases";

    for(var i = 0; i < data.length; i++){
        const dailyConfirmed = dataTable.insertRow(0);
        const day = dailyConfirmed.insertCell(0);
        const newCases = dailyConfirmed.insertCell(1)
        const cumulativeCases = dailyConfirmed.insertCell(2);
        day.innerHTML = i+1;
        newCases.innerHTML = i === 0
            ? data[i].Cases
            : data[i].Cases - data[i-1].Cases;
        cumulativeCases.innerHTML = data[i].Cases;
        dataTable.appendChild(dailyConfirmed);
    };

    dataTableContainer.appendChild(dataTable);
};