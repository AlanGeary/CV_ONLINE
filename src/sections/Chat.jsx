import { useMemo, useState } from "react";

const apiBaseUrl = "https://cv-online-chat.alan-geary.workers.dev";
const maxMessageLength = 420;
const minSecondsBetweenMessages = 3;
const requestTimeoutMs = 12000;

function buildMockReply(message, content) {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("perfil") ||
    normalized.includes("resume") ||
    normalized.includes("summary") ||
    normalized.includes("profile")
  ) {
    return content.mockReplies.profile;
  }

  if (
    normalized.includes("ia") ||
    normalized.includes("inteligencia artificial") ||
    normalized.includes("artificial intelligence") ||
    normalized.includes("ai")
  ) {
    return content.mockReplies.ai;
  }

  if (
    normalized.includes("docencia") ||
    normalized.includes("materias") ||
    normalized.includes("teaching") ||
    normalized.includes("courses")
  ) {
    return content.mockReplies.teaching;
  }

  if (
    normalized.includes("formacion") ||
    normalized.includes("educacion") ||
    normalized.includes("education") ||
    normalized.includes("academic")
  ) {
    return content.mockReplies.education;
  }

  if (
    normalized.includes("contacto") ||
    normalized.includes("linkedin") ||
    normalized.includes("email") ||
    normalized.includes("phone")
  ) {
    return content.mockReplies.contact;
  }

  return content.fallback;
}

function getUiCopy(language) {
  if (language === "en") {
    return {
      userLabel: "You",
      assistantLabel: "CV",
      limitLabel: "Recommended limit",
      cooldownLabel: "Cooldown",
      contextLabel: "Source",
      contextValue: "CV only",
      localDemoWarning: "Worker unavailable. Reply generated with the local demo fallback.",
      maxLengthWarning: `Keep the message under ${maxMessageLength} characters.`,
      cooldownWarning: `Wait ${minSecondsBetweenMessages} seconds before sending another message.`,
      dailyLimitWarning: "This visitor has already used the 4 daily questions available for today.",
      remainingLabel: "Left today",
      notConfiguredLabel: "No daily cap",
    };
  }

  return {
    userLabel: "Tu",
    assistantLabel: "CV",
    limitLabel: "Limite sugerido",
    cooldownLabel: "Pausa",
    contextLabel: "Fuente",
    contextValue: "Solo CV",
    localDemoWarning: "El Worker no respondio y se uso el modo demo local.",
    maxLengthWarning: `Mantene el mensaje debajo de ${maxMessageLength} caracteres.`,
    cooldownWarning: `Espera ${minSecondsBetweenMessages} segundos antes de enviar otro mensaje.`,
    dailyLimitWarning: "Este visitante ya uso las 4 preguntas disponibles por hoy.",
    remainingLabel: "Restan hoy",
    notConfiguredLabel: "Sin tope diario",
  };
}

export default function Chat({ content, language }) {
  const uiCopy = getUiCopy(language);
  const assistantLabel = content.labels?.assistant ?? uiCopy.assistantLabel;
  const userLabel = content.labels?.user ?? uiCopy.userLabel;
  const initialMessages = useMemo(
    () => [{ role: "assistant", text: content.initialMessage }],
    [content.initialMessage]
  );

  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastSentAt, setLastSentAt] = useState(0);
  const [remainingToday, setRemainingToday] = useState(null);
  const [dailyLimitEnabled, setDailyLimitEnabled] = useState(false);

  async function submitMessage(rawMessage) {
    const message = rawMessage.trim();
    const now = Date.now();

    if (!message || isLoading) {
      return;
    }

    if (message.length > maxMessageLength) {
      setError(uiCopy.maxLengthWarning);
      return;
    }

    if (now - lastSentAt < minSecondsBetweenMessages * 1000) {
      setError(uiCopy.cooldownWarning);
      return;
    }

    const nextMessages = [...messages, { role: "user", text: message }];
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMs);

    setMessages(nextMessages);
    setDraft("");
    setIsLoading(true);
    setError("");
    setLastSentAt(now);

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          language,
          message,
          history: nextMessages.slice(-6),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 429) {
          setDailyLimitEnabled(true);
          setRemainingToday(0);
          setError(uiCopy.dailyLimitWarning);
          return;
        }
        throw new Error("chat request failed");
      }

      const data = await response.json();
      if (!data.reply) {
        throw new Error("empty reply");
      }

      if (typeof data.remainingToday === "number") {
        setRemainingToday(data.remainingToday);
        setDailyLimitEnabled(Boolean(data.limitConfigured));
      }

      setMessages((current) => [...current, { role: "assistant", text: data.reply }]);
    } catch {
      const reply = buildMockReply(message, content);
      setMessages((current) => [...current, { role: "assistant", text: reply }]);
      setError(uiCopy.localDemoWarning);
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitMessage(draft);
  }

  return (
    <section className="content-section">
      <header className="section-heading">
        <span className="section-kicker">{content.kicker}</span>
        <div className="section-title-row">
          <h2>{content.title}</h2>
          <span className="section-badge">{content.badge}</span>
        </div>
        <p className="section-intro">{content.intro}</p>
      </header>

      <div className="chat-layout">
        <aside className="card chat-aside">
          <div className="chat-aside-header">
            <h3>{content.emptyTitle}</h3>
            <p>{content.helper}</p>
          </div>

          <div className="chat-status-grid">
            <article className="chat-status-card">
              <span className="chat-status-label">{uiCopy.limitLabel}</span>
              <strong>{maxMessageLength}</strong>
            </article>

            <article className="chat-status-card">
              <span className="chat-status-label">{uiCopy.cooldownLabel}</span>
              <strong>{minSecondsBetweenMessages}s</strong>
            </article>

            <article className="chat-status-card">
              <span className="chat-status-label">{uiCopy.contextLabel}</span>
              <strong>{uiCopy.contextValue}</strong>
            </article>

            <article className="chat-status-card">
              <span className="chat-status-label">{uiCopy.remainingLabel}</span>
              <strong>
                {dailyLimitEnabled
                  ? remainingToday ?? 4
                  : uiCopy.notConfiguredLabel}
              </strong>
            </article>
          </div>

          <div className="chat-suggestions">
            {content.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="suggestion-chip"
                onClick={() => submitMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </aside>

        <div className="card chat-card">
          <div className="chat-card-top">
            <div>
              <span className="chat-live-dot" />
              <span className="chat-live-text">{assistantLabel}</span>
            </div>
            <span className="chat-history-count">{messages.length - 1} msgs</span>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={
                  message.role === "assistant" ? "chat-bubble assistant" : "chat-bubble user"
                }
              >
                <span className="chat-role">
                  {message.role === "assistant" ? assistantLabel : userLabel}
                </span>
                <p>{message.text}</p>
              </article>
            ))}

            {isLoading ? (
              <article className="chat-bubble assistant loading">
                <span className="chat-role">{assistantLabel}</span>
                <p>{content.thinkingLabel}</p>
              </article>
            ) : null}
          </div>

          {error ? <p className="chat-note">{error}</p> : null}

          <form className="chat-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="chat-input">
              {content.placeholder}
            </label>
            <textarea
              id="chat-input"
              className="chat-input"
              rows="4"
              maxLength={maxMessageLength}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={content.placeholder}
            />
            <div className="chat-actions">
              <span className="chat-counter">
                {draft.length}/{maxMessageLength}
              </span>
              <button className="chat-submit" type="submit" disabled={isLoading || !draft.trim()}>
                {isLoading ? content.thinkingLabel : content.sendLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
