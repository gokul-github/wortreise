# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wortreise.spec.ts >> Wortreise - Critical User Journeys >> Navigation >> header navigation works
- Location: e2e/wortreise.spec.ts:327:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[href=\'/\']')
Expected: visible
Error: strict mode violation: locator('a[href=\'/\']') resolved to 3 elements:
    1) <a href="/" aria-current="page" data-status="active" class="flex items-baseline gap-2 no-underline text-fg active">…</a> aka getByRole('link', { name: 'Wortreise A1' })
    2) <a href="/" aria-current="page" data-status="active" class="no-underline text-fg font-medium active">Play</a> aka getByRole('link', { name: 'Play' })
    ...

Call log:
  - Expect "toBeVisible" locator('a[href=\'/\']') with timeout 5000ms
  - waiting for locator('a[href=\'/\']')

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
  228 |       await page.goto("/pass");
  229 |       await page.waitForLoadState("networkidle");
  230 | 
  231 |       const select = page.locator("select");
  232 |       await select.scrollIntoViewIfNeeded();
  233 | 
  234 |       // Change voice
  235 |       const originalValue = await select.inputValue();
  236 |       await select.selectOption({ index: 0 }); // Select first German voice
  237 | 
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
> 328 |       await expect(page.locator("a[href='/']")).toBeVisible();
      |                                                 ^ Error: expect(locator).toBeVisible() failed
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
```