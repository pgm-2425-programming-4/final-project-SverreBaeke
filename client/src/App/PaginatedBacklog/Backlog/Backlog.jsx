import "./Backlog.css";
export function BacklogTaskList({ backlogTasks }) {
  return (
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
  );
}
