import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchLabels() {
  try {
    const result = await fetch(`${API_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    const data = await result.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching labels:", error);
    throw error;
  }
}
