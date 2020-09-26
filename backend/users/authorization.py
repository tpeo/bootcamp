import jwt, json, logging, os, time, uuid
from datetime import date, datetime, timedelta
from urllib.parse import quote
from http import cookies

TOKEN_SECRET = '_MRN89el0zmYruz9ZfEimXsUoeenoKPhLqA_YrgnsHK'

#creates the cookie string for the response
def setCookie(name, value, expires='', domain=None,
              secure=False, httponly=False, path=None):
    morsel = cookies.Morsel()
    # morsel.set(name, value, quote(value))
    morsel.set(name, value, value)
    expires = datetime.utcnow() + timedelta(days=365)
    expireStr = expires.strftime("%a, %d %b %Y %X GMT")
    morsel['expires'] = expireStr
    # morsel['domain'] = '127.0.0.1:54194'
    # morsel['max-age'] = 604800
    if path:
        morsel['path'] = path
    if secure:
        morsel['secure'] = secure
    value = morsel.OutputString()
    if httponly:
        value += '; HttpOnly'
    return value

#issues an access token
def issueAccessToken(userData):
    return jwt.encode({
    'email': userData['email'],
    'iat': datetime.utcnow(),
    'exp': datetime.utcnow() + timedelta(minutes=5)
    }, TOKEN_SECRET, algorithm='HS256')

#issues a refresh token
def issueRefreshToken(userData):
    return jwt.encode({
    'email': userData['email'],
    'iat': datetime.utcnow(),
    'exp': datetime.utcnow() + timedelta(days=7)
    }, TOKEN_SECRET, algorithm='HS256')

#issues the cookie with tokens included
def issueCookieTokens(userData):
    accessToken = issueAccessToken(userData).decode('utf-8')
    refreshToken = issueRefreshToken(userData).decode('utf-8')
    tokens = {'accessToken': accessToken, 'refreshToken': refreshToken}
    return setCookie('tokens', json.dumps(tokens), path= '/', secure=True, httponly=True)

def issueTokenString(userData):
    accessToken = issueAccessToken(userData).decode('utf-8')
    refreshToken = issueRefreshToken(userData).decode('utf-8')
    tokens = {'accessToken': accessToken, 'refreshToken': refreshToken}
    return json.dumps(tokens)

def issueCookieFromTokenString(tokenString):
    return setCookie('tokens', tokenString, path= '/', secure=True, httponly=True)

def decodeToken(encodedToken):
    return jwt.decode(encodedToken, TOKEN_SECRET, algorithms=['HS256'])

#checks if access token provides proper access to function
def validScope(token, email):
    return token['email'] == email

#turns raw cookie string into dictionary
def parseCookieData(rawdata):
    startIndex = rawdata.find('{"accessToken": ')
    endingIndex = rawdata.find('"}')
    return json.loads(rawdata[startIndex:endingIndex + 2])

def authorizeUserWithTokens(cookieData, funcData):
    #parse cookie string
    cookieDict = parseCookieData(cookieData)
    tokens = cookieDict
    accessToken = {}
    refreshToken = {}
    response = {}
    #try and decode access token
    try:
        accessToken = jwt.decode(tokens['accessToken'].encode(), TOKEN_SECRET, algorithms=['HS256'])
        if validScope(accessToken, funcData):
            response['valid'] = True
            response['cookie'] = cookieData
            return response
        else:
            return {'valid': False, 'errorMessage': "Unauthorized access"}
    except jwt.ExpiredSignatureError:
        #try and decode refresh token
        try:
            refreshToken = jwt.decode(tokens['refreshToken'].encode(), TOKEN_SECRET, algorithms=['HS256'])
            if validScope(refreshToken, funcData):
                response['valid'] = True
                tokens['accessToken'] = issueAccessToken(refreshToken).decode('utf-8')
                response['cookie'] = setCookie('tokens', json.dumps(tokens), path= '/', secure=True, httponly=True)
                return response
            else:
                return {'valid': False, 'errorMessage': "Unauthorized access"}
        except jwt.ExpiredSignatureError:
            return {'valid': False, 'errorMessage': "Tokens are expired"}

    return {'valid': False, 'errorMessage': "No tokens given"}
