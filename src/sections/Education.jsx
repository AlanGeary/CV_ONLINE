export default function Education({ content }) {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">{content.kicker}</span>
        <div className="section-title-row">
          <h2>{content.title}</h2>
        </div>
        <p className="section-intro">{content.intro}</p>
      </header>

      <div className="grid">
        {content.items.map((item) => (
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
