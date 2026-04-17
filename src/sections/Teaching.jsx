const teachingItems = [
  {
    period: "2023 - actual",
    title: "Procesamiento de Lenguaje Natural",
    description: "Tecnicatura Universitaria de IA, FCEIA - UNR.",
  },
  {
    period: "2023 - actual",
    title: "Fundamentos de Ciencia de Datos",
    description: "Tecnicatura Universitaria de IA, FCEIA - UNR.",
  },
  {
    period: "2022 - actual",
    title: "Introduccion a la Inteligencia Artificial",
    description: "Tecnicatura Universitaria de IA, FCEIA - UNR.",
  },
  {
    period: "2022 - 2023",
    title: "Programacion I (Python)",
    description: "Tecnicatura Universitaria de IA, FCEIA - UNR.",
  },
];

export default function Teaching() {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">Actividad academica</span>
        <div className="section-title-row">
          <h2>Docencia</h2>
        </div>
        <p className="section-intro">
          Experiencia sostenida en formacion universitaria dentro del campo de la
          inteligencia artificial y la ciencia de datos.
        </p>
      </header>

      <div className="timeline">
        {teachingItems.map((item) => (
          <article className="timeline-item" key={`${item.period}-${item.title}`}>
            <div className="timeline-period">{item.period}</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
