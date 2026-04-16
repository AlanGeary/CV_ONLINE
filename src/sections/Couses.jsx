const courses = [
  "2022 - Desarrollo de Shiny Apps · Cs. Económicas U.N.R.",
  "2022 - 6.00.1x: Introduction to Computer Science and Programming Using Python · MITx",
  "2022 - Beca IALAB UBA: Módulo de Gobernanza de Datos",
  "2021 - Supervised Learning in R: Classification · DataCamp",
  "2021 - Supervised Learning in R: Regression · DataCamp",
  "2021 - Introduction to SQL Server · DataCamp",
  "2021 - Introduction to Relational Database in SQL · DataCamp",
  "2021 - Micromaster: Data, Economics, and Development Policy (en progreso 3/5) · MIT",
  "2021 - Introducción a la Estadística Bayesiana · Cs. Económicas U.N.R.",
  "2020 - Lenguaje R, nivel Avanzado · Cs. Económicas U.N.R.",
  "2019 - Lenguaje R, nivel Inicial · Cs. Económicas U.N.R.",
  "2018 - Curso Maestro de Python 3 · Udemy",
  "2018 - Python Programming Skills · DataCamp",
  "2018 - Data Manipulation Skills with Python · DataCamp",
  "2018 - Visualization Skills with Seaborn and Matplotlib · DataCamp",
  "2018 - Python Data Science Toolbox 1 y 2 · DataCamp",
  "2007 - Formador Certificado en Costos y Presupuestos Gráficos · Fundación Gutenberg",
];

function Courses() {
  return (
    <section>
      <span className="section-kicker">Actualización profesional</span>
      <h2>Cursos y especializaciones</h2>

      <div className="card">
        <ul className="list">
          {courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Courses;