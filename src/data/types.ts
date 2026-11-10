export type Pos =
  "noun" | "verb" | "adj" | "adv" | "prep" | "conj" | "pron" | "num" | "phrase" | "det" | "other";

export type TopicId =
  | "zahlen"
  | "zeit"
  | "person"
  | "wohnen"
  | "umwelt"
  | "reisen"
  | "essen"
  | "einkaufen"
  | "dienste"
  | "lernen"
  | "arbeit"
  | "freizeit"
  | "alltag";

export type Regularity = "regular" | "irregular" | "mixed" | "modal";

export type VerbForms = {
  regularity: Regularity;
  aux: "haben" | "sein";
  ich: string;
  du: string;
  er: string;
  wir: string;
  ihr: string;
  sie: string;
  participle: string;
  prefix?: string;
  reflexive?: boolean;
  stemNote?: string;
};

export type Word = {
  id: string;
  lemma: string;
  display: string;
  pos: Pos;
  en: string;
  topic: TopicId;
  example: string;
  exampleEn: string;
  article?: "der" | "die" | "das";
  plural?: string;
  feminine?: string;
  verb?: VerbForms;
};

export type PersonKey = "ich" | "du" | "er" | "wir" | "ihr" | "sie";

export const PERSONS: { key: PersonKey; label: string }[] = [
  { key: "ich", label: "ich" },
  { key: "du", label: "du" },
  { key: "er", label: "er / sie / es" },
  { key: "wir", label: "wir" },
  { key: "ihr", label: "ihr" },
  { key: "sie", label: "sie / Sie" },
];

export const TOPICS: {
  id: TopicId;
  de: string;
  en: string;
  blurb: string;
}[] = [
  { id: "zahlen", de: "Zahlen", en: "Numbers", blurb: "Count, prices, dates." },
  { id: "zeit", de: "Zeit", en: "Time", blurb: "Clock, days, months, seasons." },
  { id: "person", de: "Person", en: "People", blurb: "Name, family, body, feelings." },
  { id: "wohnen", de: "Wohnen", en: "Home", blurb: "Rooms, furniture, rent." },
  { id: "umwelt", de: "Umwelt", en: "World", blurb: "Weather, nature, directions." },
  { id: "reisen", de: "Reisen", en: "Travel", blurb: "Trains, tickets, hotels." },
  { id: "essen", de: "Essen", en: "Food", blurb: "Meals, shops, restaurants." },
  { id: "einkaufen", de: "Einkaufen", en: "Shopping", blurb: "Clothes, prices, paying." },
  { id: "dienste", de: "Dienste", en: "Services", blurb: "Post, bank, police, phone." },
  { id: "lernen", de: "Lernen", en: "Learning", blurb: "School, courses, the exam." },
  { id: "arbeit", de: "Arbeit", en: "Work", blurb: "Jobs, offices, holidays." },
  { id: "freizeit", de: "Freizeit", en: "Leisure", blurb: "Sport, hobbies, media." },
  { id: "alltag", de: "Alltag", en: "Everyday", blurb: "Little words that glue speech." },
];
