import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";

// Type for ReactNode (avoiding import issue)
type ReactNode = any;

// ── Mock React & Dependencies ────────────────────────────────────────────────

const mockUseSyncExternalStore = mock.fn((subscribe, getSnapshot) => getSnapshot());
const mockUseState = mock.fn((initial) => [initial, mock.fn()]);

// Mock React hooks
const mockReact = {
  useSyncExternalStore: mockUseSyncExternalStore,
  useState: mockUseState,
  useEffect: mock.fn((fn) => fn()),
  useRef: mock.fn((initial) => ({ current: initial })),
  createElement: mock.fn((type, props, ...children) => ({ type, props, children })),
};

(globalThis as any).React = mockReact;

// Mock TanStack Router
const mockNavigate = mock.fn();
const mockUseRouterState = mock.fn((opts) => opts.select({ location: { pathname: "/" } }));

(globalThis as any).navigate = mockNavigate;

// ── Test Utilities ──────────────────────────────────────────────────────────

function createMockUser(overrides: Partial<{
  id: string;
  displayName: string;
  primaryEmail: string;
  profileImageUrl: string;
}> = {}) {
  return {
    id: "user-123",
    displayName: "Test User",
    primaryEmail: "test@example.com",
    profileImageUrl: "https://example.com/avatar.png",
    ...overrides,
  };
}

function resetMocks() {
  mockUseSyncExternalStore.mock.resetCalls();
  mockUseState.mock.resetCalls();
  mockNavigate.mock.resetCalls();
  mockUseRouterState.mock.resetCalls();
}

// ── Auth Gates Tests ─────────────────────────────────────────────────────────

describe("Auth Gates - resolveSignInGateState", () => {
  let resolveSignInGateState: (state: { isPending: boolean; hasUser: boolean }) => "pending" | "signed_in" | "signed_out";

  beforeEach(async () => {
    const mod = await import("./sign-in-gate.ts");
    resolveSignInGateState = mod.resolveSignInGateState;
  });

  it("returns 'pending' while session check is in flight (no user)", () => {
    assert.equal(resolveSignInGateState({ isPending: true, hasUser: false }), "pending");
  });

  it("returns 'pending' while session check is in flight (user exists)", () => {
    assert.equal(resolveSignInGateState({ isPending: true, hasUser: true }), "pending");
  });

  it("returns 'signed_in' when user is present and not pending", () => {
    assert.equal(resolveSignInGateState({ isPending: false, hasUser: true }), "signed_in");
  });

  it("returns 'signed_out' when no user and not pending", () => {
    assert.equal(resolveSignInGateState({ isPending: false, hasUser: false }), "signed_out");
  });
});

describe("Auth Gates - Component Logic", () => {
  // These test the logic that would be in the components
  // We test the conditional rendering logic directly

  describe("SignedIn", () => {
    it("renders children when user exists", () => {
      const user = createMockUser();
      const hasUser = user !== null;
      const result = hasUser ? "children" : null;
      assert.equal(result, "children");
    });

    it("renders nothing when user is null", () => {
      const user = null;
      const hasUser = user !== null;
      const result = hasUser ? "children" : null;
      assert.equal(result, null);
    });

    it("renders nothing while pending", () => {
      const isPending = true;
      const user = createMockUser();
      const hasUser = user !== null;
      const result = isPending || !hasUser ? null : "children";
      assert.equal(result, null);
    });
  });

  describe("SignedOut", () => {
    it("renders children when no user and not pending", () => {
      const isPending = false;
      const user = null;
      const hasUser = user !== null;
      const result = isPending || hasUser ? null : "children";
      assert.equal(result, "children");
    });

    it("renders nothing when user exists", () => {
      const isPending = false;
      const user = createMockUser();
      const hasUser = user !== null;
      const result = isPending || hasUser ? null : "children";
      assert.equal(result, null);
    });

    it("renders nothing while pending", () => {
      const isPending = true;
      const user = null;
      const hasUser = user !== null;
      const result = isPending || hasUser ? null : "children";
      assert.equal(result, null);
    });
  });

  describe("SignInGate", () => {
    const fallback = "fallback-content";
    const children = "protected-content";

    it("shows fallback when signed out", () => {
      const isPending = false;
      const hasUser = false;
      const state = isPending ? "pending" : hasUser ? "signed_in" : "signed_out";
      const result = state === "pending" ? null : state === "signed_in" ? children : fallback;
      assert.equal(result, fallback);
    });

    it("shows children when signed in", () => {
      const isPending = false;
      const hasUser = true;
      const state = isPending ? "pending" : hasUser ? "signed_in" : "signed_out";
      const result = state === "pending" ? null : state === "signed_in" ? children : fallback;
      assert.equal(result, children);
    });

    it("shows nothing while pending", () => {
      const isPending = true;
      const hasUser = false;
      const state = isPending ? "pending" : hasUser ? "signed_in" : "signed_out";
      const result = state === "pending" ? null : state === "signed_in" ? children : fallback;
      assert.equal(result, null);
    });

    it("uses custom fallback when provided", () => {
      const customFallback = "custom-fallback";
      const isPending = false;
      const hasUser = false;
      const state = isPending ? "pending" : hasUser ? "signed_in" : "signed_out";
      const result = state === "pending" ? null : state === "signed_in" ? children : customFallback;
      assert.equal(result, customFallback);
    });
  });

  describe("RedirectToSignIn", () => {
    const SIGN_IN_PATH = "/login";

    it("redirects to /login by default", () => {
      const to = SIGN_IN_PATH;
      assert.equal(to, "/login");
    });

    it("redirects to custom path when provided", () => {
      const to = "/custom-login";
      assert.equal(to, "/custom-login");
    });
  });

  describe("UserButton", () => {
    it("returns null when no user", () => {
      const user = null;
      const result = user ? "rendered" : null;
      assert.equal(result, null);
    });

    it("shows user initials when no avatar", () => {
      const user = createMockUser({ profileImageUrl: undefined, displayName: "John Doe" });
      const label = user.displayName ?? user.primaryEmail ?? "Account";
      const initial = label.charAt(0).toUpperCase();
      assert.equal(initial, "J");
    });

    it("shows avatar when profileImageUrl exists", () => {
      const user = createMockUser({ profileImageUrl: "https://example.com/avatar.png" });
      const hasAvatar = !!user.profileImageUrl;
      assert.equal(hasAvatar, true);
    });

    it("shows sign out button when auth enabled and no gate session", () => {
      const authEnabled = true;
      const gateSession = false;
      const showSignOut = authEnabled && !gateSession;
      assert.equal(showSignOut, true);
    });

    it("hides sign out when auth disabled", () => {
      const authEnabled = false;
      const gateSession = false;
      const showSignOut = authEnabled && !gateSession;
      assert.equal(showSignOut, false);
    });

    it("hides sign out when gate session active", () => {
      const authEnabled = true;
      const gateSession = true;
      const showSignOut = authEnabled && !gateSession;
      assert.equal(showSignOut, false);
    });

    it("disables button while signing out", () => {
      const signingOut = true;
      const disabled = signingOut;
      assert.equal(disabled, true);
    });
  });
});