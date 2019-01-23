# Project Proposal

__Eveline Tiekink		11267321__

**Problem Statement**

What is the amount of criminality for each country and for each town in the Netherlands?

This visualization is designed to collect data of reported crime with the goal to improve the spread of that information. It will be visualized by a map of the world with different colors indicating the amount of crimes (percentual). You can click on some countries which will be zoomed in whereby you can see the towns. Probably crimes will be divided and by scrolling over a country you can see a bar plot of the different types of crimes and a pie chart with the gender of the criminal for instance. Maybe there will also be arrows with the amount of emigration of criminals per country. (This depend on the amount of work.)

**Solutions**

__Views__

The final product will include a map of the world. You can click on some countries which will be zoomed in, whereby you can see the countries. Probably the crimes will be divided and by scrolling over a country you can see a bar plot of the different types of crimes and a pie chart of the gender of the criminal. Maybe there will also be arrows with the amount of emigration of criminals per country.
There will be a search function as well in which you can type a country (or town) and you will get a bar chart of the crimes.

__Examples__

1. Minimum viable product
![afbeelding](https://user-images.githubusercontent.com/43990565/50770242-e5b0d600-1286-11e9-8777-69302b85374f.png)

2. Optional part
![afbeelding](https://user-images.githubusercontent.com/43990565/50770310-21e43680-1287-11e9-9a6e-6ed1d048b0d9.png)

__Similar__

I found it hard to find something similar to what I want to visualize, bit this looks similar to it.
This is the website of it: https://www.statsilk.com/world-stats/
![image](https://user-images.githubusercontent.com/43990565/48984633-55ffff80-f0fe-11e8-8b29-8b42dbd52b53.png)


__Data sets__

(There are multiple other data sets, which I maybe will also use. But for now this is enough. A friend of my has a data set about the migration of criminals which I also want to have.)
1. Globally data of reported crime in 1990 up to and including 1994 with different types of crimes:
https://www.icpsr.umich.edu/icpsrweb/NACJD/studies/3686/version/1/summary
    - Assaults
    - Rapes
    - Robberies
    - Thefts
    - Burglaries
    - Frauds
    - Embezzlements
    - Drug possession
    - Bribery
2. This data exists of crimes in counties and quarters (2010-2015) in the Netherlands in 2010 up to and including 2015 with different types of crimes:
https://www.cbs.nl/nl-nl/maatwerk/2016/45/geregistreerde-criminaliteit-per-gemeente-wijk-en-buurt-2010-2015
    - Theft
    - Vandalism
    - Crime against public order and authority
    - Violence and sexual offenses
3. Globally data of crimes about the following (2003-2015):  
https://data.unodc.org/#state:1
    - Assault
    - Kidnapping
    - Theft
    - Robbery
    - Burglary
    - Sexual violence
    - Gender
4. Data about the crimanility of the Netherlands with the following aspects(2004-2017) : 
http://statline.cbs.nl/StatWeb/publication/?DM=SLNL&PA=81947NED&D1=0-1%2c12%2c18%2c22%2c25-28%2c39%2c45%2c49%2c52-53&D2=0&D3=0&D4=0-4&D5=(l-2)-l&HDR=G2%2cG1%2cG3%2cG4&STB=T&VW=T
    - Offense group
    - Gender
    - Age
    - Group of origin
    
__External Components__

(I do not know exactly which libraries I am going to use.)
* d3 (for instance d3-tip) 
* SQLite

__Hardest Parts__

The hardest part is probably to choose which data I want to use, because there is a lot of data which can be found about this subject. Probably I am not doing the emigration of the criminals or I just zoom in on the Netherlands and I will not use the ages and genders of the criminals.

__Link__

Probably doesn't give the right visualisation, because on my computer I have placed files on different locations.
<a href="project/index.html">Visualisation</a>
https://eefpino.github.io/Project/
https://eefpino.github.io/Project/project/index.html
