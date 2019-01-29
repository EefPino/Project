/*
Eveline Tiekink
11267321;
Project criminality for the UvA Project of the minor programming
Bootstrap grip
*/

// Import jQuery.
// var script = document.createElement('script');
// script.src = '//code.jquery.com/jquery-1.11.0.min.js';
// document.getElementsByTagName('head')[0].appendChild(script);


// event.pageX veranderen voor tooltip
var allDataData;
window.year = 2015;
window.category = "Assaults";
window.categoryChanged = false;
function mapOneCrime(crime, year){
  /*
  Creates a world map with scaling colors of the countries relative to the
  amount of criminal activities in that country.
  Reference of the map:
  http://bl.ocks.org/micahstubbs/raw/8e15870eb432a21f0bc4d3d527b2d14f/
  a45e8709648cafbbf01c78c76dfa53e31087e713/world_countries.json
  */

  window.category = crime
  window.categoryChanged = true

  console.log(crime);



  // Defines the width and height for the svg.
  width = 900;
  height = 700;

  var path = d3.geoPath();

  // Deletes the world (when scrolling to anther year for instance). WERKT NIET!!!!!! HIER NOG NAAR KIJKEN
  d3.selectAll(".map").remove();

  // Gives the svg of the world map a body with an width and height.
  var svg = d3.select("body")
              .append("svg")
              .attr('class', 'map')
              .attr("width", width)
              .attr("height", height)
              .append('g');


  svg.append("text")
     .attr("class", "text")
     .text(crime)
     // .style("font-size", "12px")
     .attr("transform", "translate(" + (width / 2) + "," + 50 + ")");


  // Makes a map by taking the coordinates of each country.
  var projection = d3.geoMercator()
                     .scale(130)
                     .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath().projection(projection);

  d3.json("world_countries.json").then(function(response) {
    ready(response)
  })

  // Makes the world map with the right data.
  function ready(data) {

    console.log("sorten crimes");
    //   console.log(dataSorts);
    console.log(allDataData[crime]);
    console.log("data features");
    // console.log(allCrimes);
    console.log(data.features);

    console.log("keys alle jaren");
    console.log(allYears[year]);
    console.log(year);

    // Adds a key (crimes) and the data to each country when there is data of.
    for (const [key, value] of Object.entries(allDataData[crime])) {
      data.features.forEach(function(d) {
        // console.log(d);
        if (d.properties.name == key) {
          // console.log(key);
          if (typeof value !== "undefined") {
            // console.log(value[year]);
            d.crimes = value[year];
          };
        };
      });
    };

    console.log(data.features);

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

    console.log("max");
    console.log(max);
    console.log(colorValues);

    // Defines the colors for the world map.
    colorValues = [0, (max / 9), (max / 9) * 2, (max / 9) * 3, (max / 9) * 4, (max / 9) * 5, (max / 9) * 6, (max / 9) * 7, (max / 9) * 8, max]
    colorMap =["rgb(229, 240, 220)", "rgb(207, 243, 208)", "rgb(181, 247, 184)", "rgb(150, 247, 173)", "rgb(95, 238, 135)", "rgb(59, 226, 104)", "rgb(50, 180, 90)", "rgb(46, 139, 87)", "rgb(39, 121, 74)"]

    var color = d3.scaleThreshold()
                  .domain(colorValues)
                  .range(colorMap)

    // createLegendMap();

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

        // Nog veranderen naar css stylesheet!! Styles the tooltips. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
          createBarchart(d.properties.name, year)
          createDonutchartData(d.properties.name, year);
        });


    // Geen idee waarom dit erbij staat?????????????????????????????!!!!!!!!!!!!!!
    svg.append("path")
        .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id;}))
        .attr("class", "names")
        .attr("d", path)

  }
}


var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


window.onload = function(){

  var requests = [d3.json("data_world_new_2.json"), d3.json("data_world_everything.json")];

  Promise.all(requests).then(function(response) {

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

    // !!!!!!!!!!!!!!!!!!! KAN WEG !!!!!!!!!!!!!!!!!!!

    // Makes a dictionary and adds countries as keys with two years with empty lists too.
    allData = {}
    countries.forEach(function(d){
      allData[d] = {"2010": [], "2015": []};
    });

    // Adds the data of the years of the countries.
    dataWorld["data"].forEach( function (dp) {
      for (count = 0; count < 24; count += 4) {
        allData[dp[count + 1]]["2010"].push(Number(dp[count + 2]))
        allData[dp[count + 1]]["2015"].push(Number(dp[count + 3]))
      };
    });

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

    // !!!!!!!!!!!!!!!!!!! KAN WEG !!!!!!!!!!!!!!!!!!!

    // Makes lists with "old" country names and "new" country names.
    oldCountryNames = ["Bahamas", "Bolivia (Plurinational State of)", "Brunei Darussalam",
                       "Iraq (Central Iraq)", "Kosovo under UNSCR 1244", "Republic of Korea",
                       "Cote d'Ivoire", "Czechia", "Iran (Islamic Republic of)",
                       "Republic of Moldova", "Russian Federation", "Serbia",
                       "Syrian Arab Republic", "The former Yugoslav Republic of Macedonia",
                       "United Kingdom (England and Wales)", "United States of America"]
    newCountryNames = ["The Bahamas", "Bolivia", "Brunei", "Ivory Coast", "Czech Republic",
                       "Iran", "Iraq", "Kososvo", "North Korea", "Moldova", "Russia",
                       "Republic of Serbia", "Syria", "Macedonia", "England", "USA"]

    // Changes the names of the countries to names which are in accordance with
    // the data map countries.
    for (i in oldCountryNames) {
      allCrimes[newCountryNames[i]] = allCrimes[oldCountryNames[i]]
      delete allCrimes[oldCountryNames[i]];
    }

    for (i in oldCountryNames) {
      allData[newCountryNames[i]] = allData[oldCountryNames[i]]
      delete allData[oldCountryNames[i]];
    }

    // Makes a countrylist with the new countries.
    newCountries = countries.slice()
    for (i in newCountries) {
      for (j in oldCountryNames) {
        if (oldCountryNames[j] == newCountries[i]) {
            newCountries[i] = newCountryNames[j]
        }
      }
    }

    // !!!!!!!!!!!!!!!!!!!! KAN WEG !!!!!!!!!!!!!!!!!!!!!!!
    // Makes a dictionary seperated by the different sorts of crimes.
    dataSorts = ["Assaults", "Burglary", "Kidnapping", "Robbery",
                 "Sexual violence", "Theft"];
    data = {}

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

    // !!!!!!!!!!!!!!!!!!! KAN WEG !!!!!!!!!!!!!!!!!!!

    // Defined the data and calls the function which makes the data.
    worldData = response[1]
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
        else if (dataValue !== null && dataValue.length > 5 && useless.indexOf(dataValue.split(' ')[0]) !== -1) {
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
                dataValue = dataValue.split(",")
                if (dataValue[1] !== undefined) {
                  dataValue = dataValue[0] + dataValue[1]
                }
              }
            }

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

    console.log("all data data Tho");
    console.log(allDataData)

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
      This function converts the data to another format.
      */

      // Makes a dictionary and adds countries as keys. The values are lists of the years.
      dataEverything = {}
      countries.forEach(function(d){
        dataEverything[d] = {"2003": [], "2004": [], "2005": [], "2006": [], "2007": [], "2008": [], "2009": [],"2010": [], "2011": [], "2012": [], "2013": [], "2014": [], "2015": []};
      })

      // Adds the data of the years of the countries.
      worldData["data"].forEach( function (dp) {
        for (i = 0; i < 90; i += 15) {
          for (j = 2; j < 15; j += 1) {
            dataEverything[dp[i + 1]][(2001 + j)].push(Number(dp[i + j]));
          }
        };
      });

      console.log("all data per country data Everything");
      console.log(dataEverything);


      // Makes a dictionary with all years whithin countries and there total amount of criminal activities.
      allYears = {"2003": [], "2004": [], "2005": [], "2006": [], "2007": [], "2008": [], "2009": [],"2010": [], "2011": [], "2012": [], "2013": [], "2014": [], "2015": []}

      countries.forEach(function(d) {

        var sum2003 = 0
        var sum2004 = 0
        var sum2005 = 0
        var sum2006 = 0
        var sum2007 = 0
        var sum2008 = 0
        var sum2009 = 0
        var sum2010 = 0
        var sum2011 = 0
        var sum2012 = 0
        var sum2013 = 0
        var sum2014 = 0
        var sum2015 = 0

        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2003"][i]) && (dataEverything[d]["2003"][i] != null)) {
            sum2003 += dataEverything[d]["2003"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2004"][i]) && (dataEverything[d]["2004"][i] != null)) {
            sum2004 += dataEverything[d]["2004"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2005"][i]) && (dataEverything[d]["2005"][i] != null)) {
            sum2005 += dataEverything[d]["2005"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2006"][i]) && (dataEverything[d]["2006"][i] != null)) {
            sum2006 += dataEverything[d]["2006"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2007"][i]) && (dataEverything[d]["2007"][i] != null)) {
            sum2007 += dataEverything[d]["2007"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2008"][i]) && (dataEverything[d]["2008"][i] != null)) {
            sum2008 += dataEverything[d]["2008"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2009"][i]) && (dataEverything[d]["2009"][i] != null)) {
            sum2009 += dataEverything[d]["2009"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2010"][i]) && (dataEverything[d]["2010"][i] != null)) {
            sum2010 += dataEverything[d]["2010"][i]
            // console.log(sum2010);
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2011"][i]) && (dataEverything[d]["2011"][i] != null)) {
            sum2011 += dataEverything[d]["2011"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2012"][i]) && (dataEverything[d]["2012"][i] != null)) {
            sum2012 += dataEverything[d]["2012"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2013"][i]) && (dataEverything[d]["2013"][i] != null)) {
            sum2013 += dataEverything[d]["2013"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2014"][i]) && (dataEverything[d]["2014"][i] != null)) {
            sum2014 += dataEverything[d]["2014"][i]
          }
        }
        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2015"][i]) && (dataEverything[d]["2015"][i] != null)) {
            sum2015 += dataEverything[d]["2015"][i]
          }
        }

        var years = ["2003", "2004", "2005", "2006", "2007", "2008", "2009","2010", "2011", "2012", "2013", "2014", "2015"];
        // console.log("alle jaren jajaja");
        // console.log(allYears);
        for (var i in years) {
          // console.log("jaaaaar");
          // console.log(years[i]);
          // console.log(Object.values(allYears[years[i][d]]));
          // console.log(d);
          if (allYears[years[i]][d] === "0") {
            // console.log("Hierbij moet die undefined worden");
            allYears[years[i]][d] = undefined;
          }
        }

        // Defines a list with all the sums.
        var yearSum = [sum2003, sum2004, sum2005, sum2006, sum2007, sum2008, sum2009, sum2010, sum2011, sum2012, sum2013, sum2014, sum2015]

        // If the sum of a year is nul, it will become undefined.
        yearSum.forEach(function(y){
          if (y == 0){
            y = undefined;
            // console.log("jaja hij wordthier toch echt undefined");
          }
        });

        // Makes a list of all the years.
        var allYearsList = Object.keys(allYears);

        // Adds the sum of all the criminality of a country to one dictionary.
        for (i in allYearsList) {
          allYears[allYearsList[i]][d] = yearSum[i];
        }

        // MOET IK ER NOG NUMBERS VAN GAAN MAKEN?????????????!!!!!!!!!!!!!!?????????
        sum2003 = Number(sum2003);

        // JE KAN NIET OP 2 DECIMALEN AFRONDEN WANT DAN WORDT DIE NaN IN DE WORLD MAP

        // sum2003 = sum2003.toFixed(2);
        // sum2015 = sum2015.toFixed(2);
      })

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
      allCrimes[newCountryNames[i]] = allCrimes[oldCountryNames[i]];
      delete allCrimes[oldCountryNames[i]];
    }

    // MISSCHEIN KAN DIT OOK AL EERDER EN DAN NIET VOOR DIE ANDERE OOK NOG MOETEN VERANDEREN
    for (i in oldCountryNames) {
      dataEverything[newCountryNames[i]] = dataEverything[oldCountryNames[i]];
      delete dataEverything[oldCountryNames[i]];
    }

    // Defines the slider and goes to the map function when changing the year.
    var slider = d3.select("#year");
    slider.on('change', function() {

      window.year = this.value;
      if (window.categoryChanged == true){
        mapOneCrime(window.category, window.year);
      } else {
        createMap(window.year);
      }


    });

    // Dit werkt alleen moet ik nog kijken hoe ik de crime variabel ga maken !!!!!!!!!!!!!!!!!!
    crime = "Assaults"
    year = 2010
    // mapOnesCrime(year, crime)

    function mapOnesCrime(year, crime) {
      /*
      Creates a world map with scaling colors of the countries relative to the
      amount of criminal activities in that country.
      Reference of the map:
      http://bl.ocks.org/micahstubbs/raw/8e15870eb432a21f0bc4d3d527b2d14f/
      a45e8709648cafbbf01c78c76dfa53e31087e713/world_countries.json
      */

      // Defines the margins for the svg.
      var margin = {top: 0, right: 0, bottom: 0, left: 0},
                   width = 900 - margin.left - margin.right,
                   height = 700 - margin.top - margin.bottom;

      var path = d3.geoPath();

      // Deletes the world (when scrolling to anther year for instance). WERKT NIET!!!!!!
      d3.selectAll(".map").remove();

      // Gives the svg of the world map a body with an width and height.
      var svg = d3.select("body")
                  .append("svg")
                  .attr('class', 'map')
                  .attr("width", width)
                  .attr("height", height)
                  .append('g');

      // Makes a map by takning the coordinates of each country.
      var projection = d3.geoMercator()
                         .scale(130)
                         .translate( [width / 2, height / 1.5]);

      var path = d3.geoPath().projection(projection);

      d3.json("world_countries.json").then(function(response) {
        ready(response)
      })

      function ready(data) {
        // console.log("sorten crimes");
        // //   console.log(dataSorts);
        // console.log(allDataData[crime]);
        // console.log("data features");
        // // console.log(allCrimes);
        // console.log(data.features);
        //
        // console.log("keys alle jaren");
        // console.log(allYears[year]);


        // Adds a key (crimes) and the data to each country when there is data of.
        for (const [key, value] of Object.entries(allDataData[crime])) {
          data.features.forEach(function(d) {
            // console.log(d);
            if (d.properties.name == key) {
              // if (typeof allDataData[dataSorts[i]][cont] !== 'undefined')
              if (typeof value !== "undefined") {
                // console.log(key);
                // console.log(value[year]);
                d.crimes = value[year];
              }
            }
          })
        }

        //  console.log(data.features);

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

        // console.log("max");
        // console.log(max);

          // Defines the colors for the world map.
        colorValues = [0, (max / 9), (max / 9) * 2, (max / 9) * 3, (max / 9) * 4, (max / 9) * 5, (max / 9) * 6, (max / 9) * 7, (max / 9) * 8, max]
        colorMap =["rgb(229, 240, 220)", "rgb(207, 243, 208)", "rgb(181, 247, 184)", "rgb(150, 247, 173)", "rgb(95, 238, 135)", "rgb(59, 226, 104)", "rgb(50, 180, 90)", "rgb(46, 139, 87)", "rgb(39, 121, 74)"]

        var color = d3.scaleThreshold()
                      .domain(colorValues)
                      .range(colorMap)

        createLegendMap();

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
              // console.log("jaaar");
              // console.log(year);

              // Makes a bar- and donutchart when clicking on the donut chart.
              // createBarchart(d.properties.name, year)
              createBarchart(d.properties.name, year)
              createDonutchartData(d.properties.name, year);
            });


        // Geen idee waarom dit erbij staat???
        svg.append("path")
            .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id;}))
            .attr("class", "names")
            .attr("d", path)

      }
    }

    function createBarchart(cont, year) {
      /*
      This function creates a bar chart of a country with different sorts of crimes.
      */

      // Defines a list with the amounts of the criminal activities.
      var amount = []
      for (i in dataSorts) {
        if (typeof allDataData[dataSorts[i]][cont] !== "undefined") {
          amount.push(allDataData[dataSorts[i]][cont][year])
        }
        else {
          // DIT HIERONDER KAN OOK ERGENS HIER EN DAN SVG VAN TEVOREN AANMAKEN
          // HIER MOET IK IN AANPASSEN DAT DIE IPV = 0 -> is undefined or something.
          // svg.append("text")
          //    .attr("class", "text")
          //    .text("For this country not all the data is available.")
          //    .style("font-size", "12px")
          //    .attr("transform", "translate(" + padding2 * 4 + "," + padding2 * 2 + ")");
          amount.push(0)
        }
      }

      // Defines a counter and looks if all the data of the barchart is zero.
      var zerocount = 0;

      for( i in amount) {
        if (amount[i] !== 0) {
          zerocount = 1;
          break;
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

      // Deletes the bar chart (when clicking on a new country for instance).
      if (d3.select("svg.bar")) {
        d3.select("svg.bar").remove().exit();
      }

      // Gives the svg, a body with an width and height.
      var svg = d3.select("body")
                  .append("svg")
                  .attr("class", "bar")
                  .attr("width", widthSVG)
                  .attr("height", heightSVG);

      // IK BEGRIJP NIET WAAROM DEZE ONDER DE SVG MOET STAAN EN DE ANDERE ER WEL BOVEN KAN???
      // Deletes the bar chart when all the data of it is zero.
      if(!zerocount) {
        if (d3.select("svg.bar")) {
          d3.select("svg.bar").remove().exit();
        }
      }

      // HIER MOET IK IN AANPASSEN DAT DIE IPV = 0 -> is undefined or something, ook bij amount is 0 doet die dit ?????!!!!!.
      // Looks if there is data of one sort of crime undefined.
      for (i in amount) {
        if (isNaN(amount[i])) {
          amount[i] = 0;

          // Gives a subtitle which informs that there is not all the data.
          svg.append("text")
             .attr("class", "text")
             .text("For this country not all the data is available.")
             .style("font-size", "12px")
             .attr("transform", "translate(" + padding2 * 4 + "," + padding2 * 2 + ")");
        };
      };

      // Defines a tip with a class and the specific value.
      var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    return "<strong style='font-family:verdana'>Value:</strong> <span style='font-family:verdana'>" + d + "</span>"
                  })

      svg.call(tip);

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
      var bars = svg.selectAll("rect")
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

           // Dit nog veranderen naar iets met xScale!!!!!!!!!!!!!!????????????!!!
            return ((i * barWidth + 95));
          })
         .text(function(d){
            return d;
          })
         .attr("text-anchor", "middle");

     // Defines and makes the y axis.
     var yAxis = d3.axisLeft()
                   .scale(yScale);

      svg.append("g")
         .attr("transform", "translate(" + padding + "," + 0 + ")")
         .call(yAxis);

      // Gives a title to the bar chart which changes for each country.
      svg.append("text")
         .attr("class", "text")
         .text("The amount of criminality per 100.000 inhabitants in " + cont)
         .attr("transform", "translate(" + padding2 * 4 + "," + padding2 + ")");

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

    function createDonutchartData(cont, year) {
      /*
      Creates a donutchart with the amount of criminal activities commited by
      women and men for each country.
      */

      // Generates a dictionary for each country with lists of 2003 until 2015.
      genderData = {}

      countries.forEach(function(d){
        genderData[d] = {"2003": [], "2004": [], "2005": [], "2006": [], "2007": [], "2008": [], "2009": [],"2010": [], "2011": [], "2012": [], "2013": [], "2014": [], "2015": []};
      });

      // Adds the right data to the dictionary
      worldData["data"].forEach( function (dp) {
        for (i = 90; i < 120; i += 15) {
          for (j = 2; j < 15; j++) {
            genderData[dp[i + 1]][2001 + j].push(Number(dp[i + j]));
          };
        };
      });

      // Change the names of the countries to names which are in accordance with the data map countries.
      for (i in oldCountryNames) {
        genderData[newCountryNames[i]] = genderData[oldCountryNames[i]]
        delete genderData[oldCountryNames[i]];
      };

      // DIT LATER DOEN IN DE HOIERONDER KORTERE VERSIE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // // Deletes the donut chart when there is no data about,
      // if ((genderData[cont][year].length == 0) || (genderData[cont] === undefined) ||
      //     (genderData[cont][year][0] == 0) || (genderData[cont][year][1] == 0) ||
      //     (isNaN(genderData[cont][year][0])) || (isNaN(genderData[cont][year][1])) ||
      //     (genderData[cont][year][0] === undefined) || (genderData[cont][year][1] === undefined)) {
      //   if (d3.select("svg.pie")) {
      //     console.log("delete hem juist");
      //     d3.select("svg.pie").remove().exit();
      //   };
      // }

      // console.log(genderData[cont]);

      if ((genderData[cont] === undefined)) {
        console.log("hier is een waarde undefined");
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        };
      }

      // Deletes the donut chart when there is no data about,
      else if (genderData[cont][year].length == 0) {
        console.log("lengte lijst is 0");
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        };
      }

      else if (genderData[cont][year][0] == 0 || genderData[cont][year][1] == 0) {
        console.log("hier is een waarde 0");
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        };
      }

      else if (isNaN(genderData[cont][year][0]) || isNaN(genderData[cont][year][1])) {
        console.log("hier is een waarde NaN");
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        };
      }

      // Deze heb ik nergens voor nodig!!!!! Probeersel
      else if ((genderData[cont][year][0] === undefined) || (genderData[cont][year][1] === undefined)) {
        console.log("hier is een waarde undefined");
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        };
      }

      else {

        // Hier zou dan wel nog andere data inkomen, bijv:
        // createDonutchart(genderData[cont]["year"])
        // createDonutchart(cont, year)

        // Hij komt denk ik altijd hierin!!!!
        console.log("wel data");
        createDonutchart(genderData[cont][year], cont);
      };


      // // Checks if there is data for the amount of criminal activities for men and women. DIT NOG MET WIFI CHECKEN / INTERNET
      // for (i in genderData[cont][year]) {
      //     // Bij Canada 2015 bijvoorbeeld komt die helemaal neit hierin!!!!!!!!!!!!
      //   if (genderData[cont][year] == undefined) {
      //     console.log("nu is de lijst misschien leeg");
      //   }
      //   else if (genderData[cont][year][i] == null)
      //     // return "There is no data about the gender who commits a criminal activity of this country in this year."
      //   }
      // }

      // createDonutchart(genderData[cont]["2010"])

    }

    function createDonutchart(data, cont) {

      // console.log("je bent bij de donutchart");
      // console.log(data);

      // Defines the margins for the svg and donut and defines the colors
      // and other values for the donutchart.
      var width = 700;
      var height = 550;
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

      // misschien nog iets anders ipv cont!!!!!
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

        // Legend for the donut chart, whith help of https://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e .
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
              .data(["Men", "Women", "Others"])
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
                    .attr("y", i * 25 + 10)
                    .attr("height",30)
                    .attr("width",100)
                    .style("fill", color(i))
                    .text(d);
              });
    };

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
      var margin = {top: 0, right: 0, bottom: 0, left: 0},
                   width = 900 - margin.left - margin.right,
                   height = 700 - margin.top - margin.bottom;

      var path = d3.geoPath();

      // Deletes the world (when scrolling to anther year for instance). WERKT NIET!!!!!!
      d3.selectAll(".map").remove();

      // Gives the svg of the world map a body with an width and height.
      var svg = d3.select("body")
                  .append("svg")
                  .attr('class', 'map')
                  .attr("width", width)
                  .attr("height", height)
                  .append('g');


      // Makes a map by takning the coordinates of each country.
      var projection = d3.geoMercator()
                         .scale(130)
                         .translate( [width / 2, height / 1.5]);

      var path = d3.geoPath().projection(projection);

      d3.json("world_countries.json").then(function(response) {
        ready(response)
      })

      function ready(data) {

        // console.log("all crimes");
        // console.log(allCrimes);
        console.log(data.features);

        console.log("alle jaren");
        console.log(allYears);
        console.log(allDataData);

        // Adds a key (crimes) and the data to each country when there is data of.
        for (const [key, value] of Object.entries(allYears[year])) {
          data.features.forEach(function(d) {
            if (d.properties.name == key) {
              d.crimes = value
            }
          })
        }

        // console.log("jes");
        // console.log(dataSorts);
        // sumYear = 0;

        // console.log(countries);
        // console.log(year);
        var sum = {};

        for (i in newCountries) {
          sum[newCountries[i]] = 0
        }

              // DIT HOET VOLGENS MIJ ECHT NIET, WANT DATA EVERYTHING ZIT OOK ALLES IN !!!

        // for (i in dataSorts) {
        //   // console.log(dataSorts[i]);
        //   for (const [key, value] of Object.entries(allDataData[dataSorts[i]])) {
        //     // console.log(allDataData[dataSorts[i]]);
        //     data.features.forEach(function(d) {
        //       // console.log(d);
        //       if (d.properties.name == key) {
        //         // if (typeof allDataData[dataSorts[i]][cont] !== 'undefined')
        //         //  HOEZO KLOPT DIT NIET !! HOEZO KAN JE TYPEOF VALUE[YEAR] NIET DOEN, MAAR HET BESTAAT WEL??????????
        //         if (typeof (value) !== "undefined") {
        //           // console.log(key);
        //           // console.log(value[year]);
        //           // console.log(typeof (value[year]));
        //           sum[key] += value[year]
        //           // d.crimes = sum[key];
        //         }
        //         // if (value[year] == 0) {
        //         //   console.log(key);
        //         // }
        //       }
        //     })
        //   }
        // }

        console.log(sum);

        // for (const [key, value] of Object.entries(allDataData[dataSorts[i]])) {
        //   // console.log(allDataData[dataSorts[i]]);
        //   data.features.forEach(function(d) {
        //     // console.log(d);
        //     if (d.properties.name == key) {
        //       // if (typeof allDataData[dataSorts[i]][cont] !== 'undefined')
        //       if (typeof value !== "undefined") {
        //         // console.log(key);
        //         // console.log(value[year]);
        //         // sum[key] += value[year]
        //         d.crimes = sum[key];
        //       }
        //     }
        //   })
        // }

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

        console.log("max");
        console.log(max);

        colorValues = [0, (max / 9), (max / 9) * 2, (max / 9) * 3, (max / 9) * 4, (max / 9) * 5, (max / 9) * 6, (max / 9) * 7, (max / 9) * 8, max]
        colorMap =["rgb(229, 240, 220)", "rgb(207, 243, 208)", "rgb(181, 247, 184)", "rgb(150, 247, 173)", "rgb(95, 238, 135)", "rgb(59, 226, 104)", "rgb(50, 180, 90)", "rgb(46, 139, 87)", "rgb(39, 121, 74)"]
        // Defines the colors for the world map.
        var color = d3.scaleThreshold()
                      .domain(colorValues)
                      .range(colorMap)
                      // .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);


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
              // console.log("jaaar");
              // console.log(year);

              // Makes a bar- and donutchart when clicking on the donut chart.
              // createBarchart(d.properties.name, year)
              createBarchart(d.properties.name, year)
              createDonutchartData(d.properties.name, year);
            });


        // Geen idee waarom dit erbij staat???
        svg.append("path")
            .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id;}))
            .attr("class", "names")
            .attr("d", path)

            createLegendMap();


      }
    }

    function createLegendMap() {

      // Deletes the legend (when clicking on another map for instance).
      if (d3.select("svg.legendmap")) {
        d3.select("svg.legendmap").remove().exit();
      }

      // Gives values to the width, height and padding of the SVG.
      var width = 300;
      var height = 300;
      var padding = 20;

      // Gives the svg, a body with an width and height.
      var svg_legend = d3.select("body")
                  .append("svg")
                  .attr("class", "legendmap")
                  .attr("width", width - 20)
                  .attr("height", height);

      console.log("legend");


      // Defines a legend with help of https://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e .
      console.log(d3.select(".legendmap"));
      var legend = d3.select(".legendmap")
                     .append("g")
                     .attr("class", "legend")
                     .attr("transform", "translate(" + 40 + "," + 40 + ")")
                     .attr("x", 0)
                     .attr("y", 0)
                     .attr("height", 200)
                     .attr("width", 200)
                     // .each(function(d) {
                     //    console.log("hier komt die nooit!!");
                     //    return(d)
                     // })
      console.log(colorValues);
      console.log(colorMap);


      // Makes colored squares.
      legend.selectAll("g")
            .data(colorValues)
            .enter()
            .append("g")
            .each(function(d, i) {
              // console.log("hiero");
              // console.log(d);
              // console.log(colorMap[i]);
              // console.log(colorMap(i));
              var g = d3.select(this);

              g.append("rect")
               .attr("x", 40)
               .attr("y", i * 25)
               .attr("width", 10)
               .attr("height", 10)
               .style("fill", colorMap[i]);

              // Appends the text to the legend.
              g.append("text")
                  .attr("x", width - 240)
                  .attr("y", i * 25 + 10)
                  .attr("height",30)
                  .attr("width",100)
                  .text(parseInt(d));
            });
    };


    // // Makes colored squares.
    // legend.selectAll('g')
    //       .data(["Men", "Women", "Others"])
    //       .enter()
    //       .each(function(d, i) {
    //         var g = d3.select(this);
    //         g.append("rect")
    //          .attr("x", width - 260)
    //          .attr("y", i * 25)
    //          .attr("width", 10)
    //          .attr("height", 10)
    //          .style("fill", color(i));
    //
    //         // Appends the text to the legend.
    //         g.append("text")
    //             .attr("x", width - 240)
    //             .attr("y", i * 25 + 10)
    //             .attr("height",30)
    //             .attr("width",100)
    //             .style("fill", color(i))
    //             .text(d);
    //       });


  })

    console.log("The eind");

}
    // .catch(function(e) {
    //   console.log(e);
    //   throw(e);
    // });
    //
