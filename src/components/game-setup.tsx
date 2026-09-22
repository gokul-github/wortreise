import { TOPICS, type TopicId } from "@/data/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GameSetup({
  title,
  blurb,
  topic,
  onTopic,
  count,
  onCount,
  counts = [10, 20, 30],
  extra,
  onStart,
  startLabel = "Start round",
  hideTopic = false,
}: {
  title: string;
  blurb: string;
  topic: TopicId | "all";
  onTopic: (t: TopicId | "all") => void;
  count?: number;
  onCount?: (n: number) => void;
  counts?: number[];
  extra?: React.ReactNode;
  onStart: () => void;
  startLabel?: string;
  hideTopic?: boolean;
}) {
  return (
    <div className="rise-in mx-auto max-w-2xl">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Start Deutsch 1</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-fg">{title}</h1>
      <p className="mt-3 max-w-prose text-muted">{blurb}</p>

      {hideTopic ? null : (
        <fieldset className="mt-8">
          <legend className="text-sm font-medium text-fg">District</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip active={topic === "all"} onClick={() => onTopic("all")}>
              Whole city
            </Chip>
            {TOPICS.map((t) => (
              <Chip key={t.id} active={topic === t.id} onClick={() => onTopic(t.id)}>
                {t.de}
              </Chip>
            ))}
          </div>
        </fieldset>
      )}

      {onCount && count != null ? (
        <fieldset className={hideTopic ? "mt-8" : "mt-6"}>
          <legend className="text-sm font-medium text-fg">Length</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {counts.map((n) => (
              <Chip key={n} active={count === n} onClick={() => onCount(n)}>
                {n}
              </Chip>
            ))}
          </div>
        </fieldset>
      ) : null}

      {extra}

      <Button className="mt-8 w-full sm:w-auto" size="lg" onClick={onStart}>
        {startLabel}
      </Button>
    </div>
  );
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-full border px-3.5 text-sm",
        active
          ? "border-accent bg-accent text-accent-fg"
          : "border-border bg-surface text-fg hover:border-border-strong",
      )}
    >
      {children}
    </button>
  );
}

export function ResultBanner({
  correct,
  total,
  xp,
  onAgain,
  onHome,
}: {
  correct: number;
  total: number;
  xp: number;
  onAgain: () => void;
  onHome: () => void;
}) {
  const pct = total ? Math.round((correct / total) * 100) : 0;
  return (
    <div className="pop-in mx-auto max-w-lg rounded-[28px] border border-border bg-surface p-6 shadow-ticket sm:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Round stamped</p>
      <h2 className="mt-2 font-display text-3xl font-semibold">
        {pct >= 80 ? "Klar." : pct >= 50 ? "Gut unterwegs." : "Noch einmal."}
      </h2>
      <p className="mt-3 text-muted">
        <span className="tabular-nums font-medium text-fg">{correct}</span> of{" "}
        <span className="tabular-nums">{total}</span> correct ·{" "}
        <span className="tabular-nums font-medium text-fg">+{xp}</span> XP
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button onClick={onAgain} className="flex-1">
          Play again
        </Button>
        <Button variant="secondary" onClick={onHome} className="flex-1">
          Station hall
        </Button>
      </div>
    </div>
  );
}
