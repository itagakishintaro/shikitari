var selected_points = [];

var FLOOR_LEVEL = [1, 2];
var FONT_SIZE = 12;
var RADIUS = 10;

d3.csv("data/Shibuya_Point.csv", function(error, data) {
    if (error != null) {
        console.log(err);
        return;
    }

    var floor_data = [];
    FLOOR_LEVEL.forEach(function(floor_level){
        // 生活者/旅行者ごとにデータを生成
        // floor_data[floor_level] = data.filter(function(element) {
        //     return element.floorLevel === String(floor_level);
        // });
        floor_data = data;
console.log(floor_data);
        // svgタグを生成
        var svg = d3.select("#floor_" + floor_level)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");
        // ポイントごとに円を生成
        svg.selectAll("circle")
            .data(floor_data[floor_level])
            .enter().append("circle")
            .attr("cx", function(d) {
                //return $("#floor_" + floor_level).width() * Math.random();
                return 10;
            })
            .attr("cy", function(d) {
                // return $("#floor_" + floor_level).height() * Math.random();
                return 10;
            })
            .attr("r", RADIUS)
            .attr("fill", "#e74c3c")
            // ポイントごとにクリックイベントを生成
            .on("click", function(d){ 
                selected_points.push(d);
                console.log(selected_points); 
            });
        // ポイントごとに名前を表示
        // svg.selectAll("text")
        //     .data(floor_data[floor_level])
        //     .enter().append("text")
        //     .style("font-size", FONT_SIZE + "px")
        //     .attr("fill", "gray")
        //     .attr("x", function(d) {
        //      if((d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) < 0.5){
        //          return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * ( $("#floor_" + floor_level).width() - RADIUS * 2 ) + RADIUS + FONT_SIZE;
        //      }else{
        //          return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * ( $("#floor_" + floor_level).width() - RADIUS * 2 ) + RADIUS - (d.Name.length + 1) * FONT_SIZE;
        //      }
        //     })
        //     .attr("y", function(d) {
        //         return (MAX_LNG - d.lng) / (MAX_LNG - MIN_LNG) * ( $("#floor_" + floor_level).height() - RADIUS * 2 ) + RADIUS;
        //     })
        //     .text(function(d) {
        //         return d.Name;
        //     })
        //     .attr({
        //         'dominant-baseline': 'middle'
        //     });
    });
});