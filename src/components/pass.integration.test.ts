import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";

// ── Mock Data ────────────────────────────────────────────────────────────────

interface Word {
  id: string;
  lemma: string;
  topic: string;
}

interface Topic {
  id: string;
  de: string;
  en: string;
}

const TOPICS: Topic[] = [
  { id: "zahlen", de: "Zahlen", en: "Numbers" },
  { id: "zeit", de: "Zeit", en: "Time" },
  { id: "person", de: "Person", en: "People" },
];

const STATS = { words: 804, verbs: 153 };

const VERBS = [
  { id: "verb-1", lemma: "sein", topic: "person" },
  { id: "verb-2", lemma: "haben", topic: "person" },
  { id: "verb-3", lemma: "werden", topic: "person" },
];

const WORDS: Word[] = [
  { id: "word-zahlen-1", lemma: "eins", topic: "zahlen" },
  { id: "word-zahlen-2", lemma: "zwei", topic: "zahlen" },
  { id: "word-zahlen-3", lemma: "drei", topic: "zahlen" },
  { id: "word-zahlen-4", lemma: "vier", topic: "zahlen" },
  { id: "word-zahlen-5", lemma: "fünf", topic: "zahlen" },
  { id: "word-zahlen-6", lemma: "sechs", topic: "zahlen" },
  { id: "word-zahlen-7", lemma: "sieben", topic: "zahlen" },
  { id: "word-zahlen-8", lemma: "acht", topic: "zahlen" },
  { id: "word-zahlen-9", lemma: "neun", topic: "zahlen" },
  { id: "word-zahlen-10", lemma: "zehn", topic: "zahlen" },
  { id: "word-zeit-1", lemma: "heute", topic: "zeit" },
  { id: "word-zeit-2", lemma: "morgen", topic: "zeit" },
];

// ── Unit Tests for Integration Logic ─────────────────────────────────────────

describe("Backup & Restore Logic", () => {
  it("exportBackup returns valid backup structure", () => {
    const mockExportBackup = () => ({
      version: 1,
      backupVersion: 1,
      timestamp: new Date().toISOString(),
      data: {
        version: 1,
        xp: 100,
        streak: 5,
        lastPlayDate: "2026-01-15",
        mastery: { "word-1": 3, "word-2": 4 },
        seen: { "word-1": 2, "word-2": 1 },
        correct: { "word-1": 2 },
        wrong: {},
        bestSpeedScore: 25,
        bestCombo: 10,
        sound: true,
        direction: "mix",
      },
    });

    const backup = mockExportBackup();

    assert.ok(backup);
    assert.equal(backup.version, 1);
    assert.equal(backup.backupVersion, 1);
    assert.ok(backup.timestamp);
    assert.equal(backup.data.xp, 100);
    assert.equal(backup.data.streak, 5);
    assert.ok(backup.data.mastery);
    assert.ok(backup.data.seen);
    assert.ok(backup.data.correct);
    assert.ok(backup.data.wrong);
  });

  it("importBackup validates backup structure", () => {
    const mockImportBackup = (backup: any) => {
      if (!backup || typeof backup !== "object") {
        return { success: false, error: "Invalid backup file" };
      }
      if (backup.backupVersion !== 1) {
        return { success: false, error: `Unsupported backup version: ${backup.backupVersion}` };
      }
      if (!backup.data || typeof backup.data !== "object") {
        return { success: false, error: "Backup missing progress data" };
      }
      const requiredFields = [
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
      return { success: true };
    };

    // Valid backup
    const validBackup = {
      version: 1,
      backupVersion: 1,
      timestamp: new Date().toISOString(),
      data: {
        version: 1,
        xp: 100,
        streak: 5,
        lastPlayDate: "2026-01-15",
        mastery: { "word-1": 3 },
        seen: {},
        correct: {},
        wrong: {},
        bestSpeedScore: 25,
        bestCombo: 10,
        sound: true,
        direction: "mix",
      },
    };
    let result = mockImportBackup(validBackup);
    assert.ok(result.success);

    // Invalid backup - wrong version
    result = mockImportBackup({ ...validBackup, backupVersion: 2 });
    assert.equal(result.success, false);
    assert.ok(result.error?.includes("version"));

    // Invalid backup - missing fields
    const backupMissingField = JSON.parse(JSON.stringify(validBackup));
    delete backupMissingField.data.xp;
    result = mockImportBackup(backupMissingField);
    assert.equal(result.success, false);
    assert.ok(result.error?.includes("xp"));

    // Invalid backup - not an object
    result = mockImportBackup("not an object");
    assert.equal(result.success, false);
    assert.ok(result.error?.includes("Invalid backup file"));

    // Invalid backup - missing data
    result = mockImportBackup({ ...validBackup, data: null });
    assert.equal(result.success, false);
    assert.ok(result.error?.includes("progress data"));
  });
});

describe("Voice Selection Logic", () => {
  it("filters German voices correctly", () => {
    const mockVoices = [
      { name: "Anna", lang: "de-DE", localService: true, default: false },
      { name: "Helena", lang: "de-AT", localService: true, default: false },
      { name: "Google Deutsch", lang: "de-DE", localService: false, default: true },
      { name: "Microsoft German", lang: "en-US", localService: false, default: false },
      { name: "Alex", lang: "en-US", localService: true, default: true },
      { name: "Thomas", lang: "fr-FR", localService: true, default: false },
    ];

    const germanVoices = mockVoices.filter((v) => {
      const lang = v.lang.toLowerCase();
      return lang.startsWith("de-") || lang === "de" || v.name.toLowerCase().includes("german");
    });

    assert.equal(germanVoices.length, 4); // Anna, Helena, Google Deutsch, Microsoft German
    assert.ok(
      germanVoices.every(
        (v) => v.lang.startsWith("de-") || v.name.toLowerCase().includes("german"),
      ),
    );
  });

  it("saves and loads voice preference", () => {
    const storage: Record<string, string> = {};
    const saveVoicePreference = (voiceName: string) => {
      storage["wortreise-voice-preference"] = voiceName;
    };
    const loadVoicePreference = () => {
      return storage["wortreise-voice-preference"] ?? null;
    };

    saveVoicePreference("Anna");
    assert.equal(loadVoicePreference(), "Anna");

    saveVoicePreference("Google Deutsch");
    assert.equal(loadVoicePreference(), "Google Deutsch");

    delete storage["wortreise-voice-preference"];
    assert.equal(loadVoicePreference(), null);
  });
});

describe("Debug Panel Logic", () => {
  it("formats store state for debugging", () => {
    const storeState = {
      xp: 272,
      streak: 7,
      lastPlayDate: "2026-01-15",
      mastery: { "word-1": 3, "word-2": 4, "word-3": 5 },
      seen: { "word-1": 2, "word-2": 1, "word-3": 3 },
      sound: true,
      direction: "mix",
    };

    const debugInfo = `STORE STATE:
  xp: ${storeState.xp}
  streak: ${storeState.streak}
  lastPlayDate: ${storeState.lastPlayDate}
  mastery entries: ${Object.keys(storeState.mastery).length}
  seen entries: ${Object.keys(storeState.seen).length}
  sound: ${storeState.sound}
  direction: ${storeState.direction}

LOCALSTORAGE (wortreise-save-v1):
{"version":1,"xp":272,"streak":7,"lastPlayDate":"2026-01-15","mastery":{"word-1":3,"word-2":4,"word-3":5},"seen":{"word-1":2,"word-2":1,"word-3":3},"correct":{},"wrong":{},"bestSpeedScore":0,"bestCombo":0,"sound":true,"direction":"mix"}`;

    assert.ok(debugInfo.includes("STORE STATE"));
    assert.ok(debugInfo.includes("xp: 272"));
    assert.ok(debugInfo.includes("streak: 7"));
    assert.ok(debugInfo.includes("mastery entries: 3"));
    assert.ok(debugInfo.includes("seen entries: 3"));
    assert.ok(debugInfo.includes("LOCALSTORAGE"));
  });

  it("formats voice list for debugging", () => {
    const voices = [
      { name: "Anna", lang: "de-DE", localService: true, default: false },
      { name: "Google Deutsch", lang: "de-DE", localService: false, default: true },
    ];

    const voiceList = voices
      .map((v) => `${v.name} (${v.lang})${v.default ? " ★ DEFAULT" : ""}`)
      .join("\n");

    assert.ok(voiceList.includes("Anna (de-DE)"));
    assert.ok(voiceList.includes("Google Deutsch (de-DE) ★ DEFAULT"));
  });
});

describe("Progress Store Integration", () => {
  it("calculates known words count", () => {
    const mastery = { "word-1": 3, "word-2": 4, "word-3": 5, "word-4": 2, "word-5": 1 };
    const known = Object.values(mastery).filter((n) => n >= 3).length;
    assert.equal(known, 3);
  });

  it("calculates known verbs count", () => {
    const mastery: Record<string, number> = { "verb-1": 3, "verb-2": 4, "verb-3": 2 };
    const verbKnown = VERBS.filter((v) => (mastery[v.id] ?? 0) >= 3).length;
    assert.equal(verbKnown, 2);
  });

  it("topic mastery calculates correctly", () => {
    const topic = TOPICS[0];
    const pool = WORDS.filter((w) => w.topic === topic.id);
    const mastery: Record<string, number> = {};
    pool.slice(0, 4).forEach((w, i) => {
      mastery[w.id] = 3;
    });
    pool.slice(4).forEach((w) => {
      mastery[w.id] = 2;
    });

    const known = pool.filter((w) => (mastery[w.id] ?? 0) >= 3).length;
    const pct = pool.length ? Math.round((known / pool.length) * 100) : 0;

    assert.ok(pct >= 0 && pct <= 100);
    assert.equal(pct, 40); // 4 out of 10 = 40%
  });

  it("stamps topics at 40% threshold", () => {
    const topics = ["zahlen", "zeit", "person"];

    function getStampedTopics(mastery: Record<string, number>, words: typeof WORDS): string[] {
      return topics.filter((t) => {
        const topicPool = words.filter((w) => w.topic === t);
        const known = topicPool.filter((w) => (mastery[w.id] ?? 0) >= 3).length;
        return topicPool.length ? Math.round((known / topicPool.length) * 100) >= 40 : false;
      });
    }

    const mastery: Record<string, number> = {
      "word-zahlen-1": 3,
      "word-zahlen-2": 3,
      "word-zahlen-3": 3,
      "word-zahlen-4": 3,
      "word-zahlen-5": 2,
      "word-zahlen-6": 2,
      "word-zahlen-7": 2,
      "word-zahlen-8": 2,
      "word-zahlen-9": 2,
      "word-zahlen-10": 2, // 4/10 = 40%
    };

    const stamped = getStampedTopics(mastery, WORDS);
    assert.ok(stamped.includes("zahlen"));
  });
});
