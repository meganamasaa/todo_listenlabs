import { fmtMoney } from "../lib/format";
import "./MethodologyFooter.css";

interface Source {
  label: string;
  detail: string;
  url: string;
}

interface Props {
  costDifference?: number;
}

const LISTEN_SOURCES: Source[] = [
  {
    label: "Listen platform claims",
    detail: "AI-led interviews, 30M+ panel, 100+ languages",
    url: "https://listenlabs.ai",
  },
  {
    label: "Customer outcomes & quotes",
    detail: "Microsoft, Sweetgreen, Canva, Sling Money case studies",
    url: "https://listenlabs.ai/case-studies",
  },
];

const INDUSTRY_SOURCES: Source[] = [
  {
    label: "Custom qualitative project costs",
    detail: "$25K–$65K typical, IDI participant incentives $100–300",
    url: "https://www.driveresearch.com/market-research-company-blog/how-much-does-market-research-cost/",
  },
  {
    label: "Audio transcription rates",
    detail: "$1–3 per audio minute, professional human transcription",
    url: "https://www.rev.com/resources/transcription-cost-rate-calculator-with-estimates",
  },
  {
    label: "Industry benchmarks & methodology trends",
    detail: "Greenbook Research Industry Trends (GRIT) report",
    url: "https://www.greenbook.org/grit",
  },
];

export function MethodologyFooter({ costDifference }: Props = {}) {
  return (
    <section className="methodology" aria-labelledby="methodology-title">
      <header className="methodology__head">
        <span className="section-label" id="methodology-title">
          Methodology &amp; sources
        </span>
        <p className="methodology__lede">
          Numbers in this calculator are derived from public Listen Labs data
          and industry benchmarks for traditional qualitative research. Actual
          quotes from research agencies vary by scope, geography and audience.
        </p>
      </header>

      <div className="methodology__cols">
        <div className="methodology__col">
          <span className="methodology__col-title">Listen Labs</span>
          <ul>
            {LISTEN_SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label} ↗
                </a>
                <span>{s.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="methodology__col">
          <span className="methodology__col-title">Traditional research benchmarks</span>
          <ul>
            {INDUSTRY_SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label} ↗
                </a>
                <span>{s.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="methodology__note">
        Listen pricing tiers shown ($1,200 / $1,800 / $2,500 / $4,000 / $8,000)
        are illustrative for this calculator. Contact your Listen rep for a
        custom quote based on your study scope.
        {typeof costDifference === "number" && costDifference > 0 && (
          <>
            {" "}
            Estimated <strong>{fmtMoney(costDifference)}</strong> in cost
            difference vs traditional baseline.
          </>
        )}
      </p>
    </section>
  );
}
