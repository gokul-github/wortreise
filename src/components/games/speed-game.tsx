import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { GameSetup, ResultBanner } from "@/components/game-setup";
import { Progress } from "@/components/ui/progress";
import type { TopicId } from "@/data/types";
import { buildQuiz, type QuizQuestion } from "@/lib/quiz";
import { playCorrect, playTick, playWrong, unlockAudio } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import { useProgress } from "@/store/progress";

const SECONDS = 45;

export function SpeedGame() {
  const navigate = useNavigate();
  const mastery = useProgress((s) => s.mastery);
  const direction = useProgress((s) => s.direction);
  const record = useProgress((s) => s.record);
  const bumpSpeed = useProgress((s) => s.bumpSpeed);
  const sound = useProgress((s) => s.sound);

  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [live, setLive] = useState(false);
  const [queue, setQueue] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [left, setLeft] = useState(SECONDS);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [xpGain, setXpGain] = useState(0);
  const [shake, setShake] = useState(false);
  const [done, setDone] = useState(false);
  const ended = useRef(false);

  const q = queue[idx];

  function start() {
    unlockAudio();
    ended.current = false;
    const qs = buildQuiz(topic, 40, direction, mastery);
    setQueue(qs);
    setIdx(0);
    setLeft(SECONDS);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setCorrectCount(0);
    setTotal(0);
    setXpGain(0);
    setDone(false);
    setLive(true);
  }

  useEffect(() => {
    if (!live || done) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = (now - t0) / 1000;
      const remain = Math.max(0, SECONDS - elapsed);
      setLeft(remain);
      if (remain > 0) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // score/bestCombo captured via finish using refs would be better;
    // we finish from the last rendered values through a separate effect below.
  }, [live, done]);

  const scoreRef = useRef({ score: 0, best: 0, xp: 0, combo: 0 });
  scoreRef.current = { score, best: bestCombo, xp: xpGain, combo };

  useEffect(() => {
    if (!live || done) return;
    if (left > 0) return;
    finish(scoreRef.current.score, scoreRef.current.best, scoreRef.current.xp);
  }, [left, live, done]);

  function finish(sc: number, comboBest: number, xp: number) {
    if (ended.current) return;
    ended.current = true;
    setLive(false);
    setDone(true);
    bumpSpeed(sc, comboBest);
    void xp;
  }

  function choose(opt: string) {
    if (!q || done || !live) return;
    const ok = opt === q.answer;
    setTotal((t) => t + 1);
    record(q.word.id, ok, ok ? 8 + combo : 1);
    if (ok) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setBestCombo((b) => Math.max(b, nextCombo));
      const gain = 8 + Math.min(20, nextCombo * 2);
      setScore((s) => s + gain);
      setXpGain((x) => x + gain);
      setCorrectCount((c) => c + 1);
      if (sound) playCorrect();
    } else {
      setCombo(0);
      setXpGain((x) => x + 1);
      if (sound) playWrong();
      setShake(true);
      setTimeout(() => setShake(false), 220);
    }
    setIdx((i) => (i + 1) % queue.length);
  }

  if (!live && !done) {
    return (
      <GameSetup
        title="Speed 45"
        blurb="Forty-five seconds. Combo multiplies points. Miss and the combo drops to zero."
        topic={topic}
        onTopic={setTopic}
        onStart={start}
        startLabel="Start the clock"
      />
    );
  }

  if (done) {
    return (
      <ResultBanner
        correct={correctCount}
        total={total}
        xp={xpGain}
        onAgain={() => {
          setDone(false);
          setLive(false);
        }}
        onHome={() => navigate({ to: "/" })}
      />
    );
  }

  if (!q) return null;

  const urgent = left <= 8;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Score</p>
          <p className="font-display text-3xl font-semibold tabular-nums">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Combo</p>
          <p className="font-display text-3xl font-semibold tabular-nums">×{combo}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Time</p>
          <p
            className={cn(
              "font-display text-3xl font-semibold tabular-nums",
              urgent && "text-danger",
            )}
          >
            {Math.ceil(left)}
          </p>
        </div>
      </div>
      <Progress className="mt-3" value={(left / SECONDS) * 100} />

      <div className={cn("mt-8 rounded-[28px] border border-border bg-surface p-6 shadow-ticket sm:p-8", shake && "shake-x")}>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          {q.kind === "en-de" ? "German for" : "Means"}
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold leading-tight">{q.prompt}</h2>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {q.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => {
              if (urgent && sound) playTick();
              choose(opt);
            }}
            className="min-h-14 rounded-[16px] border border-border bg-surface px-4 py-3 text-left hover:border-border-strong hover:bg-surface-2"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
