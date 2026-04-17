const groups = [
  {
    title: "Lenguajes",
    items: ["Python", "R", "JavaScript", "HTML", "CSS", "Markdown", "LaTeX", "YAML"],
  },
  {
    title: "IA y data science",
    items: ["Scikit-learn", "Pandas", "NumPy", "Analitica predictiva", "Visualizacion"],
  },
  {
    title: "Bases de datos",
    items: ["SQL", "Modelos relacionales", "Bases vectoriales", "Grafos"],
  },
  {
    title: "Entornos de trabajo",
    items: ["VS Code", "Jupyter", "Google Colab", "Windows", "Flujos docentes"],
  },
];

export default function Skills() {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">Herramientas</span>
        <div className="section-title-row">
          <h2>Habilidades tecnicas</h2>
        </div>
        <p className="section-intro">
          Stack orientado a analisis, modelado, automatizacion y comunicacion de
          resultados.
        </p>
      </header>

      <div className="grid">
        {groups.map((group) => (
          <article className="card" key={group.title}>
            <h3>{group.title}</h3>
            <div className="tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
