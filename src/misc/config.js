const API_BASE_URL = "https://api.tvmaze.com";

export async function apiGet(query) {
  const response = await fetch(`${API_BASE_URL}${query}`);
  const result = await response.json();
  return result;
}
