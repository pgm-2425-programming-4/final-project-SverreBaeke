import { createFileRoute } from "@tanstack/react-router";
import { fetchProjectsById } from "../../../data/fetchProjects";
import { TaskCard } from "../../../components/TaskCard/TaskCard";
import { TaskModal } from "../../../components/TaskModal/TaskModal";
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
  const tasks = project.tasks;
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
      {tasks.map((task) => {
        return (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task)}
          />
        );
      })}
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
