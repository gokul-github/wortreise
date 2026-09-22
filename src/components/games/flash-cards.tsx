import { Check, RotateCcw } from "lucide-react";
import { useState } from "react";
import { GameSetup } from "@/components/game-setup";
import { GenderChip } from "@/components/gender-chip";
import { SpeakButton } from "@/components/speak-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PERSONS, pickN, regularityLabel, verbForm, wordsByTopic, type TopicId, type Word } from "@/data";
import { playCorrect, playWrong, unlockAudio } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import { useProgress } from "@/store/progress";

export function FlashCards() {
  const mastery = useProgress((s) => s.mastery);
  const record = useProgress((s) => s.record);
  const sound = useProgress((s) => s.sound);

  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [count, setCount] = useState(12);
  const [queue, setQueue] = useState<Word[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  const word = queue?.[idx];
  const done = queue && idx >= queue.length;

  function start() {
    unlockAudio();
    const pool = wordsByTopic(topic);
    const weighted = [...pool].sort(
      (a, b) => (mastery[a.id] ?? 0) - (mastery[b.id] ?? 0) || Math.random() - 0.5,
    );
    setQueue(pickN(weighted.slice(0, Math.max(count, 16)), count));
    setIdx(0);
    setFlipped(false);
    setKnown(0);
  }

  function mark(ok: boolean) {
    if (!word) return;
    record(word.id, ok, ok ? 8 : 2);
    if (ok) {
      setKnown((k) => k + 1);
      if (sound) playCorrect();
    } else if (sound) playWrong();
    setFlipped(false);
    setIdx((i) => i + 1);
  }

  if (!queue) {
    return (
      <GameSetup
        title="Flash Study"
        blurb="One card at a time. Hear it, flip it, then stamp Knew it or Still learning. Weak words show up first."
        topic={topic}
        onTopic={setTopic}
        count={count}
        onCount={setCount}
        counts={[8, 12, 20]}
        onStart={start}
        startLabel="Draw cards"
      />
    );
  }

  if (done) {
    return (
      <div className="pop-in mx-auto max-w-lg rounded-[28px] border border-border bg-surface p-8 shadow-ticket">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Deck complete</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">
          {known} of {queue.length} felt familiar
        </h2>
        <div className="mt-6 flex gap-2">
          <Button onClick={() => setQueue(null)}>Study again</Button>
        </div>
      </div>
    );
  }

  if (!word) return null;

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-sm text-muted tabular-nums">
        {idx + 1} / {queue.length}
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="mt-4 w-full rounded-[28px] border border-border bg-surface p-8 text-left shadow-ticket"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            {flipped ? "English + example" : "German"}
          </p>
          <SpeakButton text={word.lemma} />
        </div>
        <div className={cn("mt-4", !flipped && "min-h-[140px]")}>
          {!flipped ? (
            <>
              <h2 className="font-display text-4xl font-semibold leading-tight">{word.display}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {word.article ? <GenderChip article={word.article} /> : null}
                {word.pos === "verb" ? <Badge>{regularityLabel(word)}</Badge> : null}
                <Badge className="capitalize">{word.pos}</Badge>
              </div>
            </>
          ) : (
            <div className="rise-in">
              <h2 className="font-display text-3xl font-semibold">{word.en}</h2>
              {word.plural ? (
                <p className="mt-2 text-sm text-muted">Plural: {word.plural}</p>
              ) : null}
              {word.feminine ? (
                <p className="text-sm text-muted">Feminine: {word.feminine}</p>
              ) : null}
              <p className="mt-4 text-fg">{word.example}</p>
              <p className="mt-1 text-sm text-muted">{word.exampleEn}</p>
              {word.verb ? (
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  {PERSONS.map((p) => (
                    <li key={p.key}>
                      <span className="text-muted">{p.label}</span>{" "}
                      <span className="font-medium">{verbForm(word, p.key)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
        <p className="mt-6 text-xs text-subtle">Tap the card to flip</p>
      </button>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="secondary" className="h-14" onClick={() => mark(false)}>
          <RotateCcw className="size-4" />
          Still learning
        </Button>
        <Button className="h-14" onClick={() => mark(true)}>
          <Check className="size-4" />
          Knew it
        </Button>
      </div>
    </div>
  );
}
