from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from ai import productInfo#, initialize_chroma_db


'''
@asynccontextmanager
async def lifespan(app: FastAPI):
    await initialize_chroma_db()
    yield
  

app = FastAPI(lifespan=lifespan)
'''

app = FastAPI()


origins = [
    "*"
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
    allergies: str
    med_condition: str
    current_meds: str
    pregnancy_bf: str
    diet_restrictions: str
    lifestyle_factors: str

class getData(BaseModel):
    ingredients: str
    personInfo: PersonInfo



@app.post("/check")
async def fetchinfo(prompt: getData):
    person = prompt.personInfo
    personInfo = f"age:{person.age}, allergies:{person.allergies}, medical conditions:{person.med_condition}, current medications:{person.current_meds}, is pregnant or breastfeeding? {person.pregnancy_bf}, dietary restrictions:{person.diet_restrictions}, Lifestyle Factors:{person.lifestyle_factors}"
    output = productInfo(personInfo, prompt.ingredients)
    
    safety_score = int(output.split('safety_score = [')[1].split(']')[0]) if 'safety_score' in output else 0
    caution_message = output.split('caution_message = [')[1].split(']')[0].strip("['").strip("']") if 'caution_message' in output else ""
    if 'short_term_effects' in output:
        short_term_effects = output.split('short_term_effects = [')[1].split(']')[0].strip("[]").replace("'", "").split(', ')
    else:
        short_term_effects = []  
    
    if 'long_term_effects' in output:
        long_term_effects = output.split('long_term_effects = [')[1].split(']')[0].strip("[]").replace("'", "").split(', ')
    else:
        long_term_effects = []  
    environmental_score = int(output.split('environmental_score = [')[1].split(']')[0]) if 'environmental_score' in output else 0
    
    formatted_output = {
        "safety_score": safety_score,
        "caution_message": caution_message,
        "short_term_effects": short_term_effects,
        "long_term_effects": long_term_effects,
        "environmental_score": environmental_score
    }
    
    return formatted_output

