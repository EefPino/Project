# Name: Eveline Tiekink
# Student number: 11267321
# This file converts the following eight files: data_theft_world, data_assaults_world,
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

import json
from pprint import pprint



def open_csv(data):
    """
    Opens the file and makes a dataframe of the right data.
    """

    all_data = pandas.read_csv(data, sep=";")

    # Selects the data which is needed.
    continent = all_data[["Region"]]
    country = all_data[["Country"]]
    data_2003 = all_data[["2003.1"]]
    data_2004 = all_data[["2004.1"]]
    data_2005 = all_data[["2005.1"]]
    data_2006 = all_data[["2006.1"]]
    data_2007 = all_data[["2007.1"]]
    data_2008 = all_data[["2008.1"]]
    data_2009 = all_data[["2009.1"]]
    data_2010 = all_data[["2010.1"]]
    data_2011 = all_data[["2011.1"]]
    data_2012 = all_data[["2012.1"]]
    data_2013 = all_data[["2013.1"]]
    data_2014 = all_data[["2014.1"]]
    data_2015 = all_data[["2015.1"]]

    # Merges all the data and returns is
    frames = [continent, country, data_2003, data_2004, data_2005, data_2006, data_2007, data_2008, data_2009, data_2010, data_2011, data_2012, data_2013, data_2014, data_2015]
    dataframe = pandas.concat(frames, axis=1, join='inner')

    return (dataframe)

def merge(*args):
    """
    Merge data and make a json file of the selected data.
    """

    # Makes one dataframe of everything
    dataframes = args
    dataframe = pandas.concat(dataframes, axis = 1)

    # Makes a JSON file of it.
    dataframe.to_json("data_world_everything.json", orient='split')

if __name__ == "__main__":

    dataset_assaults = open_csv("../data/data_assaults_world.csv")
    dataset_burglary = open_csv("./data/data_burglary_world.csv")
    dataset_females_detained = open_csv("./data/data_females_detained_world.csv")
    dataset_kidnapping = open_csv("./data/data_kidnapping_world.csv")
    dataset_males_detained = open_csv("./data/data_males_detained_world.csv")
    dataset_robbery = open_csv("./data/data_robbery_world.csv")
    dataset_sexual_violence = open_csv("./data/data_sexual_violence_world.csv")
    dataset_theft = open_csv("./data/data_theft_world.csv")

    merge = merge(dataset_assaults, dataset_burglary,
                  dataset_kidnapping, dataset_robbery,
                  dataset_sexual_violence, dataset_theft,
                  dataset_males_detained, dataset_females_detained)
