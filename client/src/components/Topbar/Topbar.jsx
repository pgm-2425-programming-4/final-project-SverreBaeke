import { Link } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import "./Topbar.css";

export function Topbar() {
  const { projectId } = useParams({ strict: false });

  if (!projectId) {
    return (
      <header className="app-layout__topbar topbar">
        <nav className="topbar__nav">
          <ul className="topbar__list">
          </ul>
        </nav>
      </header>
    );
  }
  return (
    <header className="app-layout__topbar topbar">
      <nav className="topbar__nav">
        <ul className="topbar__list">
          <li className="topbar__item">
            <Link to="/projects/$projectId/backlog" params={{projectId}} className="topbar__link">
              Backlog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
