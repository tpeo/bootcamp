import json
import time
import logging
import os

from modules import decimalencoder
from users import authorization
from modules import customfuncs
import boto3
dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url='https://dynamodb.us-east-1.amazonaws.com')


def update(email, data):

    table = dynamodb.Table('SwipeMeIn_Users')

    updateParams = customfuncs.getUpdateParams("users", data)

    # update the todo in the database
    result = table.update_item(
        Key={
            'email': email
        },
        ExpressionAttributeValues = updateParams["values"],
        UpdateExpression = updateParams["expression"],
        ReturnValues = 'ALL_NEW'
    )

    return result['Attributes']
