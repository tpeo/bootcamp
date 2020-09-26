import json
import os

from modules import decimalencoder
from users import authorization
import boto3
dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url='https://dynamodb.us-east-1.amazonaws.com')


def list(event, context):
    table = dynamodb.Table('SwipeMeIn_Users')

    # fetch all todos from the database
    result = table.scan()

    # create a response
    response = {
        "statusCode": 200,
        "body": json.dumps(result['Items'], cls=decimalencoder.DecimalEncoder)
    }

    return response
