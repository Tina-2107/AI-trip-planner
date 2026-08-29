import StopCard from "./StopCard";
{
  /*day   = { day: 3, title: "Notre Dame" }*/
}
function DayCard({ day, dayIndex, setTrip }) {
  return (
    <section>
      <h3>Day {day.day}</h3>
      {day.stops.map((stop, stopIndex) => (
        <StopCard
          key={stop.id || `${dayIndex}-${stopIndex}`}
          stop={stop}
          dayIndex={dayIndex}
          stopIndex={stopIndex}
          setTrip={setTrip}
        />
      ))}
    </section>
  );
}

export default DayCard;
