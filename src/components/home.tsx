import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Keyboard,
  Layers,
  Library,
  ListChecks,
  SpellCheck2,
  Stamp,
  Timer,
} from "lucide-react";
import { TOPICS, statsFor, wordsFor } from "@/data";
import { ExamTrackPicker } from "@/components/game-setup";
import { TOPIC_PALETTE, tint } from "@/lib/topic-palette";
import { stampedTopics, topicMastery, useProgress } from "@/store/progress";

const MODES = [
  {
    mode: "quiz",
    title: "Quiz Rally",
    text: "Four choices, articles included.",
    icon: ListChecks,
    color: "zahlen",
  },
  {
    mode: "speed",
    title: "Speed 45",
    text: "A 45-second combo run.",
    icon: Timer,
    color: "essen",
  },
  {
    mode: "type",
    title: "Type the Word",
    text: "English in, German out.",
    icon: Keyboard,
    color: "umwelt",
  },
  {
    mode: "verbs",
    title: "Verb Lab",
    text: "Regular, irregular, modal.",
    icon: SpellCheck2,
    color: "einkaufen",
  },
  {
    mode: "match",
    title: "Match Pairs",
    text: "Pair DE with EN on a board.",
    icon: Layers,
    color: "reisen",
  },
  {
    mode: "cards",
    title: "Flash Study",
    text: "Hear it, flip it, stamp it.",
    icon: BookOpen,
    color: "freizeit",
  },
] as const;

export function Home() {
  const mastery = useProgress((s) => s.mastery);
  const xp = useProgress((s) => s.xp);
  const track = useProgress((s) => s.track);
  const list = wordsFor(track);
  const stats = statsFor(track);
  const stamps = stampedTopics(mastery, list);
  const known = list.filter((w) => (mastery[w.id] ?? 0) >= 3).length;

  return (
    <div className="rise-in">
      <section className="relative overflow-hidden rounded-[32px] border border-border bg-surface px-6 py-7 shadow-ticket sm:px-10 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 size-40 rounded-full border-2 border-dashed border-accent/25"
        />
        <p className="text-xs uppercase tracking-[0.22em] text-muted">
          {track === "telc" ? "telc A1" : "Goethe A1 · Start Deutsch 1"}
        </p>
        <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          Wortreise
        </h1>
        <p className="mt-4 max-w-lg text-muted">
          Play through the {track === "telc" ? "telc" : "Goethe"} A1 word list — about {stats.words}{" "}
          entries, {stats.verbs} verbs with present-tense forms, and English for every card.
        </p>
        <ExamTrackPicker className="mt-6" />
        <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-3">
          <Stat k={known} v="words known" />
          <Stat k={xp} v="XP earned" />
          <Stat k={stamps.length} v="district stamps" />
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            to="/play/$mode"
            params={{ mode: "quiz" }}
            className="inline-flex h-12 items-center rounded-[14px] bg-accent px-5 text-sm font-medium text-accent-fg no-underline hover:bg-accent-hover"
          >
            Start with a quiz
          </Link>
          <Link
            to="/words"
            className="inline-flex h-12 items-center rounded-[14px] border border-border-strong bg-transparent px-5 text-sm font-medium text-fg no-underline hover:bg-surface-2"
          >
            Browse the list
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold">Choose a ticket</h2>
          <Link
            to="/pass"
            className="hidden items-center gap-1 text-sm text-accent no-underline sm:inline-flex"
          >
            <Stamp className="size-4" />
            Reisepass
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((m) => {
            const palette = TOPIC_PALETTE[m.color];
            return (
              <Link
                key={m.mode}
                to="/play/$mode"
                params={{ mode: m.mode }}
                className="group relative overflow-hidden rounded-[24px] border p-5 no-underline shadow-ticket transition-transform duration-150 hover:-translate-y-0.5"
                style={{
                  borderColor: tint(palette.base, 0.35),
                  backgroundColor: palette.soft,
                }}
              >
                <span
                  className="absolute left-0 top-6 h-8 w-2 rounded-r-full"
                  style={{ backgroundColor: palette.base }}
                />
                <m.icon className="size-5" style={{ color: palette.base }} />
                <h3
                  className="mt-3 font-display text-xl font-semibold"
                  style={{ color: palette.ink }}
                >
                  {m.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{m.text}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold">City districts</h2>
          <Link to="/words" className="hidden text-sm text-accent no-underline sm:inline-flex">
            <Library className="mr-1 size-4" />
            Dictionary
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {TOPICS.map((t) => {
            const m = topicMastery(mastery, t.id, list);
            const stamped = stamps.includes(t.id);
            const palette = TOPIC_PALETTE[t.id];
            return (
              <Link
                key={t.id}
                to="/play/$mode"
                params={{ mode: "quiz" }}
                search={{ topic: t.id }}
                className="relative overflow-hidden rounded-[20px] border p-4 no-underline"
                style={{
                  borderColor: tint(palette.base, stamped ? 0.45 : 0.18),
                  backgroundColor: stamped ? palette.soft : tint(palette.soft, 0.55),
                }}
              >
                <Stamp
                  className="pointer-events-none absolute -right-2 -top-1 size-14 rotate-[-12deg]"
                  style={{ color: tint(palette.base, stamped ? 0.5 : 0.18) }}
                />
                <div className="relative flex items-center justify-between gap-2">
                  <p className="font-display text-lg font-semibold" style={{ color: palette.ink }}>
                    {t.de}
                  </p>
                  {stamped ? (
                    <Stamp className="size-4 shrink-0" style={{ color: palette.base }} />
                  ) : null}
                </div>
                <p className="relative text-xs text-muted">{t.en}</p>
                <div
                  className="relative mt-3 h-1.5 overflow-hidden rounded-full"
                  style={{ backgroundColor: tint(palette.soft, 0.7) }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${m.pct}%`, backgroundColor: palette.base }}
                  />
                </div>
                <p className="relative mt-1.5 text-[11px] tabular-nums text-subtle">
                  {m.known}/{m.total}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ k, v }: { k: number; v: string }) {
  return (
    <p className="inline-flex items-baseline gap-1.5 text-sm leading-none text-muted">
      <span className="font-display text-[1.35rem] font-semibold leading-none tabular-nums text-fg">
        {k}
      </span>
      <span>{v}</span>
    </p>
  );
}
