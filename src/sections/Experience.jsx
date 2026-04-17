export default function Experience({ content }) {
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
        {content.items.map((job) => (
          <article className="timeline-item" key={`${job.period}-${job.title}`}>
            <div className="timeline-period">{job.period}</div>
            <div>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
