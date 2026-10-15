import "./PhaseDetailCard.css";

export interface PhaseDetailData {
  name: string;
  duration: string;
  why: string;
  data: string;
  color: string;
}

interface Props {
  detail: PhaseDetailData | null;
  placeholder: string;
}

export function PhaseDetailCard({ detail, placeholder }: Props) {
  if (!detail) {
    return (
      <div className="phase-detail phase-detail--empty">{placeholder}</div>
    );
  }
  return (
    <div
      className="phase-detail fu"
      style={{ borderLeftColor: detail.color }}
    >
      <div className="phase-detail__head">
        <span className="phase-detail__name">{detail.name}</span>
        <span className="phase-detail__duration">{detail.duration}</span>
      </div>
      <p className="phase-detail__why">{detail.why}</p>
      <p className="phase-detail__data">{detail.data}</p>
    </div>
  );
}
