import { useEffect, useState } from "react";
import { Logo } from "./components/Logo";
import { InputScreen } from "./components/InputScreen";
import { ProcessingScreen } from "./components/ProcessingScreen";
import { TraditionalScreen } from "./components/TraditionalScreen";
import { RevealScreen } from "./components/RevealScreen";
import { tierFor } from "./data/tiers";
import type { ScreenName } from "./types";
import "./components/Logo.css";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [n, setN] = useState(20);
  const [screen, setScreen] = useState<ScreenName>("input");

  const tier = tierFor(n);

  // Strip any inbound query string so the prompt never lives in the URL bar.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  function handleSubmit(p: string, count: number) {
    setPrompt(p);
    setN(count);
    setScreen("processing");
  }

  function handleReset() {
    setScreen("input");
  }

  return (
    <div className="app">
      <header className="app-header">
        <Logo />
        <span className="app-header__hint">Smart Estimator</span>
      </header>

      {screen === "input" && (
        <InputScreen
          initialPrompt={prompt}
          initialN={n}
          onSubmit={handleSubmit}
        />
      )}
      {screen === "processing" && (
        <ProcessingScreen
          prompt={prompt}
          n={n}
          onDone={() => setScreen("traditional")}
        />
      )}
      {screen === "traditional" && (
        <TraditionalScreen
          tier={tier}
          n={n}
          onContinue={() => setScreen("reveal")}
        />
      )}
      {screen === "reveal" && (
        <RevealScreen
          tier={tier}
          prompt={prompt}
          n={n}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
