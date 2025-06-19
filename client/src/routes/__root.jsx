import { createRootRoute, notFound } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AppLayout } from "../components/AppLayout/AppLayout";
import { fetchProjects } from "../data/fetchProjects.js";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RouteComponent,
  loader: async () => {
    const projects = await fetchProjects();
    if (!projects) {
      throw notFound({ data: "NO_PROJECTS" });
    }
    return { projects };
  },

  notFoundComponent: ({ data }) => {
    if (data.data === "NO_PROJECTS") {
      return <p>No projects found!</p>;
    }
    return <p>Something went wrong!</p>;
  },
});

function RouteComponent() {
  const { projects } = Route.useLoaderData();
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout projects={projects} />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
}
