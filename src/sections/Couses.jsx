const courses = [
  "2022 - Desarrollo de Shiny Apps · Ciencias Economicas UNR",
  "2022 - Introduction to Computer Science and Programming Using Python · MITx",
  "2022 - Beca IALAB UBA · Modulo de gobernanza de datos",
  "2021 - Supervised Learning in R: Classification · DataCamp",
  "2021 - Supervised Learning in R: Regression · DataCamp",
  "2021 - Introduction to SQL Server · DataCamp",
  "2021 - Introduction to Relational Databases in SQL · DataCamp",
  "2021 - MicroMasters Data, Economics and Development Policy · MIT",
  "2021 - Introduccion a la estadistica bayesiana · Ciencias Economicas UNR",
  "2020 - Lenguaje R nivel avanzado · Ciencias Economicas UNR",
  "2019 - Lenguaje R nivel inicial · Ciencias Economicas UNR",
  "2018 - Curso Maestro de Python 3 · Udemy",
  "2018 - Python Programming Skills · DataCamp",
  "2018 - Data Manipulation Skills with Python · DataCamp",
  "2018 - Visualization Skills with Seaborn and Matplotlib · DataCamp",
  "2018 - Python Data Science Toolbox 1 y 2 · DataCamp",
  "2007 - Formador certificado en costos y presupuestos graficos · Fundacion Gutenberg",
];

function Courses() {
  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">Actualizacion profesional</span>
        <div className="section-title-row">
          <h2>Cursos y especializaciones</h2>
        </div>
        <p className="section-intro">
          Formacion complementaria constante en programacion, bases de datos,
          analitica y herramientas para ciencia de datos.
        </p>
      </header>

      <div className="card">
        <ul className="list">
          {courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Courses;
