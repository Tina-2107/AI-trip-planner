import json
from pydantic import ValidationError
from models.trip_response import TripResponse


def parse_and_validate_trip(raw_response: str) -> TripResponse:
    try:
        trip = json.loads(raw_response)
    except json.JSONDecodeError:
        raise ValueError("Model returned invalid JSON")

    try:
        return TripResponse.model_validate(trip)
    except ValidationError:
        raise ValueError("Model returned an unexpected itinerary shape")