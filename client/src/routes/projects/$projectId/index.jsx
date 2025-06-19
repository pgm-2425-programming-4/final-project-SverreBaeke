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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/projects/$projectId/")({
  loader: async ({ params }) => {
    return { projectId: params.projectId };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useLoaderData();
  const queryClient = useQueryClient();

  const {
    data: project,
    isLoading: projectLoading,
    isError: projectError,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProjectsById(projectId),
    staleTime: 10000,
  });

  const {
    data: statuses,
    isLoading: statusesLoading,
    isError: statusesError,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
    staleTime: 60000,
  });

  const {
    data: labels,
    isLoading: labelsLoading,
    isError: labelsError,
  } = useQuery({
    queryKey: ["labels"],
    queryFn: fetchLabels,
    staleTime: 60000,
  });

  const { mutateAsync: handleTaskCreated } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectId]);
      setIsAddTaskModalOpen(false);
    },
    onError: (error) => {
      console.error("Failed to create task:", error);
    },
  });

  const { mutateAsync: handleStatusChange } = useMutation({
    mutationFn: ({ taskId, newStatusId }) => {
      return updateTaskStatus(taskId, newStatusId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectId]);
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Failed to update task status:", error);
    },
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  useEffect(() => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setIsAddTaskModalOpen(false);
    setSelectedLabels([]);
  }, [projectId]);

  if (projectLoading || statusesLoading || labelsLoading) {
    return <div>Loading project data...</div>;
  }

  if (projectError || statusesError || labelsError) {
    return <div>Error loading data. Please try again.</div>;
  }
  const tasks = project?.tasks || [];
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
