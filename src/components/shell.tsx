import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, House, Library, Stamp, Volume2, VolumeX } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { unlockAudio } from "@/lib/sfx";
import { unlockSpeech } from "@/lib/speech";
import { useProgress } from "@/store/progress";

export function Shell({ children }: { children: React.ReactNode }) {
  const hydrate = useProgress((s) => s.hydrate);
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const sound = useProgress((s) => s.sound);
  const setSound = useProgress((s) => s.setSound);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-baseline gap-2 no-underline text-fg">
              <span className="font-display text-xl font-semibold tracking-tight">Wortreise</span>
              <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted sm:inline">
                A1
              </span>
            </Link>
            <nav className="hidden items-center gap-5 text-sm sm:flex">
              <Link
                to="/"
                className={cn(
                  "no-underline",
                  path === "/" ? "text-fg font-medium" : "text-muted hover:text-fg",
                )}
              >
                Play
              </Link>
              <Link
                to="/words"
                className={cn(
                  "no-underline",
                  path.startsWith("/words") ? "text-fg font-medium" : "text-muted hover:text-fg",
                )}
              >
                Words
              </Link>
              <Link
                to="/pass"
                className={cn(
                  "no-underline",
                  path.startsWith("/pass") ? "text-fg font-medium" : "text-muted hover:text-fg",
                )}
              >
                Pass
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="tabular-nums text-muted">
              <span className="text-fg font-medium">{xp}</span> XP
            </span>
            <span className="text-border-strong">·</span>
            <span className="tabular-nums text-muted">
              <span className="text-fg font-medium">{streak}</span> day
              {streak === 1 ? "" : "s"}
            </span>
            <button
              type="button"
              aria-label={sound ? "Mute sounds" : "Unmute sounds"}
              className="ml-1 grid size-10 place-items-center rounded-[10px] text-muted hover:bg-surface-2 hover:text-fg"
              onClick={() => {
                unlockAudio();
                unlockSpeech();
                setSound(!sound);
              }}
            >
              {sound ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-6 sm:pb-10">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 backdrop-blur-sm sm:hidden">
        <div className="grid grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]">
          <NavItem to="/" icon={House} label="Play" active={path === "/"} />
          <NavItem to="/words" icon={Library} label="Words" active={path.startsWith("/words")} />
          <NavItem to="/pass" icon={Stamp} label="Pass" active={path.startsWith("/pass")} />
          <NavItem
            to="/play/$mode"
            icon={BookOpen}
            label="Study"
            active={path.startsWith("/play/cards")}
          />
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  to,
  icon: Icon,
  label,
  active,
}: {
  to: "/" | "/words" | "/pass" | "/play/$mode";
  icon: typeof House;
  label: string;
  active: boolean;
}) {
  const params = to === "/play/$mode" ? { mode: "cards" } : undefined;
  return (
    <Link
      to={to}
      params={params}
      className={cn(
        "flex flex-col items-center gap-0.5 py-2.5 text-[11px] no-underline",
        active ? "text-accent" : "text-muted",
      )}
    >
      <Icon className="size-5" />
      {label}
    </Link>
  );
}
