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
      - generic [ref=e5]:
        - link "Wortreise A1" [ref=e6]:
          - /url: /
          - generic [ref=e7]: Wortreise
          - generic [ref=e8]: A1
        - navigation [ref=e9]:
          - link "Play" [ref=e10]:
            - /url: /
          - link "Words" [ref=e11]:
            - /url: /words
          - link "Pass" [ref=e12]:
            - /url: /pass
      - generic [ref=e13]:
        - generic [ref=e14]: 0 XP
        - generic [ref=e15]: ·
        - generic [ref=e16]: 0 days
        - button "Mute sounds" [ref=e17] [cursor=pointer]
        - link "Sign in" [ref=e22]:
          - /url: /login
  - main [ref=e26]:
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Goethe A1 · Start Deutsch 1
        - heading "Wortreise" [level=1] [ref=e30]
        - paragraph [ref=e31]: Play through the official A1 word list — about 804 entries, 153 verbs with present-tense forms, and English for every card.
        - generic [ref=e32]:
          - paragraph [ref=e33]: 0 words known
          - paragraph [ref=e34]: 0 XP earned
          - paragraph [ref=e35]: 0 district stamps
        - generic [ref=e36]:
          - link "Start with a quiz" [ref=e37]:
            - /url: /play/quiz
          - link "Browse the list" [ref=e38]:
            - /url: /words
      - generic [ref=e39]:
        - generic [ref=e40]:
          - heading "Choose a ticket" [level=2] [ref=e41]
          - link "Reisepass" [ref=e42]:
            - /url: /pass
        - generic [ref=e46]:
          - link [ref=e47]:
            - /url: /play/quiz
            - heading "Quiz Rally" [level=3] [ref=e52]
            - paragraph [ref=e53]: Four choices, articles included.
          - link [ref=e54]:
            - /url: /play/speed
            - heading "Speed 45" [level=3] [ref=e59]
            - paragraph [ref=e60]: A 45-second combo run.
          - link [ref=e61]:
            - /url: /play/type
            - heading "Type the Word" [level=3] [ref=e65]
            - paragraph [ref=e66]: English in, German out.
          - link [ref=e67]:
            - /url: /play/verbs
            - heading "Verb Lab" [level=3] [ref=e72]
            - paragraph [ref=e73]: Regular, irregular, modal.
          - link [ref=e74]:
            - /url: /play/match
            - heading "Match Pairs" [level=3] [ref=e80]
            - paragraph [ref=e81]: Pair DE with EN on a board.
          - link [ref=e82]:
            - /url: /play/cards
            - heading "Flash Study" [level=3] [ref=e86]
            - paragraph [ref=e87]: Hear it, flip it, stamp it.
      - generic [ref=e88]:
        - generic [ref=e89]:
          - heading "City districts" [level=2] [ref=e90]
          - link "Dictionary" [ref=e91]:
            - /url: /words
        - generic [ref=e94]:
          - link [ref=e95]:
            - /url: /play/quiz
            - paragraph [ref=e97]: Zahlen
            - paragraph [ref=e98]: Numbers
            - paragraph [ref=e100]: 0/49
          - link [ref=e101]:
            - /url: /play/quiz
            - paragraph [ref=e103]: Zeit
            - paragraph [ref=e104]: Time
            - paragraph [ref=e106]: 0/80
          - link [ref=e107]:
            - /url: /play/quiz
            - paragraph [ref=e109]: Person
            - paragraph [ref=e110]: People
            - paragraph [ref=e112]: 0/115
          - link [ref=e113]:
            - /url: /play/quiz
            - paragraph [ref=e115]: Wohnen
            - paragraph [ref=e116]: Home
            - paragraph [ref=e118]: 0/44
          - link [ref=e119]:
            - /url: /play/quiz
            - paragraph [ref=e121]: Umwelt
            - paragraph [ref=e122]: World
            - paragraph [ref=e124]: 0/20
          - link [ref=e125]:
            - /url: /play/quiz
            - paragraph [ref=e127]: Reisen
            - paragraph [ref=e128]: Travel
            - paragraph [ref=e130]: 0/96
          - link [ref=e131]:
            - /url: /play/quiz
            - paragraph [ref=e133]: Essen
            - paragraph [ref=e134]: Food
            - paragraph [ref=e136]: 0/57
          - link [ref=e137]:
            - /url: /play/quiz
            - paragraph [ref=e139]: Einkaufen
            - paragraph [ref=e140]: Shopping
            - paragraph [ref=e142]: 0/40
          - link [ref=e143]:
            - /url: /play/quiz
            - paragraph [ref=e145]: Dienste
            - paragraph [ref=e146]: Services
            - paragraph [ref=e148]: 0/46
          - link [ref=e149]:
            - /url: /play/quiz
            - paragraph [ref=e151]: Lernen
            - paragraph [ref=e152]: Learning
            - paragraph [ref=e154]: 0/58
          - link [ref=e155]:
            - /url: /play/quiz
            - paragraph [ref=e157]: Arbeit
            - paragraph [ref=e158]: Work
            - paragraph [ref=e160]: 0/23
          - link [ref=e161]:
            - /url: /play/quiz
            - paragraph [ref=e163]: Freizeit
            - paragraph [ref=e164]: Leisure
            - paragraph [ref=e166]: 0/31
          - link [ref=e167]:
            - /url: /play/quiz
            - paragraph [ref=e169]: Alltag
            - paragraph [ref=e170]: Everyday
            - paragraph [ref=e172]: 0/145
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