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
    data_2010 = all_data[["2010.1"]]
    data_2015 = all_data[["2015.1"]]

    # print(country)
    # print(data_2010)

    frames = [continent, country, data_2010, data_2015]

    dataframe = pandas.concat(frames, axis=1, join='inner')
    print("crime")
    # print(dataframe)

    # return (continent, country, data_2010, data_2015, dataframe)
    return (dataframe)

def merge(*args):
    """
    Merge data and make a json file of the selected data.
    """

    dataframes = args
    dataframe = pandas.concat(dataframes, axis = 1)
    print(dataframe)
    print("jodelahiehoe")

    dataframe.to_json("data_world_new.json", orient='split')

    # data_dict = dataframe.to_dict()

    # # print(data_dict)
    # with open("data_world.json", "w") as outfile:
    #     json.dump(data_dict, outfile)

    # data_list = []
    # for i in range(4):
    #     data_list.append(dataset[i].to_dict())
    #
    # data_sorts = ["data_assaults.json", "data_kidnapping.json", "data_theft.json",
    #     	      "data_robbery.json", "data_burglary.json", "data_sexual_violence.json"]
    #
    # # Makes a json file of the data.


def convert(dataset):
    """
    Makes a json file of the selected data.
    """

    frames = [dataset[0], dataset[1], dataset[2], dataset[3]]

    dataframe_one_crime = pandas.concat(frames, axis = 1, join="inner")
    # print(dataframe_one_crime)

    # Converts the dataframes to dictionaries.
    data_list = []
    for i in range(4):
        data_list.append(dataset[i].to_dict())

    data_dict = {}
    for i, data_name in enumerate(["Continent", "Country", "Data_2010", "Data_2015"]):
        # print(data_list[i])
        data_dict.update({data_name : data_list[i]})

    # print(data_dict)

    data_sorts = ["data_assaults.json", "data_kidnapping.json", "data_theft.json",
        	      "data_robbery.json", "data_burglary.json", "data_sexual_violence.json"]

    # Makes a json file of the data.
    for sort in data_sorts:
        with open(sort, 'w') as outfile:
            json.dump(data_dict, outfile)

def calculate(assaults_json, kidnapping_json, theft_json, robbery_json, burglary_json, sexual_violence_json):
    """
    Makes a json file of the selected data.
    """

    print("YES calculate")

    data_sorts = ["data_assaults.json", "data_kidnapping.json", "data_theft.json",
        	      "data_robbery.json", "data_burglary.json", "data_sexual_violence.json"]

    with open("data_assaults.json") as file:
        data = json.load(file)

    print("Data Calc")
    # print(data)

    # for assault in assaults_json:
    #     print("Joepie")
    #     print(assault)


if __name__ == "__main__":

    # Hier nog een loopje van maken!!!!!!!!!

    dataset_assaults = open_csv("data_assaults_world.csv")
    # assaults_json = convert(dataset_assaults)
    dataset_burglary = open_csv("data_burglary_world.csv")
    # burglary_json = convert(dataset_burglary)
    dataset_females_detained = open_csv("data_females_detained_world.csv")
    # females_json = convert(dataset_females_detained)
    dataset_kidnapping = open_csv("data_kidnapping_world.csv")
    # kidnapping_json = convert(dataset_kidnapping)
    dataset_males_detained = open_csv("data_males_detained_world.csv")
    # males_json = convert(dataset_males_detained)
    dataset_robbery = open_csv("data_robbery_world.csv")
    # robbery_json = convert(dataset_robbery)
    dataset_sexual_violence = open_csv("data_sexual_violence_world.csv")
    # sexual_json = convert(dataset_sexual_violence)
    dataset_theft = open_csv("data_theft_world.csv")
    # theft_json = convert(dataset_theft)

    merge = merge(dataset_assaults, dataset_burglary,
                  dataset_kidnapping, dataset_robbery,
                  dataset_sexual_violence, dataset_theft,
                  dataset_males_detained, dataset_females_detained)

    # calculate(assaults_json, kidnapping_json, theft_json, robbery_json, burglary_json, sexual_json)
