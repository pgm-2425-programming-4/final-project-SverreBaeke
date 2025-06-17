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
  const tasks = project.tasks;
  console.log(tasks)
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
    <header className="project-header">
      <h1>{project.name}</h1>
    </header>
      <TaskBoard tasks={tasks} handleTaskClick={handleTaskClick}/>
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
