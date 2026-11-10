import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Capacitor, SystemBars, SystemBarsStyle } from "@capacitor/core";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Dictionary } from "@/components/dictionary";
import { FlashCards } from "@/components/games/flash-cards";
import { MatchGame } from "@/components/games/match-game";
import { QuizGame } from "@/components/games/quiz-game";
import { SpeedGame } from "@/components/games/speed-game";
import { TypeGame } from "@/components/games/type-game";
import { VerbLab } from "@/components/games/verb-lab";
import { Home } from "@/components/home";
import { Pass } from "@/components/pass";
import { Shell } from "@/components/shell";
import { SignInButtons } from "@/lib/auth/gates";
import { AuthProvider } from "@/lib/auth/provider";
import "./app.css";

const MODES = ["quiz", "speed", "type", "verbs", "match", "cards"] as const;

function BackLink() {
  return (
    <Link
      to="/"
      className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted no-underline hover:text-fg"
    >
      <ArrowLeft className="size-4" />
      Station hall
    </Link>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function HomeScreen() {
    return (
      <Shell>
        <Home />
      </Shell>
    );
  },
});

const wordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/words",
  component: function WordsScreen() {
    return (
      <Shell>
        <BackLink />
        <Dictionary />
      </Shell>
    );
  },
});

const passRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pass",
  component: function PassScreen() {
    return (
      <Shell>
        <BackLink />
        <Pass />
      </Shell>
    );
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: function LoginScreen() {
    return (
      <Shell>
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight">
            Sign in to Wortreise
          </h1>
          <p className="mb-8 text-muted">
            Progress stays on this device. Sign-in is optional in the Android app.
          </p>
          <div className="mx-auto max-w-sm">
            <SignInButtons />
          </div>
        </div>
      </Shell>
    );
  },
});

const playRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/play/$mode",
  component: function PlayScreen() {
    const { mode } = playRoute.useParams();
    return (
      <Shell>
        <BackLink />
        {mode === "quiz" ? <QuizGame /> : null}
        {mode === "speed" ? <SpeedGame /> : null}
        {mode === "type" ? <TypeGame /> : null}
        {mode === "verbs" ? <VerbLab /> : null}
        {mode === "match" ? <MatchGame /> : null}
        {mode === "cards" ? <FlashCards /> : null}
        {!MODES.includes(mode as (typeof MODES)[number]) ? (
          <p className="text-muted">Unknown ticket. Head back to the hall.</p>
        ) : null}
      </Shell>
    );
  },
});

const routeTree = rootRoute.addChildren([indexRoute, wordsRoute, passRoute, loginRoute, playRoute]);

const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

if (Capacitor.isNativePlatform()) {
  void SystemBars.setStyle({ style: SystemBarsStyle.Light }).catch(() => undefined);
}

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root");

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
