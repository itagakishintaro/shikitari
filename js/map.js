var selected_points = [];
// TODO: MAX, MINを動的にとる
var MAX_LAT = 139.702,
    MIN_LAT = 139.699;
var MAX_LNG = 35.6589,
    MIN_LNG = 35.6584;
// TODO: TODO: 1〜3階固定ではなく、動的にする。
var FLOOR_LEVEL = [1, 105, 2, 3];
var FONT_SIZE = 12;
var RADIUS = 10;

d3.csv("data/Shibuya_Point.csv", function(error, data) {
    if (error != null) {
        console.log(err);
        return;
    }
    // 緯度、経度の最大値、最小値を設定
    MAX_LAT = Math.max.apply(null, data.map(function(element){return element.lat;}));
    MIN_LAT = Math.min.apply(null, data.map(function(element){return element.lat;}));
    MAX_LNG = Math.max.apply(null, data.map(function(element){return element.lng;}));
    MIN_LNG = Math.min.apply(null, data.map(function(element){return element.lng;}));

    var floor_data = [];
    FLOOR_LEVEL.forEach(function(floor_level){
        // 階ごとにデータを生成
        floor_data[floor_level] = data.filter(function(element) {
            return element.floorLevel === String(floor_level);
        });
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
                return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * ( $("#floor_" + floor_level).width() - RADIUS * 2 ) + RADIUS;
            })
            .attr("cy", function(d) {
                return (MAX_LNG - d.lng) / (MAX_LNG - MIN_LNG) * ( $("#floor_" + floor_level).height() - RADIUS * 2 ) + RADIUS;
            })
            .attr("r", RADIUS)
            .attr("fill", "#e74c3c")
            // ポイントごとにクリックイベントを生成
            .on("click", function(d){ 
            	selected_points.push(d);
            	console.log(selected_points); 
            });
        // ポイントごとに名前を表示
        svg.selectAll("text")
            .data(floor_data[floor_level])
            .enter().append("text")
            .style("font-size", FONT_SIZE + "px")
            .attr("fill", "gray")
            .attr("x", function(d) {
            	if((d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) < 0.5){
                	return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * ( $("#floor_" + floor_level).width() - RADIUS * 2 ) + RADIUS + FONT_SIZE;
            	}else{
            		return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * ( $("#floor_" + floor_level).width() - RADIUS * 2 ) + RADIUS - (d.Name.length + 1) * FONT_SIZE;
            	}
            })
            .attr("y", function(d) {
                return (MAX_LNG - d.lng) / (MAX_LNG - MIN_LNG) * ( $("#floor_" + floor_level).height() - RADIUS * 2 ) + RADIUS;
            })
            .text(function(d) {
                return d.Name;
            })
            .attr({
                'dominant-baseline': 'middle'
            });
    });
});