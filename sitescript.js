var data;

$(document).ready(async function () {

    dataset = await d3.csv('https://spatzlsberger.github.io/National-Parks/datasource.csv').then(function (dataset) {

        d3.select('#graph1').selectAll('rect').data(dataset)
            .enter()
            .append('rect')
            .attr("width", 19)
            .attr('height', 20)
            .attr('x', function (d, i) { return 20 * i; })
            .attr('y', function (d, i) { return 20 * i; })
            .style('fill', 'blue');

        data = dataset;
    });
    
});

function clearElement(elementId) {

    d3.select(elementId).selectAll("*").remove();
    console.log('graph 1 cleared');
 
}