import { Sidebar } from "../Sidebar/Sidebar.jsx";
import { Outlet } from "@tanstack/react-router";
import "./AppLayout.css";

export function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
