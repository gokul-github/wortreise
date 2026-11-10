import { create } from "zustand";
import { TOPICS, type TopicId } from "@/data/types";
import { WORDS } from "@/data";

const SAVE_KEY = "wortreise-save-v1";
const SAVE_VERSION = 1;
const BACKUP_VERSION = 1;

export type BackupData = {
  version: number;
  backupVersion: number;
  timestamp: string;
  data: ProgressData;
};

export type ProgressData = {
  version: number;
  xp: number;
  streak: number;
  lastPlayDate: string | null;
  mastery: Record<string, number>;
  seen: Record<string, number>;
  correct: Record<string, number>;
  wrong: Record<string, number>;
  bestSpeedScore: number;
  bestCombo: number;
  sound: boolean;
  direction: "mix" | "de-en" | "en-de";
};

const defaults: ProgressData = {
  version: SAVE_VERSION,
  xp: 0,
  streak: 0,
  lastPlayDate: null,
  mastery: {},
  seen: {},
  correct: {},
  wrong: {},
  bestSpeedScore: 0,
  bestCombo: 0,
  sound: true,
  direction: "mix",
};

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function load(): ProgressData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { ...defaults };
    const parsed = JSON.parse(raw) as Partial<ProgressData>;
    return {
      ...defaults,
      ...parsed,
      version: SAVE_VERSION,
      mastery: parsed.mastery ?? {},
      seen: parsed.seen ?? {},
      correct: parsed.correct ?? {},
      wrong: parsed.wrong ?? {},
    };
  } catch {
    return { ...defaults };
  }
}

function persist(state: ProgressData) {
  try {
    const data: ProgressData = {
      version: SAVE_VERSION,
      xp: state.xp,
      streak: state.streak,
      lastPlayDate: state.lastPlayDate,
      mastery: state.mastery,
      seen: state.seen,
      correct: state.correct,
      wrong: state.wrong,
      bestSpeedScore: state.bestSpeedScore,
      bestCombo: state.bestCombo,
      sound: state.sound,
      direction: state.direction,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch {
    /* private mode / quota */
  }
}

type Store = ProgressData & {
  hydrate: () => void;
  record: (wordId: string, ok: boolean, xpGain?: number) => void;
  bumpSpeed: (score: number, combo: number) => void;
  setSound: (on: boolean) => void;
  setDirection: (d: ProgressData["direction"]) => void;
  reset: () => void;
  exportBackup: () => BackupData;
  importBackup: (backup: BackupData) => { success: boolean; error?: string };
};

export const useProgress = create<Store>((set, get) => ({
  ...defaults,
  hydrate: () => set(load()),
  record: (wordId, ok, xpGain = ok ? 10 : 2) => {
    const s = get();
    const mastery = { ...s.mastery };
    const seen = { ...s.seen };
    const correct = { ...s.correct };
    const wrong = { ...s.wrong };
    seen[wordId] = (seen[wordId] ?? 0) + 1;
    const prev = mastery[wordId] ?? 0;
    if (ok) {
      correct[wordId] = (correct[wordId] ?? 0) + 1;
      mastery[wordId] = Math.min(5, prev + 1);
    } else {
      wrong[wordId] = (wrong[wordId] ?? 0) + 1;
      mastery[wordId] = Math.max(0, prev - 1);
    }
    const today = todayKey();
    let streak = s.streak;
    if (s.lastPlayDate !== today) {
      streak = s.lastPlayDate === yesterdayKey() ? s.streak + 1 : 1;
    }
    const next: ProgressData = {
      version: SAVE_VERSION,
      xp: s.xp + xpGain,
      streak,
      lastPlayDate: today,
      mastery,
      seen,
      correct,
      wrong,
      bestSpeedScore: s.bestSpeedScore,
      bestCombo: s.bestCombo,
      sound: s.sound,
      direction: s.direction,
    };
    persist(next);
    set(next);
  },
  bumpSpeed: (score, combo) => {
    const s = get();
    const next: ProgressData = {
      version: SAVE_VERSION,
      xp: s.xp,
      streak: s.streak,
      lastPlayDate: s.lastPlayDate,
      mastery: s.mastery,
      seen: s.seen,
      correct: s.correct,
      wrong: s.wrong,
      bestSpeedScore: Math.max(s.bestSpeedScore, score),
      bestCombo: Math.max(s.bestCombo, combo),
      sound: s.sound,
      direction: s.direction,
    };
    persist(next);
    set(next);
  },
  setSound: (on) => {
    const s = get();
    const next = { ...snapshot(s), sound: on };
    persist(next);
    set(next);
  },
  setDirection: (d) => {
    const s = get();
    const next = { ...snapshot(s), direction: d };
    persist(next);
    set(next);
  },
  reset: () => {
    persist(defaults);
    set({ ...defaults });
  },
  exportBackup: () => {
    const s = get();
    const backup: BackupData = {
      version: SAVE_VERSION,
      backupVersion: BACKUP_VERSION,
      timestamp: new Date().toISOString(),
      data: snapshot(s),
    };
    return backup;
  },
  importBackup: (backup: BackupData) => {
    // Validate backup structure
    if (!backup || typeof backup !== "object") {
      return { success: false, error: "Invalid backup file" };
    }
    if (backup.backupVersion !== BACKUP_VERSION) {
      return { success: false, error: `Unsupported backup version: ${backup.backupVersion}` };
    }
    if (!backup.data || typeof backup.data !== "object") {
      return { success: false, error: "Backup missing progress data" };
    }
    // Validate required fields
    const requiredFields: (keyof ProgressData)[] = [
      "version",
      "xp",
      "streak",
      "lastPlayDate",
      "mastery",
      "seen",
      "correct",
      "wrong",
      "bestSpeedScore",
      "bestCombo",
      "sound",
      "direction",
    ];
    for (const field of requiredFields) {
      if (!(field in backup.data)) {
        return { success: false, error: `Backup missing field: ${field}` };
      }
    }
    // Version check - migrate if needed (for future)
    const data = { ...backup.data, version: SAVE_VERSION };
    persist(data);
    set(data);
    return { success: true };
  },
}));

function snapshot(s: ProgressData): ProgressData {
  return {
    version: SAVE_VERSION,
    xp: s.xp,
    streak: s.streak,
    lastPlayDate: s.lastPlayDate,
    mastery: s.mastery,
    seen: s.seen,
    correct: s.correct,
    wrong: s.wrong,
    bestSpeedScore: s.bestSpeedScore,
    bestCombo: s.bestCombo,
    sound: s.sound,
    direction: s.direction,
  };
}

export function topicMastery(
  mastery: Record<string, number>,
  topic: TopicId,
): { known: number; total: number; pct: number } {
  const pool = WORDS.filter((w) => w.topic === topic);
  const known = pool.filter((w) => (mastery[w.id] ?? 0) >= 3).length;
  return {
    known,
    total: pool.length,
    pct: pool.length ? Math.round((known / pool.length) * 100) : 0,
  };
}

export function stampedTopics(mastery: Record<string, number>): TopicId[] {
  return TOPICS.filter((t) => topicMastery(mastery, t.id).pct >= 40).map((t) => t.id);
}
