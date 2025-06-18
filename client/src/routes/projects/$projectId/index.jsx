import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { fetchStatuses,updateTaskStatus } from "../../../data/StatusesOperations";
import { fetchProjectsById } from "../../../data/fetchProjects";
import { fetchLabels } from "../../../data/fetchLabels";
import { TaskModal } from "../../../components/TaskModal/TaskModal";
import { TaskBoard } from "../../../components/TaskBoard/TaskBoard";
import { AddTaskModal } from "../../../components/AddTaskModal/AddTaskModal";
import { createTask } from "../../../data/TaskOperations";
import "./projects.css"

export const Route = createFileRoute("/projects/$projectId/")({
  loader: async ({ params }) => {
    const projectId = params.projectId;
    const project = await fetchProjectsById(projectId);
    const statuses = await fetchStatuses();
    const labels = await fetchLabels();

    return { project, statuses, labels };
  },
  staleTime: 10000,
  component: RouteComponent,
});

function RouteComponent() {
  const { project, statuses, labels } = Route.useLoaderData();
  const allTasks = project.tasks;
  const activeTasks = allTasks.filter((task) => {
    const status = task?.state?.name?.toLowerCase();
    return status !== "backlog";
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  function handleTaskClick(task) {
    setSelectedTask(task);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedTask(null);
  }

  function handleAddTask() {
    setIsAddTaskModalOpen(true);
  }

  function handleCloseAddTaskModal() {
    setIsAddTaskModalOpen(false);
  }

  async function handleTaskCreated(newTaskData) {
    try {
      console.log("Creating task:", newTaskData);
      await createTask(newTaskData);
      setIsAddTaskModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Failed to create task. Please try again.");
    }
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
      <header className="page-header">
        <h1>{project.name}</h1>
        <button className="add-task-btn" onClick={handleAddTask} type="button">
          + Add Task
        </button>
      </header>

      <TaskBoard
        tasks={activeTasks}
        handleTaskClick={handleTaskClick}
        statuses={statuses}
      />

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
        statuses={statuses}
      />

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={handleCloseAddTaskModal}
        onTaskCreated={handleTaskCreated}
        statuses={statuses}
        labels={labels}
        projectId={project.documentId}
      />
    </>
  );
}
