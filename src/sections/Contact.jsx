export default function Contact({ content }) {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">{content.kicker}</span>
        <div className="section-title-row">
          <h2>{content.title}</h2>
        </div>
        <p className="section-intro">{content.intro}</p>
      </header>

      <div className="contact-grid">
        {content.items.map((item) => (
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
