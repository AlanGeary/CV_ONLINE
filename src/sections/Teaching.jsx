const teachingItems = [
  {
    period: "2023 agosto - act.",
    title: "Procesamiento de Lenguaje Natural",
    description: "Tecnicatura Universitaria de IA, FCEIA - UNR.",
  },
  {
    period: "2023 marzo - act.",
    title: "Fundamentos de Ciencia de Datos",
    description: "Tecnicatura Universitaria de IA, FCEIA - UNR.",
  },
  {
    period: "2022 agosto - act.",
    title: "Introducción a la Inteligencia Artificial",
    description: "Tecnicatura Universitaria de IA, FCEIA - UNR.",
  },
  {
    period: "2022 marzo - 2023 julio",
    title: "Programación I (Python)",
    description: "Tecnicatura Universitaria de IA, FCEIA - UNR.",
  },
];

export default function Teaching() {
  return (
    <section>
      <span className="section-kicker">Actividad académica</span>
      <h2>Docencia</h2>

      <div className="timeline">
        {teachingItems.map((item, index) => (
          <article className="timeline-item" key={index}>
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