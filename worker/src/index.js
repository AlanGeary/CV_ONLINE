const MODEL = "@cf/meta/llama-3.1-8b-instruct";

const assistantContexts = {
  es: `Eres el asistente oficial del CV de Alan Geary.

Responde solo usando la información de contexto provista.
No inventes experiencias, cargos, tecnologías, logros, títulos ni datos de contacto.
Si la pregunta no puede responderse con el CV, dilo de forma clara.
El tono debe ser profesional, seguro y útil.
Las respuestas deben tener una longitud media: más que una frase corta, pero sin extenderse innecesariamente.
Responde en español.

Contexto del CV:
- Alan Geary es economista, docente universitario y científico de datos.
- Su perfil combina economía aplicada, estadística, IA y comunicación docente.
- Está basado en Rosario, Argentina.
- Su foco actual es IA aplicada, analítica de datos, docencia universitaria, estadística y consultoría económica.
- Tiene más de 7 años de consultoría independiente y proyectos aplicados.
- Experiencia profesional: Asesor en K-Sport Americas; docente y jefe de trabajos prácticos en la Tecnicatura Universitaria en Inteligencia Artificial de FCEIA-UNR; profesor adjunto; asesor en el Ministerio de Turismo y Deportes; consultor independiente.
- Docencia: Procesamiento de Lenguaje Natural, Fundamentos de Ciencia de Datos, Introducción a la Inteligencia Artificial y Programación I.
- Formación: Licenciatura en Economía en la Universidad Nacional de Rosario y Magíster en Estadística en la misma universidad, con tesis en progreso.
- Habilidades: Python, R, JavaScript, HTML, CSS, Markdown, LaTeX, YAML, Scikit-learn, Pandas, NumPy, analítica predictiva, visualización, SQL, bases vectoriales, grafos y entornos como VS Code, Jupyter y Google Colab.
- Contacto: alan.geary@gmail.com, +54 341 303 9162, linkedin.com/in/-alangeary-/.
`,
  en: `You are the official assistant for Alan Geary's CV.

Answer only using the provided CV context.
Do not invent experience, roles, technologies, achievements, degrees or contact details.
If the question cannot be answered from the CV, say so clearly.
The tone should be professional, confident and helpful.
Responses should be medium length: more than a short sentence, but without unnecessary detail.
Respond in English.

CV context:
- Alan Geary is an economist, university lecturer and data scientist.
- His profile combines applied economics, statistics, AI and teaching communication.
- He is based in Rosario, Argentina.
- His current focus is applied AI, data analytics, university teaching, statistics and economic consulting.
- He has more than 7 years of independent consulting and applied projects.
- Professional experience: Advisor at K-Sport Americas; lecturer and head teaching assistant in the Artificial Intelligence degree at FCEIA-UNR; adjunct professor; advisor at the Ministry of Tourism and Sports; independent consultant.
- Teaching: Natural Language Processing, Foundations of Data Science, Introduction to Artificial Intelligence and Programming I.
- Education: BA in Economics from the National University of Rosario and a Master's Degree in Statistics from the same university, with thesis in progress.
- Skills: Python, R, JavaScript, HTML, CSS, Markdown, LaTeX, YAML, Scikit-learn, Pandas, NumPy, predictive analytics, visualization, SQL, vector databases, graphs, and environments such as VS Code, Jupyter and Google Colab.
- Contact: alan.geary@gmail.com, +54 341 303 9162, linkedin.com/in/-alangeary-/.
`,
};

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST,OPTIONS",
      "access-control-allow-headers": "content-type",
    },
    ...init,
  });
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.text === "string" &&
        item.text.trim()
    )
    .slice(-6)
    .map((item) => ({
      role: item.role,
      content: item.text.trim().slice(0, 1200),
    }));
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return json({ ok: true });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/api/chat") {
      return json({ error: "Not found" }, { status: 404 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const language = body.language === "en" ? "en" : "es";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return json({ error: "Message is required" }, { status: 400 });
    }

    const messages = [
      { role: "system", content: assistantContexts[language] },
      ...normalizeHistory(body.history),
      { role: "user", content: message.slice(0, 2000) },
    ];

    try {
      const response = await env.AI.run(MODEL, {
        messages,
        max_tokens: 350,
        temperature: 0.4,
      });

      const reply =
        response?.response ||
        response?.result?.response ||
        response?.choices?.[0]?.message?.content ||
        "";

      if (!reply) {
        return json({ error: "Empty model response" }, { status: 502 });
      }

      return json({ reply });
    } catch (error) {
      return json(
        {
          error: "Workers AI request failed",
          detail: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 502 }
      );
    }
  },
};
