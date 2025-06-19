import { Sidebar } from "../Sidebar/Sidebar.jsx";
import { Outlet } from "@tanstack/react-router";
import "./AppLayout.css";

export function AppLayout({ projects }) {
  return (
    <div className="app-layout">
      <Sidebar projects={projects} />
      <main className="app-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
