# Report Project: Criminal activities around the world

__Eveline Tiekink   11267321__


**Goal** 

This visualization is designed to collect data of reported crime with the goal to improve the spread of this information.
It is visualized by a world map with different colors relative to the amount of crimes (per 100.000 inhabitants).
Hereby you can see for instance which country is the most criminal during the years 2003 until 2015.
The crimes are divided in different categorizes: assault, burglary, kidnapping, robbery, sexual violence and theft.
By clicking on a country a bar chart will be visualized, trough which you can see the precise amount of criminal activities in a category for that country.
You also get a donut chart, whereby you can see which gender commits the most criminal activities with the precise amount of criminal activities per 100.000 inhabitants. Below this is shown.

![afbeelding](https://user-images.githubusercontent.com/43990565/52045881-b9b30880-2545-11e9-8445-d09d0525dbe4.png)

**Technical Design Start ???**

**Technical Design Details**

I have the javascript file divided in multiple functions which I shall describe here respectively to the order in Javascript. **misschien nog de volgorde veranderen naar wat logisch is** 

  1. function mapOneCrime(crime, year)
  
     This function will be called when there will be clicked on a crime category in the dropdown menu.
     At first a part of the map, legend, the donut chart and the bar chart will be deleted. 
     Thereafter it will create the world map with the correct data and it will call the function, which creates a legend.
     The data it appends depends on the year and the categrory of crime (the arguments of the function).
     
  2. function createLegendMap()
     
     This function can be called on two different places. 
     When a world map of one category is created (see before) or
     when a world map is formed of all the criminal activities in that country. It makes a legend with different colors of squares and
     the values are dependent on the highest value and the lowest value which is put on zero.
     
  3. function createsSVGs()
  
     This function will be called always. it makes a SVG (Scalable Vector Graphics) for the worldmap, the legend and the bar chart.
     
  4. function getData(worldData)
  
     This function will also be called always.
     The worldData is a JSON file with the data of all criminal activities for all the countries from 2003-2015.
     This function makes multiple lists and dictionaries. 
     It makes a dictionary with all the countries with therein dictionaries of the years as keys and lists wit the amounts as values.
     Thereafter it calculates the sum of all the amounts for each country and makes a dictionary of it.
     There is also made a dictionary which is first sorted by the different categories and thereafter on the countries and years.
     In this function the names of some countries will be changed
     to names which are in coordance with the countries in the data of the world map.
     
  5. function createBarchart(cont, year)
     
     This function will be called when you click on a country in the world map. 
     It creates a bar chart with on the x-axis the categorizes of crime:
     assault, burglary, kidnapping, robbery, sexual violence and theft.
     The y-axis is variable to the maximum value and it starts always at zero. 
     When you click on another country the chart will be removed when there is no data of and
     otherwise the y-axis will be changed as well as the title(s).
     The title is variable to which country you click on
     and if there is no data of a specific category of crime, a subtitle will be added.
     When you scroll over the bars, the specific data will be shown.
     
  6. function createDonutchartData(cont, year)
  
     This function creates the data needed for the donut chart.
     When you click on a country in the world map, this function will be called.
     It makes a dictionary with all the countries as keys, wherein the values dictionaries are
     with the years as keys and a list with the values for men and women as values. 
     Only when there is data of both, men and women, the createDonutchart() function will be called.
     Otherwise the previous donut chart will be deleted.
     
  7. function createDonutchart(data, cont) 
     
     This function creates the donut chart with a variable title and another value when you scroll over the slice.
     It will also create a legend which is for each donut chart the same.
     
  8. function createMap(year)
     
     This function creates the world map with a specific year as argument for which the data differs.
     When you click on a specific country it calles the functions createBarchart() and
     createDonutchartData() with the country and year as arguments. 
     
