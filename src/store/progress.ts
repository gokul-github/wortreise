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

function readLocal(): string | null {
  try {
    return localStorage.getItem(SAVE_KEY);
  } catch {
    return null;
  }
}

function parseSave(raw: string): ProgressData {
  try {
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

const IDB_NAME = "wortreise";
const IDB_STORE = "kv";

function idbFactory(): IDBFactory | null {
  try {
    if (typeof indexedDB === "undefined" || !indexedDB) return null;
    return indexedDB;
  } catch {
    return null;
  }
}

function openSaveDb(): Promise<IDBDatabase | null> {
  const factory = idbFactory();
  if (!factory) return Promise.resolve(null);
  return new Promise((resolve) => {
    let request: IDBOpenDBRequest;
    try {
      request = factory.open(IDB_NAME, 1);
    } catch {
      resolve(null);
      return;
    }
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });
}

/** Extra copy of the same save JSON. localStorage stays the source of truth. */
function mirrorSave(data: ProgressData): void {
  void openSaveDb().then((db) => {
    if (!db) return;
    try {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).put(JSON.stringify(data), SAVE_KEY);
      const close = () => {
        try {
          db.close();
        } catch {
          /* already closed */
        }
      };
      tx.oncomplete = close;
      tx.onerror = close;
      tx.onabort = close;
    } catch {
      try {
        db.close();
      } catch {
        /* already closed */
      }
    }
  });
}

function readMirror(): Promise<string | null> {
  return openSaveDb().then((db) => {
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE, "readonly");
        const request = tx.objectStore(IDB_STORE).get(SAVE_KEY);
        request.onsuccess = () => {
          const value = request.result;
          try {
            db.close();
          } catch {
            /* already closed */
          }
          resolve(typeof value === "string" ? value : null);
        };
        request.onerror = () => {
          try {
            db.close();
          } catch {
            /* already closed */
          }
          resolve(null);
        };
      } catch {
        try {
          db.close();
        } catch {
          /* already closed */
        }
        resolve(null);
      }
    });
  });
}

function persist(state: ProgressData) {
  const data = snapshot(state);
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch {
    /* private mode / quota */
  }
  mirrorSave(data);
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
  hydrate: () => {
    const raw = readLocal();
    if (raw) {
      const data = parseSave(raw);
      set(data);
      mirrorSave(data);
      return;
    }
    void readMirror().then((text) => {
      if (!text || readLocal()) return;
      const data = parseSave(text);
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot(data)));
      } catch {
        /* session still restores from the mirror */
      }
      set(data);
    });
  },
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
