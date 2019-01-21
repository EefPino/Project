/*
Eveline Tiekink
11267321
Project criminality for the UvA Project of the minor programming
Bootstrap grip
*/

// Import jQuery.
// var script = document.createElement('script');
// script.src = '//code.jquery.com/jquery-1.11.0.min.js';
// document.getElementsByTagName('head')[0].appendChild(script);



var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);



window.onload = function(){

  var requests = [d3.json("data_world_new_2.json")];

  console.log("Lukt");

  Promise.all(requests).then(function(response) {

    // Defines the data and deletes unused data.
    dataWorld = response[0];
    console.log(dataWorld);
    console.log(dataWorld["data"]);

    // crime_sorts = [dataset_assaults, dataset_burglary, dataset_kidnapping,
    //                dataset_robbery, dataset_sexual_violence, dataset_theft,
    //                dataset_males_detained, dataset_females_detained]

    var countries = [];
    for (i = 0; i < 146; i++) {
      // console.log(data_world["data"][i]);
      for (j = 0; j < 32; j++) {
        if (j % 4 == 1) {
            // countries.push(data_world["data"][i][j])
            // var value = data_world["data"][i][j]
            // console.log(value);
            // compare_value = value.slice(0, -1);
            // console.log(compare_value);
            if(jQuery.inArray(dataWorld["data"][i][j], countries) == -1) {
              countries.push(dataWorld["data"][i][j]);
            }
            // if( countries.indexOf("*") > -1 ) {
            //     console.log("success");
            }
        }
      }

    console.log("countries");
    console.log(countries);

    allData = {}

    countries.forEach(function(d){
      allData[d] = {"2010": [], "2015": []};
    })

    dataWorld["data"].forEach( function (dp) {
      for (count = 0; count < 24; count += 4) {
        allData[dp[count + 1]]["2010"].push(Number(dp[count + 2]))
        allData[dp[count + 1]]["2015"].push(Number(dp[count + 3]))
      };
    });

    console.log("all data per country");
    console.log(allData);



    allCrimes = {}

    countries.forEach(function(d){
      var sum = 0
      for (i = 0; i < 6; i++) {
        if (!Number.isNaN(allData[d]["2010"][i]) && (allData[d]["2010"][i] != null)) {
          sum += allData[d]["2010"][i]
          // console.log(allData[d]["2010"][i]);
        }
      }
      // console.log("sum");
      // console.log(sum);
      allCrimes[d] = sum;
    })

    console.log("all crimes");
    console.log(allCrimes);

    console.log("!!!!!!!!!!!!!!!!!!!!");

    // Change the names of the countries to names which are in cordance with the data map countries. (en loop )
    allCrimes["The Bahamas"] = allCrimes["Bahamas"];
    delete allCrimes["Bahamas"];
    allCrimes["Bolivia"] = allCrimes["Bolivia (Plurinational State of)"];
    delete allCrimes["Bolivia (Plurinational State of)"];
    allCrimes["Brunei"] = allCrimes["Brunei Darussalam"];
    delete allCrimes["Brunei Darussalam"];
    allCrimes["Ivory Coast"] = allCrimes["Cote d'Ivoire"];
    delete allCrimes["Cote d'Ivoire"];
    allCrimes["Czech Republic"] = allCrimes["Czechia"];
    delete allCrimes["Czechia"];
    allCrimes["Iran"] = allCrimes["Iran (Islamic Republic of)"];
    delete allCrimes["Iran (Islamic Republic of)"];
    allCrimes["Iraq"] = allCrimes["Iraq (Central Iraq)"];
    delete allCrimes["Iraq (Central Iraq)"];
    allCrimes["Kososvo"] = allCrimes["Kosovo under UNSCR 1244"];
    delete allCrimes["Kosovo under UNSCR 1244"];
    allCrimes["North Korea"] = allCrimes["Republic of Korea"];
    delete allCrimes["Republic of Korea"];
    allCrimes["Moldova"] = allCrimes["Republic of Moldova"];
    delete allCrimes["Republic of Moldova"];
    allCrimes["Russia"] = allCrimes["Russian Federation"];
    delete allCrimes["Russian Federation"];
    allCrimes["Republic of Serbia"] = allCrimes["Serbia"];
    delete allCrimes["Serbia"];
    allCrimes["Syria"] = allCrimes["Syrian Arab Republic"];
    delete allCrimes["Syrian Arab Republic"];
    allCrimes["Macedonia"] = allCrimes["The former Yugoslav Republic of Macedonia"];
    delete allCrimes["The former Yugoslav Republic of Macedonia"];
    allCrimes["England"] = allCrimes["United Kingdom (England and Wales)"];
    delete allCrimes["United Kingdom (England and Wales)"];
    allCrimes["USA"] = allCrimes["United States of America"];
    delete allCrimes["United States of America"];
    console.log(allCrimes);

    allData["The Bahamas"] = allData["Bahamas"];
    delete allData["Bahamas"];
    allData["Bolivia"] = allData["Bolivia (Plurinational State of)"];
    delete allData["Bolivia (Plurinational State of)"];
    allData["Brunei"] = allData["Brunei Darussalam"];
    delete allData["Brunei Darussalam"];
    allData["Ivory Coast"] = allData["Cote d'Ivoire"];
    delete allData["Cote d'Ivoire"];
    allData["Czech Republic"] = allData["Czechia"];
    delete allData["Czechia"];
    allData["Iran"] = allData["Iran (Islamic Republic of)"];
    delete allData["Iran (Islamic Republic of)"];
    allData["Iraq"] = allData["Iraq (Central Iraq)"];
    delete allData["Iraq (Central Iraq)"];
    allData["Kososvo"] = allData["Kosovo under UNSCR 1244"];
    delete allData["Kosovo under UNSCR 1244"];
    allData["North Korea"] = allData["Republic of Korea"];
    delete allData["Republic of Korea"];
    allData["Moldova"] = allData["Republic of Moldova"];
    delete allData["Republic of Moldova"];
    allData["Russia"] = allData["Russian Federation"];
    delete allData["Russian Federation"];
    allData["Republic of Serbia"] = allData["Serbia"];
    delete allData["Serbia"];
    allData["Syria"] = allData["Syrian Arab Republic"];
    delete allData["Syrian Arab Republic"];
    allData["Macedonia"] = allData["The former Yugoslav Republic of Macedonia"];
    delete allData["The former Yugoslav Republic of Macedonia"];
    allData["England"] = allData["United Kingdom (England and Wales)"];
    delete allData["United Kingdom (England and Wales)"];
    allData["USA"] = allData["United States of America"];
    delete allData["United States of America"];


   //  countries.forEach(function(d){
   //   console.log(allData[d]);
   // })

    // for (i = 0; i < countries.length; i++) {
      // console.log(countries[i]);
      // console.log(allData[countries[i]]["2010"]);
    // }
    console.log(allData["Albania"]["2010"]);
    // for (i = 0; i < 146; i++) {
    //   for (j = 0; j < 32; j++) {
    //     if (j % 4 == 1) {
    //       console.log();
    //       if(jQuery.inArray(dataWorld["data"][i][j], countries) == -1) {
    //         countries.push(dataWorld["data"][i][j]);
    //         console.log(dataWorld["data"][i][j]);
    //         allData[dataWorld["data"][i][j]] = [];

    // for (i = 0; i < 146; i++) {
    //   // console.log(data_world["data"][i]);
    //   j = 2;
    //   dataSorts.forEach(function(dst){
    //     data[dst].push(dataWorld["data"][i][j])
    //     j += 4;
    //   })
    // }

    dataSorts = ["Assaults", "Burglary", "Kidnapping", "Robbery", "Sexual violence", "Theft"];

    data = {}

    dataSorts.forEach(function(ds){
      data[ds] = [];
    })

    // var data2010 = [];
    for (i = 0; i < 146; i++) {
      // console.log(data_world["data"][i]);
      j = 2;
      dataSorts.forEach(function(dst){
        data[dst].push(dataWorld["data"][i][j])
        j += 4;
      })
    }
    console.log("data per crime");
    console.log(data);

   //   console.log("pipo");
   //   region_country_2010_2015.push(Object.keys(data));
   // }
    // console.log();


    // console.log("Doei");
    // DIT WERKT NIET, IK WIL HIER DAT HIERBOVEN KORT IN EEN LOOPJE MAKEN
    // data_sorts = ["Assault", "Kidnapping", "Theft", "Robbery",
                  // "Burglary", "Sexual violence"];
    //               console.log("bep");
    // for (i = 0; i < data_sorts.length; i++) {
    //
    //   console.log(data_sorts[i]);
    //   console.log(response[i]);
    //   data_sorts[i] = response[i]
    // }

    // var region_country_2010_2015 = [];
    // for (i = 0; i < data_sorts.length; i++) {
    //   console.log("pipo");
    //   region_country_2010_2015.push(Object.keys(data));
    // }

    // console.log("hoi");
    // console.log(region_country_2010_2015);

    console.log("hiephoi");
    console.log(allData["Albania"]["2010"]);

    function createBarchart(cont) {

      // Hier komt de juiste data in een lijst te komen -> op het land = cont selecteren,
      // zoeken in de data (allCrimes) voor dat land en dan de data van 2010 in een lijst zetten
      // (of alleen vinden, want het staat al in een lijst).


      console.log("ja je bent er");
      console.log(cont);
      console.log(allData);

      // console.log(allData[cont]["2010"]);
      var amounts = allData[cont]["2010"]
      console.log("amounts");
      console.log(amounts);

      for (i in amounts) {
        if (isNaN(amounts[i])) {
          console.log("drol");
          amounts[i] = 0;
        }
      }

      console.log(amounts);

      // Gives values to the width, height and padding of the SVG and bar chart.
      var widthSVG = 800;
      var heightSVG = 500;
      var padding = 50;
      var padding2 = 20;
      var width = 600;
      var height = 300;
      var widthBar = 30;

      // Deletes the bar chart (when clicking on a new one for instance).
      if (d3.select("svg.bar")) {
        d3.select("svg.bar").remove().exit();
      }

      // gives the svg a body with an width and height
      var svg = d3.select("body")
                  .append("svg")
                  .attr("class", "bar")
                  .attr("width", widthSVG)
                  .attr("height", heightSVG);

      // defines a tip with a class and specific values
      var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    // console.log("dit is d");
                    // console.log(d);
                    return "<strong style='font-family:verdana'>Value:</strong> <span style='font-family:verdana'>" + d + "</span>"
                  })

      console.log("Barchart");
      //
      // calculates the maximum value
      var max = Math.max.apply(null, amounts);
      //
      // // scales the y axis from 0 to the max
      var yScale = d3.scaleLinear()
                     .domain([0, 100 + max])
                     .range([height, padding])
      //
      // scales the x axis to the amount of crimes
      var xScale= d3.scaleOrdinal()
                     .domain(dataSorts)
                     .range([0, width])
      //
      // calles the tip
      svg.call(tip);
      //
      console.log(dataSorts);

      // defines the pink bars with values, a class, a width and height
      var bars = svg.selectAll("rect")
                    .data(amounts)
                    .enter()
                    .append("rect")
                    .attr("class", "bar")
                    .attr("width", widthBar)
                    .attr("height", function(d){
                      return height - yScale(d);
                    })
                    .attr("x", function(d, i){
                      return 60 + (width / dataSorts.length) * i
                    })
                    .attr("y", function(d, i) {
                      return yScale(d);
                    })
                    .attr("fill", "pink")

                    // puts the tip on or off
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)

      // Defines the distance between the bars.
      var barWidth = width / (dataSorts.length);

      console.log("barwidth");
      console.log(barWidth);


      // X-as labels werkt nog niet!!!!!!!!!!!!!!1
      // adds labels under the bars of the countries
      svg.selectAll("text.axis")
         .data(dataSorts)
         .enter()
         .append("text")
         .attr("transform", "translate(0," + height + ")")
         .style("font-size", "10px")
         .style("font-family", "verdana")
         .attr("y", 10)
         .attr("id", function(d) {
            return d;
          })
         .attr("x", function(d, i) {

           // Dit nog veranderen naar iets met xScale!!!!!!!!!!!!!!????????????
            return ((i * barWidth + 75))
          })
         .text(function(d){
            return d
          })
         .attr("text-anchor", "middle");

     // defines the y axis
     var yAxis = d3.axisLeft()
                .scale(yScale);

      // makes the y axis
      svg.append("g")
         .attr("transform", "translate(" + padding + "," + 0 + ")")
         .call(yAxis);

      // gives a title to the bar chart
      svg.append("text")
            .attr("class", "text")
            .text("The amount of criminality per 100.000 inhabitants in ")
            .attr("transform", "translate(" + padding2 * 4 + "," + padding2 + ")");

      svg.append("text")
          .attr("class", "text")
          .text(cont)
          .attr("transform", "translate(" + (padding * 11 + 17) + "," + padding2 + ")");

      // svg.append("text")
      //       .attr("class", "text")
      //       .text(cont)
      //       .attr("transform", "translate(" + padding2 * 20 + "," + padding2 + ")");

      // gives a title to the x axis
      svg.append("text")
         .attr("class", "textAxis")
         .style("font-family", "verdana")
         .style("font-size", "12px")
         .attr("text-anchor", "middle")
         .attr("transform", "translate(" + (width / 2) + ","+ (height + 30) + ")")
         .text("Criminality sort");

      console.log("hallo");

      // gives a title to the y axis
      svg.append("text")
          .attr("class", "textAxis")
          .style("font-family", "verdana")
          .style("font-size", "12px")
          .attr("text-anchor", "middle")
          .attr("transform", "translate(" + 10 + ","+ (height / 2) +")rotate(-90)")
          .text("Amount");
    }

    // createDonutchart(data)

    function createDonutchart(cont) {

      // genderData = {}
      //
      // countries.forEach(function(d){
      //   genderData[d] = {"2010": [], "2015": []};
      // })
      //
      //
      // dataWorld["data"].forEach( function (dp) {
      //   for (i = 24; i < 32; i += 4) {
      //     genderData[dp[i + 1]]["2010"].push(Number(dp[i + 2]))
      //     genderData[dp[i + 1]]["2015"].push(Number(dp[i + 3]))
      //   };
      // });\

      // console.log(allData[cont]["2010"]);
      // var amounts = allData[cont]["2010"]
      // console.log("amounts");
      // console.log(amounts);
      //
      // for (i in amounts) {
      //   if (isNaN(amounts[i])) {
      //     console.log("drol");
      //     amounts[i] = 0;
      //   }
      // }

      console.log(dataWorld["data"]);

      genderData = {}

      countries.forEach(function(d){
        genderData[d] = {"2010": [], "2015": []};
      })

      dataWorld["data"].forEach( function (dp) {
        for (i = 24; i < 32; i += 4) {
          // console.log(genderData)
          // console.log(dp[i + 1])
          genderData[dp[i + 1]]["2010"].push(Number(dp[i + 2]))
          genderData[dp[i + 1]]["2015"].push(Number(dp[i + 3]))
        };
      });

      console.log("gender");
      console.log(genderData);

      // data_males_detained = response[0]

      // defines the margins and other values used for the donut chart
      var width = 550;
      var height = 550;
      var widthDonut = 400;
      var heightDonut = 400;
      var thickness = 70;
      var padding = 20;
      var radius = Math.min(widthDonut, heightDonut) / 2;
      var color = d3.scaleOrdinal()
                    .range(["rgb(8,48,107)", "pink"]);
      // var color = d3.scaleOrdinal(d3.schemeSet1);

      // Deletes the pie chart (when clicking on a new one for instance)
      if (d3.select("svg.pie")) {
        d3.select("svg.pie").remove().exit();
      }

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
         .text("The gender for criminal activities")
         .attr("transform", "translate(" + padding * 7 + "," + padding + ")");

      // defines the arcade of the donut
      var arc = d3.arc()
                  .innerRadius(radius - thickness)
                  .outerRadius(radius);

      // console.log("Detained");
      // console.log(data_males_detained);
      // console.log(data_females_detained);
      // console.log(data_males_detained["Country"]["Country"]);
      //
      // countries_males = []
      //
      // for (var i = 0; i < 120; i++) {
      //     countries_males.push(data_males_detained["Country"]["Country"][i]);
      // }
      //
      // console.log("countries males");
      // console.log(countries_males);
      //
      // data_males = []
      // for (var i = 0; i < countries_males.length; i++) {
      //     data_males.push(parseFloat(data_males_detained["Data_2010"]["2010.1"][i]));
      // }
      //
      // countries_females = []
      // for (var i = 0; i < 120; i++) {
      //     countries_females.push(data_females_detained["Country"]["Country"][i]);
      // }
      //
      // console.log("countries females");
      // console.log(countries_males);
      //
      // data_females = []
      // for (var i = 0; i < countries_females.length; i++) {
      //     data_females.push(parseFloat(data_females_detained["Data_2010"]["2010.1"][i]));
      // }

      // console.log("2010");
      // console.log(data_males);
      // console.log(data_females);

      console.log(cont);

      // Voor sommige denk ik geen data -> lege lijst of dat die undefined is --> nog aanpassen!!!!!!!
      console.log(genderData[cont]["2010"]);
      console.log(genderData[cont]["2010"][0]);


      // // defines lists for the continents and the immigrants of the continents
      // continentList = Object.keys(data);
      // valuesList = []
      //
      // // appends the amount of immigrants to the values list
      // for (var continent in continentList) {
      //   continent = data[continentList[continent]][2017];
      //   valuesList.push(continent)
      // }
      for (i = 0; i < 2; i++) {
        console.log(i);
        console.log(genderData[cont]["2010"][i]);
      }

      // Defines a pie for the donut chart.
      var pie = d3.pie()
                  .value(function(d, i) {
                    // console.log(i);
                    // console.log(genderData[cont]["2010"])
                    // console.log("hier");
                    console.log(genderData[cont]["2010"][i])
                      return genderData[cont]["2010"][i]
                  })
                  .sort(null);

      // defines the whole donut chart
      var path = g.selectAll('path')
                  .data(pie(cont))
                  .enter()
                  .append("g")
                  .on("mouseover", function(d) {

                      // puts what happens at scrollling over the donut chart
                      let g = d3.select(this)
                                .style("cursor", "pointer")
                                .style("fill", "black")
                                .append("g")
                                .attr("class", "text-group");

                      g.append("text")
                       .attr("class", "name-text")
                       .text(function(d, i) {
                         // console.log("hierzo");
                         // DIT WAArschijnlijk helemaal weghalen (de tekst) !!!!!!!!
                         if (i == 0) {
                           gender = "Men"
                         } else {
                           gender = "Women"
                         }
                         console.log(d);
                         return gender;
                       })
                       .attr('text-anchor', 'middle')
                       .attr('dy', '-1.2em');

                      g.append("text")
                       .attr("class", "value-text")
                       .text(function(d, i) {
                         return d.value;
                       })
                       .attr('text-anchor', 'middle')
                       .attr('dy', '.6em');
                    })
                  .on("mouseout", function(d) {
                      d3.select(this)
                        .style("cursor", "none")
                        .style("fill", color(this._current))
                        .select(".text-group").remove();
                  })
                  .append('path')
                  .attr('d', arc)
                  .attr('fill', (d,i) => color(i))
                  // .on("click", function(d) {

        // Legend for the donut chart
        var legend = d3.select(".pie")
                          .append("g")
                          .attr("class", "legend")
                          .attr("transform", "translate(" + (width - 100) + "," + (height / 2) + ")")
                          // .attr("x", width - 65)
                          // .attr("y", 25)
                          // .attr("height", 100)
                          // .attr("width", 100);

        // fills each dot with another color
        legend.selectAll('g').data(civileans)
              .enter()
              .append('g')
              .each(function(d, i) {
                var g = d3.select(this);
                g.append("rect")
                 .attr("x", width - 65)
                 .attr("y", i * 25)
                 .attr("width", 10)
                 .attr("height", 10)
                 .style("fill", colors(i));

                // appends the text to the legend
                g.append("text")
                    .attr("x", width - 50)
                    .attr("y", i * 25 + 8)
                    .attr("height",30)
                    .attr("width",100)
                    .style("fill", colors(i))
                    .text(colors(i));
        });

        // defines the colors
        colors = ["#FEEBE2","#FCC5C0"]

        // // Another legend
        // // scales the function for colors with a quantize
        // var colorScale = d3.scaleQuantize()
        //                    .domain([0, 400])
        //                    .range(colors);

       // tries to make and add another legend
       svg.append("g")
          .attr("id", "colorLegend")
          .attr("transform", "translate(" + width + "," + (height / 2) + ")")
          .call(d3.legend)
          // .legendColor()
          //
          // .labelFormat(d3.format(".0f"))
          // // .scale(colorScale)
          // .title("Legend")
          // .shapePadding(5)
          // .shapeWidth(50)
          // .shapeHeight(20)
          // .labelOffset(12);

      // puts the right values in the legend / dots
      svg.append("text")
          .attr("transform", "translate(" + width + "," + (height / 2) + ")")
          .style("text-anchor", "middle")
          .text("men");
      }


    // function createDonutchart(cont) {
    //   console.log("Donutchart");
    // }

    // 1. Het inladen van meerdere bestanden naar d3 (het stukje onder ‘queue()’ in het voorbeeld) werkt in versie 5 inmiddels anders. Kijk hiervoor nog eens naar je code van vorige week (hint: “Promise”).

    // 2. Het voorbeeld gebruikt een bestand “world_countries.json”, waarbij het niet zo duidelijk is waar dit bestand nu eigenlijk vandaan komt. Dit bestand vind je hier: http://bl.ocks.org/micahstubbs/raw/8e15870eb432a21f0bc4d3d527b2d14f/a45e8709648cafbbf01c78c76dfa53e31087e713/world_countries.json

    // allCrimes
    crimes = JSON.stringify(allCrimes);
    // console.log(crimes);

    // genderData = {}
    //
    // countries.forEach(function(d){
    //   genderData[d] = {"2010": [], "2015": []};
    // })
    //
    //
    // dataWorld["data"].forEach( function (dp) {
    //   for (i = 24; i < 32; i += 4) {
    //     genderData[dp[i + 1]]["2010"].push(Number(dp[i + 2]))
    //     genderData[dp[i + 1]]["2015"].push(Number(dp[i + 3]))
    //   };
    // });
    //
    // console.log("gender");
    // console.log(genderData);

    // // Set tooltips
    // var tip = d3.tip()
    //             .attr('class', 'd3-tip')
    //             .offset([-10, 0])
    //             .html(function(d) {
    //               return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.population) +"</span>";
    //             })

    var margin = {top: 0, right: 0, bottom: 0, left: 50},
                 width = 900 - margin.left - margin.right,
                 height = 700 - margin.top - margin.bottom;

    var path = d3.geoPath();

    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append('g')
                .attr('class', 'map');

    var projection = d3.geoMercator()
                       .scale(130)
                       .translate( [width / 2, height / 1.5]);

    var path = d3.geoPath().projection(projection);

    // http://bl.ocks.org/micahstubbs/raw/8e15870eb432a21f0bc4d3d527b2d14f/a45e8709648cafbbf01c78c76dfa53e31087e713/world_countries.json

    d3.json("world_countries.json").then(function(response) {
      console.log("bijna");
      ready(response)
    })

    function ready(data) {
      // var populationById = {};

      console.log(data);

      console.log("djibediedoe");
      // console.log(allCrimes);

      // allData[dp[count + 1]]["2010"].push(Number(dp[count + 2]))

      // allCrimes.forEach(function(c) {
      //   console.log(c);
      // })

      // Adds a key (crimes) and the data to each country when there is data.
      count = 0
      for (const [key, value] of Object.entries(allCrimes)) {
        // console.log(key, value);
        data.features.forEach(function(d) {
          if (d.properties.name == key) {
            count++
            d.crimes = value
          }
        })
      }

      console.log(data);
      console.log("count");
      console.log(count);

      // console.log(allCrimes.length);

      // data.features.forEach(function(d) {
      //   console.log(d.properties.name);
      // })

      // dataWorld["data"].forEach( function (dp) {
      //   for (i = 24; i < 32; i += 4) {
      //     genderData[dp[i + 1]]["2010"].push(Number(dp[i + 2]))
      //     genderData[dp[i + 1]]["2015"].push(Number(dp[i + 3]))
      //   };
      // });

      // population.forEach(function(d) { populationById[d.id] = +d.population; });
      // console.log(populationById);
      // data.features.forEach(function(d) { d.population = populationById[d.id] });
      max = 0
      for (i in data.features) {
        value = data.features[i]["crimes"]
        if (value > max) {
          max = value;
        }
      }

      console.log(max);
      console.log("max");

      // Set tooltips
      var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    // console.log("d");
                    // console.log(d.properties.name);
                    // console.log(d.crimes);

                    // Dit nog aanpassen!!
                    return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Crimes: </strong><span class='details'>" + d.crimes +"</span>";
                    // return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>";
                  })

      var color = d3.scaleThreshold()
                    .domain([0, (max / 9), (max / 9) * 2, (max / 9) * 3, (max / 9) * 4, (max / 9) * 5, (max / 9) * 6, (max / 9) * 7, (max / 9) * 8, max])
                    // .domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
                    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

      svg.call(tip);

      console.log(data.features[2]["crimes"]);


      svg.append("g")
          .attr("class", "countries")
          .selectAll("path")
          .data(data.features)
          .enter().append("path")
          .attr("d", path)
          // .style("fill", function(d) { return color(  populationById[d.id]); })
          .style("fill", function(d) {
            // console.log(d.crimes);
            // console.log(color(d.crimes));

            // console.log(data.features.crimes);
            return color(d.crimes)
          })
          .style('stroke', 'white')
          .style('stroke-width', 1.5)
          .style("opacity",0.8)
          // tooltips
          .style("stroke","white")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            tip.show(d);

            d3.select(this)
              .style("opacity", 1)
              .style("stroke","white")
              .style("stroke-width",3);
          })
          .on('mouseout', function(d){
              tip.hide(d);

                d3.select(this)
                  .style("opacity", 0.8)
                  .style("stroke","white")
                  .style("stroke-width",0.3);
              })
          .on("click", function(d) {
            console.log(d.properties.name);
            // puts what happens at clicking on the donut chart
            createBarchart(d.properties.name)
            createDonutchart(d.properties.name);
          });



      svg.append("path")
          .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
           // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
          .attr("class", "names")
          .attr("d", path)
          // .on("click", function(d) {
          //   // puts what happens at clicking on the donut chart
          //   createBarchart(d.data);
          // })

      // function bar(d) {
      //   createBarchart(d.data)
      // }

      // createBarchart


      // // Misschien is dit helemaal fout
      // var g = svg.append("g")
      //
      // var path = g.selectAll('path')
      //             .on("click", function(d) {
      //
      //               // puts what happens at clicking on the donut chart
      //               createBarchart(d.data);
      //             })
    }

    console.log("The eind");

    })
    .catch(function(e){
      console.log(e);
      throw(e);
    });
  }
