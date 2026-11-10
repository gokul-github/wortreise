# Wortreise

A travel-journal game for the Goethe-Zertifikat A1 _Start Deutsch 1_ word list.

Play through ~800 entries (the official A1 vocabulary plus related forms), each with English, an example sentence, and spoken German. **148 verbs** include present-tense forms (ich–Sie), regular / irregular / mixed / modal labels, and past participles.

Progress (XP, streak, mastery, district stamps) is stored in the browser — no account required.

## Play

| Mode              | What you do                                            |
| ----------------- | ------------------------------------------------------ |
| **Quiz Rally**    | Four choices, DE↔EN, articles on nouns                 |
| **Speed 45**      | 45-second combo run                                    |
| **Type the Word** | English prompt, type the German (umlaut keys included) |
| **Verb Lab**      | Fill the present-tense blank — _du fährst_, _er isst_… |
| **Match Pairs**   | Tap German to English on a board                       |
| **Flash Study**   | Hear it, flip it, stamp it                             |

Open **Words** to browse by topic, noun, or verb. The **Reisepass** tracks XP, a streak, and district stamps when a topic hits 40% mastery.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (default port **8080**).

```bash
npm run typecheck
npm run build
```

## Android

The same game ships as an Android app via [Capacitor](https://capacitorjs.com/). The WebView loads a static bundle of the game (progress still stays on the device).

```bash
npm run android:apk
```

The debug APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`. Install it with `adb install -r` that file. The Android build needs JDK 21.

```bash
npm run test:android      # web bundle check + JVM unit tests
npm run android:release   # release APK (signed when keystore env vars are set)
```

GitHub Actions:

| Workflow                                                 | When                                                 |
| -------------------------------------------------------- | ---------------------------------------------------- |
| [Android build](.github/workflows/android-build.yml)     | every push to `main` — debug APK artifact            |
| [Android test](.github/workflows/android-test.yml)       | push / PR — typecheck, web tests, Android unit tests |
| [Android release](.github/workflows/android-release.yml) | tag `v*` — APK attached to the GitHub release        |

To sign a release build, set `ANDROID_KEYSTORE_FILE`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, and `ANDROID_KEY_PASSWORD`. In GitHub, store the keystore as the base64 secret `ANDROID_KEYSTORE_BASE64` plus the three password/alias secrets.

## Stack

React 19, TanStack Start, Tailwind v4, Zustand (localStorage save).

Vocabulary is adapted from the Goethe-Institut _Goethe-Zertifikat A1: Start Deutsch 1_ word list for personal study.
