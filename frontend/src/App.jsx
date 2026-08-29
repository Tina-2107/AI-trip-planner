import { useState } from "react";
import TripForm from "./components/TripForm";
import TripView from "./components/TripView";

function App() {
  const [trip, setTrip] = useState(null);

  return (
    <div>
      <h1>AI Trip Planner</h1>

      <TripForm onTripGenerated={setTrip} />

      {trip && <TripView trip={trip} setTrip={setTrip} />}
    </div>
  );
}

export default App;
