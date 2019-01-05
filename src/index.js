import * as d3 from 'd3'
import * as topojson from "topojson";
import * as polylabel from "polylabel"


console.log("IN index.js");

function MyMap(data) {
    console.log(data);
    console.log("IN MyMap");
    var margin = {top: 20, left: 20, right: 20, bottom: 20};

    var width = window.innerWidth - margin.left-margin.right,
        height = window.innerHeight - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var regCenters = [];


    d3.json(data).then(function (topology) {
        var geojson = topojson.feature(topology, topology.objects.gadm36_UKR_1);
        var center = d3.geoCentroid(geojson);
        var scale = 2300;
        var offset = [width / 3.1, height / 2.25];

        var projection = d3.geoMercator().scale(scale).center(center).translate(offset);

        //console.log("geojson features", geojson.features);

        var group = svg.selectAll("g")
            .data(geojson.features)
            .enter().append("g");

        var path = d3.geoPath().projection(projection);


        //console.log("path", path);

        var areas = group.append("path")
            .attr("d", path)
            .on("click", function (d) {
                d3.selectAll('path').style('fill',null);
                d3.select(this).style("fill","#16a78d")

            })
            // output names of admin entities


            .attr("transform", function(d) {

                //console.log("d", d.geometry.coordinates);
                var p = polylabel(d.geometry.coordinates, 1.0);
                regCenters.push(p);
                //console.log("p", p);
                //console.log("d", d.properties.NAME_1)
            });

        //areas.selectAll().forEach(function (el) {
         //   console.log(el)
        //})


        //console.log("group", group);
        //group.selectAll().forEach(function (el){
        //   console.log(el);
        //});

        group
            .append("text")
            .text ( ({properties}) => properties.NAME_1)
            .attr("transform", function(d) {
                console.log(d);
                return "translate(" + path.centroid(d) + ")"; });
    });

    console.log(regCenters)
}



MyMap('/gadm36_UKR.json');
