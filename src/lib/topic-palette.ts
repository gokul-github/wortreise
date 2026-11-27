import type { TopicId } from "@/data/types";

/**
 * Each district gets its own colour so the pass and the play hall read as a
 * map rather than a uniform list. Tuned to sit on the warm paper background.
 */
export const TOPIC_PALETTE: Record<TopicId, { base: string; soft: string; ink: string }> = {
  zahlen: { base: "#2c4f7c", soft: "#d9e3f1", ink: "#1f3a5c" },
  zeit: { base: "#8a5a20", soft: "#f3e6d2", ink: "#6b4517" },
  person: { base: "#8a3344", soft: "#f1dde1", ink: "#6d2836" },
  wohnen: { base: "#a0522d", soft: "#f3e1d5", ink: "#7d3f22" },
  umwelt: { base: "#2f6b4a", soft: "#dcebe1", ink: "#245239" },
  reisen: { base: "#1f6f6b", soft: "#d8ebe9", ink: "#175451" },
  essen: { base: "#b45309", soft: "#f7e3cf", ink: "#8a3f07" },
  einkaufen: { base: "#6b4a8a", soft: "#e8ddf2", ink: "#523870" },
  dienste: { base: "#4a5568", soft: "#e0e4ea", ink: "#374151" },
  lernen: { base: "#3f4f9c", soft: "#dfe2f4", ink: "#303c78" },
  arbeit: { base: "#6b5340", soft: "#e9e0d6", ink: "#523f30" },
  freizeit: { base: "#9c3f6b", soft: "#f2dce7", ink: "#7a3053" },
  alltag: { base: "#5f6b2f", soft: "#e6e9d6", ink: "#4a5324" },
};

/** 6-digit hex + an alpha channel, for tints that blend with the page. */
export function tint(hex: string, alpha: number) {
  const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}
