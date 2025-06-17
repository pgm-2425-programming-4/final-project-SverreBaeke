import { useEffect } from "react";
import "./TaskModal.css";

export function TaskModal({ task, isOpen, onClose, onStatusChange, statuses }) {
  useEffect(() => {
    const dialog = document.getElementById("task-modal");

    if (isOpen && task) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen, task]);
  if (!task) return null;

  return (
    <dialog className="task-modal" id="task-modal">
      <h3 className="task-modal__title">{task?.name}</h3>
      <div className="task-modal__body">
        <p className="task-modal__description">{task?.description || ""}</p>
        <p className="task-modal__status">
          <strong>Status:</strong> {task?.state?.name || ""}
        </p>
        <p className="task-modal__date">
          <strong>Created:</strong> {new Date(task?.createdAt).toLocaleString()}
        </p>

        <div className="task-modal__status-section">
          <label htmlFor="status-select">
            <strong>Change Status: </strong>
          </label>
          <select
            name="status-select"
            id="status-select"
            className="task-modal__select"
            defaultValue={task?.state?.documentId}
            onChange={(e) => onStatusChange(task?.documentId, e.target.value)}
          >
            <option value="">Select status...</option>
            {statuses.map((status) => {
              return (
                <option key={status.documentId} value={status.documentId}>
                  {status.name}
                </option>
              );
            })}
          </select>
        </div>

        <button className="task-modal__button" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
}
