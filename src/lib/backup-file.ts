import { androidNative, androidPlugin } from "./native-bridge.ts";

type BackupResult = { cancelled?: boolean; saved?: boolean; text?: string };

/** Same detector shape as speech.ts — must not be named `use*`. */
export function androidBackup() {
  return androidNative();
}

export function backupFilename(date = new Date()) {
  return `wortreise-backup-${date.toISOString().slice(0, 10)}.json`;
}

export function serializeBackup(backup: unknown) {
  return JSON.stringify(backup, null, 2);
}

/**
 * Web: browser download. Android: system "Save" dialog.
 * Both write the same JSON the other side imports.
 */
export async function exportBackupFile(
  backup: unknown,
): Promise<{ cancelled: boolean; native: boolean }> {
  const filename = backupFilename();
  const text = serializeBackup(backup);
  if (androidBackup()) {
    const result = await androidPlugin<BackupResult>("BackupFile", "save", { filename, text });
    return { cancelled: Boolean(result.cancelled), native: true };
  }
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return { cancelled: false, native: false };
}

/** Android document picker. Returns null when the user cancels. */
export async function pickBackupText(): Promise<string | null> {
  if (!androidBackup()) return null;
  const result = await androidPlugin<BackupResult>("BackupFile", "pick");
  if (result.cancelled || result.text == null) return null;
  return result.text.replace(/^\uFEFF/, "");
}
