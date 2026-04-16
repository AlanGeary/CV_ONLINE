export default function Education() {
  return (
    <section>
      <span className="section-kicker">Formación</span>
      <h2>Educación</h2>

      <div className="grid">
        <article className="card">
          <h3>Licenciatura en Economía</h3>
          <p>Universidad Nacional de Rosario, Argentina</p>
          <p className="muted">Finalización: 2019</p>
        </article>

        <article className="card">
          <h3>Magister en Estadística</h3>
          <p>Universidad Nacional de Rosario, Argentina</p>
          <p className="muted">Finalización: 2021</p>
          <p className="note">Tesis en progreso</p>
        </article>
      </div>
    </section>
  );
}