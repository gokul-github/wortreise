# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wortreise.spec.ts >> Wortreise - Critical User Journeys >> Navigation >> mobile bottom nav works
- Location: e2e/wortreise.spec.ts:333:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[href="/"]:has-text("Play")')
Expected: visible
Error: strict mode violation: locator('a[href="/"]:has-text("Play")') resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" class="no-underline text-fg font-medium active">Play</a> aka getByRole('banner').getByText('Play')
    2) <a href="/" aria-current="page" data-status="active" class="flex flex-col items-center gap-0.5 py-2.5 text-[11px] no-underline text-accent active">…</a> aka getByRole('link', { name: 'Play' })

Call log:
  - Expect "toBeVisible" locator('a[href="/"]:has-text("Play")') with timeout 5000ms
  - waiting for locator('a[href="/"]:has-text("Play")')

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - banner [ref=f1e3]:
    - generic [ref=f1e4]:
      - link "Wortreise" [ref=f1e6] [cursor=pointer]:
        - /url: /
      - generic [ref=f1e8]:
        - generic [ref=f1e9]: 0 XP
        - generic [ref=f1e10]: ·
        - generic [ref=f1e11]: 0 days
        - button "Mute sounds" [ref=f1e12] [cursor=pointer]
        - link "Sign in" [ref=f1e17] [cursor=pointer]:
          - /url: /login
  - main [ref=f1e21]:
    - generic [ref=f1e22]:
      - generic [ref=f1e23]:
        - paragraph [ref=f1e24]: Goethe A1 · Start Deutsch 1
        - heading "Wortreise" [level=1] [ref=f1e25]
        - paragraph [ref=f1e26]: Play through the official A1 word list — about 804 entries, 153 verbs with present-tense forms, and English for every card.
        - generic [ref=f1e27]:
          - paragraph [ref=f1e28]: 0 words known
          - paragraph [ref=f1e29]: 0 XP earned
          - paragraph [ref=f1e30]: 0 district stamps
        - generic [ref=f1e31]:
          - link "Start with a quiz" [ref=f1e32] [cursor=pointer]:
            - /url: /play/quiz
          - link "Browse the list" [ref=f1e33] [cursor=pointer]:
            - /url: /words
      - generic [ref=f1e34]:
        - heading "Choose a ticket" [level=2] [ref=f1e36]
        - generic [ref=f1e37]:
          - link [ref=f1e38] [cursor=pointer]:
            - /url: /play/quiz
            - heading "Quiz Rally" [level=3] [ref=f1e43]
            - paragraph [ref=f1e44]: Four choices, articles included.
          - link [ref=f1e45] [cursor=pointer]:
            - /url: /play/speed
            - heading "Speed 45" [level=3] [ref=f1e50]
            - paragraph [ref=f1e51]: A 45-second combo run.
          - link [ref=f1e52] [cursor=pointer]:
            - /url: /play/type
            - heading "Type the Word" [level=3] [ref=f1e56]
            - paragraph [ref=f1e57]: English in, German out.
          - link [ref=f1e58] [cursor=pointer]:
            - /url: /play/verbs
            - heading "Verb Lab" [level=3] [ref=f1e63]
            - paragraph [ref=f1e64]: Regular, irregular, modal.
          - link [ref=f1e65] [cursor=pointer]:
            - /url: /play/match
            - heading "Match Pairs" [level=3] [ref=f1e71]
            - paragraph [ref=f1e72]: Pair DE with EN on a board.
          - link [ref=f1e73] [cursor=pointer]:
            - /url: /play/cards
            - heading "Flash Study" [level=3] [ref=f1e77]
            - paragraph [ref=f1e78]: Hear it, flip it, stamp it.
      - generic [ref=f1e79]:
        - heading "City districts" [level=2] [ref=f1e81]
        - generic [ref=f1e82]:
          - link [ref=f1e83] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e85]: Zahlen
            - paragraph [ref=f1e86]: Numbers
            - paragraph [ref=f1e88]: 0/49
          - link [ref=f1e89] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e91]: Zeit
            - paragraph [ref=f1e92]: Time
            - paragraph [ref=f1e94]: 0/80
          - link [ref=f1e95] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e97]: Person
            - paragraph [ref=f1e98]: People
            - paragraph [ref=f1e100]: 0/115
          - link [ref=f1e101] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e103]: Wohnen
            - paragraph [ref=f1e104]: Home
            - paragraph [ref=f1e106]: 0/44
          - link [ref=f1e107] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e109]: Umwelt
            - paragraph [ref=f1e110]: World
            - paragraph [ref=f1e112]: 0/20
          - link [ref=f1e113] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e115]: Reisen
            - paragraph [ref=f1e116]: Travel
            - paragraph [ref=f1e118]: 0/96
          - link [ref=f1e119] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e121]: Essen
            - paragraph [ref=f1e122]: Food
            - paragraph [ref=f1e124]: 0/57
          - link [ref=f1e125] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e127]: Einkaufen
            - paragraph [ref=f1e128]: Shopping
            - paragraph [ref=f1e130]: 0/40
          - link [ref=f1e131] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e133]: Dienste
            - paragraph [ref=f1e134]: Services
            - paragraph [ref=f1e136]: 0/46
          - link [ref=f1e137] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e139]: Lernen
            - paragraph [ref=f1e140]: Learning
            - paragraph [ref=f1e142]: 0/58
          - link [ref=f1e143] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e145]: Arbeit
            - paragraph [ref=f1e146]: Work
            - paragraph [ref=f1e148]: 0/23
          - link [ref=f1e149] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e151]: Freizeit
            - paragraph [ref=f1e152]: Leisure
            - paragraph [ref=f1e154]: 0/31
          - link [ref=f1e155] [cursor=pointer]:
            - /url: /play/quiz
            - paragraph [ref=f1e157]: Alltag
            - paragraph [ref=f1e158]: Everyday
            - paragraph [ref=f1e160]: 0/145
  - navigation [ref=f1e161]:
    - generic [ref=f1e162]:
      - link "Play" [ref=f1e163] [cursor=pointer]:
        - /url: /
      - link "Words" [ref=f1e167] [cursor=pointer]:
        - /url: /words
      - link "Pass" [ref=f1e170] [cursor=pointer]:
        - /url: /pass
      - link "Study" [ref=f1e174] [cursor=pointer]:
        - /url: /play/cards
```

# Test source

```ts
  238 |       // Verify localStorage updated
  239 |       const saved = await page.evaluate(() => localStorage.getItem("wortreise-voice-preference"));
  240 |       expect(saved).toBeTruthy();
  241 |     });
  242 | 
  243 |     test("tests selected voice", async ({ page }) => {
  244 |       await page.goto("/pass");
  245 |       await page.waitForLoadState("networkidle");
  246 | 
  247 |       const select = page.locator("select");
  248 |       await select.scrollIntoViewIfNeeded();
  249 | 
  250 |       // Click test button
  251 |       await page.click('button:has-text("Test Selected Voice")');
  252 | 
  253 |       // Should call speech synthesis (we can't easily test audio, but verify no error)
  254 |       await expect(page.locator("text=Voice Settings")).toBeVisible();
  255 |     });
  256 |   });
  257 | 
  258 |   test.describe("Debug Panel", () => {
  259 |     test("shows store state on Debug click", async ({ page }) => {
  260 |       await page.goto("/pass");
  261 |       await page.waitForLoadState("networkidle");
  262 | 
  263 |       await page.click('button:has-text("Debug Store")');
  264 | 
  265 |       // Should show debug info in pre tag
  266 |       await expect(page.locator("pre")).toBeVisible({ timeout: 5000 });
  267 |       const debugText = await page.locator("pre").textContent();
  268 |       expect(debugText).toContain("STORE STATE");
  269 |       expect(debugText).toContain("LOCALSTORAGE");
  270 |     });
  271 | 
  272 |     test("force hydrate reloads from localStorage", async ({ page }) => {
  273 |       await page.goto("/pass");
  274 |       await page.waitForLoadState("networkidle");
  275 | 
  276 |       await page.click('button:has-text("Force Hydrate")');
  277 |       await page.waitForTimeout(500);
  278 | 
  279 |       // Should re-show debug info
  280 |       const debugText = await page.locator("pre").textContent();
  281 |       expect(debugText).toContain("STORE STATE");
  282 |     });
  283 | 
  284 |     test("lists all available voices", async ({ page }) => {
  285 |       await page.goto("/pass");
  286 |       await page.waitForLoadState("networkidle");
  287 | 
  288 |       await page.click('button:has-text("List Voices")');
  289 | 
  290 |       const debugText = await page.locator("pre").textContent();
  291 |       expect(debugText).toContain("AVAILABLE VOICES");
  292 |     });
  293 | 
  294 |     test("tests German voice", async ({ page }) => {
  295 |       await page.goto("/pass");
  296 |       await page.waitForLoadState("networkidle");
  297 | 
  298 |       await page.click('button:has-text("Test German")');
  299 |       await page.waitForTimeout(1000);
  300 | 
  301 |       // Should show voice list after test
  302 |       const debugText = await page.locator("pre").textContent();
  303 |       expect(debugText).toContain("AVAILABLE VOICES");
  304 |     });
  305 |   });
  306 | 
  307 |   test.describe("All Game Modes", () => {
  308 |     const gameModes = [
  309 |       { path: "/play/quiz", name: "Quiz Rally" },
  310 |       { path: "/play/speed", name: "Speed 45" },
  311 |       { path: "/play/type", name: "Type the Word" },
  312 |       { path: "/play/verbs", name: "Verb Lab" },
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
> 338 |       await expect(page.locator('a[href="/"]:has-text("Play")')).toBeVisible();
      |                                                                  ^ Error: expect(locator).toBeVisible() failed
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
```