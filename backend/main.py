from fastapi import FastAPI
from models.trip_request import TripRequest
from pathlib import Path
import os
from dotenv import load_dotenv
from google import genai
import json

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()


PROMPT_FILE_PATH = Path("prompt.txt")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.get("/")
def home():
    return {"message": "AI Trip Planner API is running"}

@app.post("/generate-trip")

async def trip(request:TripRequest):
    template=PROMPT_FILE_PATH.read_text()
    prompt=template.replace("{request.prompt}",request.prompt)
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    trip = json.loads(response.text)

    return trip
