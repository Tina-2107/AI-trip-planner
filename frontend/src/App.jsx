import { useState } from "react";
import { generateTrip } from "./api";

function App() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");

    try {
      const data = await generateTrip("5 day trip to Goa focused on beaches");

      setTrip(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>AI Trip Planner</h1>

      <button onClick={handleGenerate}>Generate Goa Trip</button>

      {loading && <p>Generating...</p>}

      {error && <p>{error}</p>}

      {trip && <pre>{JSON.stringify(trip, null, 2)}</pre>}
    </div>
  );
}

export default App;
