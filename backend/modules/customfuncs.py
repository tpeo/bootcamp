from http import cookies
import json
import decimal

#you should fill out all the attributes in your user table here
objectAttribs = {
#users
"users": ['email', 'firstName', 'lastName', 'profilePicLink', 'major', 'schoolName', 'phone',
'passHash', 'timeCreated']
}

headers = {
      # should be * if creating a mobile app api
      #should be your domain or local host if creating a web app
      # 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': True
}

#this creates a header that tells the browser/phone to store a cookie of cookieVal
def makeHeader(cookieVal):
    newHeader = headers
    newHeader['Set-Cookie'] = cookieVal
    return newHeader

def returnError(errorString):
    return {"statusCode": 200, "headers": headers, "body": json.dumps({"errorMessage": errorString})}

def format(str):
    result = str
    if "%7" in str:
        result = result[3:(len(str)-3)]
    if "%20" in str:
        result = result.replace('%20', ' ')
    return result

def turnDecimalsToFloats(dictionary):
    returnDict = dictionary
    for key, item in dictionary.items():
        if isinstance(item, decimal.Decimal):
            returnDict[key] = float(item)
    return returnDict


def getUpdateParams(objectType, data):
    attribValues = {}
    expression = 'SET'
    #filter used attributes
    usedAttribs = list(filter(lambda attrib: attrib in data, objectAttribs[objectType]))
    #create attribute values dict and expression
    for index, attrib in enumerate(usedAttribs):
        if isinstance(data[attrib], float):
            attribValues[':' + attrib] = decimal.Decimal(data[attrib])
        else:
            attribValues[':' + attrib] = data[attrib]
        if index == (len(usedAttribs) - 1):
            expression += ' ' + attrib + ' = :' + attrib
        else:
            expression += ' ' + attrib + ' = :' + attrib + ','
    result = {"values" : attribValues, "expression" : expression}
    return result

def getItemObj(objectType, data):
    resultItem = {}
    #filter used attributes
    usedAttribs = filter(lambda attrib: attrib in data, objectAttribs[objectType])
    #create attribute values dict and expression
    for attrib in usedAttribs:
        resultItem[attrib] = data[attrib]
    return resultItem
