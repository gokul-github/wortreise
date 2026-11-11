type NativeCapacitor = {
  isNativePlatform?: () => boolean;
  getPlatform?: () => string;
  nativePromise?: (pluginName: string, methodName: string, options?: object) => Promise<unknown>;
};

/**
 * The Android WebView injects this bridge before the app script runs.
 * Calling it directly avoids importing `@capacitor/core`, which crashes
 * the website SSR build, and avoids a runtime `import()` the WebView
 * cannot resolve.
 */
function nativeCapacitor(): NativeCapacitor | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { Capacitor?: NativeCapacitor }).Capacitor;
}

/** True only inside the Capacitor Android app. Must not be named `use*`. */
export function androidNative(): boolean {
  const cap = nativeCapacitor();
  if (!cap?.nativePromise || !cap.isNativePlatform || !cap.getPlatform) return false;
  try {
    return cap.isNativePlatform() && cap.getPlatform() === "android";
  } catch {
    return false;
  }
}

export function androidPlugin<T>(plugin: string, method: string, options?: object): Promise<T> {
  const cap = nativeCapacitor();
  if (!cap?.nativePromise) {
    return Promise.reject(new Error(`${plugin}.${method} is only available in the Android app`));
  }
  return cap.nativePromise(plugin, method, options) as Promise<T>;
}
