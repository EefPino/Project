/*
Eveline Tiekink
11267321
Project criminality for the UvA Project of the minor programming
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

    // Change the names of the countries to names which are in cordance with the data map countries.
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

    dataSorts = ["Assault", "Burglary", "Kidnapping", "Robbery", "Sexual violence", "Theft"];

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
    data_sorts = ["Assault", "Kidnapping", "Theft", "Robbery",
                  "Burglary", "Sexual violence"];
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

    console.log("hoi");
    // console.log(region_country_2010_2015);

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

    console.log("Barchart");
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

    console.log("hallo");

    // gives a title to the y axis
    svg.append("text")
        .attr("class", "textAxis")
        .style("font-family", "verdana")
        .style("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + 10 + ","+ (height / 2) +")rotate(-90)")
        .text("Criminality relative to 1000 people (%)");

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
      // });

      console.log("gender");
      console.log(genderData);

      data_males_detained = response[0]

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

      // defines the arcade of the donut
      var arc = d3.arc()
                  .innerRadius(radius - thickness)
                  .outerRadius(radius);

      console.log("Detained");
      console.log(data_males_detained);
      console.log(data_females_detained);
      console.log(data_males_detained["Country"]["Country"]);

      countries_males = []

      for (var i = 0; i < 120; i++) {
          countries_males.push(data_males_detained["Country"]["Country"][i]);
      }

      console.log("countries males");
      console.log(countries_males);

      data_males = []
      for (var i = 0; i < countries_males.length; i++) {
          data_males.push(parseFloat(data_males_detained["Data_2010"]["2010.1"][i]));
      }

      countries_females = []
      for (var i = 0; i < 120; i++) {
          countries_females.push(data_females_detained["Country"]["Country"][i]);
      }

      console.log("countries females");
      console.log(countries_males);

      data_females = []
      for (var i = 0; i < countries_females.length; i++) {
          data_females.push(parseFloat(data_females_detained["Data_2010"]["2010.1"][i]));
      }

      console.log("2010");
      console.log(data_males);
      console.log(data_females);

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


    // function createDonutchart(cont) {
    //   console.log("Donutchart");
    // }

    // 1. Het inladen van meerdere bestanden naar d3 (het stukje onder ‘queue()’ in het voorbeeld) werkt in versie 5 inmiddels anders. Kijk hiervoor nog eens naar je code van vorige week (hint: “Promise”).

    // 2. Het voorbeeld gebruikt een bestand “world_countries.json”, waarbij het niet zo duidelijk is waar dit bestand nu eigenlijk vandaan komt. Dit bestand vind je hier: http://bl.ocks.org/micahstubbs/raw/8e15870eb432a21f0bc4d3d527b2d14f/a45e8709648cafbbf01c78c76dfa53e31087e713/world_countries.json

    // allCrimes
    crimes = JSON.stringify(allCrimes);
    console.log(crimes);

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

    // Set tooltips
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.population) +"</span>";
                })

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
                 width = 960 - margin.left - margin.right,
                 height = 500 - margin.top - margin.bottom;

    var color = d3.scaleThreshold()
                  .domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
                  .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

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

    svg.call(tip);

    // queue()
    //     .defer(d3.json, "world_countries.json")
    //     .defer(d3.json, "world_population.json")
    //     .await(ready);

    // http://bl.ocks.org/micahstubbs/raw/8e15870eb432a21f0bc4d3d527b2d14f/a45e8709648cafbbf01c78c76dfa53e31087e713/world_countries.json

    d3.json("world_countries.json").then(function(response) {
      console.log("bijna");
      ready(response)
    })

    function ready(data) {
      var populationById = {};

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
      console.log(data.features[2]["crimes"]);


      svg.append("g")
          .attr("class", "countries")
          .selectAll("path")
          .data(data.features)
          .enter().append("path")
          .attr("d", path)
          // .style("fill", function(d) { return color(  populationById[d.id]); })
          .style("fill", function(d) {
            console.log(d.crimes);
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
              });

      svg.append("path")
          .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
           // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
          .attr("class", "names")
          .attr("d", path);
    }







    var data = [
        ['gl', 0],
        ['sh', 1],
        ['bu', 2],
        ['lk', 3],
        ['as', 4],
        ['dk', 5],
        ['fo', 6],
        ['gu', 7],
        ['mp', 8],
        ['um', 9],
        ['us', 10],
        ['vi', 11],
        ['ca', 12],
        ['st', 13],
        ['jp', 14],
        ['cv', 15],
        ['dm', 16],
        ['sc', 17],
        ['nz', 18],
        ['ye', 19],
        ['jm', 20],
        ['ws', 21],
        ['om', 22],
        ['in', 23],
        ['vc', 24],
        ['bd', 25],
        ['sb', 26],
        ['lc', 27],
        ['fr', 28],
        ['nr', 29],
        ['no', 30],
        ['fm', 31],
        ['kn', 32],
        ['cn', 33],
        ['bh', 34],
        ['to', 35],
        ['fi', 36],
        ['id', 37],
        ['mu', 38],
        ['se', 39],
        ['tt', 40],
        ['sw', 41],
        ['br', 42],
        ['bs', 43],
        ['pw', 44],
        ['ec', 45],
        ['au', 46],
        ['tv', 47],
        ['mh', 48],
        ['cl', 49],
        ['ki', 50],
        ['ph', 51],
        ['gd', 52],
        ['ee', 53],
        ['ag', 54],
        ['es', 55],
        ['bb', 56],
        ['it', 57],
        ['mt', 58],
        ['mv', 59],
        ['sp', 60],
        ['pg', 61],
        ['vu', 62],
        ['sg', 63],
        ['gb', 64],
        ['cy', 65],
        ['gr', 66],
        ['km', 67],
        ['fj', 68],
        ['ru', 69],
        ['va', 70],
        ['sm', 71],
        ['am', 72],
        ['az', 73],
        ['ls', 74],
        ['tj', 75],
        ['ml', 76],
        ['dz', 77],
        ['tw', 78],
        ['uz', 79],
        ['tz', 80],
        ['ar', 81],
        ['sa', 82],
        ['nl', 83],
        ['ae', 84],
        ['ch', 85],
        ['pt', 86],
        ['my', 87],
        ['pa', 88],
        ['tr', 89],
        ['ir', 90],
        ['ht', 91],
        ['do', 92],
        ['gw', 93],
        ['hr', 94],
        ['th', 95],
        ['mx', 96],
        ['kw', 97],
        ['de', 98],
        ['gq', 99],
        ['cnm', 100],
        ['nc', 101],
        ['ie', 102],
        ['kz', 103],
        ['ge', 104],
        ['pl', 105],
        ['lt', 106],
        ['ug', 107],
        ['cd', 108],
        ['mk', 109],
        ['al', 110],
        ['ng', 111],
        ['cm', 112],
        ['bj', 113],
        ['tl', 114],
        ['tm', 115],
        ['kh', 116],
        ['pe', 117],
        ['mw', 118],
        ['mn', 119],
        ['ao', 120],
        ['mz', 121],
        ['za', 122],
        ['cr', 123],
        ['sv', 124],
        ['bz', 125],
        ['co', 126],
        ['kp', 127],
        ['kr', 128],
        ['gy', 129],
        ['hn', 130],
        ['ga', 131],
        ['ni', 132],
        ['et', 133],
        ['sd', 134],
        ['so', 135],
        ['gh', 136],
        ['ci', 137],
        ['si', 138],
        ['gt', 139],
        ['ba', 140],
        ['jo', 141],
        ['sy', 142],
        ['we', 143],
        ['il', 144],
        ['eg', 145],
        ['zm', 146],
        ['mc', 147],
        ['uy', 148],
        ['rw', 149],
        ['bo', 150],
        ['cg', 151],
        ['eh', 152],
        ['rs', 153],
        ['me', 154],
        ['tg', 155],
        ['mm', 156],
        ['la', 157],
        ['af', 158],
        ['jk', 159],
        ['pk', 160],
        ['bg', 161],
        ['ua', 162],
        ['ro', 163],
        ['qa', 164],
        ['li', 165],
        ['at', 166],
        ['sk', 167],
        ['sz', 168],
        ['hu', 169],
        ['ly', 170],
        ['ne', 171],
        ['lu', 172],
        ['ad', 173],
        ['lr', 174],
        ['sl', 175],
        ['bn', 176],
        ['mr', 177],
        ['be', 178],
        ['iq', 179],
        ['gm', 180],
        ['ma', 181],
        ['td', 182],
        ['kv', 183],
        ['lb', 184],
        ['sx', 185],
        ['dj', 186],
        ['er', 187],
        ['bi', 188],
        ['sn', 189],
        ['gn', 190],
        ['zw', 191],
        ['py', 192],
        ['by', 193],
        ['lv', 194],
        ['bt', 195],
        ['na', 196],
        ['bf', 197],
        ['ss', 198],
        ['cf', 199],
        ['md', 200],
        ['gz', 201],
        ['ke', 202],
        ['bw', 203],
        ['cz', 204],
        ['pr', 205],
        ['tn', 206],
        ['cu', 207],
        ['vn', 208],
        ['mg', 209],
        ['ve', 210],
        ['is', 211],
        ['np', 212],
        ['sr', 213],
        ['kg', 214]
    ];

    // // gives values to the width, height and padding
    // var width = 800;
    // var height = 200;
    // var padding = 2
    //
    // // gives the svg a body with an width and height
    // var svg = d3.select("body")
    //             .append("svg")
    //             .attr("width", 1200)
    //             .attr("height", 1200);

    // Create the chart
    Highcharts.mapChart('container', {
        chart: {
            map: "custom/world-palestine-highres"
        },

        title: {
            text: "Worldmap criminality"
        },

        subtitle: {
            text: "<a href='http://code.highcharts.com/mapdata/custom/\
                   world-palestine-highres.js'>\
                   Amount of crimanlity per 1000 inhabitants</a>"
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: "bottom"
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: data,
            name: 'Random data',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });

    console.log("The eind");

    })
    .catch(function(e){
      console.log(e);
      throw(e);
    });
  }
