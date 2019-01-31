# Report Project: Criminal activities around the world

__Eveline Tiekink   11267321__


**Goal** 

This visualization is designed to collect data of reported crime with the goal to improve the spread of this information.
It is visualized by a world map with different colors relative to the amount of crimes (per 100.000 inhabitants).
Hereby you can see for instance which country is the most criminal during the years 2003 until 2015.
The crimes are divided in different categorizes: assault, burglary, kidnapping, robbery, sexual violencea and theft.
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
     
  5. fucntion createBarchart(cont, year)
     
