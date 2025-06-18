import { useEffect, useState } from "react";
import "./AddTaskModal.css";

export function AddTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
  statuses,
  projectId,
}) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskLabels, setTaskLabels] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const $dialog = document.getElementById("add-task-modal");

    if (isOpen) {
      $dialog?.showModal();
      const defaultStatus = statuses?.find(
        (status) => status.name.toLowerCase() !== "backlog",
      );
      setSelectedStatus(defaultStatus?.documentId || "");
    } else {
      $dialog?.close();
    }
  }, [isOpen, statuses]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newTask = {
        name: taskName.trim(),
        description: taskDescription.trim(),
        labels: taskLabels,
        state: selectedStatus,
        project: projectId,
      };

      await onTaskCreated(newTask);

      setTaskName("");
      setTaskDescription("");
      setTaskLabels([]);
      setSelectedStatus("");
      
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Failed to create task. Please try again.");
    }
  }

  if (!isOpen) return null;

  return (
    <dialog className="add-task-modal" id="add-task-modal">
      <div className="add-task-modal__content">
        <header>
          <h2 className="add-task-modal__title">Add New Task</h2>
        </header>

        <form className="add-task-modal__form" onSubmit={handleSubmit}>
          <div className="add-task-modal__field">
            <label htmlFor="task-name" className="add-task-modal__label">
              Task Name
            </label>
            <input
              type="text"
              id="task-name"
              className="add-task-modal__input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name..."
              required
            />
          </div>

          <div className="add-task-modal__field">
            <label htmlFor="task-description" className="add-task-modal__label">
              Description
            </label>
            <textarea
              id="task-description"
              className="add-task-modal__textarea"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description..."
              rows="4"
            />
          </div>

          <div className="add-task-modal__field">
            <label htmlFor="task-status" className="add-task-modal__label">
              Status
            </label>
            <select
              id="task-status"
              className="add-task-modal__select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              <option value="">Select status...</option>
              {statuses?.map((status) => (
                <option key={status.documentId} value={status.documentId}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="add-task-modal__actions">
            <button
              type="button"
              className="add-task-modal__button add-task-modal__button--cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="add-task-modal__button add-task-modal__button--primary"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
