import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GameSetup, ResultBanner } from "@/components/game-setup";
import { SpeakButton } from "@/components/speak-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PERSONS, regularityLabel, verbForm } from "@/data";
import { buildVerbRound, type VerbQuestion } from "@/lib/quiz";
import { playCorrect, playWrong, unlockAudio } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import { useProgress } from "@/store/progress";

export function VerbLab() {
  const navigate = useNavigate();
  const record = useProgress((s) => s.record);
  const sound = useProgress((s) => s.sound);

  const [count, setCount] = useState(10);
  const [round, setRound] = useState<VerbQuestion[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpGain, setXpGain] = useState(0);

  const q = round?.[idx];
  const done = round && idx >= round.length;

  function start() {
    unlockAudio();
    setRound(buildVerbRound(count));
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setXpGain(0);
  }

  function choose(opt: string) {
    if (!q || picked) return;
    const ok = opt === q.answer;
    setPicked(opt);
    record(q.word.id, ok, ok ? 12 : 2);
    setXpGain((x) => x + (ok ? 12 : 2));
    if (ok) {
      setCorrectCount((c) => c + 1);
      if (sound) playCorrect();
    } else if (sound) playWrong();
  }

  if (!round) {
    return (
      <GameSetup
        title="Verb Lab"
        blurb="Present-tense forms from the A1 list. Regular, irregular, mixed and modal verbs — stem changes called out."
        topic="all"
        onTopic={() => undefined}
        count={count}
        onCount={setCount}
        hideTopic
        onStart={start}
        startLabel="Open the lab"
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

  if (!q || !q.word.verb) return null;
  const v = q.word.verb;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex justify-between text-sm text-muted tabular-nums">
        <span>
          {idx + 1} / {round.length}
        </span>
        <span>{correctCount} correct</span>
      </div>
      <Progress className="mt-2" value={(idx / round.length) * 100} />

      <div className="mt-8 rounded-[28px] border border-border bg-surface p-6 shadow-ticket sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            className={cn(
              v.regularity === "regular" && "border-success/30 text-success",
              v.regularity === "irregular" && "border-danger/30 text-danger",
              v.regularity === "mixed" && "border-warn/30 text-warn",
              v.regularity === "modal" && "border-der/30 text-der",
            )}
          >
            {regularityLabel(q.word)}
          </Badge>
          <Badge>
            Perfekt: {v.aux} + {v.participle}
          </Badge>
          {v.prefix ? <Badge>separable {v.prefix}-</Badge> : null}
          {v.reflexive ? <Badge>reflexive</Badge> : null}
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-4xl font-semibold">{q.word.display}</h2>
            <p className="mt-1 text-muted">{q.word.en}</p>
          </div>
          <SpeakButton text={q.word.lemma} />
        </div>
        {v.stemNote ? <p className="mt-3 text-sm text-accent">{v.stemNote}</p> : null}
        <p className="mt-5 text-sm uppercase tracking-[0.16em] text-muted">Present tense</p>
        <p className="mt-1 font-display text-2xl">
          <span className="text-muted">{q.personLabel}</span>{" "}
          <span className="text-fg">______</span>
        </p>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {q.options.map((opt) => {
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
                "min-h-14 rounded-[16px] border px-4 py-3 text-left font-medium",
                !show && "border-border bg-surface hover:border-border-strong",
                show && isAnswer && "border-success bg-success/10",
                show && isPicked && !isAnswer && "border-danger bg-danger/10",
                show && !isAnswer && !isPicked && "opacity-50",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {picked ? (
        <div className="mt-5 overflow-hidden rounded-[20px] border border-border bg-surface">
          <table className="w-full text-sm">
            <tbody>
              {PERSONS.map((p) => (
                <tr key={p.key} className="border-t border-border first:border-0">
                  <td className="w-32 px-4 py-2.5 text-muted">{p.label}</td>
                  <td
                    className={cn("px-4 py-2.5 font-medium", p.key === q.person && "text-accent")}
                  >
                    {verbForm(q.word, p.key)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-border p-4">
            <div className="flex items-start gap-2">
              <p className="min-w-0 flex-1 text-sm text-muted">{q.word.example}</p>
              <SpeakButton text={q.word.example} className="size-9 shrink-0" />
            </div>
            <p className="text-sm text-subtle">{q.word.exampleEn}</p>
            <Button
              className="mt-3"
              onClick={() => {
                setPicked(null);
                setIdx((i) => i + 1);
              }}
            >
              {idx + 1 === round.length ? "See result" : "Next verb"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
