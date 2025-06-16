import { Link } from "@tanstack/react-router";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <section className="sidebar__section">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link to="/" className="sidebar__link">
              Home
            </Link>
          </li>
        </ul>
      </section>

      <section className="sidebar__section">
        <div className="sidebar__subtitle">Projects</div>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link to="/projects/$projectId" className="sidebar__link">
              Projecten
            </Link>
          </li>
        </ul>
      </section>

      <section className="sidebar__section">
        <div className="sidebar__subtitle">Info</div>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link to="/about" className="sidebar__link">
              About
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}
