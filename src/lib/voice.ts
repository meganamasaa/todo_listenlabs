// Minimal Web Speech API wrapper.
// Returns null if the API is unavailable.

interface SpeechRecognitionLike {
  start: () => void;
  stop: () => void;
  abort: () => void;
  interimResults: boolean;
  continuous: boolean;
  lang: string;
  onresult: ((ev: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((ev: { error: string }) => void) | null;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<{
    0: { transcript: string };
    isFinal: boolean;
    length: number;
  }>;
}

interface SpeechRecognitionCtor {
  new (): SpeechRecognitionLike;
}

export function getSpeechRecognition(): SpeechRecognitionLike | null {
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.interimResults = true;
  rec.continuous = false;
  rec.lang = "en-US";
  return rec;
}

export function joinTranscript(ev: SpeechRecognitionEventLike): string {
  let out = "";
  for (let i = 0; i < ev.results.length; i++) {
    out += ev.results[i][0].transcript;
  }
  return out;
}
