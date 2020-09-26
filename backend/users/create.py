import json
import logging
import os
import time
import uuid
from modules import customfuncs
import boto3
dynamodb = boto3.resource('dynamodb', region_name='us-east-1',
                          endpoint_url='https://dynamodb.us-east-1.amazonaws.com')


def create(event, context):
    data = json.loads(event['body'])
    if 'email' not in data:
        logging.error("Validation Failed")
        logging.error("Couldn't create the user item.")
        return

    timestamp = int(time.time() * 1000)

    table = dynamodb.Table('bootcamp_recipes')

    userItem = customfuncs.getItemObj("users", data)
    userItem['name'] = userItem['firstName'] + " " + userItem['lastName']

    # descriptive stats
    userItem['mealsBought'] = 0
    userItem['mealsSold'] = 0
    userItem['dollarsMade'] = 0
    userItem['dollarsSaved'] = 0
    userItem[]'dollarsDonated']= 0

    # write the todo to the database
    table.put_item(Item=userItem)

    # create a response
    response= {
        "statusCode": 200,
        "headers": customfuncs.headers,
        "body": json.dumps(item)
    }

    return response
