function Courses({ content }) {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">{content.kicker}</span>
        <div className="section-title-row">
          <h2>{content.title}</h2>
        </div>
        <p className="section-intro">{content.intro}</p>
      </header>

      <div className="card">
        <ul className="list">
          {content.items.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Courses;
