export default function Skills() {
  return (
    <section>
      <span className="section-kicker">Herramientas</span>
      <h2>Habilidades</h2>

      <div className="grid">
        <article className="card">
          <h3>Lenguajes</h3>
          <div className="tags">
            <span>Python</span>
            <span>R</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>JS</span>
            <span>Markdown</span>
            <span>LaTeX</span>
            <span>YAML</span>
          </div>
        </article>

        <article className="card">
          <h3>IA y Data Science</h3>
          <div className="tags">
            <span>Scikit-learn</span>
            <span>NumPy</span>
            <span>Pandas</span>
          </div>
        </article>

        <article className="card">
          <h3>Bases de datos</h3>
          <div className="tags">
            <span>SQL</span>
            <span>Vectoriales</span>
            <span>Grafos</span>
          </div>
        </article>

        <article className="card">
          <h3>Entornos</h3>
          <div className="tags">
            <span>VS Code</span>
            <span>Jupyter</span>
            <span>Google Colab</span>
            <span>Windows</span>
          </div>
        </article>
      </div>
    </section>
  );
}