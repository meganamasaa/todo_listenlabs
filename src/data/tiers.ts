import type { Tier } from "../types";
import { fmtH } from "../lib/format";

function buildAxisTicks(axisH: number): string[] {
  // Smart axis: 5 evenly spaced ticks from 0 to axisH.
  const n = 5;
  const ticks: string[] = [];
  for (let i = 0; i < n; i++) {
    const h = (axisH * i) / (n - 1);
    ticks.push(fmtH(h));
  }
  return ticks;
}

const baseTiers: Omit<Tier, "axisTicks">[] = [
  {
    max: 8,
    label: "small concept test",
    weeks: 4,
    total: 12000,
    ltime: "4–6 hours",
    lnote: "All interviews complete in a single session.",
    lcost: 1200,
    axisH: 6,
  },
  {
    max: 15,
    label: "medium qual study",
    weeks: 6,
    total: 18000,
    ltime: "6–12 hours",
    lnote: "Participants respond within a few hours.",
    lcost: 1800,
    axisH: 12,
  },
  {
    max: 25,
    label: "standard IDI study",
    weeks: 8,
    total: 25000,
    ltime: "same day",
    lnote: "Most responses arrive within 12–24 hours.",
    lcost: 2500,
    axisH: 24,
  },
  {
    max: 50,
    label: "large research program",
    weeks: 12,
    total: 40000,
    ltime: "1–2 days",
    lnote: "Panel fully closes within 48 hours.",
    lcost: 4000,
    axisH: 48,
  },
  {
    max: 100,
    label: "enterprise study",
    weeks: 16,
    total: 60000,
    ltime: "2–3 days",
    lnote: "Staggered global recruitment closes by day 3.",
    lcost: 8000,
    axisH: 72,
  },
];

export const TIERS: Tier[] = baseTiers.map((t) => ({
  ...t,
  axisTicks: buildAxisTicks(t.axisH),
}));

export function tierFor(n: number): Tier {
  for (const t of TIERS) {
    if (n <= t.max) return t;
  }
  return TIERS[TIERS.length - 1];
}

export function tierIdxFor(n: number): number {
  for (let i = 0; i < TIERS.length; i++) {
    if (n <= TIERS[i].max) return i;
  }
  return TIERS.length - 1;
}

export function tierMin(idx: number): number {
  return idx === 0 ? 5 : TIERS[idx - 1].max + 1;
}

export function tierMidpoint(idx: number): number {
  return Math.round((tierMin(idx) + TIERS[idx].max) / 2);
}
