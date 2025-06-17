import "./TaskBoard.css";
import { TaskCard } from "../TaskCard/TaskCard";

export function TaskBoard({ tasks, handleTaskClick }) {
  const groupTasksByStatus = (tasks) => {
    return tasks.reduce((groups, task) => {
      const status = task?.state?.name || "To do";
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(task);
      return groups;
    }, {});
  };

  const taskGroups = groupTasksByStatus(tasks);
  const statuses = ["To do", "In progress", "Ready for review", "Done"];

  return (
    <section className="task-board">
      {statuses.map((status) => {
        return <div key={status} className="task-board__column">
          <header className="task-board__header">
            <h2 className="task-board__title">{status}</h2>
            <span className="task-board__count">
              {taskGroups[status].length}
            </span>
          </header>
          <div className="task-board__tasks">
            {taskGroups[status].map((task) => {
              return <TaskCard
                key={task.id}
                task={task}
                onClick={() => handleTaskClick(task)}
              />
            }) || <p>No tasks</p>}
          </div>
        </div>;
      })}
    </section>
  );
}
