import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchBacklog(projectId, page, pageSize) {
  try {
    const result = await fetch(
      `${API_URL}/tasks?filters[state][name][$eq]=Backlog&filters[project][documentId][$eq]=${projectId}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching backlog:", error);
    throw error;
  }
}
