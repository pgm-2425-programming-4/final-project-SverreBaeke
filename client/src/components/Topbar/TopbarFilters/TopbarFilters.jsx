import "./TopbarFilters.css"
export function TopbarFilters({
  labels,
  onToggleLabel,
  selectedLabels,
  onClearFilters,
}) {
  if (!labels && labels.length > 0) {
    return null;
  }

  return (
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
  );
}
