import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBackLog } from "../../../../components/PaginatedBacklog/paginated-Backlog";

export const Route = createFileRoute("/projects/$projectId/backlog/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useParams();
  return <PaginatedBackLog projectId={projectId} />;
}
