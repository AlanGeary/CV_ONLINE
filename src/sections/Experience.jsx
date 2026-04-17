const jobs = [
  {
    period: "2024 - actual",
    title: "Asesor en K-Sport Americas",
    description:
      "Trabajo en estadisticas, gamificacion y economias digitales para iniciativas vinculadas al ecosistema deportivo.",
  },
  {
    period: "2022 - actual",
    title: "Docente y jefe de trabajos practicos",
    description:
      "Tecnicatura Universitaria en Inteligencia Artificial, FCEIA - UNR, con dedicacion centrada en acompanamiento, evaluacion y desarrollo de practicas.",
  },
  {
    period: "2021 - actual",
    title: "Profesor adjunto",
    description:
      "Participacion academica en asignaturas del campo de datos e inteligencia artificial dentro de la UNR.",
  },
  {
    period: "2022 - 2024",
    title: "Asesor I en el Ministerio de Turismo y Deportes",
    description:
      "Analisis economico y soporte tecnico para proyectos del sector publico nacional.",
  },
  {
    period: "2017 - actual",
    title: "Consultor independiente",
    description:
      "Asesoria economica, informes de coyuntura, evaluacion de proyectos, analisis estadistico, fintech y criptoactivos.",
  },
];

export default function Experience() {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">Trayectoria</span>
        <div className="section-title-row">
          <h2>Experiencia profesional</h2>
        </div>
        <p className="section-intro">
          Recorrido combinado entre gestion publica, consultoria, analitica y
          trabajo academico.
        </p>
      </header>

      <div className="timeline">
        {jobs.map((job) => (
          <article className="timeline-item" key={`${job.period}-${job.title}`}>
            <div className="timeline-period">{job.period}</div>
            <div>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
