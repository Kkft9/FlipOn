from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
import pymongo


DB = settings.DB_FILE

from db import  readmongoDB , writemongoDB, updatemongoDB

# Create your views here.

@csrf_exempt
def signup(request) :
    if request.method == 'GET' :
        customers=readmongoDB('Customer').find({},{"_id": 0})
        x   = []
        for customer in customers:
            x.append(customer)
        # print(customers)
        res = {'details' : x}
        print(res)
        return JsonResponse(res)

    elif request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        customer_count=readmongoDB('Customer').find({"email":email},{"_id": 0}).count()
        
        if customer_count > 0 :
            return JsonResponse({'user' : "Already Exists"})
        else :
            dictObj.update({"cart":[]})
            dictObj.update({"order-history":[]})
            dictObj.update({"price":0})
            dictObj.update({"discount":0})
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
        print(dictObj)
        email = dictObj['email']
        password = dictObj['password']
        customer=readmongoDB('Customer').find({"email":email},{"_id": 0})
        for c in customer:
            print (c)
        if customer.count()==0:
            return JsonResponse({'user' : "New"})

        elif readmongoDB('Customer').find({"email":email, "password":password},{"_id": 0}).count()>=1:
            return JsonResponse({'user' : "True"})

        else :
            # print(False)
            return JsonResponse({'user' : "False"})

@csrf_exempt
def profile(request) :

    if request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        for i in dictObj:
            updatemongoDB('Customer', {"email":email},{i:dictObj[i]})
        return JsonResponse(dictObj)

@csrf_exempt
def cart(request) :

    if request.method == 'POST' :
        dictObj = json.loads(request.body)
        
        if 'title' not in dictObj and 'code' not in dictObj and 'checkout' not in dictObj:
            email = dictObj['email']
            data = readmongoDB('Customer').find_one({"email":email},{"_id": 0})
            res = {'cart' : data['cart'], 'price': data['price'], 'discount': data['discount']}
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

            return JsonResponse({"cart":new_cart, "price":new_price, 'discount': data['discount']})

        elif 'code' in dictObj:
            code=dictObj['code']
            email=dictObj['email']
            data = readmongoDB('Customer').find_one({"email":email},{"_id": 0})
            if readmongoDB('Coupon_Code').find({"code":code},{"_id": 0}).count()==1:
                return JsonResponse({"response":"true" ,"discount" :data['discount'] })
            else:
                 return JsonResponse({"response":"false"}) 
    
        elif 'checkout' in dictObj:
            email=dictObj['email']
            data = readmongoDB('Customer').find_one({"email":email},{"_id": 0})
            data['order-history']+=data['cart']
            data['cart']=[]
            updatemongoDB('Customer', {"email":email},{"cart":[]})
            updatemongoDB('Customer', {"email":email},{"price":0})
            updatemongoDB('Customer', {"email":email},{"order-history":data['order-history']})
            print( readmongoDB('Customer').find_one({"email":email},{"_id": 0}))
            return JsonResponse({"response":"true" })

@csrf_exempt
def order_history(request) :

    if request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        data = readmongoDB('Customer').find_one({"email":email},{"_id": 0})
        res = {'order_history' : data['order-history']}
        return JsonResponse(res) 

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

    elif request.method == 'GET' :
        
        products=readmongoDB('Product').find({"id":"men"},{"_id": 0}) 
        product   = []
        for i in products:
            product.append(i)
        print(product)
        return JsonResponse({"details" : product})

@csrf_exempt
def women(request):
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

    elif request.method == 'GET' :
        products=readmongoDB('Product').find({"id":"women"},{"_id": 0}) 
        product   = []
        for i in products:
            product.append(i)
        return JsonResponse({"details" : product})   
        
@csrf_exempt
def watch(request):
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

    elif request.method == 'GET' :
        
        products=readmongoDB('Product').find({"id":"watch"},{"_id": 0}) 
        product   = []
        for i in products:
            product.append(i)
        # print(product)
        return JsonResponse({"details" : product})  


@csrf_exempt
def offers(request) :
    if request.method == 'POST' :
        dictObj = json.loads(request.body)
        email = dictObj['email']
        if "discount" in dictObj:
            updatemongoDB('Customer', {"email":email},{"discount":dictObj['discount']})   
            return JsonResponse(dictObj)
        else:
            data = readmongoDB('Customer').find_one({"email":email},{"_id":0})
            return JsonResponse({"discount" : data['discount']})

@csrf_exempt
def search(request) :
    if request.method == 'POST' :
        
        response=[]
        dictObj = json.loads(request.body) 
        print(dictObj)
        search = dictObj['search']
        products=readmongoDB('Product').find({},{"_id": 0}) 
        product   = []
        for i in products:
            product.append(i)

        for i in product:
            row=i.values()
            for j in row:
                if (' '+search+' ').lower() in (' '+str(j)+' ').lower() :
                    response.append(i)
                    break
    # print(response)
    return JsonResponse({"details" : response})

@csrf_exempt
def product_details(request) :
    if request.method == 'POST' :
        dictObj = json.loads(request.body) 
        # print(dictObj)
        search = dictObj['search']
        products=readmongoDB('Product').find_one({"imageSource":search},{"_id": 0}) 
        
        product   = []
        for i in products:
            if 'imageSource' in i:
                product.append( {"imageSource":products[i]})
        product.pop(0) 

        # print(product)       
    return JsonResponse({"details" :product,"title":products['title'],"content":products['content'], "price": products['price'] , "id" : products['id']})        

            