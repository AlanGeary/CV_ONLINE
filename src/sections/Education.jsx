const educationItems = [
  {
    title: "Licenciatura en Economia",
    institution: "Universidad Nacional de Rosario, Argentina",
    detail: "Finalizacion: 2019",
  },
  {
    title: "Magister en Estadistica",
    institution: "Universidad Nacional de Rosario, Argentina",
    detail: "Finalizacion academica: 2021",
    note: "Tesis en progreso",
  },
];

export default function Education() {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">Formacion</span>
        <div className="section-title-row">
          <h2>Educacion</h2>
        </div>
        <p className="section-intro">
          Base economica solida complementada con profundizacion en estadistica y
          herramientas cuantitativas.
        </p>
      </header>

      <div className="grid">
        {educationItems.map((item) => (
          <article className="card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.institution}</p>
            <p className="muted">{item.detail}</p>
            {item.note ? <p className="note">{item.note}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
