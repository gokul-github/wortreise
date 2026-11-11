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
import { STATS, TOPICS } from "@/data";
import { cn } from "@/lib/utils";
import { stampedTopics, topicMastery, useProgress } from "@/store/progress";

const MODES = [
  {
    mode: "quiz",
    title: "Quiz Rally",
    text: "Four choices, articles included.",
    icon: ListChecks,
  },
  {
    mode: "speed",
    title: "Speed 45",
    text: "A 45-second combo run.",
    icon: Timer,
  },
  {
    mode: "type",
    title: "Type the Word",
    text: "English in, German out.",
    icon: Keyboard,
  },
  {
    mode: "verbs",
    title: "Verb Lab",
    text: "Regular, irregular, modal.",
    icon: SpellCheck2,
  },
  {
    mode: "match",
    title: "Match Pairs",
    text: "Pair DE with EN on a board.",
    icon: Layers,
  },
  {
    mode: "cards",
    title: "Flash Study",
    text: "Hear it, flip it, stamp it.",
    icon: BookOpen,
  },
] as const;

export function Home() {
  const mastery = useProgress((s) => s.mastery);
  const xp = useProgress((s) => s.xp);
  const stamps = stampedTopics(mastery);
  const known = Object.values(mastery).filter((n) => n >= 3).length;

  return (
    <div className="rise-in">
      <section className="relative overflow-hidden rounded-[32px] border border-border bg-surface px-6 py-7 shadow-ticket sm:px-10 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 size-40 rounded-full border-2 border-dashed border-accent/25"
        />
        <p className="text-xs uppercase tracking-[0.22em] text-muted">
          Goethe A1 · Start Deutsch 1
        </p>
        <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          Wortreise
        </h1>
        <p className="mt-4 max-w-lg text-muted">
          Play through the official A1 word list — about {STATS.words} entries, {STATS.verbs} verbs
          with present-tense forms, and English for every card.
        </p>
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
          {MODES.map((m) => (
            <Link
              key={m.mode}
              to="/play/$mode"
              params={{ mode: m.mode }}
              className="group relative overflow-hidden rounded-[24px] border border-border bg-surface p-5 no-underline shadow-ticket transition-transform duration-150 hover:-translate-y-0.5"
            >
              <span className="absolute left-0 top-6 h-8 w-2 rounded-r-full bg-accent/80" />
              <m.icon className="size-5 text-accent" />
              <h3 className="mt-3 font-display text-xl font-semibold text-fg">{m.title}</h3>
              <p className="mt-1 text-sm text-muted">{m.text}</p>
            </Link>
          ))}
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
            const m = topicMastery(mastery, t.id);
            const stamped = stamps.includes(t.id);
            return (
              <Link
                key={t.id}
                to="/play/$mode"
                params={{ mode: "quiz" }}
                search={{ topic: t.id }}
                className="rounded-[20px] border border-border bg-surface p-4 no-underline"
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-semibold text-fg">{t.de}</p>
                  {stamped ? <Stamp className="size-4 text-accent" /> : null}
                </div>
                <p className="text-xs text-muted">{t.en}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={cn("h-full rounded-full bg-accent")}
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] tabular-nums text-subtle">
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
