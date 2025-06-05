import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBackLog } from "../../../components/PaginatedBacklog/paginated-Backlog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createFileRoute("/projects/$projectId/$backlog")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <PaginatedBackLog />
      </>
    </QueryClientProvider>
  );
}
