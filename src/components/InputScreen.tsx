import { useEffect, useRef, useState } from "react";
import { TIERS, tierFor, tierIdxFor, tierMin, tierMidpoint } from "../data/tiers";
import { PLACEHOLDER_PROMPTS } from "../data/companies";
import { fmtMoney } from "../lib/format";
import { getSpeechRecognition, joinTranscript } from "../lib/voice";
import "./InputScreen.css";

interface Props {
  initialPrompt: string;
  initialN: number;
  onSubmit: (prompt: string, n: number) => void;
}

export function InputScreen({ initialPrompt, initialN, onSubmit }: Props) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [n, setN] = useState(initialN);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const tier = tierFor(n);
  const selectedIdx = tierIdxFor(n);
  const curMin = tierMin(selectedIdx);
  const curMax = TIERS[selectedIdx].max;

  function selectTier(i: number) {
    setN(tierMidpoint(i));
  }
  function decrement() {
    if (n > curMin) setN(n - 1);
  }
  function increment() {
    if (n < curMax) setN(n + 1);
  }

  // Auto-grow textarea
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [prompt]);

  // Cycle placeholder when empty
  useEffect(() => {
    if (prompt.length > 0) return;
    const id = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDER_PROMPTS.length);
    }, 3500);
    return () => clearInterval(id);
  }, [prompt]);

  // Detect speech recognition availability once on mount
  useEffect(() => {
    setVoiceSupported(getSpeechRecognition() !== null);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    onSubmit(trimmed, n);
  }

  function trySamplePrompt() {
    const i = Math.floor(Math.random() * PLACEHOLDER_PROMPTS.length);
    const sample = PLACEHOLDER_PROMPTS[i];
    setPrompt(sample);
    onSubmit(sample, n);
  }

  function toggleVoice() {
    if (listening) return; // stops via onend
    const rec = getSpeechRecognition();
    if (!rec) return;
    setListening(true);
    rec.onresult = (ev) => {
      const text = joinTranscript(ev);
      setPrompt(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    try {
      rec.start();
    } catch {
      setListening(false);
    }
  }

  return (
    <section className="input-screen fu">
      <header className="input-screen__hero">
        <h1 className="input-screen__title">
          What's the research question on your desk this week?
        </h1>
        <p className="input-screen__sub">
          We'll show you what it costs the traditional way — then what it looks like with Listen.
        </p>
      </header>

      <div className="input-screen__textarea-wrap">
        <textarea
          ref={taRef}
          className="input-screen__textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDER_PROMPTS[placeholderIdx]}
          rows={2}
        />
        <button
          type="button"
          className={`input-screen__mic ${listening ? "is-listening" : ""}`}
          onClick={toggleVoice}
          disabled={!voiceSupported}
          aria-label={voiceSupported ? "Speak your question" : "Voice input unsupported in this browser"}
          title={voiceSupported ? "Speak your question" : "Voice input unsupported in this browser"}
        >
          <MicIcon />
          {listening && <span className="input-screen__mic-pulse" aria-hidden="true" />}
        </button>
      </div>

      <div className="input-screen__sample-row">
        <button
          type="button"
          className="input-screen__sample"
          onClick={trySamplePrompt}
          title="Fill with a sample prompt and run"
        >
          Try a sample prompt
        </button>
      </div>

      <div className="participant-card">
        <span className="section-label">Study type</span>
        <div className="tier-grid" role="radiogroup" aria-label="Study type">
          {TIERS.map((t, i) => {
            const min = tierMin(i);
            const isSelected = selectedIdx === i;
            return (
              <button
                key={t.label}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`tier-btn ${isSelected ? "is-selected" : ""}`}
                onClick={() => selectTier(i)}
              >
                <span className="tier-btn__name">{t.label}</span>
                <span className="tier-btn__range">
                  {min}–{t.max} participants
                </span>
              </button>
            );
          })}
        </div>

        <div className="tier-finetune">
          <div className="tier-finetune__stepper" role="group" aria-label="Adjust participant count">
            <button
              type="button"
              className="tier-finetune__btn"
              onClick={decrement}
              disabled={n <= curMin}
              aria-label="Decrease participants"
            >
              −
            </button>
            <span className="tier-finetune__count">
              <strong>{n}</strong>
              <span>participants</span>
            </span>
            <button
              type="button"
              className="tier-finetune__btn"
              onClick={increment}
              disabled={n >= curMax}
              aria-label="Increase participants"
            >
              +
            </button>
          </div>

          <p className="tier-preview">
            <span>traditionally</span>{" "}
            <span className="tier-preview__bad">
              ~{tier.weeks} weeks / {fmtMoney(tier.total)}
            </span>
            <span className="tier-preview__sep">·</span>
            <span>with Listen</span>{" "}
            <span className="tier-preview__good">{tier.ltime}</span>
          </p>
        </div>
      </div>

      <div className="input-screen__actions">
        <span className="kbd-hint">
          <span className="kbd">⌘</span> <span className="kbd">↵</span> to calculate
        </span>

        <button
          type="button"
          className="btn btn--primary"
          onClick={submit}
          disabled={prompt.trim().length === 0}
        >
          Try with Listen →
        </button>
      </div>

      {listening && (
        <p className="input-screen__listening-hint" role="status">listening…</p>
      )}
    </section>
  );
}

function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="5" y="1.5" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 6.5C2.5 8.98528 4.51472 11 7 11C9.48528 11 11.5 8.98528 11.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="7" y1="11" x2="7" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
