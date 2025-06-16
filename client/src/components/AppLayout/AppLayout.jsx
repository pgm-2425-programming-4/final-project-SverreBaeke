import Sidebar from "../Sidebar/Sidebar.jsx";
import Topbar from "../Topbar/Topbar.jsx";
import { Outlet } from "@tanstack/react-router";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="app-layout__sidebar">
        <Sidebar />
      </aside>
      <header className="app-layout__topbar">
        <Topbar />
      </header>
      <main className="app-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
