/*
Eveline Tiekink
11267321
Project criminality for the UvA course Dataprocessing
*/

window.onload = function(){

  var requests = [d3.json("data_assaults_world.json"), d3.json("data_kidnapping_world.json"),
                 d3.json("data_theft_world.json"), d3.json("data_robbery_world.json"),
                 d3.json("data_burglary_world.json"), d3.json("data_sexual_violence_world.json")];

  console.log("Lukt");

  Promise.all(requests).then(function(response) {

    // defines the data and deletes unused data
    console.log("Hoezo lukt hier niet?");
    data_assault = response[0];
    data_kidnapping = response[1];
    data_theft = response[2];
    data_robbery = response[3];
    data_burglary = response[4];
    data_sexual_violence = response[5];

    console.log("HOI");
    console.log(data_assault);
    console.log("Doei");

    data_sorts = [data_assault, data_kidnapping, data_theft, data_robbery, data_burglary, data_sexual_violence];
    var region_country_2010_2015 = [];
    // for sort in data_sorts:
    //   region_country_2010_2015.push(Object.keys(sort));

    console.log(region_country_2010_2015);

    // gives values to the width, height and padding
    var width = 800;
    var height = 200;
    var padding = 2

    // gives the svg a body with an width and height
    var svg = d3.select("body")
                .append("svg")
                .attr("width", 1200)
                .attr("height", 1200);

    // defines a tip with a class and specific values
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  return "<strong style='font-family:verdana'>Value:</strong> <span style='font-family:verdana'>" + d + "</span>"
                })
    //
    // // calculates the maximum value
    // var max = Math.max.apply(null, dataValues);
    //
    // // scales the y axis from 0 to 100 percent
    // var yScale = d3.scaleLinear()
    //                .domain([0, 100 + padding])
    //                .range([height, 0])
    //
    // // scales the x axis to the amount of countries
    // var xScale= d3.scaleOrdinal()
    //                .domain(countries)
    //                .range([0, width])
    //
    // // calles the tip
    // svg.call(tip);
    //
    // console.log(countries);
    //
    // // defines the pink bars with values, a class, a width and height
    // var bars = svg.selectAll("rect")
    //               .data(dataValues)
    //               .enter()
    //               .append("rect")
    //               .attr("class", "bar")
    //               .attr("width", 20)
    //               .attr("height", function(d){
    //                 return height - yScale(d);
    //               })
    //               .attr("x", function(d, i){
    //                 return 40 + (width / countries.length)* i
    //               })
    //               .attr("y", function(d, i) {
    //                 return yScale(d);
    //               })
    //               .attr("fill", "pink")
    //
    //               // puts the tip on or off
    //               .on('mouseover', tip.show)
    //               .on('mouseout', tip.hide)

    // // defines the distance between the bars
    // var barWidth = width / (countries.length);
    //
    // // adds labels under the bars of the countries
    // svg.selectAll("text.axis")
    //    .data(countries)
    //    .enter()
    //    .append("text")
    //    .attr("transform", "translate(0," + height + ")")
    //    .style("font-size", "10px")
    //    .style("font-family", "verdana")
    //    .attr("y", 10)
    //    .attr("id", function(d){
    //         return d;
    //        })
    //    .attr("x", function(d,i){
    //            return (((36 + i + 0.5) * barWidth) + 15 - width )
    //        })
    //    .text(function(d){
    //         return d
    //        })
    //    .attr("text-anchor", "middle");


    // gives a title to the x axis
    svg.append("text")
       .attr("class", "textAxis")
       .style("font-family", "verdana")
       .style("font-size", "12px")
       .attr("text-anchor", "middle")
       .attr("transform", "translate(" + (width/2) + ","+ (height + 40) + ")")
       .text("Criminality sort");

    // gives a title to the y axis
    svg.append("text")
        .attr("class", "textAxis")
        .style("font-family", "verdana")
        .style("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + 10 + ","+ (height / 2) +")rotate(-90)")
        .text("Criminality relative to 1000 people (%)");


    function createDonutchart(cont) {

      // defines the margins and other values used for the donut chart
      var width = 550;
      var height = 550;
      var widthDonut = 400;
      var heightDonut = 400;
      var thickness = 70;
      var padding = 20;
      var radius = Math.min(widthDonut, heightDonut) / 2;
      var color = d3.scaleOrdinal(d3.schemeSet1);

      // gives the svg a body with an width and height
      var svg = d3.select("body")
                .append("svg")
                .attr("class", "pie")
                .attr("width", width)
                .attr("height", height);

      var g = svg.append("g")
                 .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

      // gives a title to the donut chart
      svg.append("text")
         .attr("class", "text")
         .text("Donutchart of the immigration")
         .attr("transform", "translate(" + padding * 7 + "," + padding + ")");

      // // defines the arcade of the donut
      // var arc = d3.arc()
      //             .innerRadius(radius - thickness)
      //             .outerRadius(radius);
      //
      // // defines lists for the continents and the immigrants of the continents
      // continentList = Object.keys(data);
      // valuesList = []
      //
      // // appends the amount of immigrants to the values list
      // for (var continent in continentList) {
      //   continent = data[continentList[continent]][2017];
      //   valuesList.push(continent)
      // }
      //
      // // defines a pie for the donut chart
      // var pie = d3.pie()
      //             .value(function(d, i) {
      //                 return valuesList[i]
      //             })
      //             .sort(null);
      //
      // // defines the whole donut chart
      // var path = g.selectAll('path')
      //             .data(pie(continentList))
      //             .enter()
      //             .append("g")
      //             .on("mouseover", function(d) {
      //
      //                 // puts what happens at scrollling over the donut chart
      //                 let g = d3.select(this)
      //                           .style("cursor", "pointer")
      //                           .style("fill", "black")
      //                           .append("g")
      //                           .attr("class", "text-group");
      //
      //                 g.append("text")
      //                  .attr("class", "name-text")
      //                  .text(function(d) {
      //                    return d.data;
      //                  })
      //                  .attr('text-anchor', 'middle')
      //                  .attr('dy', '-1.2em');
      //
      //                 g.append("text")
      //                  .attr("class", "value-text")
      //                  .text(function(d, i) {
      //                    return d.value;
      //                  })
      //                  .attr('text-anchor', 'middle')
      //                  .attr('dy', '.6em');
      //               })
      //             .on("mouseout", function(d) {
      //                 d3.select(this)
      //                   .style("cursor", "none")
      //                   .style("fill", color(this._current))
      //                   .select(".text-group").remove();
      //             })
      //             .append('path')
      //             .attr('d', arc)
      //             .attr('fill', (d,i) => color(i))
      //             .on("click", function(d) {
    }


    })
    .catch(function(e){
      throw(e);
    });
  }
