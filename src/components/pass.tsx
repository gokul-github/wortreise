import { useRef, useState, useEffect } from "react";
import { Download, Stamp, Upload, Database, RefreshCw, Volume2, Mic, Settings } from "lucide-react";
import { TOPICS, STATS, VERBS, type TopicId } from "@/data";
import { Button } from "@/components/ui/button";
import { stampedTopics, topicMastery, useProgress } from "@/store/progress";
import { speakGerman, listVoices, getGermanVoices, saveVoicePreference, loadVoicePreference } from "@/lib/speech";

/**
 * Each district gets its own colour so the pass reads as a map rather than a
 * uniform list. The values are tuned to sit on the warm paper background while
 * staying clearly distinct from one another.
 */
const TOPIC_PALETTE: Record<TopicId, { base: string; soft: string; ink: string }> = {
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
function tint(hex: string, alpha: number) {
  const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}

export function Pass() {
  const mastery = useProgress((s) => s.mastery);
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const bestSpeed = useProgress((s) => s.bestSpeedScore);
  const bestCombo = useProgress((s) => s.bestCombo);
  const reset = useProgress((s) => s.reset);
  const stamps = stampedTopics(mastery);
  const known = Object.values(mastery).filter((n) => n >= 3).length;
  const verbKnown = VERBS.filter((v) => (mastery[v.id] ?? 0) >= 3).length;

  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("Click 'Debug' to inspect");
  const [voiceSelectorOpen, setVoiceSelectorOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const germanVoices = getGermanVoices();
  const savedVoice = loadVoicePreference();
  const currentVoice = germanVoices.find(v => v.name === savedVoice) || germanVoices[0];

  const handleVoiceChange = (voiceName: string) => {
    saveVoicePreference(voiceName);
    setVoiceSelectorOpen(false);
    setDebugInfo(`Voice preference saved: ${voiceName}\nClick "Test German" to hear it.`);
  };

  const handleExport = () => {
    const backup = useProgress.getState().exportBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wortreise-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const backup = JSON.parse(event.target?.result as string);
        const result = useProgress.getState().importBackup(backup);
        setImportStatus({
          success: result.success,
          message: result.success ? "Backup imported successfully!" : `Import failed: ${result.error}`,
        });
        if (result.success) {
          useProgress.getState().hydrate();
        }
      } catch {
        setImportStatus({ success: false, message: "Invalid backup file (not valid JSON)" });
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  };

  const handleDebug = () => {
    const storeState = useProgress.getState();
    const lsRaw = localStorage.getItem("wortreise-save-v1");
    let lsParsed = "empty";
    try {
      lsParsed = lsRaw ? JSON.stringify(JSON.parse(lsRaw), null, 2) : "empty";
    } catch {
      lsParsed = "corrupted";
    }
    setDebugInfo(
      `STORE STATE:\n` +
      `  xp: ${storeState.xp}\n` +
      `  streak: ${storeState.streak}\n` +
      `  lastPlayDate: ${storeState.lastPlayDate}\n` +
      `  mastery entries: ${Object.keys(storeState.mastery).length}\n` +
      `  seen entries: ${Object.keys(storeState.seen).length}\n` +
      `  sound: ${storeState.sound}\n` +
      `  direction: ${storeState.direction}\n\n` +
      `LOCALSTORAGE (wortreise-save-v1):\n` +
      lsParsed
    );
  };

  const handleForceHydrate = () => {
    useProgress.getState().hydrate();
    setTimeout(() => handleDebug(), 100);
  };

  const handleListVoices = () => {
    const voices = listVoices();
    if (voices.length === 0) {
      setDebugInfo("No voices available. Try clicking 'Test German' first to trigger voice loading.");
    } else {
      setDebugInfo(
        `AVAILABLE VOICES (${voices.length}):\n\n` +
        voices.map(v => `${v.name} (${v.lang})${v.default ? " ★ DEFAULT" : ""}`).join("\n")
      );
    }
  };

  const handleTestVoice = async () => {
    setDebugInfo("Testing German voice...\nCheck browser console for details.");
    await speakGerman("Hallo, wie geht es dir? Das ist ein Test der deutschen Aussprache.");
    setTimeout(() => handleListVoices(), 500);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Collect the city</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Reisepass</h1>
      <p className="mt-2 text-muted">
        A district stamps when you know 40% of its words (mastery 3 of 5). Keep travelling.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Mini k={xp} v="XP" />
        <Mini k={streak} v="day streak" />
        <Mini k={known} v={`of ${STATS.words} known`} />
        <Mini k={verbKnown} v={`of ${STATS.verbs} verbs`} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted">
        <p>
          Best Speed 45: <span className="tabular-nums font-medium text-fg">{bestSpeed}</span>
        </p>
        <p>
          Best combo: <span className="tabular-nums font-medium text-fg">×{bestCombo}</span>
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TOPICS.map((t) => {
          const m = topicMastery(mastery, t.id);
          const on = stamps.includes(t.id);
          const palette = TOPIC_PALETTE[t.id];
          return (
            <div
              key={t.id}
              className="relative overflow-hidden rounded-[24px] border p-4 transition-colors"
              style={{
                borderColor: tint(palette.base, on ? 0.45 : 0.18),
                backgroundColor: on ? palette.soft : tint(palette.soft, 0.55),
              }}
            >
              <Stamp
                className="absolute -right-2 -top-1 size-16 rotate-[-12deg]"
                style={{ color: tint(palette.base, on ? 0.5 : 0.18) }}
              />
              <p
                className="font-display text-lg font-semibold"
                style={{ color: palette.ink }}
              >
                {t.de}
              </p>
              <p className="text-xs text-muted">{t.en}</p>
              <p className="mt-3 text-sm tabular-nums text-fg">
                {m.pct}% · {m.known}/{m.total}
              </p>
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full"
                style={{ backgroundColor: tint(palette.soft, 0.7) }}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{ width: `${m.pct}%`, backgroundColor: palette.base }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Button
        variant="ghost"
        className="mt-10 text-muted"
        onClick={() => {
          if (confirm("Reset all local progress?")) reset();
        }}
      >
        Reset local progress
      </Button>

      <div className="mt-6 border-t border-border pt-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Backup & Restore</p>
        <p className="mt-2 text-sm text-muted">
          Export your progress to a file, then import it on another device or browser.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex-1"
          >
            <Download className="mr-2 size-4" />
            Export Backup
          </Button>
          <label className="flex-1 cursor-pointer">
            <Button
              variant="outline"
              className="flex-1 justify-center"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current?.click();
              }}
            >
              <Upload className="mr-2 size-4" />
              Import Backup
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="sr-only"
              onChange={handleImport}
            />
          </label>
        </div>
        {importStatus && (
          <p className="mt-3 text-sm" style={{ color: importStatus.success ? "var(--color-accent)" : "var(--color-destructive)" }}>
            {importStatus.message}
          </p>
        )}

        <div className="mt-6 border-t border-border pt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Debug</p>
          <p className="mt-2 text-sm text-muted">
            Inspect current store state and localStorage.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={handleDebug} className="flex-1">
              <Database className="mr-2 size-4" />
              Debug Store
            </Button>
            <Button variant="outline" onClick={handleForceHydrate} className="flex-1">
              <RefreshCw className="mr-2 size-4" />
              Force Hydrate
            </Button>
            <Button variant="outline" onClick={handleListVoices} className="flex-1">
              <Mic className="mr-2 size-4" />
              List Voices
            </Button>
            <Button variant="outline" onClick={handleTestVoice} className="flex-1">
              <Volume2 className="mr-2 size-4" />
              Test German
            </Button>
          </div>
          <pre className="mt-3 text-[10px] text-muted bg-surface border border-border rounded p-3 overflow-auto max-h-64 whitespace-pre-wrap font-mono">
            {debugInfo}
          </pre>
        </div>

        {germanVoices.length > 0 && (
          <div className="mt-6 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Voice Settings</p>
                <p className="mt-1 text-sm text-muted">
                  Choose your preferred German voice (saved locally).
                </p>
              </div>
              <span className="text-xs text-muted bg-surface px-2 py-1 rounded">
                {germanVoices.length} German voice{germanVoices.length !== 1 ? "s" : ""} available
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <label className="flex items-center gap-3">
                <span className="text-sm text-muted w-24">Current:</span>
                <select
                  value={currentVoice?.name || ""}
                  onChange={(e) => handleVoiceChange(e.target.value)}
                  className="flex-1 rounded-[10px] border border-border bg-surface px-3 py-2 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {germanVoices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (currentVoice) {
                    speakGerman("Hallo, das ist ein Test der deutschen Stimme.");
                  }
                }}
              >
                <Volume2 className="mr-2 size-4" />
                Test Selected Voice
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Mini({ k, v }: { k: number; v: string }) {
  return (
    <div className="rounded-[20px] border border-border bg-surface p-4">
      <p className="font-display text-2xl font-semibold tabular-nums">{k}</p>
      <p className="text-xs text-muted">{v}</p>
    </div>
  );
}