export async function generateTrip(prompt) {
  const response = await fetch("https://ai-trip-planner-d6m1.onrender.com", {
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
