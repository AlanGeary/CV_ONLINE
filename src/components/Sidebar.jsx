const languages = [
  { id: "es", label: "ES" },
  { id: "en", label: "EN" },
];

export default function Sidebar({
  activeSection,
  setActiveSection,
  language,
  setLanguage,
  content,
}) {
  const { ui, sidebar } = content;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-topbar">
          <span className="eyebrow">{ui.cvLabel}</span>

          <div className="language-switcher" aria-label={ui.languageLabel}>
            {languages.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  language === item.id ? "language-button active" : "language-button"
                }
                onClick={() => setLanguage(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <h1>{sidebar.name}</h1>
        <p className="role-line">{sidebar.role}</p>
        <p className="sidebar-summary">{sidebar.summary}</p>
      </div>

      <div className="sidebar-meta">
        {sidebar.meta.map((item) => (
          <div key={item.label}>
            <span className="meta-label">{item.label}</span>
            <span className="meta-value">{item.value}</span>
          </div>
        ))}
      </div>

      <nav className="top-nav">
        {ui.menu.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={activeSection === item.id ? "nav-item active" : "nav-item"}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
            <span className="nav-index">{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-note">
        <strong>{ui.professionalFocus}</strong>
        <p>{sidebar.note}</p>
      </div>
    </aside>
  );
}
