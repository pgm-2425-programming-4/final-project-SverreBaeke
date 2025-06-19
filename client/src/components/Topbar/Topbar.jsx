import "./Topbar.css";
import { TopbarNav } from "./TopbarNav/TopbarNav";
import { TopbarFilters } from "./TopbarFilters/TopbarFilters";

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

        <TopbarNav projectId={projectId} />
        <TopbarFilters
          labels={labels}
          selectedLabels={selectedLabels}
          onToggleLabel={onToggleLabel}
          onClearFilters={onClearFilters}
        />

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
