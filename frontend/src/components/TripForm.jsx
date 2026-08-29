import { useState } from "react";
import { generateTrip } from "../api.js";

function TripForm({ onTripGenerated }) {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  async function submitTrip() {
    // Handle empty input
    if (!prompt.trim()) {
      setError("Please enter a trip request.");
      setStatus("error");
      return;
    }
    setLoading(true);
    setStatus("loading");
    setError("");
    try {
      const data = await generateTrip(prompt);
      onTripGenerated(data);
      setStatus("success");
      setPrompt("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    submitTrip();
  }

  function handleRetry() {
    submitTrip();
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your trip..."
        disabled={status === "loading"}
      />

      <button type="submit" disabled={loading} disabled={status === "loading"}>
        {loading ? "Generating..." : "Generate Trip"}
      </button>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {status === "error" && (
        <div>
          <p>{error}</p>
          <button type="button" onClick={handleRetry}></button>
        </div>
      )}
    </form>
  );
}

export default TripForm;
