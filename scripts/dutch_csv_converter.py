# Name: Eveline Tiekink
# Student number: 11267321
# This file converts the data about criminality in towns in the Netherlands.

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

    all_data = pandas.read_csv("data_2015_criminality_towns_netherlands.csv", sep=";")
    dataframe = all_data.dropna()


        # Selects the data which is needed.
    area = dataframe[["Regionaam"]]
    citizens = dataframe[["Inwoners"]]
    total_criminality = dataframe[["Vermogen, vernieling en geweld (Totaal)"]]
    property_crimes = dataframe[["Vermogensmisdrijven (Totaal )"]]
    vandalism_crime = dataframe[["Vernielingen en misdrijven tegen openbare orde en gezag (Totaal)"]]
    vandalism = dataframe[["Vernielingen (Totaal)"]]
    crimes_against_authority = dataframe[["Misdrijven tegen openbare orde en gezag"]]
    sexual_offences = dataframe[["Gewelds- en seksuele misdrijven (Totaal)"]]
    mistreatment = dataframe[["Mishandeling"]]
    threat_stalking = dataframe[["Bedreiging en stalking"]]

    return (area, citizens, total_criminality, property_crimes, vandalism_crime, vandalism, crimes_against_authority, sexual_offences, mistreatment, threat_stalking)

def convert(dataset):
    """
    Makes a json file of the data.
    """

    # Converts the dataframes to dictionaries.
    data = []
    for i in range(10):
        data.append(dataset[i].to_dict())

    # makes a json file of the data
    with open('data_towns_netherlands_2015.json', 'w') as outfile:
        json.dump(data, outfile)

if __name__ == "__main__":

    dataset = open_csv("data_2015_criminality_towns_netherlands.csv")
    convert(dataset)
