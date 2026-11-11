# Design Document: Wortreise

## 1. Project Overview

**Wortreise** is a travel-journal game for learning the Goethe-Zertifikat A1 _Start Deutsch 1_ word list. It provides an interactive way to learn German vocabulary through multiple game modes, with progress stored locally in the browser.

### 1.1 Key Features
- **Quiz Rally**: 4-choice German↔English with articles on nouns
- **Speed 45**: 45-second combo run
- **Type the Word**: English prompt, type German (with umlaut keys)
- **Verb Lab**: Fill present-tense blanks
- **Match Pairs**: Pair German with English on a board
- **Flash Study**: Hear word, flip card, stamp mastery
- **Progress Tracking**: XP, streak, mastery, district stamps
- **Offline-First**: Progress stored in browser IndexedDB
- **Android Support**: Capacitor wrapper for native deployment

### 1.2 Technology Stack
- **Frontend**: React 19, TanStack Router, Tailwind CSS v4
- **State Management**: Zustand with IndexDB persistence
- **Routing**: File-based routing with TanStack Start
- **Build Tool**: Vite
- **Testing**: Vitest, Playwright
- **Mobile**: Capacitor

---

## 2. Architecture

### 2.1 High-Level Component Structure

```
src/
├── components/
│   ├── games/
│   │   ├── quiz-game.tsx
│   │   ├── speed-game.tsx
│   │   ├── type-game.tsx
│   │   ├── verb-lab.tsx
│   │   ├── match-game.tsx
│   │   ├── flash-cards.tsx
│   │   └── game-setup.tsx
│   ├── home.tsx
│   ├── shell.tsx
│   ├── dictionary.tsx
│   ├── preview-host-bridge.tsx
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       └── progress.tsx
├── routes/
│   ├── index.tsx
│   ├── login.tsx
│   ├── pass.tsx
│   ├── words.tsx
│   └── play.$mode.tsx
├── lib/
│   ├── auth/
│   │   ├── provider.tsx
│   ├── speech.ts
│   ├── quiz.ts
│   ├── sfx.ts
│   ├── data/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── words.ts
│   │   └── verbs.ts
│   ├── app-data/
│   │   ├── index.ts
│   ├── routes/
│   │   └── index.tsx
│   ├── store/
│   │   └── progress.ts
│   └── utils.ts
├── public/
│   ├── favicon.svg
│   ├── og.jpg
│   └── banner.jpg
└── scripts/
    ├── migrate.fjs
    ├── preview.fjs
    ├── check-auth-invariant.mjs
    └── brand-check.mjs
```

### 2.2 Data Flow

```
User Interaction → Game Logic → State Update (Zustand) → IndexedDB Persistence
     ↑                                                  ↓
     └── Local Storage (Progress, XP, Mastery, Stamps)
```

### 2.3 Game Modes & Routing

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Main dashboard with district selection |
| `/words` | Dictionary | Browse vocabulary by topic |
| `/pass` | Pass Screen | Progress tracking with stamps |
| `/play/$mode` | Game Modes | Dynamic routing for 6 game types |

**Game Mode Components:**
- QuizGame: 4-choice DE↔EN with articles
- SpeedGame: 45-second timed challenge
- TypeGame: Type German from English prompt
- VerbLab: Conjugation practice
- MatchGame: Pair German-English cards
- FlashCards: Study with audio

### 2.4 State Management

**Zustand Store (`src/store/progress.ts`):**
```typescript
interface ProgressState {
  // Persisted
  xp: number;
  streak: number;
  mastery: Record<TopicId, MasteryLevel>;
  stamps: string[];
  // Ephemeral
  sound: boolean;
  hydrate: () => void;
}
```

**Persistence:** All progress saved to IndexedDB via `pglite` (SQLite WASM).

---

## 3. Detailed Component Design

### 3.1 Core Game Components

#### 3.1.1 QuizGame (`src/components/games/quiz-game.tsx`)
```typescript
interface Props {
  initialTopic?: TopicId; // from route search param
}
```
- Renders 4-choice questions
- Accepts `topic` prop to filter word set
- Tracks correctness, advances automatically
- Integrates with progress store for mastery updates

#### 3.1.2 Shell (`src/components/shell.tsx`)
```typescript
export function Shell({ children }) { ... }
```
- Layout wrapper with header/navigation
- Responsive grid for game mode selection
- Bottom nav bar (Play/Words/Pass)

#### 3.1.3 Home (`src/components/home.tsx`)
- District tiles with mastery progress bars
- Navigation links to game modes with topic preselection

---

## 4. Data Structures

### 4.1 Word Data (`src/data/types.ts`)
```typescript
type TopicId = 
  "zahlen" | "zeit" | "person" | ... | "alltag";

interface Word {
  id: string;
  lemma: string;
  display: string;
  pos: PartOfSpeech;
  en: string;
  topic: TopicId;
  example: string;
  exampleEn: string;
  // Noun specific
  article?: "der" | "die" | "das";
  plural?: string;
  // Verb specific
  verb?: {
    regularity: "regular" | "irregular" | "mixed" | "modal";
    aux: "haben" | "sein";
    ich: string;
    du: string;
 etc.
  };
}
```

### 4.2 Game-Specific Types
- **Quiz**: 4 choices with article inclusion
- **Speed**: Time-limited combo scoring
- **Type**: Keyboard input with validation
- **VerbLab**: Conjugation forms
- **MatchGame**: Grid pairing
- **FlashCards**: Swipe/study interface

---

## 5. Routing & Navigation

### 5.1 Route Definitions
All routes defined in `vite.config.ts` → `routes/`:
```
/                      → indexRoute → Home
/words                 → wordsRoute → Dictionary
/pass                  → passRoute → Pass
/play/$mode            → playRoute → Dynamic Game Modes
/play/$mode?topic=freizeit  → QuizGame with initialTopic
```

### 5.2 Search Parameter Validation
Route validation ensures `topic` is valid TopicId:
```typescript
validateSearch: (search) => ({
  topic: topicFromSearch(search.topic)
}))
```

---

## 6. Testing Strategy

| Test Type | Location | Coverage |
|-----------|----------|----------|
| Unit | `scripts/**/*.test.mjs` | Auth, utilities |
| Integration | `src/components/pass.integration.test.ts` | Pass component flows |
| E2E | `e2e/wortreise.spec.ts` | Full user journeys |

### 6.1 Scripts
```bash
npm test              # unit + integration
npm run test:e2e      # Playwright E2E
npm run check:auth    # Auth invariant
npm run typecheck     # TypeScript validation
npm run build         # Production bundle
```

---

## 7. Build & Deployment

### 7.1 Development
```bash
npm run dev    # Vite dev server on port 8080
```

### 7.2 Android
```bash
npm run build:android  # Web bundle + Capacitor sync
npm run android:apk    # Debug APK
npm run android:release # Release APK (signed)
```

### 7.3 Preview
```bash
npm run preview      # Vite preview server
npm run preview:restart
npm run preview:stop
```

---

## 8. Brand Assets
- `public/og.jpg` - Custom OG image
- `public/banner.jpg` - App banner
- Generated via `scripts/preview-thumbnail.mjs`

---

## 9. Future Extensions
1. **Multiplayer**: P2P via WebRTC (`src/lib/multiplayer/p2p.ts`)
2. **Cloud Sync**: Optional account sync
3. **More Game Modes**: Conversation, Grammar, Listening
4. **Analytics**: User engagement tracking

---

*Document generated from codebase analysis on 2026-11-11*