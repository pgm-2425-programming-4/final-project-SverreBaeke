import "./TaskBoard.css";
import { TaskCard } from "../TaskCard/TaskCard";

export function TaskBoard({ tasks, handleTaskClick, statuses }) {
  const groupTasksByStatus = (tasks) => {
    return tasks?.reduce((groups, task) => {
      const status = task?.state?.name || "To do";
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(task);
      return groups;
    }, {});
  };

  const taskGroups = groupTasksByStatus(tasks);

  const activeStatuses =
    statuses?.filter((status) => status.name.toLowerCase() !== "backlog")?.map((status) => status.name) || [];

  return (
    <section className="task-board">
      {activeStatuses?.map((status) => {
        return (
          <div key={status} className="task-board__column">
            <header className="task-board__header">
              <h2 className="task-board__title">{status}</h2>
              <span className="task-board__count">
                {taskGroups[status]?.length || 0}
              </span>
            </header>
            <div className="task-board__tasks">
              {taskGroups[status]?.map((task) => {
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => handleTaskClick(task)}
                  />
                );
              }) || <p>No tasks</p>}
            </div>
          </div>
        );
      })}
    </section>
  );
}
