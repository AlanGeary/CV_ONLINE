function About() {
  return (
    <section>
      <span className="section-kicker">Perfil profesional</span>
      <h2>Alan Geary</h2>

      <div className="hero-card">
        <p>
          Profesional con formación de grado en economía y posgrado en
          estadística aplicada, con tesis en curso. Docente universitario con
          perfil de científico de datos, fundamentos en modelos estadísticos y
          herramientas informáticas de cómputo y visualización.
        </p>
        <p>
          Experiencia en consultoría para el sector público y proyectos
          privados, además de trayectoria laboral empresarial en logística
          industrial y rol comercial para el sector gráfico, tanto en mercado
          local como nacional.
        </p>
        <p>
          Muy buena capacidad pedagógica de comunicación y experiencia con
          personal a cargo.
        </p>
      </div>

      <div className="grid two">
        <div className="card">
          <h3>Rol</h3>
          <p>Economista / Científico de datos</p>
        </div>

        <div className="card">
          <h3>Foco actual</h3>
          <p>
            Inteligencia artificial, ciencia de datos, docencia universitaria,
            estadística aplicada y consultoría.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;