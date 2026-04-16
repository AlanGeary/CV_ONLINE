export default function Contact() {
  return (
    <section>
      <span className="section-kicker">Contacto</span>
      <h2>Información</h2>

      <div className="grid">
        <article className="card">
          <h3>Email</h3>
          <p>
            <a href="mailto:alan.geary@gmail.com">alan.geary@gmail.com</a>
          </p>
        </article>

        <article className="card">
          <h3>Teléfono</h3>
          <p>
            <a href="tel:+543413039162">341-303-9162</a>
          </p>
        </article>

        <article className="card">
          <h3>LinkedIn</h3>
          <p>
            <a
              href="https://www.linkedin.com/in/-alangeary-/"
              target="_blank"
              rel="noreferrer"
            >
              Ver perfil
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}