import { Sidebar } from "../Sidebar/Sidebar.jsx";
import { Topbar } from "../Topbar/Topbar.jsx";
import { Outlet } from "@tanstack/react-router";
import "./AppLayout.css";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal.jsx";
import { useState } from "react";

export function AppLayout() {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  function handleAddTask() {
    setIsAddTaskModalOpen(true);
  }

  function handleCloseAddTaskModal() {
    setIsAddTaskModalOpen(false);
  }

  function handleTaskCreated(newTask) {
    setIsAddTaskModalOpen(false);
  }
  return (
    <div className="app-layout">
      <Sidebar />
      <Topbar handleAddTask={handleAddTask} />
      <main className="app-layout__content">
        <Outlet />
      </main>
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={handleCloseAddTaskModal}
        onTaskCreated={handleTaskCreated}
        // statuses={}
        // projectId={}
      />
    </div>
  );
}
