import { Link } from "@tanstack/react-router";
import "./Sidebar.css";

export function Sidebar({ projects }) {
  return (
    <aside className="app-layout__sidebar">
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
            {projects.map((project) => {
              return (
                <li className="sidebar__item" key={project.documentId}>
                  <Link
                    to={`/projects/${project.documentId}`}
                    className="sidebar__link"
                  >
                    {project.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </nav>
    </aside>
  );
}
