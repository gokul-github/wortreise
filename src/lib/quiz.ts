import {
  NOUNS,
  VERBS,
  pickN,
  shuffle,
  wordsByTopic,
  type PersonKey,
  type TopicId,
  type Word,
} from "@/data";
import { PERSONS } from "@/data/types";

export type QuizKind = "de-en" | "en-de" | "article";

export type QuizQuestion = {
  id: string;
  kind: QuizKind;
  word: Word;
  prompt: string;
  promptLang: "de" | "en";
  options: string[];
  answer: string;
};

/** Returns the background CSS class for a word based on its article or part of speech. */
export function getWordBackgroundClass(word: Word): string {
  if (word.pos === "verb" && word.verb) return "bg-verb-light";
  if (word.article === "der") return "bg-article-der-light";
  if (word.article === "die") return "bg-article-die-light";
  if (word.article === "das") return "bg-article-das-light";
  return "";
}

/** Returns the text color CSS class for a word based on its article or part of speech. */
export function getWordTextClass(word: Word): string {
  if (word.pos === "verb" && word.verb) return "text-verb";
  if (word.article === "der") return "text-article-der";
  if (word.article === "die") return "text-article-die";
  if (word.article === "das") return "text-article-das";
  return "";
}

export type VerbQuestion = {
  id: string;
  word: Word;
  person: PersonKey;
  personLabel: string;
  answer: string;
  options: string[];
};

export function buildQuiz(
  topic: TopicId | "all",
  count: number,
  direction: "mix" | "de-en" | "en-de",
  mastery: Record<string, number>,
): QuizQuestion[] {
  const pool = wordsByTopic(topic).filter((w) => w.en && w.lemma);
  if (pool.length < 4) return [];
  const weighted = [...pool].sort((a, b) => {
    return (mastery[a.id] ?? 0) - (mastery[b.id] ?? 0) || Math.random() - 0.5;
  });
  const picked = weighted.slice(0, Math.min(count * 2, weighted.length));
  const chosen = pickN(picked, Math.min(count, picked.length));
  return chosen.map((word, i) => makeQuestion(word, pool, direction, i));
}

function makeQuestion(
  word: Word,
  pool: Word[],
  direction: "mix" | "de-en" | "en-de",
  i: number,
): QuizQuestion {
  let kind: QuizKind;
  if (direction === "de-en") kind = "de-en";
  else if (direction === "en-de") kind = "en-de";
  else if (word.article && i % 5 === 4) kind = "article";
  else kind = i % 2 === 0 ? "de-en" : "en-de";

  if (kind === "article" && word.article) {
    return {
      id: `${word.id}-art-${i}`,
      kind,
      word,
      prompt: word.lemma,
      promptLang: "de",
      options: shuffle(["der", "die", "das"]),
      answer: word.article,
    };
  }

  if (kind === "en-de") {
    const others = pool.filter((w) => w.id !== word.id && w.display !== word.display);
    const same = others.filter((w) => w.pos === word.pos);
    const distractors = pickN(same.length >= 3 ? same : others, 3).map((w) => w.display);
    return {
      id: `${word.id}-en-${i}`,
      kind: "en-de",
      word,
      prompt: word.en,
      promptLang: "en",
      options: shuffle([word.display, ...distractors]),
      answer: word.display,
    };
  }

  const others = pool.filter((w) => w.id !== word.id && w.en !== word.en);
  const same = others.filter((w) => w.pos === word.pos);
  const distractors = pickN(same.length >= 3 ? same : others, 3).map((w) => w.en);
  return {
    id: `${word.id}-de-${i}`,
    kind: "de-en",
    word,
    prompt: word.display,
    promptLang: "de",
    options: shuffle([word.en, ...distractors]),
    answer: word.en,
  };
}

export function buildVerbRound(count: number): VerbQuestion[] {
  const pool = VERBS.filter((w) => w.verb);
  const chosen = pickN(pool, Math.min(count, pool.length));
  return chosen.map((word, i) => {
    const person = PERSONS[i % PERSONS.length]!;
    const answer = word.verb![person.key];
    const others = pickN(
      pool.filter((w) => w.id !== word.id && w.verb),
      3,
    ).map((w) => w.verb![person.key]);
    return {
      id: `${word.id}-${person.key}-${i}`,
      word,
      person: person.key,
      personLabel: person.label,
      answer,
      options: shuffle([answer, ...others]),
    };
  });
}

export function matchPairs(topic: TopicId | "all", n = 6) {
  const pool = wordsByTopic(topic).filter((w) => w.en);
  return pickN(pool, Math.min(n, pool.length));
}

export function typePrompt(topic: TopicId | "all", mastery: Record<string, number>) {
  const pool = wordsByTopic(topic).filter((w) => w.lemma);
  const sorted = [...pool].sort(
    (a, b) => (mastery[a.id] ?? 0) - (mastery[b.id] ?? 0) || Math.random() - 0.5,
  );
  return sorted[0] ?? pool[0]!;
}

export { NOUNS };
