// Synthetic, anonymized index of prior Listen studies.
// Stands in for the full Listen corpus — used to populate the RAG-style
// "similar studies" panel without naming any real customer.

export interface IndexedStudy {
  tag: string;             // industry cluster (canonical)
  useCaseTag?: string;     // matches USE_CASE_KEYWORDS labels in promptFacets.ts
  roleTag?: string;        // matches ROLE_KEYWORDS labels in promptFacets.ts
  anonUse: string;
  n: number;
  listenTime: string;
  languages: number;
}

// Anchored at a "real research practice" scale, much larger than the public
// case-study set. Tunable.
export const INDEX_SIZE = 1240;

export const STUDY_INDEX: IndexedStudy[] = [
  // Technology / SaaS / AI products
  { tag: "Technology", useCaseTag: "concept testing", roleTag: "product manager", anonUse: "Onboarding-flow validation for a new collaboration feature.", n: 220, listenTime: "1 day", languages: 1 },
  { tag: "Technology", useCaseTag: "consumer journey mapping", roleTag: "UX researcher", anonUse: "Daily-driver behaviour study for a consumer AI assistant.", n: 410, listenTime: "2 days", languages: 4 },
  { tag: "Technology", useCaseTag: "positioning research", roleTag: "product marketing manager", anonUse: "Adoption barriers for a developer-tools product launch.", n: 160, listenTime: "same day", languages: 1 },
  { tag: "Technology", useCaseTag: "concept testing", roleTag: "product manager", anonUse: "Multi-stakeholder feedback on an enterprise data product.", n: 95, listenTime: "2 days", languages: 1 },
  { tag: "Technology", useCaseTag: "multi-market segmentation study", roleTag: "growth marketer", anonUse: "Cross-market activation patterns for a SaaS analytics tool.", n: 280, listenTime: "1 day", languages: 6 },
  { tag: "Technology", useCaseTag: "churn analysis", roleTag: "lifecycle marketing manager", anonUse: "Churn drivers for a subscription content platform.", n: 340, listenTime: "1 day", languages: 1 },
  { tag: "Technology", useCaseTag: "usability testing", roleTag: "product designer", anonUse: "Gamified-learning vs goal-oriented flows in an edtech app.", n: 240, listenTime: "2 days", languages: 3 },

  // Food & Beverage
  { tag: "Food & Beverage", useCaseTag: "concept testing", roleTag: "brand marketer", anonUse: "New flavour-line consumer testing ahead of national rollout.", n: 240, listenTime: "1 day", languages: 1 },
  { tag: "Food & Beverage", useCaseTag: "brand perception study", roleTag: "brand strategist", anonUse: "Private-label vs name-brand perception across regions.", n: 360, listenTime: "2 days", languages: 4 },
  { tag: "Food & Beverage", useCaseTag: "concept testing", roleTag: "consumer insights manager", anonUse: "Limited-time-offer concept testing for a chain restaurant.", n: 200, listenTime: "same day", languages: 1 },
  { tag: "Food & Beverage", useCaseTag: "usability testing", roleTag: "product manager", anonUse: "Loyalty-app feature reception among frequent customers.", n: 150, listenTime: "1 day", languages: 1 },
  { tag: "Food & Beverage", useCaseTag: "positioning research", roleTag: "brand marketer", anonUse: "Functional-beverage positioning vs taste-led branding.", n: 320, listenTime: "1 day", languages: 1 },
  { tag: "Food & Beverage", useCaseTag: "creative testing", roleTag: "brand manager", anonUse: "Edgy vs sustainability messaging for a CPG beverage.", n: 280, listenTime: "2 days", languages: 1 },

  // Design Software / Productivity SaaS
  { tag: "Design Software", useCaseTag: "usability testing", roleTag: "UX researcher", anonUse: "Cross-language onboarding study for a creative-tools platform.", n: 320, listenTime: "2 days", languages: 6 },
  { tag: "Design Software", useCaseTag: "multi-market segmentation study", roleTag: "product designer", anonUse: "Template-discovery friction in a multi-market product.", n: 180, listenTime: "1 day", languages: 5 },
  { tag: "Design Software", useCaseTag: "positioning research", roleTag: "product marketing manager", anonUse: "Pricing-tier perception study among professional users.", n: 140, listenTime: "same day", languages: 1 },

  // Fintech
  { tag: "Fintech", useCaseTag: "positioning research", roleTag: "product marketing manager", anonUse: "Cross-border remittance product positioning study.", n: 260, listenTime: "1 day", languages: 8 },
  { tag: "Fintech", useCaseTag: "messaging and trust study", roleTag: "strategy lead", anonUse: "Trust-signal testing for a new digital-only banking product.", n: 195, listenTime: "same day", languages: 1 },
  { tag: "Fintech", useCaseTag: "multi-market segmentation study", roleTag: "growth marketer", anonUse: "Localization study for an international payments app.", n: 340, listenTime: "2 days", languages: 12 },
  { tag: "Fintech", useCaseTag: "usability testing", roleTag: "UX researcher", anonUse: "Fee-disclosure clarity testing across language markets.", n: 175, listenTime: "1 day", languages: 6 },
  { tag: "Fintech", useCaseTag: "messaging and trust study", roleTag: "brand marketer", anonUse: "Empowerment vs simplicity messaging for a neobank.", n: 230, listenTime: "1 day", languages: 1 },

  // Retail / Apparel / Beauty / E-commerce
  { tag: "Retail", useCaseTag: "creative testing", roleTag: "brand strategist", anonUse: "Sustainability messaging resonance among DTC apparel customers.", n: 320, listenTime: "2 days", languages: 1 },
  { tag: "Retail", useCaseTag: "positioning research", roleTag: "brand strategist", anonUse: "Wellness-positioning testing for a footwear brand.", n: 220, listenTime: "1 day", languages: 1 },
  { tag: "Retail", useCaseTag: "creative testing", roleTag: "growth marketer", anonUse: "Influencer-driven vs UGC creative testing for a fashion DTC.", n: 290, listenTime: "1 day", languages: 1 },
  { tag: "Retail", useCaseTag: "multi-market segmentation study", roleTag: "agency researcher", anonUse: "Athlete-led vs community-led campaign testing for a sportswear brand.", n: 410, listenTime: "2 days", languages: 5 },
  { tag: "Retail", useCaseTag: "creative testing", roleTag: "brand strategist", anonUse: "Skin-first vs trend-led creative for a beauty brand.", n: 260, listenTime: "1 day", languages: 1 },
  { tag: "Retail", useCaseTag: "consumer journey mapping", roleTag: "customer experience lead", anonUse: "In-store vs online journey comparison for a national retailer.", n: 290, listenTime: "1 day", languages: 1 },

  // Travel / Hospitality / Transportation
  { tag: "Travel", useCaseTag: "consumer journey mapping", roleTag: "UX researcher", anonUse: "Group-booking friction in a short-term-stay marketplace.", n: 240, listenTime: "1 day", languages: 3 },
  { tag: "Travel", useCaseTag: "consumer journey mapping", roleTag: "UX researcher", anonUse: "Aesthetics vs affordability decision drivers in trip planning.", n: 310, listenTime: "2 days", languages: 4 },
  { tag: "Travel", useCaseTag: "consumer journey mapping", roleTag: "customer experience lead", anonUse: "Ride-booking journey mapping across consumer segments.", n: 230, listenTime: "1 day", languages: 1 },
  { tag: "Travel", useCaseTag: "creative testing", roleTag: "customer experience lead", anonUse: "Speed vs cost-saving messaging for a transportation app.", n: 280, listenTime: "1 day", languages: 1 },

  // Healthcare / Digital Health
  { tag: "Healthcare", useCaseTag: "rapid due diligence", roleTag: "investor", anonUse: "Patient response to AI symptom-triage vs in-person consultation.", n: 180, listenTime: "2 days", languages: 1 },
  { tag: "Healthcare", useCaseTag: "usability testing", roleTag: "product manager", anonUse: "Provider acceptance of a clinical workflow tool.", n: 110, listenTime: "2 days", languages: 1 },
  { tag: "Healthcare", useCaseTag: "messaging and trust study", roleTag: "UX researcher", anonUse: "Trust-and-disclosure testing for a telehealth onboarding flow.", n: 160, listenTime: "1 day", languages: 1 },
  { tag: "Healthcare", useCaseTag: "rapid due diligence", roleTag: "investor", anonUse: "Due-diligence consumer signal for a digital-health startup.", n: 95, listenTime: "2 days", languages: 1 },

  // Media (cross-tag fill)
  { tag: "Media", useCaseTag: "consumer journey mapping", roleTag: "product designer", anonUse: "Content-discovery preferences inside a streaming platform.", n: 380, listenTime: "2 days", languages: 1 },
  { tag: "Media", useCaseTag: "churn analysis", roleTag: "lifecycle marketing manager", anonUse: "Algorithm vs editorial curation in a music app.", n: 240, listenTime: "1 day", languages: 1 },
];

// Multi-axis similarity scoring: industry > use-case > role.
// Returns a *diversified* top-k:
//   slot 1 = best by industry (matching top.tag)
//   slot 2 = best by use-case (matching the detected use-case facet)
//   slot 3 = best by role (matching the detected role facet)
// Falls back to top-by-total-score for any slot that has no match.
type AxisLabel = "industry" | "use-case" | "role";

export function rankNeighbors(
  top: { tag: string },
  facets: {
    role: { label: string } | null;
    useCase: { label: string } | null;
  },
  k: number,
): Array<{ study: IndexedStudy; matchedAxis: AxisLabel }> {
  const used = new Set<IndexedStudy>();
  const out: Array<{ study: IndexedStudy; matchedAxis: AxisLabel }> = [];

  function pickFirst(
    predicate: (s: IndexedStudy) => boolean,
    axis: AxisLabel,
  ): boolean {
    for (const s of STUDY_INDEX) {
      if (used.has(s)) continue;
      if (predicate(s)) {
        out.push({ study: s, matchedAxis: axis });
        used.add(s);
        return true;
      }
    }
    return false;
  }

  pickFirst((s) => s.tag === top.tag, "industry");
  if (facets.useCase) {
    pickFirst((s) => s.useCaseTag === facets.useCase!.label, "use-case");
  }
  if (facets.role) {
    pickFirst((s) => s.roleTag === facets.role!.label, "role");
  }

  // Backfill remaining slots with same-industry, then anything.
  for (const s of STUDY_INDEX) {
    if (out.length >= k) break;
    if (used.has(s)) continue;
    if (s.tag === top.tag) {
      out.push({ study: s, matchedAxis: "industry" });
      used.add(s);
    }
  }
  for (const s of STUDY_INDEX) {
    if (out.length >= k) break;
    if (used.has(s)) continue;
    out.push({ study: s, matchedAxis: "industry" });
    used.add(s);
  }

  return out.slice(0, k);
}

export function clusterSizeFor(tag: string): number {
  return STUDY_INDEX.filter((s) => s.tag === tag).length;
}

// Per-cluster prior-outcome stats — surfaced in the RAG-scan's
// "Reviewing prior outcomes" step. Synthesized for the demo; in production
// these would come from real post-study impact tracking.
export interface ClusterOutcome {
  shipRate: string;
  themes: string;
}

export const CLUSTER_OUTCOMES: Record<string, ClusterOutcome> = {
  Technology: {
    shipRate: "94% led to a shipped feature change",
    themes: "median 4 themes surfaced",
  },
  "Food & Beverage": {
    shipRate: "88% informed a menu or product decision",
    themes: "median 3 themes surfaced",
  },
  "Design Software": {
    shipRate: "91% drove a UX or copy update",
    themes: "median 4 themes surfaced",
  },
  Fintech: {
    shipRate: "89% influenced messaging or trust copy",
    themes: "median 3 themes surfaced",
  },
  Retail: {
    shipRate: "92% informed brand or campaign creative",
    themes: "median 3 themes surfaced",
  },
  Travel: {
    shipRate: "87% surfaced funnel-friction patches",
    themes: "median 4 themes surfaced",
  },
  Healthcare: {
    shipRate: "85% informed disclosure or workflow design",
    themes: "median 3 themes surfaced",
  },
  Media: {
    shipRate: "90% drove a curation or recommendation change",
    themes: "median 4 themes surfaced",
  },
};

// Median across the same-tag cluster — drives the "calibrated against N studies"
// header copy in SimilarStudies and the Listen-side numbers in CapabilityCompare.
function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

// "same day" → 0.5, "1 day" → 1, "2 days" → 2, etc.
function listenTimeToDays(t: string): number {
  const s = t.toLowerCase();
  if (s.includes("same day") || s.includes("hours")) return 0.5;
  const m = s.match(/(\d+)\s*day/);
  return m ? Number(m[1]) : 1;
}

function formatDaysAsTime(days: number): string {
  if (days <= 0.75) return "same day";
  if (days < 1.5) return "1 day";
  return `${days.toFixed(1).replace(/\.0$/, "")} days`;
}

export function clusterMedians(tag: string): {
  time: string;
  sample: number;
  languages: number;
} {
  const inCluster = STUDY_INDEX.filter((s) => s.tag === tag);
  if (inCluster.length === 0) {
    return { time: "1 day", sample: 200, languages: 1 };
  }
  return {
    time: formatDaysAsTime(median(inCluster.map((s) => listenTimeToDays(s.listenTime)))),
    sample: Math.round(median(inCluster.map((s) => s.n))),
    languages: Math.round(median(inCluster.map((s) => s.languages))),
  };
}
