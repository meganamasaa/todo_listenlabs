import { matchSimilarStudies, type MatchedAxis } from "../data/caseStudies";
import { CLUSTER_LEDES } from "../data/clusterLedes";
import type { CaseStudy } from "../types";
import type { IndexedStudy } from "../data/studyIndex";
import "./SimilarStudies.css";

interface Props {
  prompt: string;
}

const AXIS_LABEL: Record<MatchedAxis, string> = {
  industry: "Same industry",
  "use-case": "Same use case",
  role: "Same role",
};

export function SimilarStudies({ prompt }: Props) {
  const {
    top,
    neighbors,
    clusterSize,
    medianTime,
    medianSample,
    medianLanguages,
    similarityScore,
  } = matchSimilarStudies(prompt);

  const lede = CLUSTER_LEDES[top.tag];
  const langClause =
    medianLanguages > 1 ? ` across ${medianLanguages} languages` : "";

  return (
    <section className="similar fu" aria-label="Similar Listen studies">
      <header className="similar__head">
        <span className="section-label">Retrieved from Listen's study corpus</span>
        {lede && (
          <p className="similar__lede">
            Listen has run <strong>{clusterSize}</strong> prior studies in this
            profile — {lede.examples[0]}, {lede.examples[1]}, and{" "}
            {lede.examples[2]}. Based on these precedents, a similar study at
            Listen would run <strong>~{medianSample} participants</strong> in{" "}
            <strong>~{medianTime}</strong>
            {langClause} using {lede.methodology} with {lede.audience} panels.
          </p>
        )}
      </header>

      <HeroMatch study={top} similarity={similarityScore} />

      {neighbors.length > 0 && (
        <div className="similar__neighbors">
          <span className="section-label similar__neighbors-label">
            Also seen in the corpus
          </span>
          <ul className="similar__neighbor-grid">
            {neighbors.map((n, i) => (
              <NeighborCard
                key={i}
                study={n.study}
                matchedAxis={n.matchedAxis}
              />
            ))}
          </ul>
        </div>
      )}

      <p className="similar__privacy">
        Indexed from prior Listen studies. No participant or customer-identifying data shown.
      </p>
    </section>
  );
}

function HeroMatch({
  study,
  similarity,
}: {
  study: CaseStudy;
  similarity: number;
}) {
  return (
    <article className="similar__hero">
      <div className="similar__hero-head">
        <span className="similar__hero-dot" aria-hidden="true" />
        <span className="similar__hero-tag">{study.tag}</span>
        <span className="similar__pill">Closest match</span>
        <span className="similar__similarity" aria-label={`Similarity score ${similarity.toFixed(2)}`}>
          <span className="similar__similarity-label">Similarity</span>
          <strong className="similar__similarity-value">
            {similarity.toFixed(2)}
          </strong>
        </span>
      </div>

      <p className="similar__hero-summary">{study.anonUse}</p>

      <hr className="similar__hero-divider" />

      <dl className="similar__dl">
        <dt>Sample</dt>
        <dd>
          ~{study.n} participants
          {study.languages > 1 && <> · {study.languages} languages</>}
        </dd>

        <dt>Method</dt>
        <dd>{study.methodology}</dd>

        <dt>Speed</dt>
        <dd>
          <strong>{study.listenTime}</strong>{" "}
          <span className="similar__muted">vs {study.tradTime} traditional</span>
        </dd>

        <dt>Impact</dt>
        <dd>{study.impact}</dd>

        <dt>Matched on</dt>
        <dd>
          <ul className="similar__chips">
            {study.matchReasons.map((r) => (
              <li key={r} className="similar__chip">
                {r}
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </article>
  );
}

function NeighborCard({
  study,
  matchedAxis,
}: {
  study: IndexedStudy;
  matchedAxis: MatchedAxis;
}) {
  return (
    <li className="similar__neighbor-card">
      <div className="similar__neighbor-head">
        <span className="similar__neighbor-tag">{study.tag}</span>
        <span className={`similar__axis similar__axis--${matchedAxis}`}>
          {AXIS_LABEL[matchedAxis]}
        </span>
      </div>
      <p className="similar__neighbor-use">{study.anonUse}</p>
    </li>
  );
}
