import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

type Call = { plugin: string; method: string; options?: object };

function installWindow(cap: unknown, speak: () => void) {
  (globalThis as { window?: unknown }).window = {
    Capacitor: cap,
    speechSynthesis: {
      speak,
      cancel() {},
      getVoices: () => [],
    },
  };
}

describe("Android voice bridge", () => {
  const previous = (globalThis as { window?: unknown }).window;

  afterEach(() => {
    (globalThis as { window?: unknown }).window = previous;
  });

  it("speaks with the native TTS plugin instead of speechSynthesis", async () => {
    const calls: Call[] = [];
    let webSpoke = false;
    installWindow(
      {
        isNativePlatform: () => true,
        getPlatform: () => "android",
        nativePromise: async (plugin: string, method: string, options?: object) => {
          calls.push({ plugin, method, options });
          return {};
        },
      },
      () => {
        webSpoke = true;
      },
    );

    const { speakGerman } = await import("./speech.ts");
    await speakGerman("Hallo");

    assert.equal(webSpoke, false);
    assert.deepEqual(
      calls.map((c) => c.plugin + "." + c.method),
      ["Tts.stop", "Tts.speak"],
    );
    assert.deepEqual(calls[1]?.options, { text: "Hallo" });
  });

  it("does not treat a normal browser as the Android app", async () => {
    installWindow(undefined, () => {});
    const { androidNative } = await import("./native-bridge.ts");
    assert.equal(androidNative(), false);
  });
});
