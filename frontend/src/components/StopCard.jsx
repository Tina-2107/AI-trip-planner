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
    <div>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "▼" : "▶"}
      </button>

      <strong>{stop.name}</strong>

      {stop.time && <span> — {stop.time}</span>}

      {expanded && (
        <div>
          <p>{stop.description}</p>
        </div>
      )}

      <div>
        <button onClick={moveUp} disabled={stopIndex === 0}>
          ↑
        </button>

        <button onClick={moveDown} disabled={stopIndex === stopCount - 1}>
          ↓
        </button>

        <button onClick={removeStop}>Remove</button>
      </div>
    </div>
  );
}

export default StopCard;
