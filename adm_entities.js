

function vizMapWithEntities(map, wid, heig){

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


d3.json(data, function (topology) {
    var geojson = topojson.feature(topology, topology.objects.gadm36_UKR_1);
    var center = d3.geoCentroid(geojson);
    var scale = 2300;
    var offset = [width / 3.2, height / 2.5];

    var projection = d3.geoMercator().scale(scale).center(center).translate(offset);

    //console.log("geojson features", geojson.features);

    var group = svg.selectAll("g")
        .data(geojson.features)
        .enter().append("g");

    var path = d3.geoPath().projection(projection);


    console.log("path", path);

    var areas = group.append("path")
        .attr("d", path)
        .on("click", function (d) {
            d3.selectAll('path').style('fill',null);
            d3.select(this).style("fill","#16a78d")

        })
        // output names of admin entities
        .attr("transform", function(d) {
            console.log("d", d.geometry.coordinates);
            var p = polylabel(d.geometry.coordinates, 1.0);
            console.log("p", p);
            //console.log("d", d.properties.NAME_1)
        });

    //console.log("group", group);
    //group.selectAll().forEach(function (el){
    //    console.log(el);
    //});

    group
        .append("text")
        .text ( ({properties}) => properties.NAME_1);


})}