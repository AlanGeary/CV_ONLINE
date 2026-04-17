const menuItems = [
  { id: "about", label: "Perfil" },
  { id: "experience", label: "Experiencia" },
  { id: "education", label: "Educacion" },
  { id: "teaching", label: "Docencia" },
  { id: "skills", label: "Habilidades" },
  { id: "courses", label: "Cursos" },
  { id: "contact", label: "Contacto" },
];

export default function Sidebar({ activeSection, setActiveSection }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="eyebrow">CV online</span>
        <h1>Alan Geary</h1>
        <p className="role-line">Economista, docente universitario y cientifico de datos</p>
        <p className="sidebar-summary">
          Perfil hibrido entre economia aplicada, estadistica, IA y comunicacion
          docente.
        </p>
      </div>

      <div className="sidebar-meta">
        <div>
          <span className="meta-label">Base</span>
          <span className="meta-value">Rosario, Argentina</span>
        </div>
        <div>
          <span className="meta-label">Especialidad</span>
          <span className="meta-value">Analitica, modelado y formacion</span>
        </div>
        <div>
          <span className="meta-label">Disponibilidad</span>
          <span className="meta-value">Consultoria, academia y proyectos IA</span>
        </div>
      </div>

      <nav className="top-nav">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            className={activeSection === item.id ? "nav-item active" : "nav-item"}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
            <span className="nav-index">{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-note">
        <strong>Enfoque profesional</strong>
        <p>
          Trabajo en la interseccion entre evidencia, decision y tecnologia con
          una mirada clara para equipos tecnicos y no tecnicos.
        </p>
      </div>
    </aside>
  );
}
