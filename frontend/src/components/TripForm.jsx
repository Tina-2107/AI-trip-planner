import { useState, useRef } from "react";
import { generateTrip } from "../api.js";

function TripForm({ onTripGenerated }) {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  const requestIdRef = useRef(0);

  async function submitTrip() {
    // Handle empty input
    if (!prompt.trim()) {
      setError("Please enter a trip request.");
      setStatus("error");
      return;
    }
    const requestId = ++requestIdRef.current;
    setStatus("loading");
    setError("");
    try {
      const data = await generateTrip(prompt);
      // A newer request has started since this one was sent - this
      // response is stale, so it must not overwrite current state.
      if (requestId !== requestIdRef.current) {
        return;
      }
      onTripGenerated(data);
      setStatus("success");
      setPrompt("");
    } catch (err) {
      if (requestId !== requestIdRef.current) {
        return;
      }
      console.error(err);
      setStatus("error");
      setError(err.message || "Something went wrong.");
    } finally {
      if (requestId === requestIdRef.current) {
        setStatus("idle");
      }
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
    <form className="trip-form" onSubmit={handleSubmit}>
      <textarea
        id="trip-prompt"
        className="trip-form__input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your trip..."
        disabled={status === "loading"}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="trip-form__submit"
      >
        {status === "loading" ? "Generating..." : "Generate Trip"}
      </button>

      {status === "loading" && <p className="trip-form__status">Loading...</p>}

      {status === "error" && (
        <div className="trip-form__error">
          <p>{error}</p>

          <button
            type="button"
            onClick={handleRetry}
            className="trip-form__retry"
          >
            Retry
          </button>
        </div>
      )}
    </form>
  );
}

export default TripForm;
