const API_URL = import.meta.env.VITE_API_URL;
export async function generateTrip(prompt) {
  const response = await fetch(`${API_URL}/generate-trip`, {
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
