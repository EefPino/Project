# Name: Eveline Tiekink
# Student number: 11267321
# This file converts the following eight files: data_theft_world, data_assault_world,
# data_males_detained_world, data_females_detained_world, data_kidnapping_world,
# data_burglary_world, data_robbery_world, data_sexual_violence_world.
# In this file only line 17, 48 and 53 jhave to be adjusted to the right csv file.

import csv
import pandas
import matplotlib.pyplot as plt
import json
from json import dumps, loads, JSONEncoder, JSONDecoder
import pickle
import os

def open_csv(data):
    """
    Opens the file and makes a dataframe of the right data.
    """

    all_data = pandas.read_csv("data_theft_world.csv", sep=";")

    # Selects the data which is needed.
    continent = dataframe[["Region"]]
    country = dataframe[["Country"]]
    data_2010 = dataframe[["2010.1"]]
    data_2015 = dataframe[["2015.1"]]

    return (continent, country, data_2010, data_2015)

def convert(dataset):
    """
    Makes a json file of the selected data.
    """

    # continent = dataset[0]
    # country = dataset[1]
    # data_2010 = dataset[2]
    # data_2015 = dataset[3]
    #
    # # Misschien dit nog mooier ipv 0,1,2,3 maar zonder iets hier deed die het niet
    # data = []
    # # makes a dictionary for the data for the json file
    # for date in [continent, country, data_2010, data_2015]:
    #     data.append(date.to_dict())

    # Converts the dataframes to dictionaries.
    data = []
    for i in range(4):
        data.append(dataset[i].to_dict())

    # Makes a json file of the data.
    with open('data_theft_world.json', 'w') as outfile:
        json.dump(data, outfile)

if __name__ == "__main__":

    dataset = open_csv("data_theft_world.csv")
    convert(dataset)
