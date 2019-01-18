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

  Promise.all(requests).then(function(response) {

    // Defines the data.
    dataWorld = response[0];
    console.log(dataWorld);
    console.log(dataWorld["data"]);

    // Makes a list with all the countries.
    var countries = [];
    for (i = 0; i < 146; i++) {
      for (j = 0; j < 32; j++) {
        if (j % 4 == 1) {
            if(jQuery.inArray(dataWorld["data"][i][j], countries) == -1) {
              countries.push(dataWorld["data"][i][j]);
            }
          }
        }
      }

    console.log("countries");
    console.log(countries);

    // Makes a dictionary and adds countries with two years with empty lists too.
    allData = {}
    countries.forEach(function(d){
      allData[d] = {"2010": [], "2015": []};
    })

    // Adds the data of the years of the countries.
    dataWorld["data"].forEach( function (dp) {
      for (count = 0; count < 24; count += 4) {
        allData[dp[count + 1]]["2010"].push(Number(dp[count + 2]))
        allData[dp[count + 1]]["2015"].push(Number(dp[count + 3]))
      };
    });

    console.log("all data per country");
    console.log(allData);


    // Makes a dictionary with all countries and there total amount of criminal activities.
    allCrimes = {}

    countries.forEach(function(d){
      var sum = 0
      for (i = 0; i < 6; i++) {
        if (!Number.isNaN(allData[d]["2010"][i]) && (allData[d]["2010"][i] != null)) {
          sum += allData[d]["2010"][i]
        }
      }
      allCrimes[d] = sum;
    })

    console.log("all crimes");
    console.log(allCrimes);

    // Makes lists with "old" country names and "new" country names.
    oldCountryNames = ["Bahamas", "Bolivia (Plurinational State of)", "Brunei Darussalam",
                       "Cote d'Ivoire", "Czechia", "Iran (Islamic Republic of)",
                       "Iraq (Central Iraq)", "Kosovo under UNSCR 1244", "Republic of Korea",
                       "Republic of Moldova", "Russian Federation", "Serbia",
                       "Syrian Arab Republic", "The former Yugoslav Republic of Macedonia",
                       "United Kingdom (England and Wales)", "United States of America"]
    newCountryNames = ["The Bahamas", "Bolivia", "Brunei", "Ivory Coast", "Czech Republic",
                       "Iran", "Iraq", "Kososvo", "North Korea", "Moldova", "Russia",
                       "Republic of Serbia", "Syria", "Macedonia", "England", "USA"]

    // Change the names of the countries to names which are in accordance with the data map countries.
    for (i in oldCountryNames) {
      allCrimes[newCountryNames[i]] = allCrimes[oldCountryNames[i]]
      delete allCrimes[oldCountryNames[i]];
    }

    for (i in oldCountryNames) {
      allData[newCountryNames[i]] = allData[oldCountryNames[i]]
      delete allData[oldCountryNames[i]];
    }

    // Makes a dictionary seperated by the different sorts of crimes.
    dataSorts = ["Assaults", "Burglary", "Kidnapping", "Robbery",
                 "Sexual violence", "Theft"];
    data = {}

    console.log(dataSorts);

    // Adds each crime with their data to the dictionary.
    dataSorts.forEach(function(ds){
      data[ds] = [];
    })

    for (i = 0; i < 146; i++) {
      j = 2;
      dataSorts.forEach(function(dst){
        data[dst].push(dataWorld["data"][i][j])
        j += 4;
      })
    }

    console.log("data per crime");
    console.log(data);


    function createBarchart(cont) {
      /*
      This function creates a bar chart of a country with different sorts of crimes.
      */

      // Makes a list with the amounts of criminal activities in 2010.
      var amounts = allData[cont]["2010"]
      console.log("amounts barchart");
      console.log(amounts);

      for (i in amounts) {
        if (isNaN(amounts[i])) {
          amounts[i] = 0;
        }
      }

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

      // Gives the svg, a body with an width and height.
      var svg = d3.select("body")
                  .append("svg")
                  .attr("class", "bar")
                  .attr("width", widthSVG)
                  .attr("height", heightSVG);

      // Defines a tip with a class and the specific value.
      var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    return "<strong style='font-family:verdana'>Value:</strong> <span style='font-family:verdana'>" + d + "</span>"
                  })

      svg.call(tip);

      // Calculates the maximum value.
      var max = Math.max.apply(null, amounts);

      // Scales the y axis from 0 to a bit lower than max.
      var yScale = d3.scaleLinear()
                     .domain([0, 100 + max])
                     .range([height, padding])

      // Scales the x axis to the amount of crimesorts.
      var xScale= d3.scaleOrdinal()
                     .domain(dataSorts)
                     .range([0, width])

      // Defines the pink bars with values, a class, a width and a height.
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
                      return 80 + (width / dataSorts.length) * i
                    })
                    .attr("y", function(d, i) {
                      return yScale(d);
                    })
                    .attr("fill", "pink")

                    // Puts the tip on or off.
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)

      // Defines the distance between the bars.
      var barWidth = width / (dataSorts.length);

      // Adds labels under the bars of the crimesorts.
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
            return ((i * barWidth + 95))
          })
         .text(function(d){
            return d
          })
         .attr("text-anchor", "middle");

     // Defines and makes the y axis.
     var yAxis = d3.axisLeft()
                   .scale(yScale);

      svg.append("g")
         .attr("transform", "translate(" + padding + "," + 0 + ")")
         .call(yAxis);

      // Gives a title to the bar chart which changes for each country..
      svg.append("text")
         .attr("class", "text")
         .text("The amount of criminality per 100.000 inhabitants in ")
         .attr("transform", "translate(" + padding2 * 4 + "," + padding2 + ")");

      svg.append("text")
          .attr("class", "text")
          .text(cont)
          .attr("transform", "translate(" + (padding * 11 + 17) + "," + padding2 + ")");

      // Gives a title to the x axis.
      svg.append("text")
         .attr("class", "textAxis")
         .style("font-family", "verdana")
         .style("font-size", "12px")
         .attr("text-anchor", "middle")
         .attr("transform", "translate(" + (width / 2) + ","+ (height + 30) + ")")
         .text("Criminality sort");

      // Gives a title to the y axis.
      svg.append("text")
          .attr("class", "textAxis")
          .style("font-family", "verdana")
          .style("font-size", "12px")
          .attr("text-anchor", "middle")
          .attr("transform", "translate(" + 10 + ","+ (height / 2) +")rotate(-90)")
          .text("Amount");
    }


    function createDonutchart(cont) {
      /*
      Creates a Donutchart with the amount of women and men which commit
      criminal activities for each country.
      */

      // Generates a dictionary for each country with lists of 2010 and 2015.
      genderData = {}

      countries.forEach(function(d){
        genderData[d] = {"2010": [], "2015": []};
      })

      // Appends the amount of women and men which commit criminal activities
      // to the dictionary.
      dataWorld["data"].forEach( function (dp) {
        for (i = 24; i < 32; i += 4) {
          genderData[dp[i + 1]]["2010"].push(Number(dp[i + 2]))
          genderData[dp[i + 1]]["2015"].push(Number(dp[i + 3]));
        }
      })

      // Change the names of the countries to names which are in accordance with the data map countries.
      for (i in oldCountryNames) {
        genderData[newCountryNames[i]] = genderData[oldCountryNames[i]]
        delete genderData[oldCountryNames[i]];
      }

      console.log("gender");
      console.log(genderData);

      // Defines the margins for the svg and donut and defines the colors
      // and other values for the donutchart.
      var width = 600;
      var height = 550;
      var widthDonut = 400;
      var heightDonut = 400;
      var thickness = 70;
      var padding = 20;
      var radius = Math.min(widthDonut, heightDonut) / 2;
      var color = d3.scaleOrdinal()
                    .range(["rgb(8,48,107)", "pink"]);

      // Deletes the pie chart (when clicking on a new one for instance).
      if (d3.select("svg.pie")) {
        d3.select("svg.pie").remove().exit();
      }

      // Gives the svg of the donut chart a body with an width and height.
      var svg = d3.select("body")
                  .append("svg")
                  .attr("class", "pie")
                  .attr("width", width)
                  .attr("height", height);

      var g = svg.append("g")
                 .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

      // Gives a title to the donut chart.
      svg.append("text")
         .attr("class", "text")
         .text("The gender for criminal activities")
         .attr("transform", "translate(" + padding * 7 + "," + padding + ")");

      // Defines the arcade of the donut.
      var arc = d3.arc()
                  .innerRadius(radius - thickness)
                  .outerRadius(radius);

      // Defines a pie for the donut chart.
      var pie = d3.pie()
                  .value(function(d, i) {
                    return genderData[cont]["2010"][i]
                  })
                  .sort(null);

      // Defines the whole donut chart.
      var path = g.selectAll('path')
                  .data(pie(cont))
                  .enter()
                  .append("g")
                  .on("mouseover", function(d) {

                      // Puts what happens at scrollling over the donut chart.
                      let g = d3.select(this)
                                .style("cursor", "pointer")
                                .style("fill", "black")
                                .append("g")
                                .attr("class", "text-group");

                      // Appends text when scrolling over the donut chart.
                      g.append("text")
                       .attr("class", "value-text")
                       .text(function(d, i) {
                         return d.value
                       })
                       .attr('text-anchor', 'middle')
                       .attr('dy', '1.2em');

                       g.append("text")
                        .attr("class", "value-text")
                        .text("Value:")
                        .attr('text-anchor', 'middle')
                        .attr('dy', '.0em');
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

        // Legend for the donut chart.
        var legend = d3.select(".pie")
                          .append("g")
                          .attr("class", "legend")
                          .attr("transform", "translate(" + (8 * padding) + "," + (5 * padding) + ")")
                          .attr("x", width - 65)
                          .attr("y", 25)
                          .attr("height", 100)
                          .attr("width", 100);

        // Makes colored squares.
        legend.selectAll('g')
              .data(["Men", "Women"])
              .enter()
              .append('g')
              .each(function(d, i) {
                var g = d3.select(this);
                g.append("rect")
                 .attr("x", width - 260)
                 .attr("y", i * 25)
                 .attr("width", 10)
                 .attr("height", 10)
                 .style("fill", color(i));

                // Appends the text to the legend.
                g.append("text")
                    .attr("x", width - 240)
                    .attr("y", i * 25 + 8)
                    .attr("height",30)
                    .attr("width",100)
                    .style("fill", color(i))
                    .text(d);
        });
    }

    createMap()

    function createMap() {
      /*
      Creates a world map with scaling colors of the countries relative to the
      amount of criminal activities in that country.
      Reference of the map:
      http://bl.ocks.org/micahstubbs/raw/8e15870eb432a21f0bc4d3d527b2d14f/
      a45e8709648cafbbf01c78c76dfa53e31087e713/world_countries.json
      */

      // Defines the margins for the svg.
      var margin = {top: 0, right: 0, bottom: 0, left: 50},
                   width = 900 - margin.left - margin.right,
                   height = 700 - margin.top - margin.bottom;

      var path = d3.geoPath();

      // Gives the svg of the world map a body with an width and height.
      var svg = d3.select("body")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .append('g')
                  .attr('class', 'map');

      // Makes a map by takning the coordinates of each country.
      var projection = d3.geoMercator()
                         .scale(130)
                         .translate( [width / 2, height / 1.5]);

      var path = d3.geoPath().projection(projection);

      d3.json("world_countries.json").then(function(response) {
        ready(response)
      })

      function ready(data) {

        // Adds a key (crimes) and the data to each country when there is data of.
        for (const [key, value] of Object.entries(allCrimes)) {
          data.features.forEach(function(d) {
            if (d.properties.name == key) {
              d.crimes = value
            }
          })
        }

        // Set tooltips and shows the country with his value.
        var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(function(d) {
                      return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Crimes: </strong><span class='details'>" + d.crimes +"</span>";
                    })

        svg.call(tip);

        // Defines the highest value of the crimes.
        max = 0
        for (i in data.features) {
          value = data.features[i]["crimes"]
          if (value > max) {
            max = value;
          }
        }

        console.log(max);
        console.log("max");

        // Defines the colors for the world map.
        var color = d3.scaleThreshold()
                      .domain([0, (max / 9), (max / 9) * 2, (max / 9) * 3, (max / 9) * 4, (max / 9) * 5, (max / 9) * 6, (max / 9) * 7, (max / 9) * 8, max])
                      .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

        // Makes the world map with the right colors of the countries.
        svg.append("g")
            .attr("class", "countries")
            .selectAll("path")
            .data(data.features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", function(d) {
              return color(d.crimes)
            })
            .style('stroke', 'white')
            .style('stroke-width', 1.5)
            .style("opacity",0.8)

            // Nog veranderen naar css stylesheet!! Styles the tooltips.
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

              // Makes a bar- and donutchart when clicking on the donut chart.
              createBarchart(d.properties.name)
              createDonutchart(d.properties.name);
            });

        svg.append("path")
            .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id;}))
            .attr("class", "names")
            .attr("d", path)
      }
    }

    console.log("The eind");

    })
    .catch(function(e){
      console.log(e);
      throw(e);
    });
  }
