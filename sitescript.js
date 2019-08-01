var data;
var currentEndYear;
var tooltip = d3.select('#tooltip');

$(document).ready(async function () {

    dataset = await d3.csv('https://spatzlsberger.github.io/National-Parks/datasource.csv').then(function (dataset) {

        data = dataset;

        updateGraph(1989);
    });
    
});

function updateGraph(yearEnd) {

    currentEndYear = yearEnd;

    //clear graph
    d3.select('#graph1').selectAll("*").remove();

    var xs = d3.scaleLinear().domain([1978, 2019]).range([0, 600]);
    var ys = d3.scaleLinear().domain([0, 4280000]).range([600,0]);

    var tooltip = d3.select('#tooltip');

    //add elements
    d3.select('#graph1').selectAll('rect').data(data)
        .enter()
        .append('circle')
        .attr("r", 10)
        .attr('cx', function (d, i) { return xs(+d.Year); })
        .attr('cy', function (d, i) {

            d.recVisits = +d['Recreation Visits'];

            return ys(d.recVisits);
        })
        .style('fill', function (d) {

            d.Year = +d.Year;

            if (d.Year <= yearEnd) {
                return 'blue';
            }
            else { return 'white'; }

        })
        .on('mouseover', function (d, i) {
            tooltip.style('opacity', 1)
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY) + 'px')
                .html('<p>Recreation Visits: ' + d.recVisits + '</p><p>Year: ' + d.Year + '</p>')
        });
}
