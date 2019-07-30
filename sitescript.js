var data;

$(document).ready(async function () {

    data = await d3.csv('https://spatzlsberger.github.io/National-Parks/datasource.csv').then(function (data) {

        console.log(data);

        d3.select('#graph1').selectAll('rect').data(data)
            .enter().append('rect')
            .attr("width", 19)
            .attr('height', 20)
            .attr('x', function (d, i) { return 20 * i; })
            .attr('y', function (d, i) { return 20 * i; })
            .style('fill', 'blue');

        
    });
});



