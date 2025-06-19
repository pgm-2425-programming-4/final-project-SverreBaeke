import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBackLog } from "../../../../components/PaginatedBacklog/paginated-Backlog";
import { fetchProjectsById } from "../../../../data/fetchProjects";
import { Topbar } from "../../../../components/Topbar/Topbar";

export const Route = createFileRoute("/projects/$projectId/backlog/")({
  loader: async ({ params }) => {
    const project = await fetchProjectsById(params.projectId);
    return { project };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { project } = Route.useLoaderData();
  const { projectId } = Route.useParams();

  return (
    <>
      <Topbar projectName={project.name} projectId={projectId} />
      <PaginatedBackLog projectId={projectId} />
    </>
  );
}
