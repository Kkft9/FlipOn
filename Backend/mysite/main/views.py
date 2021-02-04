from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json

DB = settings.DB_FILE

from db import readDB, writeDB

# Create your views here.

def hello(request):
    return HttpResponse("<h1>Hello</h1>")

@csrf_exempt
def funMen(request):
    if request.method == 'GET' :
        data = readDB(filename = DB)
        req = data['database']['men']
        res = {'men' : req}
        return JsonResponse(res)

    elif request.method == 'POST' :
        dictObj = json.loads(request.body)
        if dictObj['add'] == 'true' :
            o = dictObj['obj']
            writeDB(obj=o, loc='men', filename = DB)
        return JsonResponse({"request" : "posted in men section"})

@csrf_exempt
def funWomen(request) :
    if request.method == 'GET' :
        data = readDB(filename = DB)
        req = data['database']['women']
        res = {'women' : req}
        return JsonResponse(res)

    elif request.method == 'POST' :
        dictObj = json.loads(request.body)
        if dictObj['add'] == 'true' :
            o = dictObj['obj']
            writeDB(obj=o, loc='women', filename = DB)
        return JsonResponse({"request" : "posted in women section"})

@csrf_exempt
def signup(request) :
    if request.method == 'GET' :
        data = readDB(filename = DB)
        req = data['database']['signup']
        res = {'details' : req}
        return JsonResponse(res)

    elif request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        password = dictObj['password']
        data = readDB(filename = DB)
        req = data['database']['login']
        if email in req :
            # print(True)
            return JsonResponse({'user' : "Already Exists"})
        else :
            writeDB(dictObj , 'signup' , DB)
            o = {email : password}
            writeDB(o , 'login' , DB)
            # print(False)
            return JsonResponse({'user' : "User Registered"})


@csrf_exempt
def login(request) :
    if request.method == 'GET' :
        data = readDB(filename = DB)
        req = data['database']['login']
        res = {'details' : req}
        return JsonResponse(res)

    elif request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        password = dictObj['password']
        # print(email + "     " + password)
        data = readDB(filename = DB)
        req = data['database']['login']
        if email in req and req[email] == password :
            print(True)
            return JsonResponse({'user' : "True"})
        elif email not in req:
            return JsonResponse({'user' : "New"})
        else :
            print(False)
            return JsonResponse({'user' : "False"})

