// Multi-facet keyword extraction for the RAG-scan keyword-reveal UI.
// User-research prompts carry signal across three orthogonal dimensions —
// role, industry, and use case — so we surface them as separate chips
// rather than collapsing everything into a single "industry" bucket.

import { dedupeSubstrings, matchedKeys } from "../lib/keywordMatch";

export interface FacetMatch {
  label: string;
  matched: string[];
}

interface Facet {
  label: string;
  keys: string[];
}

export const ROLE_KEYWORDS: Facet[] = [
  // Listed roughly most-specific first so multi-word roles take precedence
  // over their single-word substrings.
  { label: "lifecycle marketing manager", keys: ["lifecycle marketing manager", "lifecycle marketing"] },
  { label: "product marketing manager", keys: ["product marketing manager"] },
  { label: "consumer insights manager", keys: ["consumer insights manager", "consumer insights"] },
  { label: "customer experience lead", keys: ["customer experience lead"] },
  { label: "brand strategist", keys: ["brand strategist"] },
  { label: "brand marketer", keys: ["brand marketer"] },
  { label: "brand manager", keys: ["brand manager"] },
  { label: "product manager", keys: ["product manager"] },
  { label: "product designer", keys: ["product designer"] },
  { label: "UX researcher", keys: ["ux researcher", "ux research"] },
  { label: "growth marketer", keys: ["growth marketer"] },
  { label: "growth lead", keys: ["growth lead"] },
  { label: "strategy lead", keys: ["strategy lead"] },
  { label: "agency researcher", keys: ["agency researcher"] },
  { label: "investor", keys: ["investor"] },
];

export const USE_CASE_KEYWORDS: Facet[] = [
  // Multi-word phrases first.
  { label: "concept and prototype testing", keys: ["concept and prototype testing"] },
  { label: "consumer journey mapping", keys: ["consumer journey mapping", "journey mapping"] },
  { label: "brand perception study", keys: ["brand perception study", "brand perception"] },
  { label: "brand tracker study", keys: ["brand tracker study", "brand tracker"] },
  { label: "messaging and trust study", keys: ["messaging and trust study", "messaging and trust"] },
  { label: "multi-market segmentation study", keys: ["multi-market segmentation", "segmentation study"] },
  { label: "rapid due diligence", keys: ["rapid due diligence", "due diligence"] },
  { label: "creative testing", keys: ["creative testing"] },
  { label: "concept testing", keys: ["concept testing"] },
  { label: "prototype testing", keys: ["prototype testing"] },
  { label: "usability testing", keys: ["usability testing"] },
  { label: "positioning research", keys: ["positioning research"] },
  { label: "churn analysis", keys: ["churn analysis"] },
];

function pickFirstMatch(prompt: string, facets: Facet[]): FacetMatch | null {
  for (const f of facets) {
    const matched = dedupeSubstrings(matchedKeys(prompt, f.keys));
    if (matched.length > 0) return { label: f.label, matched };
  }
  return null;
}

export function matchFacets(prompt: string): {
  role: FacetMatch | null;
  useCase: FacetMatch | null;
} {
  return {
    role: pickFirstMatch(prompt, ROLE_KEYWORDS),
    useCase: pickFirstMatch(prompt, USE_CASE_KEYWORDS),
  };
}

// Lightweight entity extraction from the prompt — surfaces signal that
// role/industry/use-case keyword detection misses. Used by the RAG-scan's
// "Reading prompt structure" step.
export interface PromptEntities {
  brand: string | null;
  scope: "multi-market" | "single-market" | null;
  audience: string | null;
}

const SCOPE_MULTI = [
  "multi-market",
  "across regions",
  "across markets",
  "across language markets",
  "across different regions",
  "across markets",
  "international",
  "global",
  "multi-language",
  "multiple markets",
];

const SCOPE_SINGLE = ["national", "domestic", "single-market"];

const AUDIENCE_TERMS = [
  "consumers",
  "users",
  "customers",
  "patients",
  "providers",
  "members",
  "buyers",
  "shoppers",
  "subscribers",
  "decision-makers",
  "frequent customers",
];

export function parsePromptEntities(prompt: string): PromptEntities {
  // Brand: capture title-cased noun(s) after "at" — handles "Poppi", "Liquid Death", "Sling Money".
  const brandMatch = prompt.match(/\bat ([A-Z][A-Za-z]+(?: [A-Z][A-Za-z]+)?)/);
  const brand = brandMatch?.[1] ?? null;

  const lower = prompt.toLowerCase();
  const isMulti = SCOPE_MULTI.some((s) => lower.includes(s));
  const isSingle = !isMulti && SCOPE_SINGLE.some((s) => lower.includes(s));
  const scope: PromptEntities["scope"] = isMulti
    ? "multi-market"
    : isSingle
    ? "single-market"
    : null;

  const audience =
    AUDIENCE_TERMS.find((a) =>
      new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(prompt)
    ) ?? null;

  return { brand, scope, audience };
}
