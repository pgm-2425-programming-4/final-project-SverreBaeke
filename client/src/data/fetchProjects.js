import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchProjects() {
  try {
    const result = await fetch(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const data = await result.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function fetchProjectsById(projectId) {
  try {
    const result = await fetch(
      `${API_URL}/projects/${projectId}?populate[tasks][populate]=*`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );
    const data = await result.json();
      console.log(data.data)
    return data.data;
  } catch (error) {
    console.error("Error fetching project by id:", error);
    throw error;
  }
}
