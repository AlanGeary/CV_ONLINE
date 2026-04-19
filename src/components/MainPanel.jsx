import About from "../sections/About.jsx";
import Experience from "../sections/Experience.jsx";
import Education from "../sections/Education.jsx";
import Teaching from "../sections/Teaching.jsx";
import Skills from "../sections/Skills.jsx";
import Contact from "../sections/Contact.jsx";
import Courses from "../sections/Couses.jsx";
import Chat from "../sections/Chat.jsx";

export default function MainPanel({ activeSection, content }) {
  const { language, sections } = content;

  const sectionMap = {
    about: <About content={sections.about} />,
    experience: <Experience content={sections.experience} />,
    education: <Education content={sections.education} />,
    teaching: <Teaching content={sections.teaching} />,
    skills: <Skills content={sections.skills} />,
    courses: <Courses content={sections.courses} />,
    chat: <Chat content={sections.chat} language={language} />,
    contact: <Contact content={sections.contact} />,
  };

  return (
    <main className="main-panel">
      <div className="content-surface">{sectionMap[activeSection] ?? sectionMap.about}</div>
    </main>
  );
}
