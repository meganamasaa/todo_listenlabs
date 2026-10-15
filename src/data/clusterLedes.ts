// Per-cluster lede config for the SimilarStudies panel.
// Hand-curated examples + methodology + audience per cluster — kept short
// and adjective-free so the lede reads as factual application of the
// corpus, not vendor marketing copy.

export interface ClusterLede {
  // Three concrete past-work noun phrases — populate sentence 1.
  examples: [string, string, string];
  // Methodology phrase for sentence 2.
  methodology: string;
  // Audience descriptor for the trailing "with X panels" clause.
  audience: string;
}

export const CLUSTER_LEDES: Record<string, ClusterLede> = {
  Technology: {
    examples: [
      "AI-product user-stories research",
      "onboarding-flow validation",
      "developer-tools adoption work",
    ],
    methodology: "AI-led interviews",
    audience: "user",
  },
  "Food & Beverage": {
    examples: [
      "menu-concept testing",
      "flavor-line research",
      "brand-positioning work",
    ],
    methodology: "concept-test interviews",
    audience: "customer",
  },
  "Design Software": {
    examples: [
      "multi-language UX research",
      "template-discovery work",
      "pricing-tier perception",
    ],
    methodology: "multi-language UX interviews",
    audience: "user",
  },
  Fintech: {
    examples: [
      "cross-border product positioning",
      "trust-signal testing",
      "messaging-clarity work",
    ],
    methodology: "brand and terminology testing",
    audience: "customer",
  },
  Retail: {
    examples: [
      "brand-perception research",
      "sustainability-messaging resonance",
      "influencer-vs-UGC creative testing",
    ],
    methodology: "brand-perception interviews",
    audience: "customer",
  },
  Travel: {
    examples: [
      "booking-funnel mapping",
      "trip-planning decision research",
      "ride-journey work",
    ],
    methodology: "journey-mapping interviews",
    audience: "traveler",
  },
  Healthcare: {
    examples: [
      "patient-provider research",
      "clinical-workflow validation",
      "telehealth-trust testing",
    ],
    methodology: "patient and provider interviews",
    audience: "stratified",
  },
};
