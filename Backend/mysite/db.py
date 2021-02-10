import json
import pymongo
from bson import ObjectId

# def readDB(filename):
#     with open(filename, mode='r') as jsonFile:
#         data = json.load(jsonFile)
#     return data

# def writeDB(obj, loc, filename):
#     with open(filename, mode='r') as jsonFile:
#         data  = json.load(jsonFile)
#         temp = data['database'][loc] #temp gets by reference and not by value
#         if(type(temp) == list) :
#             temp.append(obj)
#         elif(type(temp) == dict) :
#             temp.update(obj)
    
#     with open(filename, mode='w') as f:
#         json.dump(data, f)


def readmongoDB(collection):
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    Shopping_Dashboard = myclient["Shopping_Dashboard"]
    return Shopping_Dashboard[collection]
    
def writemongoDB(collection, obj):
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    Shopping_Dashboard = myclient["Shopping_Dashboard"]
    Collection=Shopping_Dashboard[collection]
    Collection.insert_one(obj)    
    
def updatemongoDB(collection,condition, obj):
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    Shopping_Dashboard = myclient["Shopping_Dashboard"]
    Collection=Shopping_Dashboard[collection]
    Collection.update_one(condition,{"$set":obj})   

