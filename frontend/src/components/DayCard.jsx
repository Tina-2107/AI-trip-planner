import StopCard from "./StopCard";
{
  /*day   = { day: 3, title: "Notre Dame" }*/
}
function DayCard({ day, dayIndex, setTrip }) {
  return (
    <section className="day-card">
      <div className="day-card__header">
        <span className="day-card__number">Day {day.day}</span>
        {day.title && <h3 className="day-card__title">{day.title}</h3>}
      </div>
      <ol className="route">
        {day.stops.map((stop, stopIndex) => (
          <li
            className="route__item"
            key={stop.id || `${dayIndex}-${stopIndex}`}
          >
            <span className="route__pin">{stopIndex + 1}</span>
            <StopCard
              stop={stop}
              dayIndex={dayIndex}
              stopIndex={stopIndex}
              stopCount={day.stops.length}
              setTrip={setTrip}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

export default DayCard;
