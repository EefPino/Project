# Name: Eveline Tiekink
# Student number: 11267321
# Maybe I am not using this converter, because I may not use the data.

import csv
import pandas
import matplotlib.pyplot as plt
import json
from json import dumps, loads, JSONEncoder, JSONDecoder
import pickle
import os

def open_csv(data):
    """
    Opens the file and makes a dataframe of the right data
    """

    all_data = pandas.read_csv("data_criminals_netherlands.csv", header=[0, 1, 2, 3], sep=";")
    all_data.columns.names = all_data.columns[0]

    # Makes lists and appends the right data to the listst
    year = []
    all_crimes = []
    all_crimes_relative = []
    data_dict = []
    for categories in all_data:
        age = categories[1]
        gender = categories[2]
        origin = categories[3]
        right_data = all_data[categories[0]][age][gender][origin]
        year.append(right_data[0])
        all_crimes.append(right_data[1])
        all_crimes_relative.append(right_data[8])
        # data_dict.append([all_data[categories[0]]])

    # This needs to be adjusted
    # keys = ["year", "all_crimes", "all_crimes_relative"]
    # values = [year, all_crimes, all_crimes_relative]
    # final_dict = dict(zip(keys, zip(*values)))
    #
    # keys = ["year", "all_crimes", "all_crimes_relative"]
    keys = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2017"]
    values = [all_crimes, all_crimes_relative]
    final_dict = dict(zip(keys, zip(*values)))


    print(year)
    print(all_crimes)
    print(all_crimes_relative)
    print(final_dict)

    return (final_dict)

def convert(dataset):
    """
    Makes a json file of the data. Needs to be adjusted
    """


    # # data = []
    # # for i in range(4):
    #     data.append(dataset[i].to_dict())
    # print(dataset)

    # print(data)

    # makes a json file of the data
    with open('data_criminals_netherlands.json', 'w') as outfile:
        json.dump(dataset, outfile)

if __name__ == "__main__":

    dataset = open_csv("data_criminals_netherlands.csv")
    convert(dataset)
