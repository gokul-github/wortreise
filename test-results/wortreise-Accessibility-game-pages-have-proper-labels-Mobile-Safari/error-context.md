# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wortreise.spec.ts >> Accessibility >> game pages have proper labels
- Location: e2e/wortreise.spec.ts:407:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('label').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('label').first() with timeout 5000ms
  - waiting for locator('label').first()

```

```yaml
- banner:
  - link "Wortreise":
    - /url: /
  - text: 0 XP · 0 days
  - button "Mute sounds"
  - link "Sign in":
    - /url: /login
- main:
  - link "Station hall":
    - /url: /
  - paragraph: Start Deutsch 1
  - heading "Quiz Rally" [level=1]
  - paragraph: Four choices. German to English, English to German, and articles for nouns. Keys 1–4 work on a keyboard.
  - group "District":
    - text: District
    - button "Whole city"
    - button "Zahlen"
    - button "Zeit"
    - button "Person"
    - button "Wohnen"
    - button "Umwelt"
    - button "Reisen"
    - button "Essen"
    - button "Einkaufen"
    - button "Dienste"
    - button "Lernen"
    - button "Arbeit"
    - button "Freizeit"
    - button "Alltag"
  - group "Length":
    - text: Length
    - button "10"
    - button "20"
    - button "30"
  - group "Direction":
    - text: Direction
    - button "Mix"
    - button "DE → EN"
    - button "EN → DE"
  - button "Start round"
- navigation:
  - link "Play":
    - /url: /
  - link "Words":
    - /url: /words
  - link "Pass":
    - /url: /pass
  - link "Study":
    - /url: /play/cards
```

# Test source

```ts
  313 |       { path: "/play/match", name: "Match Pairs" },
  314 |       { path: "/play/cards", name: "Flash Study" },
  315 |     ];
  316 | 
  317 |     for (const mode of gameModes) {
  318 |       test(`loads ${mode.name} (${mode.path})`, async ({ page }) => {
  319 |         await page.goto(mode.path);
  320 |         await page.waitForLoadState("networkidle");
  321 |         await expect(page.locator(`text=${mode.name}`)).toBeVisible({ timeout: 10000 });
  322 |       });
  323 |     }
  324 |   });
  325 | 
  326 |   test.describe("Navigation", () => {
  327 |     test("header navigation works", async ({ page }) => {
  328 |       await expect(page.locator("a[href='/']")).toBeVisible();
  329 |       await expect(page.locator("a[href='/words']")).toBeVisible();
  330 |       await expect(page.locator("a[href='/pass']")).toBeVisible();
  331 |     });
  332 | 
  333 |     test("mobile bottom nav works", async ({ page }) => {
  334 |       await page.setViewportSize({ width: 375, height: 667 });
  335 |       await page.reload();
  336 |       await page.waitForLoadState("networkidle");
  337 | 
  338 |       await expect(page.locator('a[href="/"]:has-text("Play")')).toBeVisible();
  339 |       await expect(page.locator('a[href="/words"]:has-text("Words")')).toBeVisible();
  340 |       await expect(page.locator('a[href="/pass"]:has-text("Pass")')).toBeVisible();
  341 |       await expect(page.locator('a[href="/play/cards"]:has-text("Study")')).toBeVisible();
  342 |     });
  343 |   });
  344 | 
  345 |   test.describe("Auth Flow", () => {
  346 |     test("shows Sign in button when signed out", async ({ page }) => {
  347 |       await page.goto("/");
  348 |       await page.waitForLoadState("networkidle");
  349 | 
  350 |       // Should show Sign in link in header
  351 |       await expect(page.locator('a[href="/login"]:has-text("Sign in")')).toBeVisible();
  352 |     });
  353 | 
  354 |     test("navigates to login page", async ({ page }) => {
  355 |       await page.goto("/");
  356 |       await page.waitForLoadState("networkidle");
  357 | 
  358 |       await page.click('a[href="/login"]');
  359 |       await expect(page).toHaveURL(/.*login/);
  360 |       await expect(page.locator("text=Sign in to Wortreise")).toBeVisible();
  361 |     });
  362 | 
  363 |     test("login page shows OAuth buttons", async ({ page }) => {
  364 |       await page.goto("/login");
  365 |       await page.waitForLoadState("networkidle");
  366 | 
  367 |       await expect(page.locator("text=Continue with Google")).toBeVisible();
  368 |       await expect(page.locator("text=Continue with X")).toBeVisible();
  369 |     });
  370 |   });
  371 | 
  372 |   test.describe("Audio/Sound", () => {
  373 |     test("sound toggle button exists", async ({ page }) => {
  374 |       await page.goto("/");
  375 |       await page.waitForLoadState("networkidle");
  376 | 
  377 |       const soundButton = page.locator('button[aria-label*="Mute"], button[aria-label*="Unmute"]');
  378 |       await expect(soundButton).toBeVisible();
  379 |     });
  380 | 
  381 |     test("toggles sound state", async ({ page }) => {
  382 |       await page.goto("/");
  383 |       await page.waitForLoadState("networkidle");
  384 | 
  385 |       const soundButton = page.locator('button[aria-label*="Mute"], button[aria-label*="Unmute"]');
  386 |       const initialLabel = await soundButton.getAttribute("aria-label");
  387 | 
  388 |       await soundButton.click();
  389 |       await page.waitForTimeout(100);
  390 | 
  391 |       const newLabel = await soundButton.getAttribute("aria-label");
  392 |       expect(newLabel).not.toBe(initialLabel);
  393 |     });
  394 |   });
  395 | });
  396 | 
  397 | test.describe("Accessibility", () => {
  398 |   test("home page has proper heading structure", async ({ page }) => {
  399 |     await page.goto("/");
  400 |     await page.waitForLoadState("networkidle");
  401 | 
  402 |     const h1 = page.locator("h1");
  403 |     await expect(h1).toHaveCount(1);
  404 |     await expect(h1).toContainText("Wortreise");
  405 |   });
  406 | 
  407 |   test("game pages have proper labels", async ({ page }) => {
  408 |     await page.goto("/play/quiz");
  409 |     await page.waitForLoadState("networkidle");
  410 | 
  411 |     // Check for form labels
  412 |     const labels = page.locator("label");
> 413 |     await expect(labels.first()).toBeVisible();
      |                                  ^ Error: expect(locator).toBeVisible() failed
  414 |   });
  415 | 
  416 |   test("buttons have accessible names", async ({ page }) => {
  417 |     await page.goto("/");
  418 |     await page.waitForLoadState("networkidle");
  419 | 
  420 |     const buttons = page.locator("button");
  421 |     for (const btn of await buttons.all()) {
  422 |       const ariaLabel = await btn.getAttribute("aria-label");
  423 |       const text = await btn.textContent();
  424 |       // Should have either aria-label or visible text
  425 |       expect(ariaLabel || text?.trim()).toBeTruthy();
  426 |     }
  427 |   });
  428 | });
  429 | 
  430 | test.describe("Performance", () => {
  431 |   test("home page loads within acceptable time", async ({ page }) => {
  432 |     const start = Date.now();
  433 |     await page.goto("/");
  434 |     await page.waitForLoadState("networkidle");
  435 |     const loadTime = Date.now() - start;
  436 | 
  437 |     // Should load within 5 seconds
  438 |     expect(loadTime).toBeLessThan(5000);
  439 |   });
  440 | 
  441 |   test("no console errors on home page", async ({ page }) => {
  442 |     const errors: string[] = [];
  443 |     page.on("console", (msg) => {
  444 |       if (msg.type() === "error") errors.push(msg.text());
  445 |     });
  446 | 
  447 |     await page.goto("/");
  448 |     await page.waitForLoadState("networkidle");
  449 | 
  450 |     // Filter out known harmless errors
  451 |     const criticalErrors = errors.filter(
  452 |       (e) => !e.includes("favicon") && !e.includes("manifest") && !e.includes("Not Found")
  453 |     );
  454 |     expect(criticalErrors).toHaveLength(0);
  455 |   });
  456 | });
```