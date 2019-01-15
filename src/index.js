import * as d3 from 'd3'
import * as topojson from "topojson";


function placeRegion(regionCenter) {

}





d3.select("body").transition()
    .style("background-color", "#bbfefe");

function MyMap(data) {
    //console.log(data);
    //console.log("IN MyMap");
    var margin = {top: 20, left: 20, right: 20, bottom: 20};

    var width = window.innerWidth - margin.left-margin.right,
        height = window.innerHeight - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);


    d3.json(data).then(function (topology) {
        var geojson = topojson.feature(topology, topology.objects.gadm36_UKR_1);
        var center = d3.geoCentroid(geojson);
        var scale = 2600;
        var offset = [width / 2.9, height / 2.2];

        var projection = d3.geoMercator().scale(scale).center(center).translate(offset);

        //console.log("geojson features", geojson.features);

        var group = svg.selectAll("g")
            .data(geojson.features)
            .enter().append("g");

        var path = d3.geoPath().projection(projection);


        //console.log("path", path);

        group.append("path")
            .attr("d", path)
            .style('stroke', '#d8d6aa')
            .style('fill',"#146520")
            .on("click", function (d) {
                d3.selectAll('path').style('stroke', '#d8d6aa').style('fill',"#146520");
                d3.select(this).style("fill","#18a830");
            });


        group
            .append("text")
            .text ( ({properties}) => properties.NAME_1)
            //.attr("stroke", "#f14142")
            .attr("stroke-width", 0.3)
            .style("font-size", "13px")
            .attr("transform", function(d) {
                var position = [path.centroid(d)[0]-(d.properties.NAME_1.length+10), path.centroid(d)[1]];
                return "translate(" + position + ")"; })
            .attr("transform", function(d) {
                var position = [path.centroid(d)[0]-(d.properties.NAME_1.length+10), path.centroid(d)[1]];
                return "translate(" + position + ")"; })
    });
}


function Info(){
    var width = window.innerWidth - margin.left-margin.right,
        height = window.innerHeight - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);
}

d3.selectAll('h2').style('color', 'white');
d3.selectAll('h2').style('background-color', 'grey');





MyMap('/gadm36_UKR.json');
