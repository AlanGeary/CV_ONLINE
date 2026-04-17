const highlights = [
  "Formacion en economia y posgrado en estadistica aplicada con tesis en curso.",
  "Experiencia en sector publico, consultoria privada, analitica y proyectos digitales.",
  "Trayectoria docente en inteligencia artificial, ciencia de datos y programacion.",
];

const metrics = [
  { value: "+7", caption: "anos de consultoria independiente y proyectos aplicados" },
  { value: "4", caption: "materias universitarias vinculadas a IA y datos" },
  { value: "2", caption: "perfiles integrados: analisis economico y ciencia de datos" },
];

function About() {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">Perfil profesional</span>
        <div className="section-title-row">
          <h2>Economia, datos e inteligencia artificial con mirada docente</h2>
        </div>
        <p className="section-intro">
          Un perfil orientado a convertir informacion compleja en analisis utiles,
          decisiones mejor fundamentadas y experiencias de aprendizaje claras.
        </p>
      </header>

      <div className="hero-card">
        <p className="lead">
          Profesional con base en economia y especializacion en estadistica
          aplicada, enfocado en ciencia de datos, inteligencia artificial y
          consultoria para organizaciones publicas, privadas y academicas.
        </p>

        <div className="split-copy">
          <p>
            Combina herramientas cuantitativas, visualizacion y pensamiento
            estrategico para abordar problemas reales de negocio, investigacion y
            politica publica.
          </p>
          <p>
            Tambien aporta una fuerte capacidad pedagogica para explicar conceptos
            tecnicos, coordinar equipos y acompanar procesos de formacion.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        {metrics.map((item) => (
          <article className="card" key={item.caption}>
            <div className="metric">{item.value}</div>
            <p className="metric-caption">{item.caption}</p>
          </article>
        ))}
      </div>

      <div className="grid two">
        <article className="card">
          <h3>Foco actual</h3>
          <p>
            IA aplicada, analitica de datos, docencia universitaria, estadistica
            y consultoria economica.
          </p>
        </article>

        <article className="card">
          <h3>Aportes clave</h3>
          <ul className="highlight-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default About;
