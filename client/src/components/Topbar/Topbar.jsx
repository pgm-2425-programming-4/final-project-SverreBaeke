import { Link } from "@tanstack/react-router";
import "./Topbar.css";

export function Topbar({
  projectName,
  projectId,
  onAddTask,
  labels,
  selectedLabels,
  onToggleLabel,
  onClearFilters,
}) {
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
        
        {labels && labels.length > 0 ? (
          <div className="topbar__filters">
            <div className="topbar__filter-chips">
              {labels.map((label) => (
                <button
                  key={label.documentId}
                  className={`topbar__filter-chip ${
                    selectedLabels?.includes(label.documentId)
                      ? "topbar__filter-chip--active"
                      : ""
                  }`}
                  onClick={() => onToggleLabel?.(label.documentId)}
                  type="button"
                >
                  {label.name}
                </button>
              ))}
            </div>

            {selectedLabels?.length > 0 ? (
              <button
                className="topbar__clear-filters"
                onClick={onClearFilters}
                type="button"
              >
                Clear ({selectedLabels.length})
              </button>
            ) : null}
          </div>
        ) : null}

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
