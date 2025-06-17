import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchStatuses() {
  try {
    const result = await fetch(`${API_URL}/statuses?sort=order:asc`, {
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

export async function updateTaskStatus(taskId, newStatusId) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          state: newStatusId
        }
      })
    });

    const data = await response.json();
    console.log("Task updated successfully:", data);
    return data.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
}
