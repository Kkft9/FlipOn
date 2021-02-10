import json

def readDB(filename):
    with open(filename, mode='r') as jsonFile:
        data = json.load(jsonFile)
    return data

def writeDB(obj, loc, filename):
    with open(filename, mode='r') as jsonFile:
        data  = json.load(jsonFile)
        temp = data['database'][loc] #temp gets by reference and not by value
        if(type(temp) == list) :
            temp.append(obj)
        elif(type(temp) == dict) :
            temp.update(obj)
    
    with open(filename, mode='w') as f:
        json.dump(data, f)

