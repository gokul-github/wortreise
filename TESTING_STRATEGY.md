# Wortreise Testing Strategy

## Test Pyramid

```
                    ┌─────────────────┐
                    │   E2E Tests     │  ← Playwright (critical user flows)
                    │   (5-10 tests)  │
           ┌───────────────────────────┐
           │   Integration Tests       │  ← Component + Store + API
           │   (15-20 tests)           │
  ┌─────────────────────────────────────┐
  │      Unit Tests                     │  ← Pure functions, hooks, utils
  │      (30-50 tests)                  │
  └─────────────────────────────────────┘
```

---

## 1. Unit Tests (Node.js --test)

**Location:** `src/**/*.test.ts`

### Priority: High - Pure Logic

| Module                         | Test Cases                                                                    |
| ------------------------------ | ----------------------------------------------------------------------------- |
| `src/store/progress.ts`        | CRUD operations, backup/import, streak calculation, XP gain, mastery levels   |
| `src/lib/speech.ts`            | Voice selection, preference persistence, fallback logic, async voice loading  |
| `src/lib/auth/gates.ts`        | `SignedIn`, `SignedOut`, `RedirectToSignIn`, `SignInGate`, `UserButton` logic |
| `src/lib/auth/sign-in-gate.ts` | State resolution: pending/signed_in/signed_out                                |
| `src/lib/utils.ts`             | `cn()` classname utility, any helpers                                         |

### Priority: Medium - Component Logic

| Component                    | Test Cases                                                            |
| ---------------------------- | --------------------------------------------------------------------- |
| `src/components/pass.tsx`    | Backup export/import, voice selector, debug panel, topic mastery calc |
| `src/components/shell.tsx`   | Auth button rendering, XP/streak display, navigation active states    |
| `src/components/games/*.tsx` | Game setup, scoring, record() calls                                   |

---

## 2. Integration Tests

**Location:** `src/**/*.integration.test.ts`

### Scenarios

| Feature                  | Test Cases                                                                   |
| ------------------------ | ---------------------------------------------------------------------------- |
| **Progress Persistence** | localStorage → store hydrate → play game → record → persist → reload         |
| **Auth Flow**            | SignInGate → redirect to /login → OAuth callback → user session → UserButton |
| **Voice Selection**      | getGermanVoices → select voice → save to localStorage → speakGerman uses it  |
| **Backup/Restore**       | Export → modify localStorage → Import → verify state restored                |
| **Game → Progress**      | Start quiz → answer questions → verify XP/streak/mastery updated             |

---

## 3. E2E Tests (Playwright)

**Location:** `e2e/*.spec.ts`

### Critical User Journeys

| Journey                  | Steps                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| **New User Onboarding**  | Visit `/` → Click "Start with a quiz" → Answer 5 questions → See XP → Visit `/pass`         |
| **Progress Persistence** | Play quiz → Close tab → Reopen → Verify XP/streak/mastery preserved                         |
| **Backup/Restore**       | `/pass` → Export backup → Clear localStorage → Import backup → Verify restored              |
| **Voice Selection**      | `/pass` → Open voice settings → Select German voice → Test → Play Flash Study → Hear German |
| **Auth Flow**            | Click "Sign in" → (mock OAuth) → Return → See user avatar → Sign out                        |
| **All Game Modes**       | Quiz Rally, Speed 45, Type the Word, Verb Lab, Match Pairs, Flash Study                     |

---

## 4. Test Automation Setup

### Install Playwright

```bash
npm install -D @playwright/test
npx playwright install chromium
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "node --test 'scripts/**/*.test.mjs' && node --experimental-strip-types --test src/**/*.test.ts",
    "test:unit": "node --experimental-strip-types --test src/**/*.test.ts",
    "test:integration": "node --experimental-strip-types --test src/**/*.integration.test.ts",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test:unit && npm run test:integration && npm run test:e2e"
  }
}
```

---

## 5. Detailed Test Cases

### 5.1 Progress Store Tests

```typescript
// src/store/progress.test.ts

// Initialization
it("loads defaults when localStorage empty", () => {});
it("loads saved state from localStorage", () => {});
it("handles corrupted localStorage gracefully", () => {});

// Record
it("increments XP on correct answer", () => {});
it("increments XP (smaller) on wrong answer", () => {});
it("updates mastery level on correct (max 5)", () => {});
it("decrements mastery on wrong (min 0)", () => {});
it("tracks seen/correct/wrong counts per word", () => {});

// Streak
it("sets streak to 1 on first play", () => {});
it("increments streak on consecutive days", () => {});
it("resets streak after gap day", () => {});
it("does not double-count same day", () => {});

// Backup/Restore
it("exports valid JSON with all fields", () => {});
it("imports valid backup and restores state", () => {});
it("rejects invalid backup (missing fields)", () => {});
it("rejects wrong backup version", () => {});
it("handles corrupted JSON gracefully", () => {});

// Reset
it("resets all state to defaults", () => {});
```

### 5.2 Speech Tests

```typescript
// src/lib/speech.test.ts

// Voice Management
it("returns empty array when no German voices", () => {});
it("filters only German voices (de-DE, de-AT, de-CH)", () => {});
it("includes voices with 'german' in name", () => {});

// Preference Persistence
it("saves voice preference to localStorage", () => {});
it("loads voice preference from localStorage", () => {});
it("returns null when no preference saved", () => {});

// speakGerman Logic
it("uses saved voice when available", () => {});
it("falls back to first German voice when no preference", () => {});
it("falls back to default when no German voices", () => {});
it("waits for voices to load (async)", () => {});
it("times out after 1.5s if voices don't load", () => {});
```

### 5.3 Auth Gate Tests

```typescript
// src/lib/auth/gates.test.ts

// SignedIn
it("renders children when user exists", () => {});
it("renders nothing when user is null", () => {});
it("renders nothing while pending", () => {});

// SignedOut
it("renders children when no user and not pending", () => {});
it("renders nothing when user exists", () => {});
it("renders nothing while pending", () => {});

// SignInGate
it("shows SignInButtons when signed out", () => {});
it("shows children when signed in", () => {});
it("shows nothing while pending", () => {});
it("uses custom fallback when provided", () => {});

// RedirectToSignIn
it("redirects to /login by default", () => {});
it("redirects to custom path when provided", () => {});

// UserButton
it("shows user initials when no avatar", () => {});
it("shows avatar when profileImageUrl exists", () => {});
it("shows sign out button when auth enabled", () => {});
it("hides sign out when gate session active", () => {});
```

### 5.4 Component Integration Tests

```typescript
// src/components/pass.integration.test.tsx

// Backup/Restore UI
it("exports backup file on click", () => {});
it("opens file picker on import click", () => {});
it("shows success message on valid import", () => {});
it("shows error message on invalid import", () => {});
it("disables import while file reading", () => {});

// Voice Selector
it("lists available German voices", () => {});
it("shows current preference as selected", () => {});
it("saves preference on change", () => {});
it("tests selected voice on button click", () => {});
it("shows 'No German voices' message when none available", () => {});

// Debug Panel
it("shows store state on Debug click", () => {});
it("shows localStorage content", () => {});
it("re-hydrates on Force Hydrate click", () => {});
it("lists all voices on List Voices click", () => {});
```

---

## 6. Test Data & Mocking

### Mock localStorage

```typescript
// test-utils/mockStorage.ts
export function createMockStorage(initialData: Record<string, string> = {}) {
  const store = { ...initialData };
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k]);
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
}

// Usage in tests:
Object.defineProperty(globalThis, "localStorage", { value: createMockStorage() });
```

### Mock speechSynthesis

```typescript
// test-utils/mockSpeech.ts
const mockVoices: SpeechSynthesisVoice[] = [
  { name: 'Anna', lang: 'de-DE', localService: true, default: false, ... },
  { name: 'Google Deutsch', lang: 'de-DE', localService: false, default: true, ... },
];

export function mockSpeechSynthesis() {
  let voicesLoaded = false;
  return {
    getVoices: () => mockVoices,
    speak: vi.fn(),
    cancel: vi.fn(),
    onvoiceschanged: null,
    addEventListener: (event: string, fn: () => void) => {
      if (event === 'voiceschanged') setTimeout(fn, 0);
    },
  };
}
```

---

## 7. CI/CD Integration

### GitHub Actions (`.github/workflows/test.yml`)

```yaml
name: Tests
on: [push, pull_request]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "22", cache: "npm" }
      - run: npm ci
      - run: npm run test:unit

  integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "22", cache: "npm" }
      - run: npm ci
      - run: npm run test:integration

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "22", cache: "npm" }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npm run preview &
      - run: sleep 10 && npm run test:e2e
```

---

## 8. Coverage Goals

| Layer                            | Target               |
| -------------------------------- | -------------------- |
| Unit (utils, store, lib)         | **90%+**             |
| Integration (components + store) | **70%+**             |
| E2E (critical paths)             | **100% of journeys** |

---

## 9. Quick Start

```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests (requires dev server)
npm run dev &  # Terminal 1
npm run test:e2e  # Terminal 2

# Run all tests
npm run test:all
```

---

## 10. New Feature Test Checklist

When adding features, add tests for:

- [ ] Unit tests for pure logic
- [ ] Integration tests for component + store interaction
- [ ] E2E test for user-facing flow
- [ ] Edge cases (empty state, errors, loading)
- [ ] Accessibility (keyboard, screen reader)
- [ ] Mobile responsiveness (if UI changes)
