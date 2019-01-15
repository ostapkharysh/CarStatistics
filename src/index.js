import * as d3 from 'd3'
import * as topojson from "topojson";




var CSVconverter = function (d) {
    return {
        Adm_entity: d.region,
        Purchase: parseInt(d.purchase),
        AvgCapacity: parseFloat(d.avg_capacity),
        PopFuel: d.pop_type,
        PopVechicle: d.pop_vechicle,
        AvgProdYear: d.avg_prod_year
    };
};



function paintMap(region){
    if ((region.properties.NAME_1 === "Crimea") || (region.properties.NAME_1 === "Sevastopol'")){
        return '#6e6a6e'
    }
    else{
        return '#158222'
    }

}

function chooseRegion(d) {
    d3.selectAll('path').style('fill', paintMap);
    if ((d.properties.NAME_1 !== "Crimea") && (d.properties.NAME_1 !== "Sevastopol'")){
        d3.select(this).style("fill","#0bc203");
    }
    else{
        d3.select(this).style("fill","#b0acb0");
    }


}


function MyMap(mapData, regionInfo) {

    var margin = {top: 20, left: 20, right: 20, bottom: 20};

    var width = window.innerWidth - margin.left-margin.right,
        height = window.innerHeight - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);


    d3.csv(regionInfo, CSVconverter, function (error, AdmInfo) {

    });



    d3.json(mapData).then(function (topology) {


        var geojson = topojson.feature(topology, topology.objects.gadm36_UKR_1);
        var center = d3.geoCentroid(geojson);
        var scale = 2600;
        var offset = [width / 2.9, height / 2.3];

        var projection = d3.geoMercator().scale(scale).center(center).translate(offset);

        var group = svg.selectAll("g")
            .data(geojson.features)
            .enter().append("g");

        var path = d3.geoPath().projection(projection);

        group.append("path")
            .attr("d", path)
            //.style('stroke', '#d8d6aa')
            .style('fill', paintMap)             // 'steelblue'
            .on("mouseover", chooseRegion);


        group
            .append("text")
            .text ( ({properties}) => properties.NAME_1)
            .attr("pointer-events", "none")
            .attr("stroke-width", 0.7)
            .style("font-size", "13px")
            .attr("transform", function(d) {
                var position = [path.centroid(d)[0]-(d.properties.NAME_1.length+10), path.centroid(d)[1]];
                return "translate(" + position + ")"; })
    });

}


//replaced with css
//d3.selectAll('h1').style('color', 'white').style('background-color', 'grey');





MyMap('data/gadm36_UKR.json', 'data/2017_avg_auto.csv');
