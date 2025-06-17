import { useEffect } from "react";
import "./TaskModal.css";

export function TaskModal({ task, isOpen, onClose }) {
  useEffect(() => {
    const dialog = document.getElementById("task-modal");

    if (isOpen && task) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen, task]);

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
        <button className="task-modal__button" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
}
