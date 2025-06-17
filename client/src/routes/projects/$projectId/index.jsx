import { createFileRoute } from "@tanstack/react-router";
import { fetchProjectsById } from "../../../data/fetchProjects";
import { TaskModal } from "../../../components/TaskModal/TaskModal";
import { TaskBoard } from "../../../components/TaskBoard/TaskBoard";
import { useState } from "react";

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
  const allTasks = project.tasks;
  
const activeTasks = allTasks.filter((task) => {
  const status = task?.state?.name?.toLowerCase();
  return status !== "backlog"
})

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleTaskClick(task) {
    setSelectedTask(task);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedTask(null);
  }

  return (
    <>
    <header>
      <h1>{project.name}</h1>
    </header>
      <TaskBoard tasks={activeTasks} handleTaskClick={handleTaskClick}/>
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
