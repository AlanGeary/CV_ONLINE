import About from "../sections/About.jsx";
import Experience from "../sections/Experience.jsx";
import Education from "../sections/Education.jsx";
import Teaching from "../sections/Teaching.jsx";
import Skills from "../sections/Skills.jsx";
import Contact from "../sections/Contact.jsx";

export default function MainPanel({ activeSection }) {
  return (
    <main className="main-panel">
      {activeSection === "about" && <About />}
      {activeSection === "experience" && <Experience />}
      {activeSection === "education" && <Education />}
      {activeSection === "teaching" && <Teaching />}
      {activeSection === "skills" && <Skills />}
      {activeSection === "contact" && <Contact />}
    </main>
  );
}