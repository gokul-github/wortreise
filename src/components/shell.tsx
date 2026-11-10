import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, House, Library, LogIn, Stamp, Volume2, VolumeX } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { unlockAudio } from "@/lib/sfx";
import { unlockSpeech } from "@/lib/speech";
import { useProgress } from "@/store/progress";
import { SignedIn, SignedOut, UserButton, SIGN_IN_PATH } from "@/lib/auth/gates";

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
      <header className="safe-pad-top sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-4">
          <div className="flex min-w-0 items-center gap-6">
            <Link to="/" className="flex min-w-0 items-baseline gap-2 text-fg no-underline">
              <span className="truncate font-display text-lg font-semibold leading-none tracking-tight sm:text-xl">
                Wortreise
              </span>
              <span className="hidden text-[11px] uppercase leading-none tracking-[0.18em] text-muted sm:inline">
                A1
              </span>
            </Link>
            <nav className="hidden items-center gap-5 text-sm sm:flex">
              <Link
                to="/"
                className={cn(
                  "no-underline",
                  path === "/" ? "font-medium text-fg" : "text-muted hover:text-fg",
                )}
              >
                Play
              </Link>
              <Link
                to="/words"
                className={cn(
                  "no-underline",
                  path.startsWith("/words") ? "font-medium text-fg" : "text-muted hover:text-fg",
                )}
              >
                Words
              </Link>
              <Link
                to="/pass"
                className={cn(
                  "no-underline",
                  path.startsWith("/pass") ? "font-medium text-fg" : "text-muted hover:text-fg",
                )}
              >
                Pass
              </Link>
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-sm leading-none sm:gap-2">
            <span className="inline-flex items-baseline gap-1 whitespace-nowrap tabular-nums text-muted">
              <span className="font-medium text-fg">{xp}</span>
              <span>XP</span>
            </span>
            <span className="text-border-strong" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-baseline gap-1 whitespace-nowrap tabular-nums text-muted">
              <span className="font-medium text-fg">{streak}</span>
              <span className="hidden sm:inline">{streak === 1 ? "day" : "days"}</span>
              <span className="sm:hidden">d</span>
            </span>
            <button
              type="button"
              aria-label={sound ? "Mute sounds" : "Unmute sounds"}
              className="grid size-10 shrink-0 place-items-center rounded-[10px] text-muted hover:bg-surface-2 hover:text-fg"
              onClick={() => {
                unlockAudio();
                unlockSpeech();
                setSound(!sound);
              }}
            >
              {sound ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </button>
            <SignedOut>
              <Link
                to={SIGN_IN_PATH}
                className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[10px] bg-accent px-2.5 text-sm font-medium leading-none text-accent-fg no-underline hover:bg-accent/90 sm:px-3"
              >
                <LogIn className="size-4 shrink-0" />
                <span className="hidden min-[400px]:inline">Sign in</span>
                <span className="sr-only min-[400px]:hidden">Sign in</span>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] pt-6 sm:pb-10">
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 backdrop-blur-sm sm:hidden">
        <div className="safe-pad-bottom grid grid-cols-4 px-2">
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
