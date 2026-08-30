import { useState } from "react";
import TripForm from "./components/TripForm";
import TripView from "./components/TripView";
import "./App.css";

function App() {
  const [trip, setTrip] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-header__title">AI Trip Planner</h1>
        <span className="app-header__tagline">
          Describe a trip, get a day-by-day route.
        </span>
      </header>

      <div className="app-shell">
        <aside className="desk-panel">
          <span className="desk-panel__eyebrow">Trip request desk</span>
          <h2 className="desk-panel__heading">Where to?</h2>
          <TripForm onTripGenerated={setTrip} />
        </aside>

        <main>
          {trip ? (
            <TripView trip={trip} setTrip={setTrip} />
          ) : (
            <div>
              <div className="empty-state">
                <span className="empty-state__mark">No itinerary yet</span>
                <p className="empty-state__text">
                  Tell the desk about your trip and your route will appear here,
                  stop by stop.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
