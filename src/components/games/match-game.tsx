import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GameSetup, ResultBanner } from "@/components/game-setup";
import { Progress } from "@/components/ui/progress";
import { shuffle, type TopicId, type Word } from "@/data";
import { matchPairs } from "@/lib/quiz";
import { playCorrect, playStamp, playWrong, unlockAudio } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import { useProgress } from "@/store/progress";

type Card = { key: string; word: Word; side: "de" | "en"; label: string };

export function MatchGame() {
  const navigate = useNavigate();
  const record = useProgress((s) => s.record);
  const sound = useProgress((s) => s.sound);

  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [cards, setCards] = useState<Card[] | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [sel, setSel] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpGain, setXpGain] = useState(0);
  const [pairTotal, setPairTotal] = useState(6);

  const done = cards && matched.size === pairTotal;

  function start() {
    unlockAudio();
    const pairs = matchPairs(topic, 6);
    const built: Card[] = [];
    for (const w of pairs) {
      built.push({ key: `${w.id}-de`, word: w, side: "de", label: w.display });
      built.push({ key: `${w.id}-en`, word: w, side: "en", label: w.en });
    }
    setCards(shuffle(built));
    setMatched(new Set());
    setSel([]);
    setWrong([]);
    setMoves(0);
    setCorrectCount(0);
    setXpGain(0);
    setPairTotal(pairs.length);
  }

  function tap(key: string) {
    if (!cards || wrong.length) return;
    const card = cards.find((c) => c.key === key);
    if (!card || matched.has(card.word.id) || sel.includes(key)) return;

    const next = [...sel, key];
    if (next.length === 1) {
      setSel(next);
      return;
    }
    setMoves((m) => m + 1);
    const a = cards.find((c) => c.key === next[0]);
    const b = cards.find((c) => c.key === next[1]);
    if (!a || !b) return;
    const ok = a.word.id === b.word.id && a.side !== b.side;
    if (ok) {
      if (sound) playCorrect();
      record(a.word.id, true, 14);
      setCorrectCount((c) => c + 1);
      setXpGain((x) => x + 14);
      const mset = new Set(matched);
      mset.add(a.word.id);
      setMatched(mset);
      setSel([]);
      if (mset.size === pairTotal && sound) playStamp();
    } else {
      if (sound) playWrong();
      record(a.word.id, false, 1);
      setXpGain((x) => x + 1);
      setWrong(next);
      setTimeout(() => {
        setWrong([]);
        setSel([]);
      }, 550);
    }
  }

  if (!cards) {
    return (
      <GameSetup
        title="Match Pairs"
        blurb="Six German–English pairs. Tap one, then its partner. A full board stamps the round."
        topic={topic}
        onTopic={setTopic}
        onStart={start}
        startLabel="Deal the tickets"
      />
    );
  }

  if (done) {
    return (
      <ResultBanner
        correct={correctCount}
        total={pairTotal}
        xp={xpGain}
        onAgain={() => setCards(null)}
        onHome={() => navigate({ to: "/" })}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex justify-between text-sm text-muted tabular-nums">
        <span>
          {matched.size} / {pairTotal} pairs
        </span>
        <span>{moves} moves</span>
      </div>
      <Progress className="mt-2" value={(matched.size / pairTotal) * 100} />

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {cards.map((c) => {
          const isMatched = matched.has(c.word.id);
          const isSel = sel.includes(c.key);
          const isWrong = wrong.includes(c.key);
          return (
            <button
              key={c.key}
              type="button"
              disabled={isMatched}
              onClick={() => tap(c.key)}
              className={cn(
                "min-h-[88px] rounded-[16px] border px-3 py-3 text-left text-sm transition-colors",
                isMatched && "border-success/40 bg-success/10 text-muted",
                !isMatched && isSel && "border-accent bg-accent-soft",
                !isMatched && isWrong && "border-danger bg-danger/10 shake-x",
                !isMatched && !isSel && !isWrong && "border-border bg-surface hover:border-border-strong",
              )}
            >
              <span className="block text-[10px] uppercase tracking-[0.16em] text-muted">
                {c.side === "de" ? "DE" : "EN"}
              </span>
              <span className="mt-1 block font-medium leading-snug">{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
