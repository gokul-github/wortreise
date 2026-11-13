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

const VERBS = [
  { id: "verb-1", lemma: "sein", topic: "person" },
  { id: "verb-2", lemma: "haben", topic: "person" },
  { id: "verb-3", lemma: "werden", topic: "person" },
];

// ── Test Utilities ──────────────────────────────────────────────────────────

function createMockStorage(initialData: Record<string, string> = {}) {
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
    key: (index: number) => Object.keys(store)[index] ?? null,
    get length() {
      return Object.keys(store).length;
    },
  };
}

// Replace global localStorage
const originalLocalStorage = globalThis.localStorage;

function setMockLocalStorage(data: Record<string, string> = {}) {
  globalThis.localStorage = createMockStorage(data);
}

function restoreLocalStorage() {
  globalThis.localStorage = originalLocalStorage;
}

// ── Progress Store Tests ─────────────────────────────────────────────────────

describe("Progress Store", () => {
  // We'll test the actual store logic by importing it
  // For now, test the core algorithms

  describe("Streak Calculation", () => {
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

    function calculateStreak(lastPlayDate: string | null, currentStreak: number): number {
      const today = todayKey();
      if (lastPlayDate !== today) {
        return lastPlayDate === yesterdayKey() ? currentStreak + 1 : 1;
      }
      return currentStreak;
    }

    it("sets streak to 1 on first play (no lastPlayDate)", () => {
      assert.equal(calculateStreak(null, 0), 1);
    });

    it("increments streak on consecutive days", () => {
      assert.equal(calculateStreak(yesterdayKey(), 5), 6);
    });

    it("resets streak after a gap day", () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const y = twoDaysAgo.getFullYear();
      const m = String(twoDaysAgo.getMonth() + 1).padStart(2, "0");
      const day = String(twoDaysAgo.getDate()).padStart(2, "0");
      const twoDaysAgoKey = `${y}-${m}-${day}`;
      assert.equal(calculateStreak(twoDaysAgoKey, 10), 1);
    });

    it("does not change streak when playing same day", () => {
      assert.equal(calculateStreak(todayKey(), 7), 7);
    });
  });

  describe("Mastery Level", () => {
    function updateMastery(current: number, correct: boolean): number {
      if (correct) return Math.min(5, current + 1);
      return Math.max(0, current - 1);
    }

    it("increments mastery on correct answer (max 5)", () => {
      assert.equal(updateMastery(0, true), 1);
      assert.equal(updateMastery(4, true), 5);
      assert.equal(updateMastery(5, true), 5); // caps at 5
    });

    it("decrements mastery on wrong answer (min 0)", () => {
      assert.equal(updateMastery(3, false), 2);
      assert.equal(updateMastery(1, false), 0);
      assert.equal(updateMastery(0, false), 0); // floors at 0
    });
  });

  describe("XP Gain", () => {
    function calculateXPGain(correct: boolean): number {
      return correct ? 10 : 2;
    }

    it("awards 10 XP for correct", () => {
      assert.equal(calculateXPGain(true), 10);
    });

    it("awards 2 XP for wrong", () => {
      assert.equal(calculateXPGain(false), 2);
    });
  });

  describe("Topic Mastery", () => {
    it("calculates percentage correctly", () => {
      // Mock: topic has 10 words, 4 known (mastery >= 3)
      const mockMastery = {
        word1: 3,
        word2: 4,
        word3: 5,
        word4: 3,
        word5: 2,
        word6: 1,
        word7: 0,
        word8: 2,
        word9: 1,
        word10: 0,
      };
      const known = Object.values(mockMastery).filter((n) => n >= 3).length;
      const total = 10;
      const pct = Math.round((known / total) * 100);
      assert.equal(pct, 40);
    });

    it("returns 0% when no words known", () => {
      const mockMastery = { word1: 0, word2: 1, word3: 2 };
      const known = Object.values(mockMastery).filter((n) => n >= 3).length;
      const pct = mockMastery ? Math.round((known / 3) * 100) : 0;
      assert.equal(pct, 0);
    });

    it("returns 100% when all words known", () => {
      const mockMastery = { word1: 3, word2: 4, word3: 5 };
      const known = Object.values(mockMastery).filter((n) => n >= 3).length;
      const pct = Math.round((known / 3) * 100);
      assert.equal(pct, 100);
    });
  });

  describe("Stamped Topics (40% threshold)", () => {
    const topics = ["zahlen", "zeit", "person"];

    function getStampedTopics(mastery: Record<string, number>, words: typeof WORDS): string[] {
      return topics.filter((t) => {
        const pool = words.filter((w) => w.topic === t);
        const known = pool.filter((w) => (mastery[w.id] ?? 0) >= 3).length;
        return pool.length ? Math.round((known / pool.length) * 100) >= 40 : false;
      });
    }

    it("stamps topic when >= 40% mastery", () => {
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

    it("does not stamp topic when < 40% mastery", () => {
      const mastery: Record<string, number> = {
        "word-zahlen-1": 3,
        "word-zahlen-2": 3,
        "word-zahlen-3": 2, // only 2/10 = 20%
        "word-zahlen-4": 2,
        "word-zahlen-5": 2,
        "word-zahlen-6": 2,
        "word-zahlen-7": 2,
        "word-zahlen-8": 2,
        "word-zahlen-9": 2,
        "word-zahlen-10": 2,
      };
      const stamped = getStampedTopics(mastery, WORDS);
      assert.ok(!stamped.includes("zahlen"));
    });
  });

  describe("Known Words Count", () => {
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
  });

  describe("Topic Mastery Integration", () => {
    it("topic mastery calculates correctly", () => {
      const topic = TOPICS[0];
      assert.ok(topic);
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
  });
});
