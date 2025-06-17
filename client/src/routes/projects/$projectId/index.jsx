import { createFileRoute } from "@tanstack/react-router";
import { fetchProjectsById } from "../../../data/fetchProjects";
import { TaskCard } from "../../../components/TaskCard/TaskCard";

export const Route = createFileRoute("/projects/$projectId/")({
  loader: async ({ params }) => {
    const projectId = params.projectId;
    const data = await fetchProjectsById(projectId);

    return data;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const project = Route.useLoaderData();
  const tasks = project.tasks;
  console.log(tasks[0].state)

  return (
    <>
    {tasks.map((task) => {
       return <TaskCard task={task}/>
    })}
      

    </>
  );
}
