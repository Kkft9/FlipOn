from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json

DB = settings.DB_FILE

from db import  readmongoDB , writemongoDB, updatemongoDB

# Create your views here.

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
import pymongo
from bson import ObjectId


@csrf_exempt
def signup(request) :
    if request.method == 'GET' :
        customers=readmongoDB('Customer').find({},{"_id": 0})
        x   = []
        for customer in customers:
            x.append(customer)
        # print(customers)
        res = {'details' : x}
        return JsonResponse(res)

    elif request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        password = dictObj['password']
        customer_count=readmongoDB('Customer').find({"email":email},{"_id": 0}).count()
        
        if customer_count > 0 :
            return JsonResponse({'user' : "Already Exists"})
        else :
            dictObj.update({"cart":[]})
            dictObj.update({"price":0})
            writemongoDB('Customer', dictObj)
            return JsonResponse({'user' : "User Registered"})


@csrf_exempt
def login(request) :
    if request.method == 'GET' :
        customers=readmongoDB('Customer').find({},{"_id": 0})
        x   = {}
        for customer in customers:
            x.update({customer['email']:customer})
            # x[customer['email']] = customer
        # print(customers)
        print(x)
        return JsonResponse(x)

    elif request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        password = dictObj['password']
        customer=readmongoDB('Customer').find({"email":email},{"_id": 0})

        if customer.count()==0:
            return JsonResponse({'user' : "New"})

        elif readmongoDB('Customer').find({"email":email, "password":password},{"_id": 0}).count()==1:
            return JsonResponse({'user' : "True"})

        else :
            # print(False)
            return JsonResponse({'user' : "False"})

@csrf_exempt
def profile(request) :

    if request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        updatemongoDB('Customer', {"email":email},dictObj)
        return JsonResponse(dictObj)

@csrf_exempt
def cart(request) :

    if request.method == 'POST' :
        dictObj = json.loads(request.body)
        
        if 'title' not in dictObj and 'code' not in dictObj:
            email = dictObj['email']
            data = readmongoDB('Customer').find_one({"email":email},{"_id": 0})
            res = {'cart' : data['cart'], 'price': data['price']}
            return JsonResponse(res) 
        
        elif 'title' in dictObj: 
            email = dictObj['email']
            data = readmongoDB('Customer').find_one({"email":email},{"_id": 0})
            new_cart = data['cart']
            new_price = data['price']
            print(dictObj)
            for i in reversed(data['cart']):
                if i['title'] == dictObj['title']:
                    new_cart.remove(i)
                    new_price= data['price']-i['price']
                    break
            # print(new_cart)        
            # req = data['database']['user'][email]['cart']
            updatemongoDB('Customer', {"email":email},{"cart":new_cart})
            updatemongoDB('Customer', {"email":email},{"price":new_price})

            return JsonResponse({"cart":new_cart, "price":new_price})

        elif 'code' in dictObj:
            code=dictObj['code']
            if readmongoDB('Coupon_Code').find({"code":code},{"_id": 0}).count()==1:
                return JsonResponse({"response":"true"})
            else:
                 return JsonResponse({"response":"false"})


@csrf_exempt
def men(request):
     if request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        data = readmongoDB('Customer').find_one({"email":email},{"_id":0})
        new_cart = data['cart']
        new_price = data['price']
        new_price += dictObj['cart']['price']
        new_cart.append(dictObj['cart'])
        updatemongoDB('Customer', {"email":email},{"cart":new_cart})
        updatemongoDB('Customer', {"email":email},{"price":new_price})

        return JsonResponse(dictObj) 

