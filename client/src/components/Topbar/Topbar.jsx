import { Link } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import "./Topbar.css";

export function Topbar({handleAddTask}) {
  const { projectId } = useParams({ strict: false });

  if (!projectId) {
    return (
      <header className="app-layout__topbar topbar">
        <nav className="topbar__nav">
          <ul className="topbar__list"></ul>
        </nav>
      </header>
    );
  }
  return (
    <header className="app-layout__topbar topbar">
      <nav className="topbar__nav">
        <ul className="topbar__list">
          <li className="topbar__item">
            <Link to="/projects/$projectId/backlog" className="topbar__link">
              Backlog
            </Link>
          </li>
          <li className="topbar__item">
            <Link
              to="/projects/$projectId"
              params={{ projectId }}
              className="topbar__link"
            >
              Board
            </Link>
          </li>
        </ul>

        <div className="topbar__actions">
          <button
            className="topbar__add-task-btn"
            onClick={handleAddTask}
            type="button"
          >
            + Add Task
          </button>
        </div>
      </nav>
    </header>
  );
}
