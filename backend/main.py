from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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


@app.post("/check")
async def fetchinfo():
    return 'test_msg'
