import type { Tier } from "../types";
import "./TimeToDecision.css";

interface Props {
  tier: Tier;
}

// Translates a tier's "ltime" string ("same day", "1 day", "2 days", etc.)
// into a number of business days for date math. Conservative: rounds up.
function listenDaysFromTier(tier: Tier): number {
  const t = tier.ltime.toLowerCase();
  if (t.includes("same day") || t.includes("hours")) return 1;
  const m = t.match(/(\d+)\s*day/);
  if (m) return Number(m[1]);
  return 2; // safe default
}

function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

function formatShortDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function TimeToDecision({ tier }: Props) {
  const today = new Date();
  const listenFinish = addDays(today, listenDaysFromTier(tier));
  const tradFinish = addDays(today, tier.weeks * 7);
  const daysEarlier = Math.max(
    1,
    Math.round((tradFinish.getTime() - listenFinish.getTime()) / 86_400_000)
  );

  return (
    <section className="ttd fu" aria-label="Time to decision">
      <span className="section-label">Analysis ready</span>
      <span className="ttd__date">{formatShortDate(listenFinish)}</span>
      <span className="ttd__pill">{daysEarlier} days earlier</span>
      <span className="ttd__compare">
        vs <s>{formatShortDate(tradFinish)}</s> traditional
      </span>
    </section>
  );
}
