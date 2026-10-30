import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 30000,
});

/**
 * Sends the uploaded photo + optional preferences to the backend for analysis.
 * The backend is the single place a real computer-vision provider gets wired in
 * (see backend/controllers/analyzeController.js) — the API key never touches the client.
 */
export async function analyzePhoto(file, preferences = {}) {
  const formData = new FormData();
  formData.append("photo", file);
  formData.append("preferences", JSON.stringify(preferences));

  const { data } = await client.post("/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.result;
}

export async function fetchAnalysis(id) {
  const { data } = await client.get(`/analysis/${id}`);
  return data.result;
}

export async function fetchOutfits(params = {}) {
  const { data } = await client.get("/outfits", { params });
  return data.outfits;
}

export async function saveOutfit(payload) {
  const { data } = await client.post("/outfits/save", payload);
  return data.saved;
}

export async function fetchUserProfile() {
  const { data } = await client.get("/user/profile");
  return data.profile;
}

export default client;
