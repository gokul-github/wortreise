import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { GenderChip } from "@/components/gender-chip";
import { SpeakButton } from "@/components/speak-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  PERSONS,
  STATS,
  TOPICS,
  WORDS,
  regularityLabel,
  verbForm,
  type TopicId,
  type Word,
} from "@/data";
import { cn } from "@/lib/utils";
import { useProgress } from "@/store/progress";

function rank(w: Word, needle: string) {
  const lemma = w.lemma.toLowerCase();
  const en = w.en.toLowerCase();
  if (lemma === needle) return 0;
  if (en === needle) return 1;
  if (lemma.startsWith(needle)) return 2;
  if (en.startsWith(needle)) return 3;
  if (w.pos === "verb") return 4;
  return 5;
}

export function Dictionary() {
  const mastery = useProgress((s) => s.mastery);
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [pos, setPos] = useState<"all" | "noun" | "verb">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = WORDS.filter((w) => {
      if (topic !== "all" && w.topic !== topic) return false;
      if (pos === "noun" && w.pos !== "noun") return false;
      if (pos === "verb" && w.pos !== "verb") return false;
      if (!needle) return true;
      return (
        w.lemma.toLowerCase().includes(needle) ||
        w.en.toLowerCase().includes(needle) ||
        w.display.toLowerCase().includes(needle)
      );
    });
    if (!needle) return filtered;
    return [...filtered].sort((a, b) => rank(a, needle) - rank(b, needle));
  }, [q, topic, pos]);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Word list</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Dictionary</h1>
      <p className="mt-2 text-muted">
        {STATS.words} entries from Start Deutsch 1, with example sentences from the official list.
      </p>

      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search German or English…"
          className="pl-10"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <FilterChip active={topic === "all"} onClick={() => setTopic("all")}>
          All topics
        </FilterChip>
        {TOPICS.map((t) => (
          <FilterChip key={t.id} active={topic === t.id} onClick={() => setTopic(t.id)}>
            {t.de}
          </FilterChip>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {(["all", "noun", "verb"] as const).map((p) => (
          <FilterChip key={p} active={pos === p} onClick={() => setPos(p)}>
            {p === "all" ? "All types" : p === "noun" ? "Nouns" : "Verbs"}
          </FilterChip>
        ))}
      </div>

      <p className="mt-4 text-sm tabular-nums text-subtle">{list.length} words</p>

      <ul className="mt-3 divide-y divide-border overflow-hidden rounded-[24px] border border-border bg-surface">
        {list.slice(0, 250).map((w) => (
          <WordRow
            key={w.id}
            word={w}
            mastery={mastery[w.id] ?? 0}
            open={openId === w.id}
            onToggle={() => setOpenId(openId === w.id ? null : w.id)}
          />
        ))}
      </ul>
      {list.length > 250 ? (
        <p className="mt-3 text-sm text-muted">Showing 250 of {list.length}. Narrow the search.</p>
      ) : null}
    </div>
  );
}

function FilterChip({
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
        "h-8 rounded-full border px-3 text-xs",
        active ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface text-fg",
      )}
    >
      {children}
    </button>
  );
}

function WordRow({
  word,
  mastery,
  open,
  onToggle,
}: {
  word: Word;
  mastery: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-surface-2"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {word.article ? <GenderChip article={word.article} /> : null}
            <span className="font-medium text-fg">{word.lemma}</span>
            {word.pos === "verb" ? (
              <Badge
                className={cn(
                  word.verb?.regularity === "irregular" && "text-danger",
                  word.verb?.regularity === "regular" && "text-success",
                )}
              >
                {regularityLabel(word)}
              </Badge>
            ) : null}
          </div>
          <p className="truncate text-sm text-muted">{word.en}</p>
        </div>
        <span className="mt-1 text-[11px] tabular-nums text-subtle">{mastery}/5</span>
      </button>
      {open ? (
        <div className="border-t border-border bg-bg/50 px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-start gap-2">
                <p className="min-w-0 flex-1 text-sm text-fg">{word.example}</p>
                <SpeakButton text={word.example} className="size-9 shrink-0" />
              </div>
              <p className="mt-1 text-sm text-muted">{word.exampleEn}</p>
              {word.plural ? (
                <p className="mt-2 text-sm text-muted">Plural: {word.plural}</p>
              ) : null}
              {word.feminine ? (
                <p className="text-sm text-muted">Also: die {word.feminine}</p>
              ) : null}
            </div>
            <SpeakButton text={word.lemma} />
          </div>
          {word.verb ? (
            <table className="mt-3 w-full text-sm">
              <tbody>
                {PERSONS.map((p) => (
                  <tr key={p.key} className="border-t border-border">
                    <td className="py-1.5 pr-3 text-muted">{p.label}</td>
                    <td className="py-1.5 font-medium">{verbForm(word, p.key)}</td>
                  </tr>
                ))}
                <tr className="border-t border-border">
                  <td className="py-1.5 pr-3 text-muted">Participle</td>
                  <td className="py-1.5 font-medium">
                    {word.verb.aux} + {word.verb.participle}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}
