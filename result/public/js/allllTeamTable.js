const charts = document.querySelectorAll('.chart-td');
['mouseover', 'mouseout'].forEach(event => {
    charts.forEach( chart => {
        chart.addEventListener(event, () => {
            chart.classList.toggle('chart-td-withAfter');
        });
    });
});