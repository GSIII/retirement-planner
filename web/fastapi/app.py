from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient

client = MongoClient('mongodb://192.168.1.20:27017/')
db = client['retirement']
collection = db['retirement']

class RetirementRequest(BaseModel):
    retirement_age : int
    monthly_expense : int

app = FastAPI()

@app.get('/healthcheck')
async def HealthCheck():
    return {"status":"ok"}

@app.get('/api/retirement-need')
async def retirementNeed(retirement_age: int, monthly_expense: int):
    months_needed = (65 - retirement_age) * 12
    require_savings = months_needed * monthly_expense
    return {"require_savings": require_savings}

@app.get('/get-expense-data')
async def getExpenseData():
    result = collection.find()
    expense_data = []
    
    for doc in result:
        doc['_id'] = str(doc['_id']) 
        expense_data.append(doc)

    return {"data": expense_data}

