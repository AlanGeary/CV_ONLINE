import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import MainPanel from "./components/MainPanel.jsx";
import { cvContent } from "./content/cvContent.js";
import "./App.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [language, setLanguage] = useState("es");
  const content = cvContent[language];

  useEffect(() => {
    document.documentElement.lang = content.language;
  }, [content.language]);

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        language={language}
        setLanguage={setLanguage}
        content={content}
      />
      <MainPanel activeSection={activeSection} content={content} />
    </div>
  );
}
