const jobs = [
  {
    period: "2024 mar - act.",
    title: "Asesor en K-Sport Américas",
    description: "Estadísticas, gamificación y economías digitales.",
  },
  {
    period: "2022 ago - act.",
    title: "Docente - Jefe de Trabajos Prácticos",
    description:
      "Tecnicatura Universitaria de Inteligencia Artificial, FCEIA - UNR. Dedicación semi exclusiva.",
  },
  {
    period: "2021 mar - act.",
    title: "Docente - Profesor Adjunto",
    description:
      "Tecnicatura Universitaria de Inteligencia Artificial, FCEIA - UNR. Dedicación simple.",
  },
  {
    period: "2022 mar - 2024 abr.",
    title: "Asesor I (Economista)",
    description: "Ministerio de Turismo y Deportes de la Nación.",
  },
  {
    period: "2017 - act.",
    title: "Consultor Independiente",
    description:
      "Asesoría económica, análisis de coyuntura, informes macroeconómicos y sectoriales, evaluación de proyectos, análisis estadístico, fintech y criptoactivos.",
  },
];

export default function Experience() {
  return (
    <section>
      <span className="section-kicker">Trayectoria</span>
      <h2>Experiencia</h2>

      <div className="timeline">
        {jobs.map((job, index) => (
          <article className="timeline-item" key={index}>
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