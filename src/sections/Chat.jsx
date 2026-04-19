import { useMemo, useState } from "react";

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
    normalized.includes("formación") ||
    normalized.includes("educación") ||
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

export default function Chat({ content, language }) {
  const assistantLabel = content.labels?.assistant ?? "CV";
  const userLabel = content.labels?.user ?? "You";
  const initialMessages = useMemo(
    () => [{ role: "assistant", text: content.initialMessage }],
    [content.initialMessage]
  );

  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitMessage(rawMessage) {
    const message = rawMessage.trim();
    if (!message || isLoading) {
      return;
    }

    const nextMessages = [...messages, { role: "user", text: message }];
    setMessages(nextMessages);
    setDraft("");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          language,
          message,
          history: nextMessages.slice(-6),
        }),
      });

      if (!response.ok) {
        throw new Error("chat request failed");
      }

      const data = await response.json();
      if (!data.reply) {
        throw new Error("empty reply");
      }

      setMessages((current) => [...current, { role: "assistant", text: data.reply }]);
    } catch {
      const reply = buildMockReply(message, content);
      setMessages((current) => [...current, { role: "assistant", text: reply }]);
      setError(content.fallbackNotice);
    } finally {
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
          <h3>{content.emptyTitle}</h3>
          <p>{content.helper}</p>

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
          <div className="chat-messages">
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={
                  message.role === "assistant" ? "chat-bubble assistant" : "chat-bubble user"
                }
              >
                <span className="chat-role">{message.role === "assistant" ? assistantLabel : userLabel}</span>
                <p>{message.text}</p>
              </article>
            ))}

            {isLoading ? (
              <article className="chat-bubble assistant">
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
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={content.placeholder}
            />
            <div className="chat-actions">
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
