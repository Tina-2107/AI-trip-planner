from fastapi import FastAPI,HTTPException
from models.trip_request import TripRequest
from models.trip_response import TripResponse
from pathlib import Path
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
import json
from pydantic import ValidationError
from fastapi.middleware.cors import CORSMiddleware
from utils.trip_normalizer import normalize_trip

load_dotenv()

PROMPT_FILE_PATH = Path(__file__).resolve().parent / "prompt.txt"
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

async def generate_trip(request:TripRequest):
    template=PROMPT_FILE_PATH.read_text()
    prompt=template.replace("{request.prompt}",request.prompt)
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json"),
    )
    
    
    print("GEMINI RESPONSE:", response.text)
    #wrap in try/except to return proper error
    try:
        trip = json.loads(response.text)
    except(json.JSONDecodeError, AttributeError):
        raise HTTPException(status_code=502, detail="Model returned invalid JSON")
    # when request is not about trip detail
    if isinstance(trip, dict) and trip.get("error") == "not_a_travel_request":
        raise HTTPException(
        status_code=422,
        detail="That doesn't look like a trip request. Try something like '5 day trip to Goa focused on beaches.'"
        )
    # This catches missing fields, wrong types (e.g. days as a string instead
    # of a list), empty days/stops arrays, etc. before it ever reaches React.
    try:
        validated_trip = TripResponse.model_validate(trip)
    except ValidationError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Model returned an unexpected itinerary shape: {exc.error_count()} field(s) failed validation",
        )
    normalized_trip = normalize_trip(validated_trip)

    return normalized_trip.model_dump()

'''
       GEMINI
          ↓
     Raw response
          ↓
       PARSE
   json.loads()
          ↓
     VALIDATE
TripResponse/Pydantic
          ↓
   NORMALIZE
  normalize_trip()
          ↓
    SAFE DATA
          ↓
       React
          ↓
         UI

'''
