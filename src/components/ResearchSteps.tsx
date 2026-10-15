import { useEffect, useState } from "react";
import { IconChevron, Squiggle, StepIcon, type IconKind } from "./ResearchIcons";
import "./ResearchSteps.css";

export interface LeaderboardEntry {
  label: string;
  score: number; // target value, 0..1
}

export interface ResearchStep {
  label: string;
  icon: IconKind;
  showSquiggle?: boolean;
  // When present, render below the label as small pill chips. Used by the
  // RAG-scan to surface the actual prompt phrases that matched each facet.
  chips?: string[];
  // When present, render an animated similarity-score leaderboard below the
  // label. Used by the RAG-scan to visualize cluster ranking.
  leaderboard?: LeaderboardEntry[];
}

interface Props {
  steps: ResearchStep[];
  activeIdx: number;
  // Maximum number of steps to keep visible at once. Older steps scroll out.
  windowSize?: number;
}

export function ResearchSteps({ steps, activeIdx, windowSize = 4 }: Props) {
  const start = Math.max(0, activeIdx - windowSize + 1);
  const visible = steps.slice(start, activeIdx + 1);

  return (
    <ol className="rsteps" aria-live="polite">
      {visible.map((step, i) => {
        const realIdx = start + i;
        const isActive = realIdx === activeIdx;
        return (
          <li
            key={realIdx}
            className={`rsteps__row ${isActive ? "rsteps__row--active" : "rsteps__row--past"}`}
          >
            <span className="rsteps__icon">
              {isActive ? (
                <StepIcon kind={step.icon} active />
              ) : (
                <IconChevron />
              )}
            </span>
            <span className="rsteps__label">{step.label}</span>
            {isActive && step.showSquiggle && (
              <span className="rsteps__squiggle">
                <Squiggle />
              </span>
            )}
            {step.chips && step.chips.length > 0 && (
              <ul className="rsteps__chips" aria-label="matched phrases">
                {step.chips.map((c, ci) => (
                  <li key={ci} className="rsteps__chip">
                    {c}
                  </li>
                ))}
              </ul>
            )}
            {step.leaderboard && step.leaderboard.length > 0 && (
              <ScoreLeaderboard
                entries={step.leaderboard}
                animate={isActive || realIdx < activeIdx}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// Animates each entry's score from 0.5 → its target over ~900ms, staggered
// so the rows don't all converge at once. Highest target gets a ▲ indicator.
function ScoreLeaderboard({
  entries,
  animate,
}: {
  entries: LeaderboardEntry[];
  animate: boolean;
}) {
  const [scores, setScores] = useState<number[]>(
    () => entries.map(() => 0.5)
  );

  useEffect(() => {
    if (!animate) return;
    let cancelled = false;
    const t0 = performance.now();
    const duration = 1400;
    const starts = entries.map(() => 0.5);
    const tick = (now: number) => {
      if (cancelled) return;
      const p = Math.min((now - t0) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setScores(
        entries.map((e, i) => starts[i] + (e.score - starts[i]) * eased)
      );
      if (p < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [animate, entries]);

  const winnerIdx = entries.reduce(
    (best, e, i) => (e.score > entries[best].score ? i : best),
    0
  );

  return (
    <ul className="rsteps__board" aria-label="cluster similarity scores">
      {entries.map((e, i) => {
        const s = scores[i] ?? 0.5;
        return (
          <li key={i} className="rsteps__board-row">
            <span className="rsteps__board-label">{e.label}</span>
            <span className="rsteps__board-bar" aria-hidden="true">
              <span
                className="rsteps__board-bar-fill"
                style={{ width: `${(s * 100).toFixed(0)}%` }}
              />
            </span>
            <span className="rsteps__board-score">{s.toFixed(2)}</span>
            <span className="rsteps__board-win">
              {animate && i === winnerIdx ? "▲" : ""}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
