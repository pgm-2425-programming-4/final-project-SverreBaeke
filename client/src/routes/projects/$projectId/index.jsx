import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  fetchStatuses,
  updateTaskStatus,
} from "../../../data/StatusesOperations";
import { fetchProjectsById } from "../../../data/fetchProjects";
import { fetchLabels } from "../../../data/fetchLabels";
import { Topbar } from "../../../components/Topbar/Topbar";
import { TaskModal } from "../../../components/TaskModal/TaskModal";
import { TaskBoard } from "../../../components/TaskBoard/TaskBoard";
import { AddTaskModal } from "../../../components/AddTaskModal/AddTaskModal";
import { createTask } from "../../../data/TaskOperations";

export const Route = createFileRoute("/projects/$projectId/")({
  loader: async ({ params }) => {
    const projectId = params.projectId;
    const project = await fetchProjectsById(projectId);
    const statuses = await fetchStatuses();
    const labels = await fetchLabels();

    return { project, statuses, labels, projectId };
  },
  staleTime: 10000,
  component: RouteComponent,
});

function RouteComponent() {
  const { project, statuses, labels, projectId } = Route.useLoaderData();

  const [tasks, setTasks] = useState(project?.tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  useEffect(() => {
    setTasks(project?.tasks);
    setIsModalOpen(false);
    setSelectedTask(null);
    setIsAddTaskModalOpen(false);
    setSelectedLabels([]);
  }, [projectId, project?.tasks]);

  const activeTasks = tasks?.filter((task) => {
    const status = task?.state?.name?.toLowerCase();
    return status !== "backlog";
  });

  const filteredTasks = activeTasks?.filter((task) => {
    const hasSelectedLabel = task.labels.some((label) =>
      selectedLabels.includes(label.documentId),
    );
    return hasSelectedLabel;
  });

  function toggleLabelFilter(labelId) {
    setSelectedLabels((prev) =>
      prev.includes(labelId)
        ? prev.filter((id) => id !== labelId)
        : [...prev, labelId],
    );
  }

  function clearFilters() {
    setSelectedLabels([]);
  }

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
      const createdTask = await createTask(newTaskData);

      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setIsAddTaskModalOpen(false);
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Failed to create task. Please try again.");
    }
  }

  async function handleStatusChange(taskId, newStatusId) {
    try {
      await updateTaskStatus(taskId, newStatusId);
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.documentId === taskId) {
            const newStatus = statuses.find(
              (status) => status.documentId === newStatusId,
            );
            return {
              ...task,
              state: newStatus,
            };
          }
          return task;
        }),
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  }

  return (
    <>
      <Topbar
        projectName={project?.name}
        projectId={projectId}
        onAddTask={handleAddTask}
        labels={labels}
        selectedLabels={selectedLabels}
        onToggleLabel={toggleLabelFilter}
        onClearFilters={clearFilters}
      />

      <TaskBoard
        tasks={selectedLabels.length > 0 ? filteredTasks : activeTasks}
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
        projectId={projectId}
      />
    </>
  );
}
