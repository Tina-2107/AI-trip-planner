import pytest
from utils.trip_parser import parse_and_validate_trip
from utils.trip_normalizer import normalize_trip

#Test A: malformed JSON
def test_malformed_json():
    raw_response = '{ "destination": "Goa"'

    with pytest.raises(ValueError, match="invalid JSON"):
        parse_and_validate_trip(raw_response)
        
#Test B: valid JSON, wrong shape
def test_wrong_days_type():
    raw_response = """
    {
        "destination": "Goa",
        "days": "hello"
    }
    """

    with pytest.raises(ValueError, match="unexpected itinerary shape"):
        parse_and_validate_trip(raw_response)

#Test C: empty object
def test_empty_response():
    raw_response = "{}"

    with pytest.raises(ValueError, match="unexpected itinerary shape"):
        parse_and_validate_trip(raw_response)

#Test D: missing stops
def test_missing_stops():
    raw_response = """
    {
        "destination": "Goa",
        "days": [
            {
                "day": 1
            }
        ]
    }
    """

    with pytest.raises(ValueError, match="unexpected itinerary shape"):
        parse_and_validate_trip(raw_response)
        
#Test F: vaild test
def test_valid_trip():
    raw_response = """
    {
        "destination": "Goa",
        "summary": "A beach-focused trip",
        "days": [
            {
                "day": 1,
                "title": "North Goa",
                "stops": [
                    {
                        "id": "goa-1",
                        "name": "Baga Beach",
                        "time": "10:00 AM",
                        "description": "Relax at the beach."
                    }
                ]
            }
        ]
    }
    """

    trip = parse_and_validate_trip(raw_response)

    assert trip.destination == "Goa"
    assert len(trip.days) == 1
    assert len(trip.days[0].stops) == 1
    
#Test G: normalization test
def test_trip_normalization():
    raw_response = """
    {
        "destination": "  Goa  ",
        "summary": "  Beach trip  ",
        "days": [
            {
                "day": 1,
                "title": "  North Goa  ",
                "stops": [
                    {
                        "id": " goa-1 ",
                        "name": " Baga Beach ",
                        "time": " 10:00 AM ",
                        "description": " Relax at the beach. "
                    }
                ]
            }
        ]
    }
    """

    trip = parse_and_validate_trip(raw_response)

    normalized = normalize_trip(trip)

    assert normalized.destination == "Goa"
    assert normalized.summary == "Beach trip"
    assert normalized.days[0].title == "North Goa"
    assert normalized.days[0].stops[0].name == "Baga Beach"