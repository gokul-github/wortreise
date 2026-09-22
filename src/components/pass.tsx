import { Stamp } from "lucide-react";
import { TOPICS, STATS, VERBS } from "@/data";
import { Button } from "@/components/ui/button";
import { stampedTopics, topicMastery, useProgress } from "@/store/progress";
import { cn } from "@/lib/utils";

export function Pass() {
  const mastery = useProgress((s) => s.mastery);
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const bestSpeed = useProgress((s) => s.bestSpeedScore);
  const bestCombo = useProgress((s) => s.bestCombo);
  const reset = useProgress((s) => s.reset);
  const stamps = stampedTopics(mastery);
  const known = Object.values(mastery).filter((n) => n >= 3).length;
  const verbKnown = VERBS.filter((v) => (mastery[v.id] ?? 0) >= 3).length;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Collect the city</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Reisepass</h1>
      <p className="mt-2 text-muted">
        A district stamps when you know 40% of its words (mastery 3 of 5). Keep travelling.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Mini k={xp} v="XP" />
        <Mini k={streak} v="day streak" />
        <Mini k={known} v={`of ${STATS.words} known`} />
        <Mini k={verbKnown} v={`of ${STATS.verbs} verbs`} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted">
        <p>
          Best Speed 45: <span className="tabular-nums font-medium text-fg">{bestSpeed}</span>
        </p>
        <p>
          Best combo: <span className="tabular-nums font-medium text-fg">×{bestCombo}</span>
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TOPICS.map((t) => {
          const m = topicMastery(mastery, t.id);
          const on = stamps.includes(t.id);
          return (
            <div
              key={t.id}
              className={cn(
                "relative overflow-hidden rounded-[24px] border p-4",
                on ? "border-accent/40 bg-accent-soft" : "border-border bg-surface",
              )}
            >
              <Stamp
                className={cn(
                  "absolute -right-2 -top-1 size-16 rotate-[-12deg]",
                  on ? "text-accent/40" : "text-border",
                )}
              />
              <p className="font-display text-lg font-semibold">{t.de}</p>
              <p className="text-xs text-muted">{t.en}</p>
              <p className="mt-3 text-sm tabular-nums text-fg">
                {m.pct}% · {m.known}/{m.total}
              </p>
            </div>
          );
        })}
      </div>

      <Button
        variant="ghost"
        className="mt-10 text-muted"
        onClick={() => {
          if (confirm("Reset all local progress?")) reset();
        }}
      >
        Reset local progress
      </Button>
    </div>
  );
}

function Mini({ k, v }: { k: number; v: string }) {
  return (
    <div className="rounded-[20px] border border-border bg-surface p-4">
      <p className="font-display text-2xl font-semibold tabular-nums">{k}</p>
      <p className="text-xs text-muted">{v}</p>
    </div>
  );
}
