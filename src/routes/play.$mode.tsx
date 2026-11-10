import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { FlashCards } from "@/components/games/flash-cards";
import { MatchGame } from "@/components/games/match-game";
import { QuizGame } from "@/components/games/quiz-game";
import { SpeedGame } from "@/components/games/speed-game";
import { TypeGame } from "@/components/games/type-game";
import { VerbLab } from "@/components/games/verb-lab";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/play/$mode")({ component: PlayMode });

function PlayMode() {
  const { mode } = Route.useParams();

  return (
    <Shell>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted no-underline hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Station hall
      </Link>
      {mode === "quiz" ? <QuizGame /> : null}
      {mode === "speed" ? <SpeedGame /> : null}
      {mode === "type" ? <TypeGame /> : null}
      {mode === "verbs" ? <VerbLab /> : null}
      {mode === "match" ? <MatchGame /> : null}
      {mode === "cards" ? <FlashCards /> : null}
      {!["quiz", "speed", "type", "verbs", "match", "cards"].includes(mode) ? (
        <p className="text-muted">Unknown ticket. Head back to the hall.</p>
      ) : null}
    </Shell>
  );
}
