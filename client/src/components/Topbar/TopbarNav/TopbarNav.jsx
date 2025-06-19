import { Link } from "@tanstack/react-router";
import "./TopbarNav.css";

export function TopbarNav({ projectId }) {
  return (
    <>
      <nav className="topbar__nav">
        <ul className="topbar__list">
          <li>
            <Link
              to="/projects/$projectId/backlog"
              params={{ projectId }}
              className="topbar__link"
            >
              Backlog
            </Link>
          </li>
          <li>
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
    </>
  );
}
