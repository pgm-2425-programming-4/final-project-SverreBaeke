import { Link } from "@tanstack/react-router";
import "./Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <nav className="topbar__nav">
        <ul className="topbar__list">
          <li className="topbar__item">
            <Link to="/projects/$projectId/$backlog" className="topbar__link">
              Backlog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
