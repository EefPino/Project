# Process
__07-01-2018__
Change my Project Proposal by changing the text and adding pictures of visualizations in the README.

__08-01-2018__
Made a Design Document with a list of data sources with information of transforming the data, a diagram with an overview of the technical components (visualizations), descriptions of these components and a list of APIs and D3 plugins.

__09-01-2018__
I have converted the data of the different crimes to JSON files.

__10-01-2018__
I have converted all the data to JSON files and have made an index.html whereby you can open a site.

__11-01-2018__
I have made a stylesheet for the webpage and put a map of the world in the website, whithout the right data, but with titles, colors etc.

__14-01-2018__
Changed the data trough making one json file instead of nine json files, because this is easier to load in javascript for making the site. I have performed this by merging multiple dataframes. 


__15-01-2018__
Loaded the data in the javascript and arranged the data by making a dictionary with all the countries as keys and a list with the data from six sorts of crimes as value. I have chosen for this, because now you know exactly which data belongs to which country and its easy to take a specific value out of the data. I have also looked trough another world map, because the last map used two letter codes of the countries and I want to use one with three letter codes, because it's easier to change a country name to a three letter code. 

__16-01-2018__
Formatted the data perfectly for the world map and changed the country names by hand to the same country names used for the world map by using three letter codes. Made the world map. Only the colors are not right. (Now countries which have no data are all black and the countries with data are all white instead of different colors.)

__17-01-2018__
Changed the color domain for the world map, trough which the colors of the countries became different opacities of blue. Made a click on function, which resulted in giving a bar chart and donut chart when clicking on a country. Also made a tool tip in the world map, donut chart and the barchart. Created axis for the bar chart. Created titles for the visualisations and created text in the donut chart which changes for the different values of woman and men.

__18-01-2018__
Made a new map_criminality.js where commented code is deleted, comments are added and wet code is translated to dry code. Also made a legend for the donut chart and changed the text which came when scrolling over the donut chart.

__21-01-2018__
Converted the csv files of all the years (from 2003 until 2015) to one json file. Tried to convert in the javascript all the data to a dictionary which can be used nicely.

__22-01-2018__
The data of countries in which the crimes were nul (so no data) where changed from zero to undefined, which resulted in the right colors in the world map. When scrolling in the year slider, there exists a world map with the data of that year. This is only a new one and I tried to update the map by using an exit function, but this did not work. (I tried the exit function, because this is easier, but probably I am going to use a real update function.) Also made a navigation bar, whereby you can click on information and you get a new page with information of the site as well for clicking on references.

__23-01-2018__
The title of the bar chart and pie chart changed when chosing another country, but when changing the size of the screen the title changed also wrong. I have fixed this. I also updated the world map instead of making a new one. The barchart also updates when you choose a country in another year. I tried this for the pie chart as well, but this is not finished yet.

__25-01-2018__
Now the pie chart also changes when another year is selected and there is clicked at a country. Solved a bug in which there was not made a bar chart when clicking on a country when just one data of one crime was missing. Also solved another bug in which the old and new naming of the countries were used mixed up. Before the donut chart showed the data also when there was just data of men or women and now only if there is data of both. 

__28-01-2018__
Made a function in which you can put one sort of crime and you can get a world map of that sort of crime only. Also produced in the navigation bar e dropdown.
