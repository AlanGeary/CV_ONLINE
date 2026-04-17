const contactItems = [
  {
    title: "Email",
    value: "alan.geary@gmail.com",
    href: "mailto:alan.geary@gmail.com",
    external: false,
  },
  {
    title: "Telefono",
    value: "+54 341 303 9162",
    href: "tel:+543413039162",
    external: false,
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/-alangeary-/",
    href: "https://www.linkedin.com/in/-alangeary-/",
    external: true,
  },
];

export default function Contact() {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">Contacto</span>
        <div className="section-title-row">
          <h2>Canales de contacto</h2>
        </div>
        <p className="section-intro">
          Disponible para oportunidades academicas, consultoria y colaboraciones
          vinculadas a datos e IA.
        </p>
      </header>

      <div className="contact-grid">
        {contactItems.map((item) => (
          <article className="card" key={item.title}>
            <h3>{item.title}</h3>
            <a
              className="contact-link"
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.value}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
