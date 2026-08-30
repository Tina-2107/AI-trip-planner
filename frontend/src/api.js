export async function generateTrip(prompt) {
  const response = await fetch("http://127.0.0.1:8000/generate-trip", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail || "Failed to generate trip");
  }

  return response.json();
}
