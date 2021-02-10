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

# @csrf_exempt
# def funMen(request):
#     if request.method == 'GET' :
#         data = readDB(filename = DB)
#         req = data['database']['men']
#         res = {'men' : req}
#         return JsonResponse(res)

#     elif request.method == 'POST' :
#         dictObj = json.loads(request.body)
#         if dictObj['add'] == 'true' :
#             o = dictObj['obj']
#             writeDB(obj=o, loc='men', filename = DB)
#         return JsonResponse({"request" : "posted in men section"})

# @csrf_exempt
# def funWomen(request) :
#     if request.method == 'GET' :
#         data = readDB(filename = DB)
#         req = data['database']['women']
#         res = {'women' : req}
#         return JsonResponse(res)

#     elif request.method == 'POST' :
#         dictObj = json.loads(request.body)
#         if dictObj['add'] == 'true' :
#             o = dictObj['obj']
#             writeDB(obj=o, loc='women', filename = DB)
#         return JsonResponse({"request" : "posted in women section"})

@csrf_exempt
def signup(request) :
    if request.method == 'GET' :
        data = readDB(filename = DB)
        req = data['database']['user']
        res = {'details' : req}
        return JsonResponse(res)

    elif request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        password = dictObj['password']
        data = readDB(filename = DB)
        req = data['database']['user']
        if email in req :
            # print(True)
            return JsonResponse({'user' : "Already Exists"})
        else :
            o = {dictObj['email'] : {'name' : dictObj['name'] , 'number' : dictObj['number'] , 'password' : dictObj['password'], 'cart':[] , 'price':0}}
            writeDB(o , 'user' , DB)
            # print(False)
            return JsonResponse({'user' : "User Registered"})


@csrf_exempt
def login(request) :
    if request.method == 'GET' :
        data = readDB(filename = DB)
        req = data['database']['user']
        res = {'details' : req}
        return JsonResponse(res)

    elif request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        password = dictObj['password']
        # print(email + "     " + password)
        data = readDB(filename = DB)
        req = data['database']['user']
        if email not in req:
            return JsonResponse({'user' : "New"})

        elif email in req and password==req[email]['password'] :
            print(True)
            return JsonResponse({'user' : "True"})

        else :
            print(False)
            return JsonResponse({'user' : "False"})

@csrf_exempt
def profile(request) :

    if request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        data = readDB(filename = DB)
        req =  data['database']['user'][email]
        req['number']= dictObj['number']
        req['name']= dictObj['name']
        o={email:req}
        
        writeDB(o, 'user', filename=DB)
        return JsonResponse(data)

@csrf_exempt
def cart(request) :
    if request.method == 'POST' :
        dictObj = json.loads(request.body)
        if 'content' not in dictObj and 'coupon' not in dictObj:
            email = dictObj['email']
            data = readDB(filename = DB)
            req = data['database']['user'][email]['cart']
            res = {'cart' : req, 'price': data['database']['user'][email]['price']}
            return JsonResponse(res) 
        
        elif 'content' in dictObj: 
            email = dictObj['email']
            data = readDB(filename = DB)
            
          
           
            req = data['database']['user'][email]['cart']
            print(req)
            for i in reversed(req):
                if i['content'] == dictObj['content']:
                    req.remove(i)
                    data['database']['user'][email]['price']= data['database']['user'][email]['price']-i['price']
                    break
            # req = data['database']['user'][email]['cart']
            res = {'cart' : req, 'price': data['database']['user'][email]['price']}
            print(req)
            print(res)
            with open(DB, mode='w') as f:
                json.dump(data, f)

            return JsonResponse(res)

        else:
            email = dictObj['email']
            data = readDB(filename = DB)
            
            req = data['database']['coupon']
            res = {'cart' : req}
            
            if req== dictObj['coupon']:
            
           

                return JsonResponse({"response":"true"})

            else:
                 return JsonResponse({"response":"false"})


@csrf_exempt
def men(request):
     if request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        data = readDB(filename = DB)
        req = data['database']['user'][email]['cart']
        data['database']['user'][email]['price']= data['database']['user'][email]['price']+dictObj['cart']['price']
        req.append(dictObj['cart'])

        with open(DB, mode='w') as f:
            json.dump(data, f)

        return JsonResponse(data) 

