import { useState } from "react";

function StopCard({ stop, dayIndex, stopIndex, setTrip, stopCount }) {
  const [expanded, setExpanded] = useState(false);

  function removeStop() {
    setTrip((currentTrip) => {
      const updatedDays = currentTrip.days.map((day, index) => {
        if (index !== dayIndex) {
          return day;
        }

        return {
          ...day,
          stops: day.stops.filter((_, index) => index !== stopIndex),
        };
      });

      return {
        ...currentTrip,
        days: updatedDays,
      };
    });
  }

  function moveUp() {
    // Already at the top
    if (stopIndex === 0) return;

    setTrip((currentTrip) => {
      const updatedDays = currentTrip.days.map((day, index) => {
        if (index !== dayIndex) {
          return day;
        }

        const stops = [...day.stops];

        // Swap current stop with the one above it
        [stops[stopIndex - 1], stops[stopIndex]] = [
          stops[stopIndex],
          stops[stopIndex - 1],
        ];

        return {
          ...day,
          stops,
        };
      });

      return {
        ...currentTrip,
        days: updatedDays,
      };
    });
  }

  function moveDown() {
    // Already at the bottom
    if (stopIndex === stopCount - 1) return;

    setTrip((currentTrip) => {
      const updatedDays = currentTrip.days.map((day, index) => {
        if (index !== dayIndex) {
          return day;
        }

        const stops = [...day.stops];

        // Swap current stop with the one below it
        [stops[stopIndex], stops[stopIndex + 1]] = [
          stops[stopIndex + 1],
          stops[stopIndex],
        ];

        return {
          ...day,
          stops,
        };
      });

      return {
        ...currentTrip,
        days: updatedDays,
      };
    });
  }

  return (
    <article className="stop">
      <div className="stop__header">
        <button
          className="stop__toggle"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse details" : "Expand details"}
        >
          {expanded ? "▼" : "▶"}
        </button>

        <strong className="stop__name">{stop.name}</strong>

        {stop.time && <span className="stop__time"> {stop.time}</span>}
      </div>

      {expanded && (
        <div className="stop__details">
          <p>{stop.description}</p>
        </div>
      )}

      <div className="stop__actions">
        <button
          onClick={moveUp}
          disabled={stopIndex === 0}
          aria-label="Move up"
        >
          ↑
        </button>

        <button
          onClick={moveDown}
          disabled={stopIndex === stopCount - 1}
          aria-label="Move down"
        >
          ↓
        </button>

        <button onClick={removeStop} aria-label="Remove stop">
          ✕
        </button>
      </div>
    </article>
  );
}

export default StopCard;
