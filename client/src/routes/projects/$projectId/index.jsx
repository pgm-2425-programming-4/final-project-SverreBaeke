import { createFileRoute } from "@tanstack/react-router";
import { fetchProjectsById } from "../../../data/fetchProjects";
import { TaskModal } from "../../../components/TaskModal/TaskModal";
import { TaskBoard } from "../../../components/TaskBoard/TaskBoard";
import { useState } from "react";
import { fetchStatuses, updateTaskStatus } from "../../../data/StatusesOperations";

export const Route = createFileRoute("/projects/$projectId/")({
  loader: async ({ params }) => {
    const projectId = params.projectId;
    const project = await fetchProjectsById(projectId);
    const statuses = await fetchStatuses()

    return {project, statuses};
  },
  staleTime: 10000,
  component: RouteComponent,
});

function RouteComponent() {
  const {project, statuses} = Route.useLoaderData();
  const allTasks = project.tasks;

  const activeTasks = allTasks.filter((task) => {
    const status = task?.state?.name?.toLowerCase();
    return status !== "backlog";
  });

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

  async function handleStatusChange(taskId, newStatusId) {
    try {
      await updateTaskStatus(taskId, newStatusId);

      window.location.reload();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  }

  return (
    <>
      <header>
        <h1>{project.name}</h1>
      </header>
      <TaskBoard tasks={activeTasks} handleTaskClick={handleTaskClick} statuses={statuses} />
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
        statuses={statuses}
      />
    </>
  );
}
