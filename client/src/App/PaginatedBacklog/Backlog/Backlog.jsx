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
        {backlogTasks.map((backlogTask, index) => {
          return (
            <tr key={index}>
              <td className="task" key={backlogTask.id}>
                {backlogTask.name}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
