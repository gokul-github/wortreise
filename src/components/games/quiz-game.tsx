import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GameSetup, ResultBanner } from "@/components/game-setup";
import { GenderChip } from "@/components/gender-chip";
import { SpeakButton } from "@/components/speak-button";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { TopicId } from "@/data/types";
import { buildQuiz, type QuizQuestion } from "@/lib/quiz";
import { playCorrect, playWrong, unlockAudio } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import { useProgress } from "@/store/progress";

export function QuizGame() {
  const navigate = useNavigate();
  const mastery = useProgress((s) => s.mastery);
  const direction = useProgress((s) => s.direction);
  const setDirection = useProgress((s) => s.setDirection);
  const record = useProgress((s) => s.record);
  const sound = useProgress((s) => s.sound);

  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [count, setCount] = useState(10);
  const [round, setRound] = useState<QuizQuestion[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpGain, setXpGain] = useState(0);
  const [shake, setShake] = useState(false);

  const q = round?.[idx];
  const done = round && idx >= round.length;

  function start() {
    unlockAudio();
    const qs = buildQuiz(topic, count, direction, mastery);
    setRound(qs);
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setXpGain(0);
  }

  function choose(opt: string) {
    if (!q || picked) return;
    const ok = opt === q.answer;
    setPicked(opt);
    record(q.word.id, ok, ok ? 10 : 2);
    setXpGain((x) => x + (ok ? 10 : 2));
    if (ok) {
      setCorrectCount((c) => c + 1);
      if (sound) playCorrect();
    } else {
      if (sound) playWrong();
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  }

  function next() {
    setPicked(null);
    setIdx((i) => i + 1);
  }

  useEffect(() => {
    if (!q || picked) return;
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= 4 && q.options[n - 1]) choose(q.options[n - 1]!);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!round) {
    return (
      <GameSetup
        title="Quiz Rally"
        blurb="Four choices. German to English, English to German, and articles for nouns. Keys 1–4 work on a keyboard."
        topic={topic}
        onTopic={setTopic}
        count={count}
        onCount={setCount}
        extra={
          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-fg">Direction</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {(
                [
                  ["mix", "Mix"],
                  ["de-en", "DE → EN"],
                  ["en-de", "EN → DE"],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setDirection(k)}
                  className={cn(
                    "h-10 rounded-full border px-3.5 text-sm",
                    direction === k
                      ? "border-accent bg-accent text-accent-fg"
                      : "border-border bg-surface text-fg",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        }
        onStart={start}
      />
    );
  }

  if (done) {
    return (
      <ResultBanner
        correct={correctCount}
        total={round.length}
        xp={xpGain}
        onAgain={() => setRound(null)}
        onHome={() => navigate({ to: "/" })}
      />
    );
  }

  if (!q) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between gap-4 text-sm text-muted">
        <span className="tabular-nums">
          {idx + 1} / {round.length}
        </span>
        <span className="tabular-nums">{correctCount} correct</span>
      </div>
      <Progress className="mt-2" value={((idx + (picked ? 1 : 0)) / round.length) * 100} />

      <div className={cn("mt-8 rounded-[28px] border border-border bg-surface p-6 shadow-ticket sm:p-8", shake && "shake-x")}>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          {q.kind === "article"
            ? "Which article?"
            : q.kind === "de-en"
              ? "What does this mean?"
              : "How do you say this?"}
        </p>
        <div className="mt-4 flex items-start justify-between gap-3">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {q.prompt}
          </h2>
          {q.promptLang === "de" ? <SpeakButton text={q.word.lemma} /> : null}
        </div>
        {q.word.article && q.kind !== "article" ? (
          <div className="mt-3">
            <GenderChip article={q.word.article} />
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-2">
        {q.options.map((opt, i) => {
          const show = Boolean(picked);
          const isAnswer = opt === q.answer;
          const isPicked = opt === picked;
          return (
            <button
              key={opt}
              type="button"
              disabled={Boolean(picked)}
              onClick={() => choose(opt)}
              className={cn(
                "flex min-h-14 items-center gap-3 rounded-[16px] border px-4 py-3 text-left text-base transition-colors",
                !show && "border-border bg-surface hover:border-border-strong hover:bg-surface-2",
                show && isAnswer && "border-success bg-success/10 text-fg",
                show && isPicked && !isAnswer && "border-danger bg-danger/10 text-fg",
                show && !isAnswer && !isPicked && "border-border bg-surface opacity-60",
              )}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-current/20 text-xs tabular-nums text-muted">
                {i + 1}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {picked ? (
        <div className="mt-5 rounded-[20px] border border-border bg-surface p-4">
          <p className="text-sm text-fg">
            <span className="font-medium">{q.word.display}</span>
            <span className="text-muted"> — {q.word.en}</span>
          </p>
          <p className="mt-2 text-sm text-muted">{q.word.example}</p>
          <p className="text-sm text-subtle">{q.word.exampleEn}</p>
          <Button className="mt-4 w-full sm:w-auto" onClick={next}>
            {idx + 1 === round.length ? "See result" : "Next"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
