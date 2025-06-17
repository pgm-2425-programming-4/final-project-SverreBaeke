import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchStatuses() {
  try {
    const result = await fetch(`${API_URL}/statuses`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const data = await result.json();

    console.log(data);
    return data.data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    throw error;
  }
}
