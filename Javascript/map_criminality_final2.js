/*
Eveline Tiekink
11267321;
Project criminality for the UvA Project of the minor programming.
*/

// Defines global variables.
var allDataData;
window.year = 2015;
window.category = "Assaults";
window.categoryChanged = false;

function mapOneCrime(crime, year){
  /*
  Creates a world map with scaling colors of the countries relative to the
  amount of one specific criminal activity in that country.
  Source for the map:
  http://bl.ocks.org/micahstubbs/raw/8e15870eb432a21f0bc4d3d527b2d14f/
  a45e8709648cafbbf01c78c76dfa53e31087e713/world_countries.json
  */

  window.category = crime
  window.categoryChanged = true

  // Defines the width and height for the svg.
  width = 900;
  height = 700;

  var path = d3.geoPath();

  // Deletes the world map, legend, donut chart and bar chart
  // (when clicking to anther map for instance).
  if (d3.select("svg.legendmap")) {
    d3.select("svg.legendmap").selectAll("text").remove().exit();
    d3.selectAll(".map").selectAll("path").remove();
    d3.selectAll(".map").selectAll("text").remove();
  };

  if (d3.select("svg.pie")) {
    d3.select("svg.pie").remove().exit();
  }

  if (d3.select("svg.bar")) {
    d3.select("svg.bar").selectAll("text").remove().exit();
    d3.select("svg.bar").selectAll("rect").remove().exit();
    d3.select("svg.bar").selectAll("g").remove().exit();
  };

  svgMap.append("text")
             .attr("class", "text")
             .text(crime)
             .attr("transform", "translate(" + (width / 2) + "," + 50 + ")");


  // Makes a map by taking the coordinates of each country.
  var projection = d3.geoMercator()
                     .scale(130)
                     .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath().projection(projection);

  d3.json("https://raw.githubusercontent.com/EefPino/Project/master/Libraries/world_countries.json").then(function(response) {
    ready(response)
  })

  // Makes the world map with the right data.
  function ready(data) {

    // Adds a key (crimes) and the data to each country when there is data of.
    for (const [key, value] of Object.entries(allDataData[crime])) {
      data.features.forEach(function(d) {
        if (d.properties.name == key) {
          if (typeof value !== "undefined") {
            d.crimes = value[year];
          };
        };
      });
    };

    // Set tooltips and shows the country with his value.
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Crimes: </strong><span class='details'>" + d.crimes +"</span>";
                })

    svgMap.call(tip);

    // Defines the highest value of the crimes.
    max = 0
    for (i in data.features) {
      value = data.features[i]["crimes"]
      if (value > max) {
        max = value;
      };
    };

    // Defines the colors for the world map.
    colorValues = [0, (max / 9), (max / 9) * 2, (max / 9) * 3, (max / 9) * 4, (max / 9) * 5, (max / 9) * 6, (max / 9) * 7, (max / 9) * 8, max]
    colorMap =["rgb(229, 240, 220)", "rgb(207, 243, 208)", "rgb(181, 247, 184)", "rgb(150, 247, 173)", "rgb(95, 238, 135)", "rgb(59, 226, 104)", "rgb(50, 180, 90)", "rgb(46, 139, 87)", "rgb(39, 121, 74)", "rgb(24, 73, 47)"]

    var color = d3.scaleThreshold()
                  .domain(colorValues)
                  .range(colorMap)

    createLegendMap();

    // Makes the world map with the right colors of the countries.
    svgMap.append("g")
               .attr("class", "countries")
               .selectAll("path")
               .data(data.features)
               .enter().append("path")
               .attr("d", path)
               .style("fill", function(d) {
                 return color(d.crimes);
               })
               .style('stroke', 'white')
               .style('stroke-width', 1.5)
               .style("opacity", 0.8)
               .style("stroke","white")
               .style('stroke-width', 0.3)
               .on('mouseover',function(d){
                 tip.show(d);

                 d3.select(this)
                   .style("opacity", 1)
                   .style("stroke","white")
                   .style("stroke-width", 3);
               })
               .on('mouseout', function(d){
                   tip.hide(d);
                   d3.select(this)
                     .style("opacity", 0.8)
                     .style("stroke","white")
                     .style("stroke-width", 0.3);
                   });
  };




  function createLegendMap() {
    /*
    Creates a legend for the world map.
    */

    // // Gives values to the width, height and padding of the SVG.
    var widthLegend = 300;
    var padding = 20;

    // Defines a legend with help of:
    // https://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e.
    var legend = d3.select(".legendmap")
                   .append("g")
                   .attr("class", "legend")
                   .attr("transform", "translate(" + 40 + "," + 40 + ")")
                   .attr("x", 0)
                   .attr("y", 0)
                   .attr("height", 200)
                   .attr("width", 200);

    // Defines all the colors and values for the legend.
    var legendValues = colorValues.slice()
    legendValues.push("Undefined");

    var legendColors = colorMap.slice();
    legendColors.push("black");

    // Makes colored squares.
    legend.selectAll("g")
          .data(legendValues)
          .enter()
          .append("g")
          .each(function(d, i) {
            var g = d3.select(this);

            // Appends the text to the legend.
            g.append("text")
                .attr("x", widthLegend - 240)
                .attr("y", i * 25 + 10)
                .attr("height",30)
                .attr("width",100)
                .text(function(d) {
                  if (isNaN(d)) {
                    return(d)
                  }
                  else {
                    return(parseInt(d))
                  };
                });
          });
  };

};


var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


window.onload = function(){

  var requests = [d3.json("Data/data_world_new_2.json"), d3.json("Data/data_world_everything.json")];

  Promise.all(requests).then(function(response) {


    createsSVGs();

    function createsSVGs() {
      /*
      Makes all the SVG's used for the visualizations.
      */

      // Defines the margins for the svg.
      var widthMap = 900;
      var heightMap = 700;

      // Gives the svg of the world map a body with an width and height.
      svgMap = d3.select("body")
                 .append("svg")
                 .attr('class', 'map')
                 .attr("width", widthMap)
                 .attr("height", heightMap)
                 .append('g');

       // Gives values to the width, height and padding of the SVG.
       var widthLegend = 250;
       var heightLegend = 300;

       // Gives the svg, a body with an width and height.
       svgLegend = d3.select("body")
                     .append("svg")
                     .attr("class", "legendmap")
                     .attr("width", widthLegend - 20)
                     .attr("height", heightLegend);

      // Gives values to the width, height and padding of the SVG and bar chart.
      var widthSVGbar = 800;
      var heightSVGbar = 500;

      // Gives the svg of the barchart, a body with an width and height.
      svgBar = d3.select("body")
                 .append("svg")
                 .attr("class", "bar")
                 .attr("width", widthSVGbar)
                 .attr("height", heightSVGbar);
    };

    // Defines the data.
    dataWorld = response[0];

    // Makes a list with all the countries.
    var countries = [];
    for (i = 0; i < 146; i++) {
      for (j = 0; j < 32; j++) {
        if (j % 4 == 1) {
            if(jQuery.inArray(dataWorld["data"][i][j], countries) == - 1) {
              countries.push(dataWorld["data"][i][j]);
            };
          };
        };
      };

    // Makes lists with "old" country names and "new" country names.
    oldCountryNames = ["Bahamas", "Bolivia (Plurinational State of)", "Brunei Darussalam",
                       "Iraq (Central Iraq)", "Kosovo under UNSCR 1244", "Republic of Korea",
                       "Cote d'Ivoire", "Czechia", "Iran (Islamic Republic of)",
                       "Republic of Moldova", "Russian Federation", "Serbia",
                       "Syrian Arab Republic", "The former Yugoslav Republic of Macedonia",
                       "United Kingdom (England and Wales)", "United States of America"];
    newCountryNames = ["The Bahamas", "Bolivia", "Brunei", "Ivory Coast", "Czech Republic",
                       "Iran", "Iraq", "Kososvo", "North Korea", "Moldova", "Russia",
                       "Republic of Serbia", "Syria", "Macedonia", "England", "USA"];

    // Makes a countrylist with the new countries.
    newCountries = countries.slice()
    for (i in newCountries) {
      for (j in oldCountryNames) {
        if (oldCountryNames[j] == newCountries[i]) {
            newCountries[i] = newCountryNames[j];
        };
      };
    };

    // Makes a dictionary seperated by the different sorts of crimes.
    var dataSorts = ["Assaults", "Burglary", "Kidnapping", "Robbery",
                     "Sexual violence", "Theft"];

    // Defined the data and calls the function which makes the data.
    var worldData = response[1]
    getData(response[1]);

    // Defines lists and a new dictionary for data, the years, worldparts,
    // useless parts of the data and a true variable when it is done.
    allDataData = {};
    var allYearsList = Object.keys(allYears);
    var worldParts = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    var useless = ["-", "*", "Please", "Jan"];
    var done = true;

    // Loops over all the data.
    for (i in worldData["data"]) {

      // Defines two counters and the current country.
      var counter1 = -1;
      var counter2 = 0;
      var currentCountry = "";

      // Loops to get all values apart from eachother.
      for (j in worldData["data"][i]) {
        var dataValue = worldData["data"][i][j];

        // Skips the useless data.
        if (dataValue !== null && useless.indexOf(dataValue[0]) !== -1) {
          break;
        }
        else if (dataValue !== null && dataValue.length > 5 &&
                 useless.indexOf(dataValue.split(" ")[0]) !== -1) {
          break;
        }
        else if (worldParts.indexOf(dataValue) !== -1) {
          continue;
        }
        else {

          // Looks if there is a new country, makes a dictionary, alters
          // counter1 and puts the counter2 on zero.
          if (isNaN(parseFloat(dataValue)) && dataValue !== null) {
            counter1 += 1;
            if (i == 0) {
              allDataData[dataSorts[counter1]] = {};
            };
            counter2 = 0;
            currentCountry = dataValue;
          }

          // Otherwise the datavalue is an amount of criminality and it will be
          // added to the data dictionary.
          else {
            if (Object.keys(allDataData[dataSorts[counter1]]).indexOf(currentCountry) === -1) {
              allDataData[dataSorts[counter1]][currentCountry] = {};
            };

            // Looks if there is a "," in the numbers and deletes at. This is
            // when the number is even as or higher than 1000.
            if (dataValue !== null ) {
              if (typeof(dataValue) !== "number") {
                dataValue = dataValue.split(",");
                if (dataValue[1] !== undefined) {
                  dataValue = dataValue[0] + dataValue[1];
                };
              };
            };

            // Convert the string to a digit with two decimals and adds it to
            // the dictionary.
            dataValue = Number(dataValue)
            dataValue.toFixed(2)
            allDataData[dataSorts[counter1]][currentCountry][allYearsList[counter2]] = dataValue;
            counter2 += 1;
          };
        };
      };
    };

    // Changes the names of the countries to names which are in accordance with
    // the data map countries.
    for (i in dataSorts) {
      for (j in oldCountryNames) {
        allDataData[dataSorts[i]][newCountryNames[j]] = allDataData[dataSorts[i]][oldCountryNames[j]]
        delete allDataData[dataSorts[i]][oldCountryNames[j]];
      }
    }

    function getData(worldData) {
      /*
      This function converts the data to another usefull format.
      */

      // Makes a dictionary and adds countries as keys. The values are lists of the years.
      dataEverything = {};
      countries.forEach(function(d){
        dataEverything[d] = {"2003": [], "2004": [], "2005": [], "2006": [], "2007": [],
                             "2008": [], "2009": [],"2010": [], "2011": [],
                             "2012": [], "2013": [], "2014": [], "2015": []};
      });

      // Adds the data of all the years of each country to the lists.
      worldData["data"].forEach( function (dp) {
        for (i = 0; i < 90; i += 15) {
          for (j = 2; j < 15; j += 1) {
            dataEverything[dp[i + 1]][(2001 + j)].push(Number(dp[i + j]));
          }
        };
      });

      // Makes a dictionary with all years whithin countries and there total amount of criminal activities.
      allYears = {"2003": [], "2004": [], "2005": [], "2006": [], "2007": [],
                  "2008": [], "2009": [],"2010": [], "2011": [], "2012": [],
                  "2013": [], "2014": [], "2015": []};

      countries.forEach(function(d) {

        // Defines a list with the sum of the crimes for all the years.
        var sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        // Adds the sum of all criminal activities for each year.
        for (i = 0; i < 13; i++) {
          for (j = 0; j < 6; j++) {
            if (!Number.isNaN(dataEverything[d][String(2003 + i)][j]) && (dataEverything[d][String(2003 + i)][j] != null)) {
              sums[i] += dataEverything[d][String(2003 + i)][j];
            };
          };
        };

        // If the sum of a year is null, it will become undefined.
        sums.forEach(function(y){
          if (y == 0){
            y = undefined;
          };
        });

        // Makes a list of all the years.
        var allYearsList = Object.keys(allYears);

        // Adds the sum of all the criminality of a country to one dictionary.
        for (i in allYearsList) {
          allYears[allYearsList[i]][d] = sums[i];
        };

        // If the total data of a country for a year is zero, it will become
        // undefined.
        for (var i in allYearsList) {
          if (allYears[allYearsList[i]][d] === 0) {
            allYears[allYearsList[i]][d] = undefined;
          };
        };
      });

      // Changes the names of the countries to names which are in accordance with
      // the data map countries.
      for (year in allYears) {
        for (country in oldCountryNames) {
          allYears[year][newCountryNames[country]] = allYears[year][oldCountryNames[country]];
          delete allYears[year][oldCountryNames[country]];
        };
      };
    };

    // Changes the names of the countries to names which are in accordance with
    // the data map countries.
    for (i in oldCountryNames) {
      dataEverything[newCountryNames[i]] = dataEverything[oldCountryNames[i]];
      delete dataEverything[oldCountryNames[i]];
    };

    // Defines the slider and goes to the map function when changing the year.
    var slider = d3.select("#year");
    slider.on('change', function() {

      window.year = this.value;

      // When the crime category is changed, it will go to another function with
      // that category as argument.
      if (window.categoryChanged == true){
        mapOneCrime(window.category, window.year);
      } else {
        createMap(window.year);
      };
    });

    function createBarchart(cont, year) {
      /*
      This function creates a bar chart of a country with different sorts of crimes.
      */

      // Defines a list with the amounts of the criminal activities.
      var amount = [];
      for (i in dataSorts) {
        if (typeof allDataData[dataSorts[i]][cont] !== "undefined") {
          amount.push(allDataData[dataSorts[i]][cont][year]);
        }
        else {
          amount.push(0);
        };
      };


      // Gives values to the width, height and padding of the SVG and bar chart.
      var widthSVGbar = 800;
      var heightSVGbar = 500;
      var padding = 50;
      var padding2 = 20;
      var width = 600;
      var height = 300;
      var widthBar = 30;

      // Looks if there is data of one sort of crime undefined.
      for (i in amount) {
        if (isNaN(amount[i])) {
          amount[i] = 0;
        };
      };

      // Defines counters.
      var zerocount = 0;
      var paddingcount = 7;

      // Looks if all the data of the barchart is zero.
      for( i in amount) {
        if (amount[i] !== 0) {
          zerocount = 1;
        }

        // Makes a subtitle when not all the data is available.
        else {
          if (paddingcount == 7) {
            svgBar.append("text")
                  .attr("class", "text")
                  .text("Not all the data is available")
                  .style("font-size", "12px")
                  .attr("transform", "translate(" + padding2 * 4  + "," + padding2 * 2 + ")");
          };
        };
      };

      // Deletes the bar chart when all the data of it is zero.
      if(!zerocount) {
        if (d3.select("svg.bar")) {
          d3.select("svg.bar").selectAll("text").remove().exit();
          d3.select("svg.bar").selectAll("rect").remove().exit();
          d3.select("svg.bar").selectAll("g").remove().exit();
        };
      }
      else {
        d3.select("svg.bar").selectAll("text").remove().exit();
        d3.select("svg.bar").selectAll("rect").remove().exit();
        d3.select("svg.bar").selectAll("g").remove().exit();

        // Defines a tip with a class and the specific value.
        var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(function(d) {
                      return "<strong style='font-family:verdana'>Value:</strong> <span style='font-family:verdana'>" + d + "</span>"
                    })

        svgBar.call(tip);

        // Calculates the maximum value of the values.
        var max = Math.max.apply(null, amount);

        // Scales the y axis from 0 to a bit higher than the max.
        var yScale = d3.scaleLinear()
                       .domain([0, 100 + max])
                       .range([height, padding])

        // Scales the x axis to the amount of crimesorts.
        var xScale= d3.scaleOrdinal()
                       .domain(dataSorts)
                       .range([0, width])

        // Defines the pink bars with values, a class, a width and a height.
        var bars = svgBar.selectAll("rect")
                         .data(amount)
                         .enter()
                         .append("rect")
                         .attr("class", "bar")
                         .attr("width", widthBar)
                         .attr("height", function(d) {
                           return height - yScale(d);
                         })
                         .attr("x", function(d, i){
                           return 80 + (width / dataSorts.length) * i;
                         })
                         .attr("y", function(d, i) {
                           return yScale(d);
                         })
                         .attr("fill", "rgb(150, 247, 173)")

                         // Puts the tip on or off.
                         .on('mouseover', tip.show)
                         .on('mouseout', tip.hide)

        // Defines the distance between the bars.
        var barWidth = width / (dataSorts.length);

        // Adds labels under the bars of the crimesorts.
        svgBar.selectAll("text.axis")
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
                 return ((i * barWidth + 95));
               })
              .text(function(d){
                 return d;
               })
              .attr("text-anchor", "middle");

       // Defines and makes the y axis.
       var yAxis = d3.axisLeft()
                     .scale(yScale);

        svgBar.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(" + padding + "," + 0 + ")")
              .call(yAxis);

        // Gives a title to the bar chart which changes for each country.
        svgBar.append("text")
              .attr("class", "text")
              .text("The amount of criminality per 100.000 inhabitants in " + cont)
              .attr("transform", "translate(" + padding2 * 4 + "," + padding2 + ")");

        // Gives a title to the x axis.
        svgBar.append("text")
              .attr("class", "textAxis")
              .style("font-family", "verdana")
              .style("font-size", "12px")
              .attr("text-anchor", "middle")
              .attr("transform", "translate(" + (width / 2) + ","+ (height + 30) + ")")
              .text("Criminality sort");

        // Gives a title to the y axis.
        svgBar.append("text")
              .attr("class", "textAxis")
              .style("font-family", "verdana")
              .style("font-size", "12px")
              .attr("text-anchor", "middle")
              .attr("transform", "translate(" + 10 + ","+ (height / 2) +")rotate(-90)")
              .text("Amount");
      };
    };

    function createDonutchartData(cont, year) {
      /*
      Creates the data for the donutchart.
      */

      // Generates a dictionary for each country with lists of 2003 until 2015.
      genderData = {};

      countries.forEach(function(d){
        genderData[d] = {"2003": [], "2004": [], "2005": [], "2006": [], "2007": [], "2008": [], "2009": [],"2010": [], "2011": [], "2012": [], "2013": [], "2014": [], "2015": []};
      });

      // Adds the right data to the dictionary.
      worldData["data"].forEach( function (dp) {
        for (i = 90; i < 120; i += 15) {
          for (j = 2; j < 15; j++) {
            genderData[dp[i + 1]][2001 + j].push(Number(dp[i + j]));
          };
        };
      });

      // Change the names of the countries to names which are in accordance
      // with the data map countries.
      for (i in oldCountryNames) {
        genderData[newCountryNames[i]] = genderData[oldCountryNames[i]]
        delete genderData[oldCountryNames[i]];
      };

      // Deletes the donut chart when there is no data of it, one of the data
      // is zero, NaN or unddefined. Creates it otherwise.
      if ((genderData[cont][year].length == 0) || (genderData[cont] === undefined) ||
          (genderData[cont][year][0] == 0) || (genderData[cont][year][1] == 0) ||
          (isNaN(genderData[cont][year][0])) || (isNaN(genderData[cont][year][1])) ||
          (genderData[cont][year][0] === undefined) || (genderData[cont][year][1] === undefined)) {
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        };
      }
      else {
        createDonutchart(genderData[cont][year], cont);
      };
    };

    function createDonutchart(data, cont) {
      /*
      Creates a donutchart with the amount of criminal activities commited by
      women and men for each country.
      */

      // Defines the margins for the svg and donut and defines the colors
      // and other values for the donutchart.
      var widthSVGdonut = 700;
      var heightSVGdonut = 550;
      var widthDonut = 400;
      var heightDonut = 400;
      var thickness = 70;
      var padding = 20;
      var radius = Math.min(widthDonut, heightDonut) / 2;
      var color = d3.scaleOrdinal()
                    .range(["rgb(8, 48, 107)", "pink", "rgb(155, 0, 155)"]);

      // Deletes the pie chart (when clicking on a new one for instance).
      if (d3.select("svg.pie")) {
        d3.select("svg.pie").remove().exit();
      }

      // Gives the svg of the donut chart a body with an width and height.
      var svgDonut = d3.select("body")
                       .append("svg")
                       .attr("class", "pie")
                       .attr("width", widthSVGdonut)
                       .attr("height", heightSVGdonut);

      var g = svgDonut.append("g")
                      .attr("transform", "translate(" + (widthSVGdonut / 2) + "," + (heightSVGdonut / 2) + ")");

      // Gives a title to the donut chart.
      svgDonut.append("text")
              .attr("class", "text")
              .text("The gender for criminal activities in " + cont)
              .attr("transform", "translate(" + padding * 7 + "," + padding + ")");

      // Defines the arcade of the donut.
      var arc = d3.arc()
                  .innerRadius(radius - thickness)
                  .outerRadius(radius);

      // Defines a pie for the donut chart.
      var pie = d3.pie()
                  .value(function(d, i) {
                    return data[i];
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

        // Legend for the donut chart, whith help of:
        // https://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e.
        var legend = d3.select(".pie")
                          .append("g")
                          .attr("class", "legend")
                          .attr("transform", "translate(" + (8 * padding) + "," + (5 * padding) + ")")
                          .attr("x", widthSVGdonut - 65)
                          .attr("y", 25)
                          .attr("height", 100)
                          .attr("width", 100);

        // Makes colored squares.
        legend.selectAll('g')
              .data(["Men", "Women", "Others"])
              .enter()
              .append('g')
              .each(function(d, i) {
                var g = d3.select(this);
                g.append("rect")
                 .attr("x", widthSVGdonut - 260)
                 .attr("y", i * 25)
                 .attr("width", 10)
                 .attr("height", 10)
                 .style("fill", color(i));

                // Appends the text to the legend.
                g.append("text")
                    .attr("x", widthSVGdonut - 240)
                    .attr("y", i * 25 + 10)
                    .attr("height", 30)
                    .attr("width", 100)
                    .text(d);
              });
    };

    // Creates first the world map of 2015.
    createMap("2015");

    function createMap(year) {
      /*
      Creates a world map with scaling colors of the countries relative to the
      amount of criminal activities in that country.
      Reference of the map:
      http://bl.ocks.org/micahstubbs/raw/8e15870eb432a21f0bc4d3d527b2d14f/
      a45e8709648cafbbf01c78c76dfa53e31087e713/world_countries.json
      */

      // Defines the margins for the svg.
      var widthMap = 900;
      var heightMap = 700;

      var path = d3.geoPath();

      // Makes a map by takning the coordinates of each country.
      var projection = d3.geoMercator()
                         .scale(130)
                         .translate( [widthMap / 2, heightMap / 1.5]);

      var path = d3.geoPath().projection(projection);

      d3.json("https://raw.githubusercontent.com/EefPino/Project/master/Libraries/world_countries.json").then(function(response) {
        ready(response)
      })

      function ready(data) {

        // Adds keys (crimes) and the data to each country when there is data of.
        for (const [key, value] of Object.entries(allYears[year])) {
          data.features.forEach(function(d) {
            if (d.properties.name == key) {
              d.crimes = Number(value);
            };
          });
        };

        // Set tooltips and shows the country with his value.
        var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(function(d) {
                      return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Crimes: </strong><span class='details'>" + (d.crimes).toFixed(2) +"</span>";
                    })


        svgMap.call(tip);

        // Defines the highest value of the crimes.
        max = 0
        for (i in data.features) {
          value = data.features[i]["crimes"]
          if (value > max) {
            max = value;
          }
        }

        // Defines the colors for the world map.
        colorValues = [0, (max / 9), (max / 9) * 2, (max / 9) * 3, (max / 9) * 4, (max / 9) * 5, (max / 9) * 6, (max / 9) * 7, (max / 9) * 8, max]
        colorMap =["rgb(229, 240, 220)", "rgb(207, 243, 208)", "rgb(181, 247, 184)", "rgb(150, 247, 173)", "rgb(95, 238, 135)", "rgb(59, 226, 104)", "rgb(50, 180, 90)", "rgb(46, 139, 87)", "rgb(39, 121, 74)", "rgb(24, 73, 47)"]

        var color = d3.scaleThreshold()
                      .domain(colorValues)
                      .range(colorMap)

        // Makes the world map with the right colors of the countries.
        svgMap.append("g")
              .attr("class", "countries")
              .selectAll("path")
              .data(data.features)
              .enter().append("path")
              .attr("d", path)
              .style("fill", function(d) {
                return color(d.crimes);
              })
              .style('stroke', 'white')
              .style('stroke-width', 1.5)
              .style("opacity",0.8)
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

                // Makes a bar- and donutchart when clicking on a country.
                createBarchart(d.properties.name, year);
                createDonutchartData(d.properties.name, year);
              });

            // Creates the legend.
            createLegendMap();
      };
    };

    function createLegendMap() {
      /*
      Creates a legend for the world map.
      */

      // Deletes the legend (when clicking on another map for instance).
      if (d3.select("svg.legendmap")) {
        d3.select("svg.legendmap").selectAll("text").remove().exit();
      }

      // Gives values to the width, height and padding of the SVG.
      var widthLegend = 300;
      var padding = 20;

      // Defines a legend with help of:
      // https://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e.
      var legend = d3.select(".legendmap")
                     .append("g")
                     .attr("class", "legend")
                     .attr("transform", "translate(" + 40 + "," + 40 + ")")
                     .attr("x", 0)
                     .attr("y", 0)
                     .attr("height", 200)
                     .attr("width", 200);

      // Defines all the colors and values for the legend.
      var legendValues= colorValues.slice()
      legendValues.push("Undefined");

      var legendColors = colorMap.slice();
      legendColors.push("black");

      // Makes colored squares.
      legend.selectAll("g")
            .data(legendValues)
            .enter()
            .append("g")
            .each(function(d, i) {
              var g = d3.select(this);

              g.append("rect")
               .attr("x", 40)
               .attr("y", i * 25)
               .attr("width", 10)
               .attr("height", 10)
               .style("fill", legendColors[i]);

              // Appends the text to the legend.
              g.append("text")
                  .attr("x", widthLegend - 240)
                  .attr("y", i * 25 + 10)
                  .attr("height",30)
                  .attr("width",100)
                  .text(function(d) {
                    if (isNaN(d)) {
                      return(d)
                    }
                    else {
                      return(parseInt(d))
                    }
                  });
            });
    };
  });
};
