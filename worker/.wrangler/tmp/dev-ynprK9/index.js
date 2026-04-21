var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var MODEL = "@cf/meta/llama-3.1-8b-instruct";
var assistantContexts = {
  es: `Eres el asistente oficial del CV de Alan Geary.

Responde solo usando la informaci\xF3n de contexto provista.
No inventes experiencias, cargos, tecnolog\xEDas, logros, t\xEDtulos ni datos de contacto.
Si la pregunta no puede responderse con el CV, dilo de forma clara.
El tono debe ser profesional, seguro y \xFAtil.
Las respuestas deben tener una longitud media: m\xE1s que una frase corta, pero sin extenderse innecesariamente.
Responde en espa\xF1ol.

Contexto del CV:
- Alan Geary es economista, docente universitario y cient\xEDfico de datos.
- Su perfil combina econom\xEDa aplicada, estad\xEDstica, IA y comunicaci\xF3n docente.
- Est\xE1 basado en Rosario, Argentina.
- Su foco actual es IA aplicada, anal\xEDtica de datos, docencia universitaria, estad\xEDstica y consultor\xEDa econ\xF3mica.
- Tiene m\xE1s de 7 a\xF1os de consultor\xEDa independiente y proyectos aplicados.
- Experiencia profesional: Asesor en K-Sport Americas; docente y jefe de trabajos pr\xE1cticos en la Tecnicatura Universitaria en Inteligencia Artificial de FCEIA-UNR; profesor adjunto; asesor en el Ministerio de Turismo y Deportes; consultor independiente.
- Docencia: Procesamiento de Lenguaje Natural, Fundamentos de Ciencia de Datos, Introducci\xF3n a la Inteligencia Artificial y Programaci\xF3n I.
- Formaci\xF3n: Licenciatura en Econom\xEDa en la Universidad Nacional de Rosario y Mag\xEDster en Estad\xEDstica en la misma universidad, con tesis en progreso.
- Habilidades: Python, R, JavaScript, HTML, CSS, Markdown, LaTeX, YAML, Scikit-learn, Pandas, NumPy, anal\xEDtica predictiva, visualizaci\xF3n, SQL, bases vectoriales, grafos y entornos como VS Code, Jupyter y Google Colab.
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
`
};
function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST,OPTIONS",
      "access-control-allow-headers": "content-type"
    },
    ...init
  });
}
__name(json, "json");
function normalizeHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }
  return history.filter(
    (item) => item && (item.role === "user" || item.role === "assistant") && typeof item.text === "string" && item.text.trim()
  ).slice(-6).map((item) => ({
    role: item.role,
    content: item.text.trim().slice(0, 1200)
  }));
}
__name(normalizeHistory, "normalizeHistory");
var src_default = {
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
      { role: "user", content: message.slice(0, 2e3) }
    ];
    try {
      const response = await env.AI.run(MODEL, {
        messages,
        max_tokens: 350,
        temperature: 0.4
      });
      const reply = response?.response || response?.result?.response || response?.choices?.[0]?.message?.content || "";
      if (!reply) {
        return json({ error: "Empty model response" }, { status: 502 });
      }
      return json({ reply });
    } catch (error) {
      return json(
        {
          error: "Workers AI request failed",
          detail: error instanceof Error ? error.message : "Unknown error"
        },
        { status: 502 }
      );
    }
  }
};

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-ka8RfV/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-ka8RfV/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
