import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GameSetup, ResultBanner } from "@/components/game-setup";
import { SpeakButton } from "@/components/speak-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { answersMatch, wordsByTopic, type TopicId, type Word } from "@/data";
import { pickN } from "@/data";
import { playCorrect, playWrong, unlockAudio } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import { useProgress } from "@/store/progress";

const UMLAUTS = ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"] as const;

export function TypeGame() {
  const navigate = useNavigate();
  const mastery = useProgress((s) => s.mastery);
  const record = useProgress((s) => s.record);
  const sound = useProgress((s) => s.sound);

  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [count, setCount] = useState(10);
  const [queue, setQueue] = useState<Word[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "no">("idle");
  const [correctCount, setCorrectCount] = useState(0);
  const [xpGain, setXpGain] = useState(0);

  const word = queue?.[idx];
  const done = queue && idx >= queue.length;

  function start() {
    unlockAudio();
    const pool = wordsByTopic(topic).filter((w) => w.pos !== "det" && w.lemma.length > 1);
    const weighted = [...pool].sort(
      (a, b) => (mastery[a.id] ?? 0) - (mastery[b.id] ?? 0) || Math.random() - 0.5,
    );
    setQueue(pickN(weighted.slice(0, Math.max(count, 12)), count));
    setIdx(0);
    setValue("");
    setStatus("idle");
    setCorrectCount(0);
    setXpGain(0);
  }

  function check() {
    if (!word || status !== "idle") return;
    const ok =
      answersMatch(value, word.lemma) ||
      answersMatch(value, word.display) ||
      (word.verb ? answersMatch(value, word.lemma) : false);
    setStatus(ok ? "ok" : "no");
    record(word.id, ok, ok ? 12 : 2);
    setXpGain((x) => x + (ok ? 12 : 2));
    if (ok) {
      setCorrectCount((c) => c + 1);
      if (sound) playCorrect();
    } else if (sound) playWrong();
  }

  function next() {
    setValue("");
    setStatus("idle");
    setIdx((i) => i + 1);
  }

  const hint = useMemo(() => {
    if (!word) return "";
    return word.lemma[0] ?? "";
  }, [word]);

  if (!queue) {
    return (
      <GameSetup
        title="Type the Word"
        blurb="See the English, type the German. Articles are optional. Use the umlaut keys if your keyboard has none."
        topic={topic}
        onTopic={setTopic}
        count={count}
        onCount={setCount}
        onStart={start}
      />
    );
  }

  if (done) {
    return (
      <ResultBanner
        correct={correctCount}
        total={queue.length}
        xp={xpGain}
        onAgain={() => setQueue(null)}
        onHome={() => navigate({ to: "/" })}
      />
    );
  }

  if (!word) return null;

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex justify-between text-sm text-muted tabular-nums">
        <span>
          {idx + 1} / {queue.length}
        </span>
        <span>{correctCount} correct</span>
      </div>
      <Progress className="mt-2" value={(idx / queue.length) * 100} />

      <div className="mt-8 rounded-[28px] border border-border bg-surface p-6 shadow-ticket sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">English</p>
        <div className="mt-3 flex items-start justify-between gap-3">
          <h2 className="font-display text-3xl font-semibold leading-tight">{word.en}</h2>
          <SpeakButton text={word.lemma} />
        </div>
        {word.pos === "noun" && word.article ? (
          <p className="mt-3 text-sm text-muted">Include the article if you know it.</p>
        ) : null}
      </div>

      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (status === "idle") check();
          else next();
        }}
      >
        <Input
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          disabled={status !== "idle"}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type the German…"
          className={cn(
            status === "ok" && "border-success",
            status === "no" && "border-danger shake-x",
          )}
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {UMLAUTS.map((ch) => (
            <button
              key={ch}
              type="button"
              disabled={status !== "idle"}
              className="grid size-10 place-items-center rounded-[10px] border border-border bg-surface font-medium hover:bg-surface-2"
              onClick={() => setValue((v) => v + ch)}
            >
              {ch}
            </button>
          ))}
        </div>
        {status === "idle" ? (
          <p className="mt-3 text-sm text-subtle">Hint: starts with {hint}</p>
        ) : (
          <div className="mt-4 rounded-[16px] border border-border bg-surface p-4">
            <p className="text-sm">
              <span className="font-medium">{word.display}</span>
              <span className="text-muted"> — {word.en}</span>
            </p>
            <div className="mt-1 flex items-start gap-2">
              <p className="min-w-0 flex-1 text-sm text-muted">{word.example}</p>
              <SpeakButton text={word.example} className="size-9 shrink-0" />
            </div>
          </div>
        )}
        <Button className="mt-4 w-full" type="submit">
          {status === "idle" ? "Check" : idx + 1 === queue.length ? "See result" : "Next"}
        </Button>
      </form>
    </div>
  );
}
