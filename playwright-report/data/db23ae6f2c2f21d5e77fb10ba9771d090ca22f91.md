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
Received length: 2
Received array:  ["[JavaScript Error: \"Cookie “grok_device_id” has been rejected because it is in a cross-site context and its “SameSite” is “Lax” or “Strict”.\" {file: \"https://grok.com/grok-app-builder/extensions.js\" line: 0}]", "[JavaScript Error: \"Cookie “__cflb” has been rejected because it is in a cross-site context and its “SameSite” is “Lax” or “Strict”.\" {file: \"https://grok.com/grok-app-builder/extensions.js\" line: 0}]"]
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "Wortreise A1" [ref=e6] [cursor=pointer]:
          - /url: /
          - generic [ref=e7]: Wortreise
          - generic [ref=e8]: A1
        - navigation [ref=e9]:
          - link "Play" [ref=e10] [cursor=pointer]:
            - /url: /
          - link "Words" [ref=e11] [cursor=pointer]:
            - /url: /words
          - link "Pass" [ref=e12] [cursor=pointer]:
            - /url: /pass
      - generic [ref=e13]:
        - generic [ref=e14]: 0 XP
        - generic [ref=e15]: ·
        - generic [ref=e16]: 0 days
        - button "Mute sounds" [ref=e17] [cursor=pointer]
        - link "Sign in" [ref=e22] [cursor=pointer]:
          - /url: /login
  - main [ref=e27]:
    - generic [ref=e28]:
      - generic [ref=e29]:
        - paragraph [ref=e30]: Goethe A1 · Start Deutsch 1
        - heading "Wortreise" [level=1] [ref=e31]
        - paragraph [ref=e32]: Play through the official A1 word list — about 804 entries, 153 verbs with present-tense forms, and English for every card.
        - generic [ref=e33]:
          - paragraph [ref=e34]: 0 words known
          - paragraph [ref=e35]: 0 XP earned
          - paragraph [ref=e36]: 0 district stamps
        - generic [ref=e37]:
          - link "Start with a quiz" [ref=e38] [cursor=pointer]:
            - /url: /play/quiz
          - link "Browse the list" [ref=e39] [cursor=pointer]:
            - /url: /words
      - generic [ref=e40]:
        - generic [ref=e41]:
          - heading "Choose a ticket" [level=2] [ref=e42]
          - link "Reisepass" [ref=e43] [cursor=pointer]:
            - /url: /pass
        - generic [ref=e48]:
          - link [ref=e49] [cursor=pointer]:
            - /url: /play/quiz
            - heading "Quiz Rally" [level=3] [ref=e57]
            - paragraph [ref=e58]: Four choices, articles included.
          - link [ref=e59] [cursor=pointer]:
            - /url: /play/speed
            - heading "Speed 45" [level=3] [ref=e65]
            - paragraph [ref=e66]: A 45-second combo run.
          - link [ref=e67] [cursor=pointer]:
            - /url: /play/type
            - heading "Type the Word" [level=3] [ref=e79]
            - paragraph [ref=e80]: English in, German out.
          - link [ref=e81] [cursor=pointer]:
            - /url: /play/verbs
            - heading "Verb Lab" [level=3] [ref=e87]
            - paragraph [ref=e88]: Regular, irregular, modal.
          - link [ref=e89] [cursor=pointer]:
            - /url: /play/match
            - heading "Match Pairs" [level=3] [ref=e95]
            - paragraph [ref=e96]: Pair DE with EN on a board.
          - link [ref=e97] [cursor=pointer]:
            - /url: /play/cards
            - heading "Flash Study" [level=3] [ref=e102]
            - paragraph [ref=e103]: Hear it, flip it, stamp it.
      - generic [ref=e104]:
        - generic [ref=e105]:
          - heading "City districts" [level=2] [ref=e106]
          - link "Dictionary" [ref=e107] [cursor=pointer]:
            - /url: /words
        - generic [ref=e113]:
          - link [ref=e114] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e116]: Zahlen
            - paragraph [ref=e117]: Numbers
            - paragraph [ref=e119]: 0/49
          - link [ref=e120] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e122]: Zeit
            - paragraph [ref=e123]: Time
            - paragraph [ref=e125]: 0/80
          - link [ref=e126] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e128]: Person
            - paragraph [ref=e129]: People
            - paragraph [ref=e131]: 0/115
          - link [ref=e132] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e134]: Wohnen
            - paragraph [ref=e135]: Home
            - paragraph [ref=e137]: 0/44
          - link [ref=e138] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e140]: Umwelt
            - paragraph [ref=e141]: World
            - paragraph [ref=e143]: 0/20
          - link [ref=e144] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e146]: Reisen
            - paragraph [ref=e147]: Travel
            - paragraph [ref=e149]: 0/96
          - link [ref=e150] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e152]: Essen
            - paragraph [ref=e153]: Food
            - paragraph [ref=e155]: 0/57
          - link [ref=e156] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e158]: Einkaufen
            - paragraph [ref=e159]: Shopping
            - paragraph [ref=e161]: 0/40
          - link [ref=e162] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e164]: Dienste
            - paragraph [ref=e165]: Services
            - paragraph [ref=e167]: 0/46
          - link [ref=e168] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e170]: Lernen
            - paragraph [ref=e171]: Learning
            - paragraph [ref=e173]: 0/58
          - link [ref=e174] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e176]: Arbeit
            - paragraph [ref=e177]: Work
            - paragraph [ref=e179]: 0/23
          - link [ref=e180] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e182]: Freizeit
            - paragraph [ref=e183]: Leisure
            - paragraph [ref=e185]: 0/31
          - link [ref=e186] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=e188]: Alltag
            - paragraph [ref=e189]: Everyday
            - paragraph [ref=e191]: 0/145
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