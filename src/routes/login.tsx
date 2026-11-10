import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { SignInButtons, SIGN_IN_PATH } from "@/lib/auth/gates";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <Shell>
      <div className="mx-auto max-w-md py-16 px-4 text-center">
        <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight">
          Sign in to Wortreise
        </h1>
        <p className="mb-8 text-muted">
          Continue with one of the providers below to save your progress and earn district stamps.
        </p>
        <div className="max-w-sm mx-auto">
          <SignInButtons />
        </div>
        <p className="mt-8 text-sm text-muted">
          By continuing, you agree to our{" "}
          <Link to="/" className="underline hover:text-fg">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/" className="underline hover:text-fg">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </Shell>
  );
}
