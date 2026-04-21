const MODEL = "@cf/meta/llama-3.1-8b-instruct";
const MAX_MESSAGE_LENGTH = 420;
const MAX_HISTORY_ITEMS = 6;
const MAX_DAILY_QUESTIONS = 4;

const assistantContexts = {
  es: `Eres el asistente oficial del CV de Alan Geary.

Responde solo usando la informacion de contexto provista.
No inventes experiencias, cargos, tecnologias, logros, titulos ni datos de contacto.
Si la pregunta no puede responderse con el CV, dilo de forma clara.
El tono debe ser profesional, seguro y util.
Las respuestas deben tener una longitud media: mas que una frase corta, pero sin extenderse innecesariamente.
Responde en espanol.

Contexto del CV:
- Alan Geary es economista, docente universitario y cientifico de datos.
- Su perfil combina economia aplicada, estadistica, IA y comunicacion docente.
- Esta basado en Rosario, Argentina.
- Su foco actual es IA aplicada, analitica de datos, docencia universitaria, estadistica y consultoria economica.
- Tiene mas de 7 anos de consultoria independiente y proyectos aplicados.
- Experiencia profesional: Asesor en K-Sport Americas; docente y jefe de trabajos practicos en la Tecnicatura Universitaria en Inteligencia Artificial de FCEIA-UNR; profesor adjunto; asesor en el Ministerio de Turismo y Deportes; consultor independiente.
- Docencia: Procesamiento de Lenguaje Natural, Fundamentos de Ciencia de Datos, Introduccion a la Inteligencia Artificial y Programacion I.
- Formacion: Licenciatura en Economia en la Universidad Nacional de Rosario y Magister en Estadistica en la misma universidad, con tesis en progreso.
- Habilidades: Python, R, JavaScript, HTML, CSS, Markdown, LaTeX, YAML, Scikit-learn, Pandas, NumPy, analitica predictiva, visualizacion, SQL, bases vectoriales, grafos y entornos como VS Code, Jupyter y Google Colab.
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
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => ({
      role: item.role,
      content: item.text.trim().slice(0, 700),
    }));
}

function getCurrentDayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getSecondsUntilUtcMidnight() {
  const now = new Date();
  const nextMidnight = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0,
    0,
    5
  );

  return Math.max(60, Math.ceil((nextMidnight - now.getTime()) / 1000));
}

async function enforceDailyQuestionLimit(request, env) {
  if (!env.CHAT_LIMITS) {
    return { ok: true, limited: false, configured: false };
  }

  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("x-forwarded-for") ||
    "unknown";

  const dayKey = getCurrentDayKey();
  const storageKey = `chat-limit:${dayKey}:${ip}`;
  const rawValue = await env.CHAT_LIMITS.get(storageKey);
  const currentCount = Number.parseInt(rawValue ?? "0", 10) || 0;

  if (currentCount >= MAX_DAILY_QUESTIONS) {
    return {
      ok: false,
      limited: true,
      configured: true,
      remaining: 0,
      limit: MAX_DAILY_QUESTIONS,
    };
  }

  const nextCount = currentCount + 1;
  await env.CHAT_LIMITS.put(storageKey, String(nextCount), {
    expirationTtl: getSecondsUntilUtcMidnight(),
  });

  return {
    ok: true,
    limited: false,
    configured: true,
    remaining: Math.max(0, MAX_DAILY_QUESTIONS - nextCount),
    limit: MAX_DAILY_QUESTIONS,
  };
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

    if (message.length > MAX_MESSAGE_LENGTH) {
      return json(
        {
          error: "Message too long",
          maxLength: MAX_MESSAGE_LENGTH,
        },
        { status: 400 }
      );
    }

    const limitCheck = await enforceDailyQuestionLimit(request, env);
    if (!limitCheck.ok) {
      return json(
        {
          error: "Daily question limit reached",
          limit: MAX_DAILY_QUESTIONS,
          reset: "00:00 UTC",
        },
        { status: 429 }
      );
    }

    const messages = [
      { role: "system", content: assistantContexts[language] },
      ...normalizeHistory(body.history),
      { role: "user", content: message },
    ];

    try {
      const response = await env.AI.run(MODEL, {
        messages,
        max_tokens: 320,
        temperature: 0.35,
      });

      const reply =
        response?.response ||
        response?.result?.response ||
        response?.choices?.[0]?.message?.content ||
        "";

      if (!reply) {
        return json({ error: "Empty model response" }, { status: 502 });
      }

      return json({
        reply: reply.trim(),
        limitConfigured: limitCheck.configured,
        remainingToday: limitCheck.remaining,
      });
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
