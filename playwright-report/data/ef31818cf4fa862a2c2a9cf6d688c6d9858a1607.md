# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wortreise.spec.ts >> Wortreise - Critical User Journeys >> Debug Panel >> lists all available voices
- Location: e2e/wortreise.spec.ts:284:5

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "AVAILABLE VOICES"
Received string:    "No voices available. Try clicking 'Test German' first to trigger voice loading."
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
    - link "Station hall" [ref=f1e22] [cursor=pointer]:
      - /url: /
    - generic [ref=f1e25]:
      - paragraph [ref=f1e26]: Collect the city
      - heading "Reisepass" [level=1] [ref=f1e27]
      - paragraph [ref=f1e28]: A district stamps when you know 40% of its words (mastery 3 of 5). Keep travelling.
      - generic [ref=f1e29]:
        - generic [ref=f1e30]:
          - paragraph [ref=f1e31]: "0"
          - paragraph [ref=f1e32]: XP
        - generic [ref=f1e33]:
          - paragraph [ref=f1e34]: "0"
          - paragraph [ref=f1e35]: day streak
        - generic [ref=f1e36]:
          - paragraph [ref=f1e37]: "0"
          - paragraph [ref=f1e38]: of 804 known
        - generic [ref=f1e39]:
          - paragraph [ref=f1e40]: "0"
          - paragraph [ref=f1e41]: of 153 verbs
      - generic [ref=f1e42]:
        - paragraph [ref=f1e43]: "Best Speed 45: 0"
        - paragraph [ref=f1e44]:
          - text: "Best combo:"
          - generic [ref=f1e45]: ×0
      - generic [ref=f1e46]:
        - generic [ref=f1e47]:
          - paragraph [ref=f1e52]: Zahlen
          - paragraph [ref=f1e53]: Numbers
          - paragraph [ref=f1e54]: 0% · 0/49
        - generic [ref=f1e55]:
          - paragraph [ref=f1e60]: Zeit
          - paragraph [ref=f1e61]: Time
          - paragraph [ref=f1e62]: 0% · 0/80
        - generic [ref=f1e63]:
          - paragraph [ref=f1e68]: Person
          - paragraph [ref=f1e69]: People
          - paragraph [ref=f1e70]: 0% · 0/115
        - generic [ref=f1e71]:
          - paragraph [ref=f1e76]: Wohnen
          - paragraph [ref=f1e77]: Home
          - paragraph [ref=f1e78]: 0% · 0/44
        - generic [ref=f1e79]:
          - paragraph [ref=f1e84]: Umwelt
          - paragraph [ref=f1e85]: World
          - paragraph [ref=f1e86]: 0% · 0/20
        - generic [ref=f1e87]:
          - paragraph [ref=f1e92]: Reisen
          - paragraph [ref=f1e93]: Travel
          - paragraph [ref=f1e94]: 0% · 0/96
        - generic [ref=f1e95]:
          - paragraph [ref=f1e100]: Essen
          - paragraph [ref=f1e101]: Food
          - paragraph [ref=f1e102]: 0% · 0/57
        - generic [ref=f1e103]:
          - paragraph [ref=f1e108]: Einkaufen
          - paragraph [ref=f1e109]: Shopping
          - paragraph [ref=f1e110]: 0% · 0/40
        - generic [ref=f1e111]:
          - paragraph [ref=f1e116]: Dienste
          - paragraph [ref=f1e117]: Services
          - paragraph [ref=f1e118]: 0% · 0/46
        - generic [ref=f1e119]:
          - paragraph [ref=f1e124]: Lernen
          - paragraph [ref=f1e125]: Learning
          - paragraph [ref=f1e126]: 0% · 0/58
        - generic [ref=f1e127]:
          - paragraph [ref=f1e132]: Arbeit
          - paragraph [ref=f1e133]: Work
          - paragraph [ref=f1e134]: 0% · 0/23
        - generic [ref=f1e135]:
          - paragraph [ref=f1e140]: Freizeit
          - paragraph [ref=f1e141]: Leisure
          - paragraph [ref=f1e142]: 0% · 0/31
        - generic [ref=f1e143]:
          - paragraph [ref=f1e148]: Alltag
          - paragraph [ref=f1e149]: Everyday
          - paragraph [ref=f1e150]: 0% · 0/145
      - button "Reset local progress" [ref=f1e151] [cursor=pointer]
      - generic [ref=f1e152]:
        - paragraph [ref=f1e153]: Backup & Restore
        - paragraph [ref=f1e154]: Export your progress to a file, then import it on another device or browser.
        - generic [ref=f1e155]:
          - button "Export Backup" [ref=f1e156] [cursor=pointer]
          - generic [ref=f1e157] [cursor=pointer]:
            - button "Choose File" [ref=f1e158]: Import Backup
            - button "Choose File" [ref=f1e159]
        - generic [ref=f1e160]:
          - paragraph [ref=f1e161]: Debug
          - paragraph [ref=f1e162]: Inspect current store state and localStorage.
          - generic [ref=f1e163]:
            - button "Debug Store" [ref=f1e164] [cursor=pointer]
            - button "Force Hydrate" [ref=f1e165] [cursor=pointer]
            - button "List Voices" [active] [ref=f1e166] [cursor=pointer]
            - button "Test German" [ref=f1e167] [cursor=pointer]
          - generic [ref=f1e168]: No voices available. Try clicking 'Test German' first to trigger voice loading.
  - navigation [ref=f1e169]:
    - generic [ref=f1e170]:
      - link "Play" [ref=f1e171] [cursor=pointer]:
        - /url: /
      - link "Words" [ref=f1e175] [cursor=pointer]:
        - /url: /words
      - link "Pass" [ref=f1e178] [cursor=pointer]:
        - /url: /pass
      - link "Study" [ref=f1e182] [cursor=pointer]:
        - /url: /play/cards
```

# Test source

```ts
  191 |       // Verify XP updated
  192 |       await expect(page.locator("text=999 XP")).toBeVisible({ timeout: 5000 });
  193 |     });
  194 | 
  195 |     test("shows error for invalid backup", async ({ page }) => {
  196 |       await page.goto("/pass");
  197 |       await page.waitForLoadState("networkidle");
  198 | 
  199 |       const fileInput = page.locator('input[type="file"]');
  200 |       await fileInput.setInputFiles({
  201 |         name: "invalid.json",
  202 |         mimeType: "application/json",
  203 |         buffer: Buffer.from("not valid json"),
  204 |       });
  205 | 
  206 |       await expect(page.locator("text=Invalid backup file")).toBeVisible({ timeout: 5000 });
  207 |     });
  208 |   });
  209 | 
  210 |   test.describe("Voice Selection", () => {
  211 |     test("shows voice selector with German voices", async ({ page }) => {
  212 |       await page.goto("/pass");
  213 |       await page.waitForLoadState("networkidle");
  214 | 
  215 |       // Scroll to voice settings
  216 |       await page.locator("text=Voice Settings").scrollIntoViewIfNeeded();
  217 | 
  218 |       // Should show dropdown with voices
  219 |       const select = page.locator("select");
  220 |       await expect(select).toBeVisible();
  221 | 
  222 |       const options = await select.locator("option").allTextContents();
  223 |       expect(options.length).toBeGreaterThan(0);
  224 |       expect(options.some((o) => o.includes("de-DE") || o.includes("German"))).toBeTruthy();
  225 |     });
  226 | 
  227 |     test("saves voice preference", async ({ page }) => {
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
> 291 |       expect(debugText).toContain("AVAILABLE VOICES");
      |                         ^ Error: expect(received).toContain(expected) // indexOf
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
```