import json, logging, os, re, requests, time, uuid, boto3
from modules import customfuncs, decimalencoder, communication
from users import authorization, update
from passlib.hash import pbkdf2_sha256

dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url='https://dynamodb.us-east-1.amazonaws.com')
userTable = dynamodb.Table('TPEO_Backend')

hiddenAttribs = ['passHash','wePayTokenHash', 'wePayAcctId', 'wePayCardId']

#signs up the user
def signUp(event, context):
    data = json.loads(event['body'])

    #check if user exists already
    existingUser = userTable.get_item(Key={'email': data['email']})
    if 'Item' in existingUser:
        return customfuncs.returnError("User already exists")

    if(isValidEmail(data['email']) == False):
        return customfuncs.returnError("Invalid Email")

    #store user timestamp
    data['timeCreated'] = int(time.time() * 1000)
    #salt and hash password
    data['passHash'] = pbkdf2_sha256.hash(data['password'])
    # write the user to the database
    userItem = customfuncs.getItemObj("users", data)

    #descriptive stats
    userItem['mealsBought'] = 0
    userItem['mealsSold'] =  0
    userItem['dollarsMade'] = 0
    userItem['dollarsSaved'] = 0
    userItem['dollarsDonated'] = 0
    userTable.put_item(Item=userItem)

    #hide important info
    for attrib in hiddenAttribs:
        userItem[attrib] = None

    userItem['tokens'] = authorization.issueTokenString(userItem)
    response = {}
    # create a response
    response = {"statusCode": 200,
    "headers": customfuncs.makeHeader(authorization.issueCookieFromTokenString(userItem['tokens'])),
    "body": json.dumps({'Item': userItem}, cls=decimalencoder.DecimalEncoder)}

    return response

#logs the user in
def login(event, context):
    data = json.loads(event['body'])
    if 'email' not in data or 'password' not in data:
        response = customfuncs.returnError("Required parameters are missing.")
        return response

    #check if user exists already
    existingUser = userTable.get_item(Key={'email': data['email']})

    if 'Item' not in existingUser:
        logging.error("User does not exist")
        response = customfuncs.returnError("Email or Password is incorrect.")
        return response

    existingUser = existingUser['Item']

    #verify the password with salt and hash
    userPasswordInput = data['password']
    passwordCorrect = pbkdf2_sha256.verify(userPasswordInput, existingUser['passHash'])

    #hide important info
    for attrib in hiddenAttribs:
        existingUser[attrib] = None

    #take appropriate action
    if passwordCorrect:
        response = {}
        existingUser['tokens'] = authorization.issueTokenString(existingUser)
        # create a response
        response = {"statusCode": 200,
        "headers": customfuncs.makeHeader(authorization.issueCookieFromTokenString(existingUser['tokens'])),
        "body": json.dumps({'Item': existingUser}, cls=decimalencoder.DecimalEncoder)}
        return response
    else:
        response = customfuncs.returnError("Email or Password is incorrect.")
        return response


def isValidEmail(email):
    # Address used for SMTP MAIL FROM command
    fromAddress = 'admin@swipeme.in'

    # Simple Regex for syntax checking
    regex = r'^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$'

    # Email address to verify
    addressToVerify = email

    # Syntax check -- also you should probably find a better way to verify. Like TFA
    match = re.match(regex, addressToVerify)
    if match == None:
        return False
    else:
        return True
