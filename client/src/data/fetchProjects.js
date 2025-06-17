import { API_TOKEN, API_URL } from "../constants/constants";

export async function 
fetchProjects() {
  const result = await fetch(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  return data.data;
}

export async function fetchProjectsById(projectId) {
  const result = await fetch(`${API_URL}/projects/${projectId}?populate[tasks][populate]=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();

  console.log(data)
  return data.data;
}

