// Real Listen Labs customers and use-cases for the "comparing studies" shuffle.
// Source: listenlabs.ai/case-studies and homepage as of 2026-04.
export const COMPANY_SHUFFLE: string[] = [
  "Microsoft · Copilot user stories",
  "Sweetgreen · menu concept testing",
  "Canva · multi-market UX research",
  "Sling Money · brand & terminology",
  "Chubbies · product innovation",
  "Simple Modern · customer needs",
  "Perplexity · feature feedback",
  "Emeritus · learner experience",
  "Emerald Research · panel scaling",
  "KJT Group · healthcare insights",
  "McKinney · brand perception",
  "Monitas · investor research",
];

export const PLACEHOLDER_PROMPTS: string[] = [
  "I'm a brand marketer at Poppi in the consumer packaged goods space running a creative testing study. How do consumers respond to bright, playful, influencer-driven branding versus more functional messaging around gut health and low sugar benefits?",
  "I'm a product manager at Perplexity in the technology industry conducting concept and prototype testing. How do users respond to positioning Perplexity as a fast, factual answer engine versus a more exploratory, conversational research assistant?",
  "I'm a UX researcher at Airbnb in the hospitality and travel industry running a consumer journey mapping study. Where do users experience friction when booking group trips, and how does their behavior differ between planning for aesthetics versus affordability?",
  "I'm a growth marketer at Vuori in the e-commerce space running a brand perception study. How do consumers respond to performance-driven messaging around durability and function versus lifestyle-focused campaigns emphasizing comfort and everyday wear?",
  "I'm a consumer insights manager at Sweetgreen in the consumer packaged goods and restaurant industry running concept testing. How do customers respond to indulgent, craveable menu items versus health-first options focused on clean ingredients and nutrition?",
  "I'm a strategy lead at Chime in the financial services industry running a messaging and trust study. How do consumers respond to messaging focused on financial empowerment and control versus messaging centered around simplicity and ease of use?",
  "I'm a product designer at Duolingo in the technology industry running usability testing. How do users respond to highly gamified learning experiences versus more structured, goal-oriented lesson flows when trying to stay consistent?",
  "I'm an investor evaluating a digital health startup in the healthcare space and running rapid due diligence research. How do patients and providers respond to AI-driven symptom checking versus traditional in-person consultation pathways?",
  "I'm a brand strategist at Glossier in the beauty and e-commerce industry running creative testing. How do consumers respond to minimal, “skin-first” beauty messaging versus bold, trend-driven makeup campaigns with strong visual identity?",
  "I'm a lifecycle marketing manager at Spotify in the technology and media industry running a churn analysis study. Why do users disengage from the platform, and how do they respond to algorithm-driven recommendations versus human-curated playlists?",
  "I'm an agency researcher working with Nike in the apparel industry running a multi-market segmentation study. How do consumers across different regions respond to athlete-driven performance campaigns versus community-focused messaging around inclusivity and everyday fitness?",
  "I'm a product marketing manager at Notion in the SaaS industry running positioning research. How do potential users respond to positioning Notion as an all-in-one workspace versus a lightweight, flexible note-taking tool?",
  "I'm a customer experience lead at Uber in the transportation industry running a consumer journey mapping study. Where do users experience friction in the ride-booking process, and how do they respond to messaging around speed and reliability versus cost-saving options?",
  "I'm a brand manager at Liquid Death in the beverage industry running a brand tracker study. How does consumer perception shift over time between edgy, irreverent branding versus more mainstream messaging focused on sustainability and health?",
  "I'm a growth lead at Revolve in the e-commerce industry running creative testing. How do consumers respond to influencer-heavy, aspirational content versus more authentic, everyday user-generated content when deciding what to purchase?",
];

import type { IconKind } from "../components/ResearchIcons";

export const STATUS_MESSAGES = (n: number): string[] => [
  "Reading your question",
  `Estimating panel for ${n}`,
  "Modeling logistics",
  "Compiling baseline",
];

export const STATUS_ICONS: IconKind[] = [
  "stack",
  "cluster",
  "flower",
  "chart",
];

// Sparse decoration: which steps get the brushstroke wave underneath.
// Keep it rare so it reads as a flourish, not a per-row badge.
export const STATUS_SQUIGGLES: boolean[] = [false, false, false, false];

export const RAG_STATUS_LINES = (n: number): string[] => [
  "Indexing Listen customer studies…",
  `Filtering by study size (${n} participants)…`,
  "Matching research intent…",
  "Scoring relevance against past studies…",
  "Reading customer outcomes & quotes…",
  "Ranking nearest matches…",
  "Selecting best fit for your question…",
];
