import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import MainPanel from "./components/MainPanel.jsx";
import "./App.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <MainPanel activeSection={activeSection} />
    </div>
  );
}