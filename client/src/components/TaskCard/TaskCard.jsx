import "./Taskcard.css";

export function TaskCard({ task }) {
    
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "done":
        return "task-card--done";
      case "in progress":
        return "task-card--in-progress";
      case "ready for review":
        return "task-card--review";
      case "todo":
        return "task-card--todo";
      default:
        return "task-card--todo";
    }
  };

  function renderTaskLabels(task) {
    if (task.labels && task.labels.length > 0) {
      return (
        <ul className="task-card__labels">
          {task.labels.map((label) => {
            return (
              <li key={label.id} className="task-card__label">
                {label.name}
              </li>
            );
          })}
        </ul>
      );
    }
    return null;
  }

  return (
    <article className={`task-card ${getStatusClass(task.state.name)}`}>
      <h3 className="task-card__title">{task.name}</h3>
      {renderTaskLabels(task)}
    </article>
  );
}
