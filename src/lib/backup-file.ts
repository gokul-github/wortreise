import { Capacitor, registerPlugin } from "@capacitor/core";

type BackupFilePlugin = {
  save(options: {
    filename: string;
    text: string;
  }): Promise<{ cancelled?: boolean; saved?: boolean }>;
  pick(): Promise<{ cancelled?: boolean; text?: string }>;
};

const BackupFile = registerPlugin<BackupFilePlugin>("BackupFile");

/** Same detector shape as speech.ts — must not be named `use*`. */
export function androidBackup() {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";
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
    const result = await BackupFile.save({ filename, text });
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
  const result = await BackupFile.pick();
  if (result.cancelled || result.text == null) return null;
  return result.text.replace(/^\uFEFF/, "");
}
