export function BacklogTaskList({ backlogTasks }) {
    return (
      <ul>
        {backlogTasks.map((backlogTask) => {
          return (
            <li key={backlogTask.id}>
              {backlogTask.name}
            </li>
          );
        })}
      </ul>
    );
  }