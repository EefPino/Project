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
function mapOneCrime(x){
  console.log(x);

  // console.log(allDataData[crime]);
  // console.log();
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
    console.log("sorten crimes");
    //   console.log(dataSorts);
    console.log(allDataData[crime]);
    console.log("data features");
    // console.log(allCrimes);
    console.log(data.features);

    console.log("keys alle jaren");
    console.log(allYears[year]);

    // Adds a key (crimes) and the data to each country when there is data of.
    for (const [key, value] of Object.entries(allDataData[crime])) {
      data.features.forEach(function(d) {
        // console.log(d);
        if (d.properties.name == key) {
          console.log(key);
          if (typeof value !== "undefined") {
            console.log(value[year]);
            d.crimes = value[year];
          }
        }
      })
    }

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

    colorValues = [0, (max / 9), (max / 9) * 2, (max / 9) * 3, (max / 9) * 4, (max / 9) * 5, (max / 9) * 6, (max / 9) * 7, (max / 9) * 8, max]
    colorMap =["rgb(229, 240, 220)", "rgb(207, 243, 208)", "rgb(181, 247, 184)", "rgb(150, 247, 173)", "rgb(95, 238, 135)", "rgb(59, 226, 104)", "rgb(50, 180, 90)", "rgb(46, 139, 87)", "rgb(39, 121, 74)"]
    // Defines the colors for the world map.
    var color = d3.scaleThreshold()
                  .domain(colorValues)
                  .range(colorMap)
                  // .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);


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


var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


window.onload = function(){

  var requests = [d3.json("data_world_new_2.json"), d3.json("data_world_everything.json")];

  Promise.all(requests).then(function(response) {

    // Defines the data.
    dataWorld = response[0];
    // console.log(dataWorld);


    // Makes a list with all the countries.
    var countries = [];
    for (i = 0; i < 146; i++) {
      for (j = 0; j < 32; j++) {
        if (j % 4 == 1) {
            if(jQuery.inArray(dataWorld["data"][i][j], countries) == - 1) {
              countries.push(dataWorld["data"][i][j]);
            }
          }
        }
      }

    // Makes a dictionary and adds countries as keys with two years with empty lists too.
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

    // console.log("all crimes voor 2010 ");
    // console.log(allCrimes);

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

    // Change the names of the countries to names which are in accordance with the data map countries.
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
            // console.log(newCountries[i]);
            newCountries[i] = newCountryNames[j]
            // delete newCountries[i];
        }
      }
    }
    console.log(newCountries);
    console.log(countries);
    // for (i in oldCountryNames) {
    //   countries = allData[oldCountryNames[i]]
    //   delete allData[oldCountryNames[i]];
    // }

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

    // console.log("data per crime 2010");
    // console.log(data);

    // Defined the data and calls the function which makes the data.
    worldData = response[1]
    getData(response[1]);

    console.log("drollie");

    // Defines list and a new dictionary for data, the years, worldparts,
    // useless parts of the data and a true variable when it is done.
    allDataData = {};
    var allYearsList = Object.keys(allYears);
    console.log(allYearsList);
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
        var thing = worldData["data"][i][j];
        // console.log(thing);
        // Skips the useless data.
        if (thing !== null && useless.indexOf(thing[0]) !== -1) {
          break;
        }
        else if (thing !== null && thing.length > 5 && useless.indexOf(thing.split(' ')[0]) !== -1) {
          break;
        }
        else if (worldParts.indexOf(thing) !== -1) {
          continue;
        }
        else {

          if (isNaN(parseFloat(thing)) && thing !== null) {
            counter1 += 1;
            if (i == 0) {
              allDataData[dataSorts[counter1]] = {};
            };
            counter2 = 0;
            currentCountry = thing;
          }
          else {
            // if (your_string.indexOf('hello') > -1)
            // console.log(thing);
            if (Object.keys(allDataData[dataSorts[counter1]]).indexOf(currentCountry) === -1) {
              allDataData[dataSorts[counter1]][currentCountry] = {};
            };
            // rnum = rnum.split("F0").pop()

            // && (thing.indexOf(",") === -1
            if (thing !== null ) {
              if (typeof(thing) !== "number") {
                thing = thing.split(",")
                if (thing[1] !== undefined) {
                  // console.log(thing[0]);
                  // console.log(thing[1]);
                  thing = thing[0] + thing[1]
                  // console.log(thing);
                  // console.log(currentCountry);
                }
              }
              // thing = thing.replace(",", "");
            }

            // Convert the string to a digit with two decimals.
            thing = Number(thing)
            thing.toFixed(2)
            allDataData[dataSorts[counter1]][currentCountry][allYearsList[counter2]] = thing;
            counter2 += 1;
          };
        };
      };
    };

    console.log("all data data Tho");
    console.log(allDataData)

    for (i in dataSorts) {
      // console.log(dataSorts[i]);
      for (j in oldCountryNames) {
        allDataData[dataSorts[i]][newCountryNames[j]] = allDataData[dataSorts[i]][oldCountryNames[j]]
        delete allDataData[dataSorts[i]][oldCountryNames[j]];
      }
    }

    console.log(allDataData);



    function getData(worldData) {

      // console.log("world data");
      // console.log(worldData["data"]);
      // console.log(countries);
      // console.log(dataSorts);

      dataAll = {}
      dataSorts.forEach(function(ds) {
        dataAll[ds] = {}
      })
      // console.log(dataAll);

      // Makes a dictionary and adds countries as keys. The values are lists of the years.
      dataEverything = {}
      countries.forEach(function(d){
        dataEverything[d] = {"2003": [], "2004": [], "2005": [], "2006": [], "2007": [], "2008": [], "2009": [],"2010": [], "2011": [], "2012": [], "2013": [], "2014": [], "2015": []};
      })

      // console.log("data every");
      // console.log(dataEverything);

      // console.log("world data de 1ste");

      // console.log(worldData["data"]);

      // Adds the data of the years of the countri "2010": [], "2010": [],es. Nog AANPASSEN   VERKORTE VERSIE!!!!!!!!!!
      worldData["data"].forEach( function (dp) {
        for (i = 0; i < 90; i += 15) {
          for (j = 2; j < 15; j += 1) {
            dataEverything[dp[i + 1]][(2001 + j)].push(Number(dp[i + j]));
          }
        };
      });



      // Belgie: 930.42 - 53.38 - 9.62 - 594.26
      // Vanuit data world: 2.084,62 - 2.158,03 - 594.26 - 9.62 - 53.38 - 930.42

      console.log("all data per country data Everything");
      console.log(dataEverything);


      // Makes a dictionary with all year whithin countries and there total amount of criminal activities.
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

        // console.log(d);

        for (i = 0; i < 6; i++) {
          if (!Number.isNaN(dataEverything[d]["2003"][i]) && (dataEverything[d]["2003"][i] != null)) {
            sum2003 += dataEverything[d]["2003"][i]
          }
          // console.log(dataEverything[d]["2003"]);
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

        for (var i in years) {
          // console.log("jaaaaar");
          // console.log(year);
          if (allYears[years[i]][d] === "0") {
            console.log("Hierbij moet die undefined worden");
            allYears[years[i]][d] = undefined;
          }
        }

        // Ik wil er droge code van maken, maar hoe!?!??!?!??!?!
        var yearSum = [sum2003, sum2004, sum2005, sum2006, sum2007, sum2008, sum2009, sum2010, sum2011, sum2012, sum2013, sum2014, sum2015]

        for (var i in yearSum) {
          // if (yearSum[i] == 0){
          //   yearSum[i] = undefined;
          // }
          // console.log("jaaaaar");
          // console.log(yearSum[i]);
          // if (yearSum[i] === 0) {
          //   // console.log("Hierbij moet die undefined worden");
          //   yearSum[i]= undefined;
          // }
        }
        yearSum.forEach(function(y){
          if (y == 0){
            y = undefined;
          }
        });
        // console.log(yearSum);
        // console.log(sum2003);
        // console.log(allYears);
        var allYearsList = Object.keys(allYears);

        // console.log(allYearsList);
        for (i in allYearsList) {
          allYears[allYearsList[i]][d] = yearSum[i];
        }

          // var toMatch;
          // toMatch = 0;
          // if (toMatch === 0) { // or !== if you're checking for not zero
          //     document.write("no");
          // } else {
          //     document.write(toMatch);
          // }


        // console.log(typeof sum2003);
        // console.log("sum 2003");
        // console.log(Number(sum2003));
        sum2003 = Number(sum2003);

        // JE KAN NIET OP 2 DECIMALEN AFRONDEN WANT DAN WORDT DIE NaN IN DE WORLD MAP

        // sum2003 = sum2003.toFixed(2);
        // sum2004 = sum2004.toFixed(2);
        // sum2005 = sum2005.toFixed(2);
        // sum2006 = sum2006.toFixed(2);
        // sum2007 = sum2007.toFixed(2);
        // sum2008 = sum2008.toFixed(2);
        // sum2009 = sum2009.toFixed(2);
        // sum2010 = sum2010.toFixed(2);
        // sum2011 = sum2011.toFixed(2);
        // sum2012 = sum2012.toFixed(2);
        // sum2013 = sum2013.toFixed(2);
        // sum2014 = sum2014.toFixed(2);
        // sum2015 = sum2015.toFixed(2);

        // allYears["2003"][d] = sum2003;
        // allYears["2004"][d] = sum2004;
        // allYears["2005"][d] = sum2005;
        // allYears["2006"][d] = sum2006;
        // allYears["2007"][d] = sum2007;
        // allYears["2008"][d] = sum2008;
        // allYears["2009"][d] = sum2009;
        // allYears["2010"][d] = sum2010;
        // allYears["2011"][d] = sum2011;
        // allYears["2012"][d] = sum2012;
        // allYears["2013"][d] = sum2013;
        // allYears["2014"][d] = sum2014;
        // allYears["2015"][d] = sum2015;

        // console.log("final");
        // console.log(sum2010);
    })
    // console.log(oldCountryNames);
    // console.log(allYears);
    for (year in allYears) {
      for (country in oldCountryNames) {
        // console.log("poepie");
        // console.log([newCountryNames[country]]);
        // console.log([oldCountryNames[country]]);
        // console.log(allYears[year][oldCountryNames[country]]);
        allYears[year][newCountryNames[country]] = allYears[year][oldCountryNames[country]]
        delete allYears[year][oldCountryNames[country]];
        // console.log(allYears[year][newCountryNames[country]]);
      }
    }
  }

  for (i in oldCountryNames) {
    allCrimes[newCountryNames[i]] = allCrimes[oldCountryNames[i]]
    delete allCrimes[oldCountryNames[i]];
  }

  // MISSCHEIN KAN DIT OOK AL EERDER EN DAN NIET VOOR DIE ANDERE OOK NOG MOETEN VERANDEREN
  for (i in oldCountryNames) {
    dataEverything[newCountryNames[i]] = dataEverything[oldCountryNames[i]]
    delete dataEverything[oldCountryNames[i]];
  }
  //
  // console.log("alle jaren som");
  // console.log(allYears);
  // }

    // console.log(yearDict);
    // console.log(countries.length);
    // console.log("doel");

    var slider = d3.select("#year");
    slider.on('change', function() {
      // console.log("dropje");
      // console.log(this.value);
      createMap(this.value);
    });

    // Dit werkt alleen moet ik nog kijken hoe ik de crime variabel ga maken !!!!!!!!!!!!!!!!!!
    crime = "Assaults"
    year = 2010
    mapOneCrime(year, crime)

    function mapOneCrime(year, crime) {
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

      // console.log("alle jaren");
      // console.log(allYears[year]);

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
        console.log("sorten crimes");
        //   console.log(dataSorts);
        console.log(allDataData[crime]);
        console.log("data features");
        // console.log(allCrimes);
        console.log(data.features);

        console.log("keys alle jaren");
        console.log(allYears[year]);


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

        // console.log("max");
        // console.log(max);

        colorValues = [0, (max / 9), (max / 9) * 2, (max / 9) * 3, (max / 9) * 4, (max / 9) * 5, (max / 9) * 6, (max / 9) * 7, (max / 9) * 8, max]
        colorMap =["rgb(229, 240, 220)", "rgb(207, 243, 208)", "rgb(181, 247, 184)", "rgb(150, 247, 173)", "rgb(95, 238, 135)", "rgb(59, 226, 104)", "rgb(50, 180, 90)", "rgb(46, 139, 87)", "rgb(39, 121, 74)"]
        // Defines the colors for the world map.
        var color = d3.scaleThreshold()
                      .domain(colorValues)
                      .range(colorMap)
                      // .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

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

      amount = []
      for (i in dataSorts) {
        // console.log(dataSorts[i]);
        // console.log(allDataData[dataSorts[i]]);console.log();
        console.log(cont);
        // // Als je [year] weghaalt dan doet die het wel!!!!
        // console.log(allDataData[dataSorts[i]]);
        if (typeof allDataData[dataSorts[i]][cont] !== 'undefined') {
          // console.log("drol");
          amount.push(allDataData[dataSorts[i]][cont][year])
          // console.log(allDataData[dataSorts[i]][cont][year])
        }
        else {
          // vDIT HIERONDER KAN OOK ERGENS HIER EN DAN SVG VAN TEVOREN AANMAKEN
          // svg.append("text")
          //    .attr("class", "text")
          //    .text("For this country not all the data is available.")
          //    .style("font-size", "12px")
          //    .attr("transform", "translate(" + padding2 * 4 + "," + padding2 * 2 + ")");
          amount.push(0)
          console.log(dataEverything[cont]);
        }
      }
      console.log("roekoe amount");
      console.log(amount);

      // for (i in amount) {
      //   console.log(amount[i]);
      //   if
      // }

      var zerocount = 0;

      for(i in amount) {
        if(amount[i] !== 0) {
          zerocount = 1;
          break;
        }
      }



      // console.log(allDataData["Burglary"]["Albania"])

      // console.log(allDataData)

      // Makes a list with the amounts of criminal activities in 2010.
      // var amounts = allData[cont]["2010"]
      // console.log(dataEverything);
      // var amounts = dataEverything[cont][year]
      // console.log("amounts barchart");
      // console.log(amounts);

      // // HIER MOET IK IN AANPASSEN DAT DIE IPV = 0 -> is undefined or something.
      // for (i in amounts) {
      //   if (isNaN(amounts[i])) {
      //     amounts[i] = 0;
      //     console.log("er is data 0");
      //     // Gives a title to the bar chart which changes for each country.
      //     svg.append("text")
      //        .attr("class", "text")
      //        .text("For this country not all the data is available.")
      //        .attr("transform", "translate(" + padding2 * 6 + "," + padding2 + ")");
      //   }
      // }

      // console.log("jaar");
      // console.log(year);

      // console.log("all data per country");
      // console.log(dataEverything[cont][year]);

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

      // IK BEGRIJP NIET WAAROM DEZE ONDER DE SVG MOET STAAN EN DE ANDERE EER WEL BOVEN KAN???
      if(!zerocount) {
        // Deletes the bar chart (when clicking on a new country without data).
        if (d3.select("svg.bar")) {
          console.log("verwijder hem");
          d3.select("svg.bar").remove().exit();
        }
        console.log('all are zero');
      }


      // HIER MOET IK IN AANPASSEN DAT DIE IPV = 0 -> is undefined or something.
      for (i in amount) {
        if (isNaN(amount[i])) {
          amount[i] = 0;
          console.log("er is data 0");
          // Gives a title to the bar chart which changes for each country.
          svg.append("text")
             .attr("class", "text")
             .text("For this country not all the data is available.")
             .style("font-size", "12px")
             .attr("transform", "translate(" + padding2 * 4 + "," + padding2 * 2 + ")");
        }
      }
      // console.log(amounts);

      //  DIT KAN OOK NAAR BOVEN VERPLAATST WORDEN!!!
      for (i in amount) {
        if (isNaN(amount[i])) {
          console.log(i);
          amount[i] = 0;
          console.log("er is data 0");
          // Gives a title to the bar chart which changes for each country.
          svg.append("text")
             .attr("class", "text")
             .text("For this country not all the data is available.")
             .style("font-size", "12px")
             .attr("transform", "translate(" + padding2 * 4 + "," + padding2 * 2 + ")");
        }
      }

      // Volgorde: "Assaults", "Burglary", "Kidnapping", "Robbery", "Sexual violence", "Theft"

      // Defines a tip with a class and the specific value.
      var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    return "<strong style='font-family:verdana'>Value:</strong> <span style='font-family:verdana'>" + d + "</span>"
                  })

      svg.call(tip);

      // Calculates the maximum value.
      var max = Math.max.apply(null, amount);

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
                    .data(amount)
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
                      console.log(d);
                      return yScale(d);
                    })
                    .attr("fill", "rgb(150, 247, 173)", )

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
      Creates a Donutchart with the amount of women and men which commit
      criminal activities for each country.
      */

      // console.log("all data per country");
      // console.log(dataEverything);

      // Generates a dictionary for each country with lists of 2010 and 2015.
      genderData = {}


      countries.forEach(function(d){
        genderData[d] = {"2003": [], "2004": [], "2005": [], "2006": [], "2007": [], "2008": [], "2009": [],"2010": [], "2011": [], "2012": [], "2013": [], "2014": [], "2015": []};
      })

      // console.log("year donut");
      // console.log(year);
      // Appends the amount of women and men which commit criminal activities
      // to the dictionary.
      // dataWorld["data"].forEach( function (dp) {
      //   for (i = 24; i < 32; i += 4) {
      //     genderData[dp[i + 1]]["2010"].push(Number(dp[i + 2]))
      //     genderData[dp[i + 1]]["2015"].push(Number(dp[i + 3]));
      //   }
      // })

      // console.log("data WOLRD de tweede 2"); // dit is echt gewoon precies hetzelfde als de eerste keer de world data !!
      // console.log(worldData.data);


      worldData["data"].forEach( function (dp) {
        for (i = 90; i < 120; i += 15) {
          // console.log(dp[i]);
          // console.log(genderData[dp[i + 1]]["2015"]); // deze bestaat wel, maar die van 2015 bestaat niet.
          // console.log(dp[i + 14]);
          genderData[dp[i + 1]]["2003"].push(Number(dp[i + 2]));
          genderData[dp[i + 1]]["2004"].push(Number(dp[i + 3]));
          genderData[dp[i + 1]]["2005"].push(Number(dp[i + 4]));
          genderData[dp[i + 1]]["2006"].push(Number(dp[i + 5]));
          genderData[dp[i + 1]]["2007"].push(Number(dp[i + 6]));
          genderData[dp[i + 1]]["2008"].push(Number(dp[i + 7]));
          genderData[dp[i + 1]]["2009"].push(Number(dp[i + 8]));
          genderData[dp[i + 1]]["2010"].push(Number(dp[i + 9]));
          genderData[dp[i + 1]]["2011"].push(Number(dp[i + 10]));
          genderData[dp[i + 1]]["2012"].push(Number(dp[i + 11]));
          genderData[dp[i + 1]]["2013"].push(Number(dp[i + 12]));
          genderData[dp[i + 1]]["2014"].push(Number(dp[i + 13]));
          genderData[dp[i + 1]]["2015"].push(Number(dp[i + 14]));
        }
      });

      // Change the names of the countries to names which are in accordance with the data map countries.
      for (i in oldCountryNames) {
        genderData[newCountryNames[i]] = genderData[oldCountryNames[i]]
        delete genderData[oldCountryNames[i]];
      }

      // console.log("genderdata");
      // // console.log(genderData);
      // console.log(genderData[cont][year]);
      // // console.log(genderData[cont][year].length);
      // console.log(genderData[cont][year][0] );
      //
      // var nanValue = NaN;
      // console.log(typeof(genderData[cont][year][0]) == "NaN");



      if (genderData[cont][year].length == 0) {
        // Hier moet die de donutchart gaan deleten!!! (Dat is dan die van het vorige land.)
        console.log("nu is de lijst misschien leeg");
        // Deletes the pie chart (when clicking on a new one for instance).
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        }
      }




      else if (genderData[cont][year][0] == 0 || genderData[cont][year][1] == 0) {
        console.log("hier is een waarde 0");
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        }
      }

      else if (isNaN(genderData[cont][year][0]) || isNaN(genderData[cont][year][1])) {
        console.log("hier is een waarde NaN");
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        }
      }

      // Deze werkt ook niet...
      else if ((genderData[cont][year][0].isNaN) || (genderData[cont][year][1].isNaN)) {
        console.log("hier is een waarde NaN");
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        }
      }

      // Deze heb ik nergens voor nodig!!!!! Probeersel
      else if ((genderData[cont][year][0] === undefined) || (genderData[cont][year][1] === undefined)) {
        console.log("hier is een waarde undefined");
        if (d3.select("svg.pie")) {
          d3.select("svg.pie").remove().exit();
        }
      }


      // else if ((typeOf(genderData[cont][year][0] == "NaN")) || (typeOf(genderData[cont][year][0] == "NaN")) {
      //   console.log("hier is een waarde NaN");
      //   if (d3.select("svg.pie")) {
      //     d3.select("svg.pie").remove().exit();
      //   }
      // }






      else {

        // Hier zou dan wel nog andere data inkomen, bijv:
        // createDonutchart(genderData[cont]["year"])
        // createDonutchart(cont, year)

        // Hij komt denk ik altijd hierin!!!!
        console.log("wel data");
        createDonutchart(genderData[cont][year], cont)
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
      var width = 600;
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
                    // return genderData[cont]["2010"][i]
                    return data[i]
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
    }

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

        // // Adds a key (crimes) and the data to each country when there is data of.
        // for (const [key, value] of Object.entries(allYears[year])) {
        //   data.features.forEach(function(d) {
        //     if (d.properties.name == key) {
        //       d.crimes = value
        //     }
        //   })
        // }

        // console.log("jes");
        // console.log(dataSorts);
        // sumYear = 0;

        // console.log(countries);
        // console.log(year);
        var sum = {};

        for (i in newCountries) {
          sum[newCountries[i]] = 0
        }

        for (i in dataSorts) {
          // console.log(dataSorts[i]);
          for (const [key, value] of Object.entries(allDataData[dataSorts[i]])) {
            // console.log(allDataData[dataSorts[i]]);
            data.features.forEach(function(d) {
              // console.log(d);
              if (d.properties.name == key) {
                // if (typeof allDataData[dataSorts[i]][cont] !== 'undefined')
                console.log(typeof (value[year]));
                if (typeof (value[year]) !== "undefined") {
                  // console.log(key);
                  // console.log(value[year]);

                  sum[key] += value[year]
                  // d.crimes = sum[key];
                }
                // if (value[year] == 0) {
                //   console.log(key);
                // }
              }
            })
          }
        }

        console.log(sum);

        for (const [key, value] of Object.entries(allDataData[dataSorts[i]])) {
          // console.log(allDataData[dataSorts[i]]);
          data.features.forEach(function(d) {
            // console.log(d);
            if (d.properties.name == key) {
              // if (typeof allDataData[dataSorts[i]][cont] !== 'undefined')
              if (typeof value !== "undefined") {
                // console.log(key);
                // console.log(value[year]);
                // sum[key] += value[year]
                d.crimes = sum[key];
              }
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

        console.log("max");
        console.log(max);

        colorValues = [0, (max / 9), (max / 9) * 2, (max / 9) * 3, (max / 9) * 4, (max / 9) * 5, (max / 9) * 6, (max / 9) * 7, (max / 9) * 8, max]
        colorMap =["rgb(229, 240, 220)", "rgb(207, 243, 208)", "rgb(181, 247, 184)", "rgb(150, 247, 173)", "rgb(95, 238, 135)", "rgb(59, 226, 104)", "rgb(50, 180, 90)", "rgb(46, 139, 87)", "rgb(39, 121, 74)"]
        // Defines the colors for the world map.
        var color = d3.scaleThreshold()
                      .domain(colorValues)
                      .range(colorMap)
                      // .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

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

    function createLegendMap() {

      // Gives values to the width, height and padding of the SVG.
      var width = 300;
      var height = 300;
      var padding = 20;

      // Gives the svg, a body with an width and height.
      var svg = d3.select("body")
                  .append("svg")
                  .attr("class", "legend map")
                  .attr("width", width)
                  .attr("height", height);

      // console.log("legend");

      // Defines a legend with help of https://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e .
      var legend = svg.selectAll("legend")
                        .append("g")
                        .attr("class", "legend map")
                        .attr("transform", "translate(" + 40 + "," + 40 + ")")
                        .attr("x", 100)
                        .attr("y", 100)
                        .attr("height", 100)
                        .attr("width", 100)
                        .each(function(d) {
                          // console.log("hier komt die nooit!!");
                          return(d)
                        })

      // Makes colored squares.
      legend.selectAll('g')
            .data(colorValues)
            .enter()
            .append('g')
            .each(function(d, i) {
              var g = d3.select(this);
              // console.log("en hierkomt die ook niet");
              g.append("rect")
               .attr("x", width - 50)
               .attr("y", i * 25)
               .attr("width", 10)
               .attr("height", 10)
               .style("fill", colorMap(i));

              // Appends the text to the legend.
              g.append("text")
                  .attr("x", width - 240)
                  .attr("y", i * 25 + 10)
                  .attr("height",30)
                  .attr("width",100)
                  .style("fill", colorMap(i))
                  .text(d);
            });
    }

    console.log("The eind");

    })
    .catch(function(e){
      console.log(e);
      throw(e);
    });
  }
