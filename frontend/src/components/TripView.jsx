import DayCard from "./DayCard";

function TripView({ trip, setTrip }) {
  return (
    <div>
      <h2>{trip.destination}</h2>
      {trip.summary && <p>{trip.summary}</p>}
      {/*day   = { day: 3, title: "Notre Dame" }*/}
      {trip.days.map((day, index) => (
        <DayCard key={day.day} day={day} dayIndex={index} setTrip={setTrip} />
      ))}
    </div>
  );
}

export default TripView;
