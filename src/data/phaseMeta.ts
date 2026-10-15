// Per-phase metadata for the traditional research timeline. Powers the
// hover-detail card on TraditionalScreen — explains *why* each phase takes
// the time it does. No cost framing here; time-driver content only.

export interface TraditionalPhaseMeta {
  // Returns a human-readable duration string for the phase, given the
  // tier's total weeks and the phase's fractional duration of that timeline.
  duration: (totalWeeks: number, frac: number) => string;
  why: string;
  data: string;
}

function formatWeeks(totalWeeks: number, frac: number): string {
  const w = totalWeeks * frac;
  if (w < 1) {
    const days = Math.max(1, Math.round(w * 5));
    return `~${days} business day${days === 1 ? "" : "s"}`;
  }
  if (w < 1.5) return "~1 week";
  return `~${Math.round(w * 2) / 2} weeks`;
}

export const TRADITIONAL_META: Record<string, TraditionalPhaseMeta> = {
  "Screener & guide": {
    duration: (w, f) => formatWeeks(w, f),
    why: "Drafting the screener, building the moderator guide, and aligning stakeholders on what you're trying to learn.",
    data: "Greenbook GRIT benchmarks: 5–10 business days for guide development, longer with multiple stakeholder reviewers.",
  },
  "Recruit participants": {
    duration: (w, f) => formatWeeks(w, f),
    why: "Reaching out to panels, screening candidates, and confirming slots. Niche segments and senior decision-makers compound the timeline fast.",
    data: "Industry recruit ratios of 3–6× target N; panel turnaround 7–14 days for general consumer, 2–4 weeks for B2B.",
  },
  "Schedule interviews": {
    duration: (w, f) => formatWeeks(w, f),
    why: "Coordinating calendars across moderators and 20+ participants with timezone conflicts, reschedules, and no-shows. The buffer that 'never happens' always happens.",
    data: "Even with self-serve scheduling tools, 5–7 net days of coordination is standard before sessions begin.",
  },
  "In-depth interviews": {
    duration: (w, f) => formatWeeks(w, f),
    why: "Each IDI runs 60–90 minutes plus prep and notes. Moderators max out at 4–6 sessions per week before quality drops, which caps how fast you can field a study.",
    data: "Industry standard moderator capacity: 4–6 IDIs / week. Participant incentives run $100–300 per session.",
  },
  Transcription: {
    duration: (w, f) => formatWeeks(w, f),
    why: "Professional human transcription on 60–90 minute interviews, queued behind other clients at 24–48 hours per session.",
    data: "Audio transcription rates: $1–3 per audio minute, 24–48h turnaround (Rev, GoTranscript, Scribie benchmarks).",
  },
  "Analysis & synthesis": {
    duration: (w, f) => formatWeeks(w, f),
    why: "Senior researchers reading transcripts, coding themes, and building affinity maps to produce a defensible synthesis.",
    data: "Industry standard: 1–2 hours of synthesis per hour of recorded interview.",
  },
  "Report & deck": {
    duration: (w, f) => formatWeeks(w, f),
    why: "Drafting the findings narrative, building the executive deck, and looping stakeholders for revisions. The last 10% of the deck always takes 30% of the time.",
    data: "5–10 business days for final deliverable on an executive readout — longer when the audience spans multiple departments.",
  },
};
