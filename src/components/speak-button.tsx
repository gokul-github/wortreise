import { Volume2 } from "lucide-react";
import { speakGerman, unlockSpeech } from "@/lib/speech";
import { cn } from "@/lib/utils";

export function SpeakButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={`Speak ${text}`}
      className={cn(
        "grid size-11 place-items-center rounded-[12px] border border-border bg-surface text-accent hover:bg-accent-soft",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        unlockSpeech();
        speakGerman(text);
      }}
    >
      <Volume2 className="size-4" />
    </button>
  );
}
