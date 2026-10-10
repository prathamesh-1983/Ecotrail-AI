const API_BASE = "http://localhost:8000/api";

export async function analyzeImage(file) {
  const form = new FormData();
  form.append("file", file);

  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    body: form,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Analysis failed.");
  }

  return data;
}

export async function getObservations() {
  const response = await fetch(`${API_BASE}/observations`);
  if (!response.ok) throw new Error("Could not load journal.");
  return response.json();
}

export async function saveObservation(observation) {
  const response = await fetch(`${API_BASE}/observations`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(observation),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Could not save observation.");
  }

  return data;
}
