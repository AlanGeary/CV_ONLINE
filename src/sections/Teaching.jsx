export default function Teaching({ content }) {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">{content.kicker}</span>
        <div className="section-title-row">
          <h2>{content.title}</h2>
        </div>
        <p className="section-intro">{content.intro}</p>
      </header>

      <div className="timeline">
        {content.items.map((item) => (
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
