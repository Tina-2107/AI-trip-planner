import DayCard from "./DayCard";

function TripView({ trip, setTrip }) {
  return (
    <div className="itinerary">
      <span className="itinerary__eyebrow">Your itinerary</span>
      <h2 className="itinerary__destination">{trip.destination}</h2>

      {trip.summary && <p className="itinerary__summary">{trip.summary}</p>}

      <div className="itinerary__days">
        {/*day   = { day: 3, title: "Notre Dame" }*/}
        {trip.days.map((day, index) => (
          <DayCard key={day.day} day={day} dayIndex={index} setTrip={setTrip} />
        ))}
      </div>
    </div>
  );
}

export default TripView;
