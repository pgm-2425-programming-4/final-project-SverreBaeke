import "./Backlog.css";

export function BacklogTaskList({ backlogTasks }) {
  if (!backlogTasks || backlogTasks.length === 0) {
    return <h1>No Tasks Found</h1>

  }

  const projectName = backlogTasks[0].project.name;

  return (
    <>
      <h1>{projectName}</h1>
      <table>
        <thead>
          <tr>
            <th>Task name</th>
          </tr>
        </thead>
        <tbody>
          {backlogTasks.map((backlogTask) => {
            return (
              <tr key={backlogTask.id}>
                <td className="task">{backlogTask.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
