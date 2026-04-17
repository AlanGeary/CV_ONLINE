function About({ content }) {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">{content.kicker}</span>
        <div className="section-title-row">
          <h2>{content.title}</h2>
        </div>
        <p className="section-intro">{content.intro}</p>
      </header>

      <div className="hero-card">
        <p className="lead">{content.lead}</p>

        <div className="split-copy">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        {content.metrics.map((item) => (
          <article className="card" key={item.caption}>
            <div className="metric">{item.value}</div>
            <p className="metric-caption">{item.caption}</p>
          </article>
        ))}
      </div>

      <div className="grid two">
        <article className="card">
          <h3>{content.focusTitle}</h3>
          <p>{content.focusText}</p>
        </article>

        <article className="card">
          <h3>{content.highlightsTitle}</h3>
          <ul className="highlight-list">
            {content.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default About;
