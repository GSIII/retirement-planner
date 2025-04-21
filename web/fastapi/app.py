from fastapi import FastAPI
from pydantic import BaseModel

class RetirementRequest(BaseModel):
    retirement_age : int
    monthly_expense : int

app = FastAPI()

@app.get('/healthcheck')
async def HealthCheck():
    return {"status":"ok"}

@app.get('/api/retirement-need')
async def retirementNeed(retirement_age: int, monthly_expense: int):
    months_needed = (90 - retirement_age) * 12
    require_savings = months_needed * monthly_expense
    return {"require_savings": require_savings}
