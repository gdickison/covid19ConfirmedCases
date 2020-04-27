google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(data) {
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('number', 'Day');
    chartData.addColumn('number', 'Cases');

    dataArray = [];

    for(var i = 0; i < data.length; i++){
        dataArray.push([i+1, data[i].Cases]);
    };

    chartData.addRows(dataArray);

    console.log(dataArray);
    var options = {
        hAxis: {
        title: 'Days Since First Confirmed Case'
        },
        vAxis: {
        title: 'Confirmed Cases'
        },
        backgroundColor: '#f1f8e9',
        legend: 'none'
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(chartData, options);
}