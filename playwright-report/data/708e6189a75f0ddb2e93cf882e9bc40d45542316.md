# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wortreise.spec.ts >> Performance >> no console errors on home page
- Location: e2e/wortreise.spec.ts:441:3

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  ["Failed to load resource: the server responded with a status of 404 ()"]
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Wortreise" [ref=e6] [cursor=pointer]:
        - /url: /
      - generic [ref=e8]:
        - generic [ref=e9]: 0 XP
        - generic [ref=e10]: ·
        - generic [ref=e11]: 0 days
        - button "Mute sounds" [ref=e12] [cursor=pointer]
        - link "Sign in" [ref=e17] [cursor=pointer]:
          - /url: /login
  - main [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e23]:
        - paragraph [ref=e24]: Goethe A1 · Start Deutsch 1
        - heading "Wortreise" [level=1] [ref=e25]
        - paragraph [ref=e26]: Play through the official A1 word list — about 804 entries, 153 verbs with present-tense forms, and English for every card.
        - generic [ref=e27]:
          - paragraph [ref=e28]: 0 words known
          - paragraph [ref=e29]: 0 XP earned
          - paragraph [ref=e30]: 0 district stamps
        - generic [ref=e31]:
          - link "Start with a quiz" [ref=e32] [cursor=pointer]:
            - /url: /play/quiz
          - link "Browse the list" [ref=e33] [cursor=pointer]:
            - /url: /words
      - generic [ref=e34]:
        - heading "Choose a ticket" [level=2] [ref=e36]
        - generic [ref=e37]:
          - link [ref=e38] [cursor=pointer]:
            - /url: /play/quiz
            - heading "Quiz Rally" [level=3] [ref=e43]
            - paragraph [ref=e44]: Four choices, articles included.
          - link [ref=e45] [cursor=pointer]:
            - /url: /play/speed
            - heading "Speed 45" [level=3] [ref=e50]
            - paragraph [ref=e51]: A 45-second combo run.
          - link [ref=e52] [cursor=pointer]:
            - /url: /play/type
            - heading "Type the Word" [level=3] [ref=e56]
            - paragraph [ref=e57]: English in, German out.
          - link [ref=e58] [cursor=pointer]:
            - /url: /play/verbs
            - heading "Verb Lab" [level=3] [ref=e63]
            - paragraph [ref=e64]: Regular, irregular, modal.
          - link [ref=e65] [cursor=pointer]:
            - /url: /play/match
            - heading "Match Pairs" [level=3] [ref=e71]
            - paragraph [ref=e72]: Pair DE with EN on a board.
          - link [ref=e73] [cursor=pointer]:
            - /url: /play/cards
            - heading "Flash Study" [level=3] [ref=e77]
            - paragraph [ref=e78]: Hear it, flip it, stamp it.
      - generic [ref=e79]:
        - heading "City districts" [level=2] [ref=e81]
        - generic [ref=e82]:
          - link [ref=e83] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e85]: Zahlen
            - paragraph [ref=e86]: Numbers
            - paragraph [ref=e88]: 0/49
          - link [ref=e89] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e91]: Zeit
            - paragraph [ref=e92]: Time
            - paragraph [ref=e94]: 0/80
          - link [ref=e95] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e97]: Person
            - paragraph [ref=e98]: People
            - paragraph [ref=e100]: 0/115
          - link [ref=e101] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e103]: Wohnen
            - paragraph [ref=e104]: Home
            - paragraph [ref=e106]: 0/44
          - link [ref=e107] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e109]: Umwelt
            - paragraph [ref=e110]: World
            - paragraph [ref=e112]: 0/20
          - link [ref=e113] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e115]: Reisen
            - paragraph [ref=e116]: Travel
            - paragraph [ref=e118]: 0/96
          - link [ref=e119] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e121]: Essen
            - paragraph [ref=e122]: Food
            - paragraph [ref=e124]: 0/57
          - link [ref=e125] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e127]: Einkaufen
            - paragraph [ref=e128]: Shopping
            - paragraph [ref=e130]: 0/40
          - link [ref=e131] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e133]: Dienste
            - paragraph [ref=e134]: Services
            - paragraph [ref=e136]: 0/46
          - link [ref=e137] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e139]: Lernen
            - paragraph [ref=e140]: Learning
            - paragraph [ref=e142]: 0/58
          - link [ref=e143] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e145]: Arbeit
            - paragraph [ref=e146]: Work
            - paragraph [ref=e148]: 0/23
          - link [ref=e149] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e151]: Freizeit
            - paragraph [ref=e152]: Leisure
            - paragraph [ref=e154]: 0/31
          - link [ref=e155] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e157]: Alltag
            - paragraph [ref=e158]: Everyday
            - paragraph [ref=e160]: 0/145
  - navigation [ref=e161]:
    - generic [ref=e162]:
      - link "Play" [ref=e163] [cursor=pointer]:
        - /url: /
      - link "Words" [ref=e167] [cursor=pointer]:
        - /url: /words
      - link "Pass" [ref=e170] [cursor=pointer]:
        - /url: /pass
      - link "Study" [ref=e174] [cursor=pointer]:
        - /url: /play/cards
```

# Test source

```ts
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
  413 |     await expect(labels.first()).toBeVisible();
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
> 454 |     expect(criticalErrors).toHaveLength(0);
      |                            ^ Error: expect(received).toHaveLength(expected)
  455 |   });
  456 | });
```