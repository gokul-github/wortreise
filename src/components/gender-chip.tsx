import { cn } from "@/lib/utils";

export function GenderChip({ article }: { article: "der" | "die" | "das" }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-10 justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
        article === "der" && "bg-der/15 text-der",
        article === "die" && "bg-die/15 text-die",
        article === "das" && "bg-das/15 text-das",
      )}
    >
      {article}
    </span>
  );
}
