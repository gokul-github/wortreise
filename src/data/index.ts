import type { ExamTrack, PersonKey, TopicId, Word } from "./types";
import { LEXICON_WORDS } from "./words";
import { VERB_WORDS } from "./verbs";
import { TELC_WORDS } from "./telc-words";

export * from "./types";
export { VERB_WORDS } from "./verbs";

const byId = new Map<string, Word>();

function add(word: Word) {
  if (!byId.has(word.id)) byId.set(word.id, word);
}

for (const w of LEXICON_WORDS) add(w);
for (const w of VERB_WORDS) add(w);

export const WORDS: Word[] = [...byId.values()];

function plainLemma(s: string): string {
  return s
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/\([^)]*\)/g, "")
    .replace(/^sich\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const verbForms = new Map(
  VERB_WORDS.filter((w) => w.verb).map((w) => [plainLemma(w.lemma), w.verb] as const),
);

/** telc headwords, with Goethe present-tense forms where the verb matches. */
export const TELC_LEXICON: Word[] = TELC_WORDS.map((w) => {
  if (w.pos !== "verb" || w.verb) return w;
  const verb = verbForms.get(plainLemma(w.lemma));
  return verb ? { ...w, verb } : w;
});

export function wordsFor(track: ExamTrack = "goethe"): Word[] {
  return track === "telc" ? TELC_LEXICON : WORDS;
}

export const VERBS: Word[] = WORDS.filter((w) => w.pos === "verb" && w.verb);

export const NOUNS: Word[] = WORDS.filter((w) => w.pos === "noun" && w.article);

export function verbsFor(track: ExamTrack = "goethe"): Word[] {
  return wordsFor(track).filter((w) => w.pos === "verb" && w.verb);
}

export function wordsByTopic(topic: TopicId | "all", track: ExamTrack = "goethe"): Word[] {
  const list = wordsFor(track);
  if (topic === "all") return list;
  return list.filter((w) => w.topic === topic);
}

export function getWord(id: string): Word | undefined {
  return byId.get(id);
}

export function germanPrompt(word: Word): string {
  return word.display;
}

export function genderLabel(article: "der" | "die" | "das"): string {
  if (article === "der") return "masculine";
  if (article === "die") return "feminine";
  return "neuter";
}

export function regularityLabel(word: Word): string {
  const r = word.verb?.regularity;
  if (r === "regular") return "Regular";
  if (r === "irregular") return "Irregular";
  if (r === "mixed") return "Mixed";
  if (r === "modal") return "Modal";
  return "";
}

export function verbForm(word: Word, person: PersonKey): string {
  return word.verb?.[person] ?? "";
}

export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = tmp;
  }
  return arr;
}

export function pickN<T>(items: T[], n: number): T[] {
  return shuffle(items).slice(0, n);
}

export function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/ß/g, "ss")
    .replace(/^der |^die |^das /g, "")
    .replace(/^sich /g, "");
}

export function answersMatch(input: string, expected: string): boolean {
  const a = normalizeAnswer(input);
  const b = normalizeAnswer(expected);
  if (!a || !b) return false;
  if (a === b) return true;
  const compact = (x: string) => x.replace(/[\s'-]/g, "");
  return compact(a) === compact(b);
}

export const STATS = {
  words: WORDS.length,
  verbs: VERBS.length,
  nouns: NOUNS.length,
};

export function statsFor(track: ExamTrack = "goethe") {
  const list = wordsFor(track);
  return {
    words: list.length,
    verbs: list.filter((w) => w.pos === "verb" && w.verb).length,
    nouns: list.filter((w) => w.pos === "noun" && w.article).length,
  };
}

export function getTopicWordCount(topic: TopicId | "all", track: ExamTrack = "goethe"): number {
  return wordsByTopic(topic, track).length;
}
