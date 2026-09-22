# Wortreise

A travel-journal game for the Goethe-Zertifikat A1 *Start Deutsch 1* word list.

Play through ~800 entries (the official A1 vocabulary plus related forms), each with English, an example sentence, and spoken German. **148 verbs** include present-tense forms (ich–Sie), regular / irregular / mixed / modal labels, and past participles.

Progress (XP, streak, mastery, district stamps) is stored in the browser — no account required.

## Play

| Mode | What you do |
| --- | --- |
| **Quiz Rally** | Four choices, DE↔EN, articles on nouns |
| **Speed 45** | 45-second combo run |
| **Type the Word** | English prompt, type the German (umlaut keys included) |
| **Verb Lab** | Fill the present-tense blank — *du fährst*, *er isst*… |
| **Match Pairs** | Tap German to English on a board |
| **Flash Study** | Hear it, flip it, stamp it |

Open **Words** to browse by topic, noun, or verb. The **Reisepass** tracks XP, a streak, and district stamps when a topic hits 40% mastery.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (default port **8080**).

```bash
npm run typecheck
npm run build
```

## Stack

React 19, TanStack Start, Tailwind v4, Zustand (localStorage save).

Vocabulary is adapted from the Goethe-Institut *Goethe-Zertifikat A1: Start Deutsch 1* word list for personal study.
