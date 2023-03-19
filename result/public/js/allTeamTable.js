const charts = document.querySelectorAll('.chart');
['mouseover', 'mouseout'].forEach(event => {
    charts.forEach( chart => {
        chart.addEventListener(event, () => {
            chart.classList.toggle('chart-withBefore');
        });
    });
});