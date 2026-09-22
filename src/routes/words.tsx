import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Dictionary } from "@/components/dictionary";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/words")({ component: WordsPage });

function WordsPage() {
  return (
    <Shell>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted no-underline hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Station hall
      </Link>
      <Dictionary />
    </Shell>
  );
}
