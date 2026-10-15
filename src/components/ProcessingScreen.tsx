import { useEffect, useState } from "react";
import { ResearchSteps, type ResearchStep } from "./ResearchSteps";
import { STATUS_ICONS, STATUS_MESSAGES, STATUS_SQUIGGLES } from "../data/companies";
import "./ProcessingScreen.css";

interface Props {
  prompt: string;
  n: number;
  onDone: () => void;
}

export function ProcessingScreen({ prompt, n, onDone }: Props) {
  const messages = STATUS_MESSAGES(n);
  const steps: ResearchStep[] = messages.map((label, i) => ({
    label,
    icon: STATUS_ICONS[i % STATUS_ICONS.length],
    showSquiggle: STATUS_SQUIGGLES[i] ?? false,
  }));
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= messages.length) {
        clearInterval(id);
        setTimeout(onDone, 400);
        return;
      }
      setIdx(i);
    }, 950);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="processing fu">
      <div className="processing__prompt">
        <span className="section-label">Your question</span>
        <p>{prompt}</p>
      </div>

      <div className="processing__visual">
        <ResearchSteps
          steps={steps}
          activeIdx={idx}
          windowSize={steps.length}
        />
      </div>
    </section>
  );
}
