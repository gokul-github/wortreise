import { test, expect, type Page } from "playwright/test";
import { readFileSync } from "node:fs";

async function headerText(page: Page) {
  return (await page.locator("header").innerText()).replace(/\s+/g, "");
}

test.describe("Wortreise - Critical User Journeys", () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto("/");
    // Wait for hydration
    await page.waitForLoadState("networkidle");
  });

  test.describe("New User Onboarding", () => {
    test("lands on home page with correct title", async ({ page }) => {
      await expect(page).toHaveTitle("Wortreise");
    });

    test("shows game mode cards on home page", async ({ page }) => {
      await expect(page.locator("text=Quiz Rally")).toBeVisible();
      await expect(page.locator("text=Speed 45")).toBeVisible();
      await expect(page.locator("text=Type the Word")).toBeVisible();
      await expect(page.locator("text=Verb Lab")).toBeVisible();
      await expect(page.locator("text=Match Pairs")).toBeVisible();
      await expect(page.locator("text=Flash Study")).toBeVisible();
    });

    test("navigates to Quiz Rally and starts a game", async ({ page }) => {
      await page.click("a[href='/play/quiz']");
      await expect(page).toHaveURL(/.*play\/quiz/);
      await expect(page.locator("text=Quiz Rally")).toBeVisible();
    });

    test("navigates to Words dictionary", async ({ page }) => {
      await page.click("a[href='/words']");
      await expect(page).toHaveURL(/.*words/);
    });

    test("navigates to Pass (Reisepass)", async ({ page }) => {
      await page.click("a[href='/pass']");
      await expect(page).toHaveURL(/.*pass/);
      await expect(page.locator("text=Reisepass")).toBeVisible();
    });
  });

  test.describe("Game Play - Quiz Rally", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/play/quiz");
      await page.waitForLoadState("networkidle");
    });

    test("shows game setup with topic selector", async ({ page }) => {
      await expect(page.locator("text=Quiz Rally")).toBeVisible();
      await expect(page.locator("text=Four choices")).toBeVisible();
    });

    test("can select topic and start game", async ({ page }) => {
      // Select a topic (first available)
      const topicButton = page
        .locator('button:has-text("Zahlen"), button:has-text("Whole city")')
        .first();
      await topicButton.click();

      // Start game
      await page.getByRole("button", { name: "Start round" }).click();
      await expect(page.getByText(/\d+ correct/)).toBeVisible({ timeout: 10000 });
    });

    test("answers question and shows result", async ({ page }) => {
      await page.click('button:has-text("Whole city")'); // Select all topics
      await page.getByRole("button", { name: "Start round" }).click();
      await expect(page.getByText(/\d+ correct/)).toBeVisible();
      await page.locator("span.tabular-nums", { hasText: /^1$/ }).first().click();

      // Should show feedback and next button
      await expect(page.locator("button:has-text('Next')")).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe("Progress Persistence", () => {
    test("XP and streak persist across page reloads", async ({ page }) => {
      // Play a quick game to earn XP
      await page.goto("/play/quiz");
      await page.waitForLoadState("networkidle");
      await page.click('button:has-text("Whole city")');
      await page.getByRole("button", { name: "Start round" }).click();
      await expect(page.getByText(/\d+ correct/)).toBeVisible({ timeout: 10000 });
      await page.locator("span.tabular-nums", { hasText: /^1$/ }).first().click();
      await expect(page.locator("button:has-text('Next')")).toBeVisible({ timeout: 5000 });
      await page.click("button:has-text('Next')");

      // Check XP in header
      const xpBefore = await headerText(page);

      // Reload page
      await page.reload();
      await page.waitForLoadState("networkidle");

      const xpAfter = await headerText(page);
      expect(xpAfter).toBe(xpBefore);
    });

    test("streak persists across page reloads", async ({ page }) => {
      const streakBefore = await headerText(page);
      await page.reload();
      await page.waitForLoadState("networkidle");
      const streakAfter = await headerText(page);
      expect(streakAfter).toBe(streakBefore);
    });

    test("mastery data persists", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      const known = page.getByText(/of \d+ known/);
      const knownBefore = await known.first().textContent();

      await page.reload();
      await page.waitForLoadState("networkidle");

      const knownAfter = await page
        .getByText(/of \d+ known/)
        .first()
        .textContent();
      expect(knownAfter).toBe(knownBefore);
    });
  });

  test.describe("Backup & Restore", () => {
    test("exports backup file", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      // Set up download handler
      const downloadPromise = page.waitForEvent("download");
      await page.click('button:has-text("Export Backup")');
      const download = await downloadPromise;

      // Verify file
      expect(download.suggestedFilename()).toMatch(/wortreise-backup-\d{4}-\d{2}-\d{2}\.json/);

      // Read and validate JSON
      const path = await download.path();
      if (path) {
        const content = readFileSync(path, "utf-8");
        const backup = JSON.parse(content);
        expect(backup).toHaveProperty("version", 1);
        expect(backup).toHaveProperty("backupVersion", 1);
        expect(backup).toHaveProperty("timestamp");
        expect(backup).toHaveProperty("data");
        expect(backup.data).toHaveProperty("xp");
        expect(backup.data).toHaveProperty("streak");
        expect(backup.data).toHaveProperty("mastery");
      }
    });

    test("imports backup file", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      // Create a test backup file
      const backup = {
        version: 1,
        backupVersion: 1,
        timestamp: new Date().toISOString(),
        data: {
          version: 1,
          xp: 999,
          streak: 99,
          lastPlayDate: "2026-01-15",
          mastery: { "test-word": 5 },
          seen: {},
          correct: {},
          wrong: {},
          bestSpeedScore: 50,
          bestCombo: 20,
          sound: true,
          direction: "mix",
        },
      };

      // Set up file input
      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles({
        name: "test-backup.json",
        mimeType: "application/json",
        buffer: Buffer.from(JSON.stringify(backup, null, 2)),
      });

      // Should show success message
      await expect(page.locator("text=Backup imported successfully")).toBeVisible({
        timeout: 5000,
      });

      // Verify XP updated
      await expect.poll(async () => headerText(page)).toContain("999XP");
    });

    test("shows error for invalid backup", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles({
        name: "invalid.json",
        mimeType: "application/json",
        buffer: Buffer.from("not valid json"),
      });

      await expect(page.locator("text=Invalid backup file")).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe("Voice Selection", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");
      test.skip(
        (await page.locator("select").count()) === 0,
        "No German speech-synthesis voice in this browser",
      );
    });

    test("shows voice selector with German voices", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      // Scroll to voice settings
      await page.locator("text=Voice Settings").scrollIntoViewIfNeeded();

      // Should show dropdown with voices
      const select = page.locator("select");
      await expect(select).toBeVisible();

      const options = await select.locator("option").allTextContents();
      expect(options.length).toBeGreaterThan(0);
      expect(options.some((o) => o.includes("de-DE") || o.includes("German"))).toBeTruthy();
    });

    test("saves voice preference", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      const select = page.locator("select");
      await select.scrollIntoViewIfNeeded();

      // Change voice
      const originalValue = await select.inputValue();
      await select.selectOption({ index: 0 }); // Select first German voice

      // Verify localStorage updated
      const saved = await page.evaluate(() => localStorage.getItem("wortreise-voice-preference"));
      expect(saved).toBeTruthy();
    });

    test("tests selected voice", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      const select = page.locator("select");
      await select.scrollIntoViewIfNeeded();

      // Click test button
      await page.click('button:has-text("Test Selected Voice")');

      // Should call speech synthesis (we can't easily test audio, but verify no error)
      await expect(page.locator("text=Voice Settings")).toBeVisible();
    });
  });

  test.describe("Debug Panel", () => {
    test("shows store state on Debug click", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      await page.click('button:has-text("Debug Store")');

      // Should show debug info in pre tag
      await expect(page.locator("pre")).toBeVisible({ timeout: 5000 });
      const debugText = await page.locator("pre").textContent();
      expect(debugText).toContain("STORE STATE");
      expect(debugText).toContain("LOCALSTORAGE");
    });

    test("force hydrate reloads from localStorage", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      await page.click('button:has-text("Force Hydrate")');
      await page.waitForTimeout(500);

      // Should re-show debug info
      const debugText = await page.locator("pre").textContent();
      expect(debugText).toContain("STORE STATE");
    });

    test("lists all available voices", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      await page.click('button:has-text("List Voices")');

      const debugText = await page.locator("pre").textContent();
      expect(debugText).toMatch(/AVAILABLE VOICES|No voices available/);
    });

    test("tests German voice", async ({ page }) => {
      await page.goto("/pass");
      await page.waitForLoadState("networkidle");

      await page.click('button:has-text("Test German")');
      await page.waitForTimeout(1000);

      // Should show voice list after test
      const debugText = await page.locator("pre").textContent();
      expect(debugText).toMatch(/AVAILABLE VOICES|No voices available/);
    });
  });

  test.describe("All Game Modes", () => {
    const gameModes = [
      { path: "/play/quiz", name: "Quiz Rally" },
      { path: "/play/speed", name: "Speed 45" },
      { path: "/play/type", name: "Type the Word" },
      { path: "/play/verbs", name: "Verb Lab" },
      { path: "/play/match", name: "Match Pairs" },
      { path: "/play/cards", name: "Flash Study" },
    ];

    for (const mode of gameModes) {
      test(`loads ${mode.name} (${mode.path})`, async ({ page }) => {
        await page.goto(mode.path);
        await page.waitForLoadState("networkidle");
        await expect(page.locator(`text=${mode.name}`)).toBeVisible({ timeout: 10000 });
      });
    }
  });

  test.describe("Navigation", () => {
    test("header navigation works", async ({ page }) => {
      await expect(page.locator("header nav a[href='/']")).toBeVisible();
      await expect(page.locator("header nav a[href='/words']")).toBeVisible();
      await expect(page.locator("header nav a[href='/pass']")).toBeVisible();
    });

    test("mobile bottom nav works", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await page.waitForLoadState("networkidle");

      const bottom = page.locator("nav.fixed");
      await expect(bottom.getByRole("link", { name: "Play", exact: true })).toBeVisible();
      await expect(bottom.getByRole("link", { name: "Words", exact: true })).toBeVisible();
      await expect(bottom.getByRole("link", { name: "Pass", exact: true })).toBeVisible();
      await expect(bottom.getByRole("link", { name: "Study", exact: true })).toBeVisible();
    });
  });

  test.describe("Auth Flow", () => {
    test("uses the local dev user when auth is off", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await expect(page.getByText("Dev User")).toBeVisible();
      await expect(page.locator('a[href="/login"]')).toHaveCount(0);
    });

    test("navigates to login page", async ({ page }) => {
      await page.goto("/login");
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL(/.*login/);
      await expect(page.locator("text=Sign in to Wortreise")).toBeVisible();
    });

    test("login page shows OAuth buttons", async ({ page }) => {
      await page.goto("/login");
      await page.waitForLoadState("networkidle");

      await expect(page.locator("text=Continue with Google")).toBeVisible();
      await expect(page.locator("text=Continue with X")).toBeVisible();
    });
  });

  test.describe("Audio/Sound", () => {
    test("sound toggle button exists", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const soundButton = page.locator('button[aria-label*="Mute"], button[aria-label*="Unmute"]');
      await expect(soundButton).toBeVisible();
    });

    test("toggles sound state", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const soundButton = page.locator('button[aria-label*="Mute"], button[aria-label*="Unmute"]');
      const initialLabel = await soundButton.getAttribute("aria-label");

      await soundButton.click();
      await page.waitForTimeout(100);

      const newLabel = await soundButton.getAttribute("aria-label");
      expect(newLabel).not.toBe(initialLabel);
    });
  });
});

test.describe("Accessibility", () => {
  test("home page has proper heading structure", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("Wortreise");
  });

  test("game pages have proper labels", async ({ page }) => {
    await page.goto("/play/quiz");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("group", { name: "District" })).toBeVisible();
  });

  test("buttons have accessible names", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const buttons = page.locator("button");
    for (const btn of await buttons.all()) {
      const ariaLabel = await btn.getAttribute("aria-label");
      const text = await btn.textContent();
      // Should have either aria-label or visible text
      expect(ariaLabel || text?.trim()).toBeTruthy();
    }
  });
});

test.describe("Performance", () => {
  test("home page loads within acceptable time", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - start;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test("no console errors on home page", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Filter out known harmless errors
    const criticalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("manifest") && !e.includes("Not Found"),
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
