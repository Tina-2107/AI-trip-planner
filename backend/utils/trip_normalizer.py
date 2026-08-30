from models.trip_response import TripResponse


def normalize_trip(trip: TripResponse) -> TripResponse:
    return trip.model_copy(
        update={
            "destination": trip.destination.strip(),
            "summary": trip.summary.strip() if trip.summary else None,
            "days": [
                day.model_copy(
                    update={
                        "title": day.title.strip() if day.title else None,
                        "stops": [
                            stop.model_copy(
                                update={
                                    "id": stop.id.strip(),
                                    "name": stop.name.strip(),
                                    "time": stop.time.strip() if stop.time else None,
                                    "description": (
                                        stop.description.strip()
                                        if stop.description
                                        else None
                                    ),
                                }
                            )
                            for stop in day.stops
                        ],
                    }
                )
                for day in trip.days
            ],
        }
    )