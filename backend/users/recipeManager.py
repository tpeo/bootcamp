import json
import os
import boto3
from modules import decimalencoder

dynamodb = boto3.resource('dynamodb', region_name='us-east-1',
                          endpoint_url='https://dynamodb.us-east-1.amazonaws.com')

recipeTable = dynamodb.Table('bootcamp_recipes')


def getRecipes(event, context):
    # load data
    data = json.loads(event['body'])

    # get item
    recipeItem = recipeTable.get_item(Key={'recipe_id': data['recipe_id']})

    # create a response
    response = {
        "statusCode": 200,
        "headers": {},
        "body": json.dumps(recipeItem['Item'], cls=decimalencoder.DecimalEncoder)
    }

    return response
