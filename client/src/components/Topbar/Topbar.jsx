import { Link } from "@tanstack/react-router";
import "./Topbar.css";

export function Topbar({ projectName, projectId, onAddTask }) {
  return (
    <header className="topbar">
      <div className="topbar__content">
        <div className="topbar__title-section">
          <h1 className="topbar__project-name">{projectName}</h1>
        </div>

        <nav className="topbar__nav">
          <ul className="topbar__list">
            <li className="topbar__item">
              <Link
                to="/projects/$projectId/backlog"
                params={{ projectId }}
                className="topbar__link"
              >
                Backlog
              </Link>
            </li>
            <li className="topbar__item">
              <Link
                to="/projects/$projectId"
                params={{ projectId }}
                className="topbar__link"
                activeOptions={{ exact: true }}
              >
                Board
              </Link>
            </li>
          </ul>
        </nav>

        {onAddTask ? (
          <div className="topbar__actions">
            <button
              className="topbar__add-task-btn"
              onClick={onAddTask}
              type="button"
            >
              + Add Task
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
