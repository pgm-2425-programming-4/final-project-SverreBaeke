import { createFileRoute } from "@tanstack/react-router";
import "./Home.css";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="welcome-page">
      <section className="welcome-content">
        <header className="welcome-header">
          <h1 className="welcome-header__title">Welcome to Kanban Board</h1>
          <p>Organize your projects and boost your productivity</p>
        </header>

        <section className="welcome-features">
          <article className="feature-card">
            <h2>📋 Project Management</h2>
            <p>Create and manage multiple projects with ease</p>
          </article>

          <article className="feature-card">
            <h2>🏷️ Smart Labels</h2>
            <p>Categorize and filter tasks with custom labels</p>
          </article>

          <article className="feature-card">
            <h2>📊 Track Progress</h2>
            <p>Monitor task progress from backlog to completion</p>
          </article>
        </section>
      </section>
    </div>
  );
}
