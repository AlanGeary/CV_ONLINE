import About from "../sections/About.jsx";
import Experience from "../sections/Experience.jsx";
import Education from "../sections/Education.jsx";
import Teaching from "../sections/Teaching.jsx";
import Skills from "../sections/Skills.jsx";
import Contact from "../sections/Contact.jsx";
import Courses from "../sections/Couses.jsx";

const sections = {
  about: <About />,
  experience: <Experience />,
  education: <Education />,
  teaching: <Teaching />,
  skills: <Skills />,
  courses: <Courses />,
  contact: <Contact />,
};

export default function MainPanel({ activeSection }) {
  return (
    <main className="main-panel">
      <div className="content-surface">{sections[activeSection] ?? <About />}</div>
    </main>
  );
}
