import os
import json

from modules import decimalencoder
from users import authorization
from modules import customfuncs
import boto3
dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url='https://dynamodb.us-east-1.amazonaws.com')

def getPrivateInfo(event, context):
    data = json.loads(event['body'])
    table = dynamodb.Table('TPEO_Backend')
    authData = {}
    #check for required parameters
    if 'email' not in data:
        return customfuncs.returnError("Missing parameters")

    if 'tokens' in data:
        authData = authorization.authorizeUserWithTokens(data['tokens'], data['email'])
        #check if call is authorized
        if authData['valid'] == False:
            return customfuncs.returnError("Unauthorized")
    else:
        return customfuncs.returnError("No Tokens")

    # fetch user from the database
    result = table.get_item(Key={'email': data['email']})
    if 'Item' not in result:
        return customfuncs.returnError("User no longer exists")

    #delete sensitive info
    result['Item'].pop('passHash', None)
    result['Item'].pop('wePayTokenHash', None)
    result['Item'].pop('wePayCardId', None)

    result = result['Item']
    result = customfuncs.turnDecimalsToFloats(result)

    # create a response
    response = {
        "statusCode": 200,
        "headers": customfuncs.makeHeader(authData['cookie']),
        "body": json.dumps(result,
                           cls=decimalencoder.DecimalEncoder)
    }

    return response
