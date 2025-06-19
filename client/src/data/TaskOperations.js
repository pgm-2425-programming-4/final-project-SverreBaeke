import { API_TOKEN, API_URL } from "../constants/constants";

export async function createTask(taskData) {
  try {
    const response = await fetch(`${API_URL}/tasks?populate=*`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: taskData
      })
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}