var selected_points = [];

var FLOOR_LEVEL = [1, 2];
var FONT_SIZE = 18;
var RADIUS = 10;

var floor_data = [];

d3.csv("data/Shibuya_Point.csv", function(error, data) {
    if (error != null) {
        console.log(err);
        return;
    }
    floor_data[0] = data;
    floor_data[1] = data;
    draw();
});

function draw(){
    // var floor_data = [];
    FLOOR_LEVEL.forEach(function(floor_level, index){
        // 生活者/旅行者ごとにデータを生成
        // floor_data[floor_level] = data.filter(function(element) {
        //     return element.floorLevel === String(floor_level);
        // });
        // floor_data[0] = data;
        // floor_data[1] = data;
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
            .attr("cx", function(d, i) {
                //return $("#floor_" + floor_level).width() * Math.random();
                return d.x;
            })
            .attr("cy", function(d, i) {
                // return $("#floor_" + floor_level).height() * Math.random();
                return d.y;
            })
            .attr("r", function(d) {
                return d.size * 10;
            })
            //.attr("fill", "#e74c3c")
            .attr("fill", function(d){
              c = d.category;
              if(c=="table"){
                return "#ffa500";
              }else if(c=="trafic"){
                return "#8fbc8f";
              }else{
                return "#6495ed";
              }
            })
            .attr({'data-toggle': 'modal', 'data-target': '#myModal'})
            // ポイントごとにクリックイベントを生成
            .on("click", function(d){ 
                $('#myModalLabel').text(d.topic);
                $('.modal-body').text(d.content);
                floor_data[index][0].size = Number(floor_data[index][0].size) + 1;
                console.log(floor_data[0][index].size);
                // selected_points.push(d);
                // console.log(selected_points); 
            });
        // ポイントごとに名前を表示
         svg.selectAll("text")
             .data(floor_data[floor_level])
             .enter().append("text")
             .style("font-size", FONT_SIZE + "px")
             .attr("fill", "black")
             .attr("x", function(d) {
        //      if((d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) < 0.5){
        //          return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * ( $("#floor_" + floor_level).width() - RADIUS * 2 ) + RADIUS + FONT_SIZE;
        //      }else{
        //          return (d.lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * ( $("#floor_" + floor_level).width() - RADIUS * 2 ) + RADIUS - (d.Name.length + 1) * FONT_SIZE;
                return d.x - d.size * 10 + 20;// - 30;
             })
             .attr("y", function(d) {
               return d.y;
        //         return (MAX_LNG - d.lng) / (MAX_LNG - MIN_LNG) * ( $("#floor_" + floor_level).height() - RADIUS * 2 ) + RADIUS;
             })
             .text(function(d) {
                 return d.topic;
             })
             .attr({
                 'dominant-baseline': 'middle'
             });
    });
  }
