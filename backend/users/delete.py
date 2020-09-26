import os
from modules import decimalencoder, customfuncs, communication
import boto3
import re
from users import update
dynamodb = boto3.resource('dynamodb', region_name='us-east-1',
                          endpoint_url='https://dynamodb.us-east-1.amazonaws.com')
table = dynamodb.Table('bootcamp_recipes')


def deleteIt(email):
    # delete the user from the database
    table.delete_item(
        Key={
            'email': email
        }
    )
