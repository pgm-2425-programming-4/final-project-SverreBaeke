import { createFileRoute } from "@tanstack/react-router";
import { fetchProjectsById } from "../../../data/fetchProjects";

export const Route = createFileRoute("/projects/$projectId/")({
  loader: async ({ params }) => {
    const projectId = params.projectId;
    const data = await fetchProjectsById(projectId);
    
    return data
  },
  component: RouteComponent,
  
});

function RouteComponent() {
  const projects = Route.useLoaderData();
  console.log(projects)
  return <div>{projects.name}</div>;
}
