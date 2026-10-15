// Word-boundary keyword matching used for prompt classification.
// Each `key` is matched as a whole word/phrase (case-insensitive) so e.g.
// "ai" no longer matches "sustainability".

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function wordBoundaryHit(prompt: string, key: string): boolean {
  const re = new RegExp(`\\b${escapeRegExp(key)}\\b`, "i");
  return re.test(prompt);
}

export function scoreKeys(prompt: string, keys: string[]): number {
  let score = 0;
  for (const k of keys) if (wordBoundaryHit(prompt, k)) score += 1;
  return score;
}

export function matchedKeys(prompt: string, keys: string[]): string[] {
  return dedupeSubstrings(keys.filter((k) => wordBoundaryHit(prompt, k)));
}

// Drop entries that are strict substrings of another entry in the list,
// e.g. ["consumer packaged goods", "packaged goods"] → ["consumer packaged goods"].
// Keeps chip lists tight without losing signal.
export function dedupeSubstrings(items: string[]): string[] {
  return items.filter(
    (m) => !items.some((other) => other !== m && other.toLowerCase().includes(m.toLowerCase()))
  );
}
