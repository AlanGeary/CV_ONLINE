const menuItems = [
  { id: "about", label: "Perfil" },
  { id: "experience", label: "Experiencia" },
  { id: "education", label: "Educación" },
  { id: "teaching", label: "Docencia" },
  { id: "skills", label: "Habilidades" },
  { id: "contact", label: "Contacto" },
];

export default function Sidebar({ activeSection, setActiveSection }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Alan Geary</h1>
        <p>Economista / Científico de datos</p>
      </div>

      <nav className="top-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={activeSection === item.id ? "nav-item active" : "nav-item"}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}