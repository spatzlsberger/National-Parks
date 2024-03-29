var data;
var currentEndYear;
var tooltip = d3.select('#tooltip');

var xs = d3.scaleLinear().domain([1978, 2019]).range([0, 600]);
var ys = d3.scaleLinear().domain([0, 4280000]).range([600, 0]);

var annotation1 = 1988;
var annotation2 = 1995;

var width = 600;
var length = 600;
var margin = 75;

$(document).ready(async function () {

    dataset = await d3.csv('https://spatzlsberger.github.io/National-Parks/datasource.csv').then(function (dataset) {

        data = dataset;

        updateGraph(1989);

    });
    
});

function updateGraph(yearEnd) {

    currentEndYear = yearEnd;

    makeClicked(yearEnd);

    //clear graph
    d3.select('#graph1').selectAll("*").remove();

    var tooltip = d3.select('#tooltip');
    var annotation = d3.select('#annotation');

    var cy, cx;

    //add elements
    d3.select('#graph1')
        .attr('width', width + 2 * margin)
        .attr('height', length + 2 * margin)
        .append('g')
        .attr('transform','translate('+margin+','+margin+')')
        .selectAll('rect').data(data)
        .enter()
        .append('circle')
        .attr("r", 10)
        .attr('cx', function (d, i) {

            cx = xs(+d.Year);
            return cx;
        })
        .attr('cy', function (d, i) {

            d.recVisits = +d['Recreation Visits'];
            cy = ys(d.recVisits)
            return cy;
        })
        .each(function (d) {
            
            if (d.Year == annotation1 && currentEndYear == 1989) {
                addAnnotation($(this).position(), currentEndYear);
            } else if (d.Year == 1995 && currentEndYear == 1999) {
                addAnnotation($(this).position(), currentEndYear);
            } else if (d.Year == 2007 && currentEndYear == 2009) {
                addAnnotation($(this).position(), currentEndYear)
            } else if (d.Year == 2016 && currentEndYear == 2019) {
                addAnnotation($(this).position(), currentEndYear);
            }

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
                .style('left', (d3.event.pageX +20) + 'px')
                .style('top', (d3.event.pageY + 20) + 'px')
                .html('<p>Recreation Visits: ' + d.recVisits + '</p><p>Year: ' + d.Year + '</p>')
        })
        .on('mouseout', function () {
            tooltip.style('opacity', 0)
                .style('left', 0)
                .style('top', 0);
        });

    d3.select('#graph1').append('text')
        .attr('text-anchor', 'end')
        .attr('y', 25)
        .attr('x', -300 )
        .attr('transform', 'rotate(-90)')
        .text('Visitors per Year');

    d3.select('#graph1').append('text')
        .attr('text-anchor', 'end')
        .attr('y', 725)
        .attr('x', 425)
        .text('Year');

    d3.select('#graph1').append('g')
        .attr('transform', 'translate(' + margin + ',' + margin + ')')
        .call(d3.axisLeft(ys).tickFormat(d3.format('~s')));

    d3.select('#graph1').append('g')
        .attr('transform', 'translate(' + margin + ',' + (length + margin) + ')')
        .call(d3.axisBottom(xs).tickFormat(d3.format('.4')));

}

function addAnnotation(position, year) {

    $('#annotation').empty();
    
    if (year == 1989) {
        addAnnoText(position, '1988: Summer of Fire. Over 790,000 acres affected by fires in Yellowstone');
    } else if (year == 1999) {
        addAnnoText(position, '1995: Wolves are reintroduced to the park.');
    } else if (year == 2009) {
        addAnnoText(position, '2007: Grizzly bears removed from federal threatened species list.');
    } else if (year == 2019) {
        addAnnoText(position, '2016: National Park Service Cetennial celebration.');
    }

}

function addAnnoText(position, string) {
    $('#annotation').append('<p>' + string + '</p>');
    $('#annotation').css({ 'left': (position['left'] + 20) + 'px', 'top': (position['top'] + 20) + 'px', 'opacity': 1 });
}

function makeClicked(year) {

    d3.selectAll('button')
        .style('background-color', 'inherit');


    console.log(year);
    $('#' + year).css('background-color', 'gray'); 
}