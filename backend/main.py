from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from ai import productInfo

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # for specific origins
    allow_credentials=True,    # for cookies
    allow_methods=["*"],       # for all http methods 
    allow_headers=["*"],       # for all headers
)

class PersonInfo(BaseModel):
    age: int
    allergies: List[str]
    med_conditon: List[str]
    current_meds: List[str]
    pregnancy_bf: bool
    diet_restrictions: List[str]
    lifestyle_factors: List[str]

class getData(BaseModel):
    ingredients: str
    personInfo: PersonInfo

@app.post("/check")
async def fetchinfo(prompt: getData):
    person = prompt.personInfo
    personInfo = f"age:{person.age}, allergies:{person.allergies}, medical conditions:{person.med_conditon}, current medications:{person.current_meds}, is pregnant or breastfeeding? {person.pregnancy_bf}, dietary restrictions:{person.diet_restrictions}, Lifestyle Factors:{person.lifestyle_factors}"
    output = productInfo(personInfo, prompt.ingredients)
    return output



