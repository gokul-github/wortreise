# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wortreise.spec.ts >> Wortreise - Critical User Journeys >> Voice Selection >> shows voice selector with German voices
- Location: e2e/wortreise.spec.ts:211:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.scrollIntoViewIfNeeded: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=Voice Settings')

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - banner [ref=f1e3]:
    - generic [ref=f1e4]:
      - generic [ref=f1e5]:
        - link "Wortreise A1" [ref=f1e6] [cursor=pointer]:
          - /url: /
          - generic [ref=f1e7]: Wortreise
          - generic [ref=f1e8]: A1
        - navigation [ref=f1e9]:
          - link "Play" [ref=f1e10] [cursor=pointer]:
            - /url: /
          - link "Words" [ref=f1e11] [cursor=pointer]:
            - /url: /words
          - link "Pass" [ref=f1e12] [cursor=pointer]:
            - /url: /pass
      - generic [ref=f1e13]:
        - generic [ref=f1e14]: 0 XP
        - generic [ref=f1e15]: ·
        - generic [ref=f1e16]: 0 days
        - button "Mute sounds" [ref=f1e17] [cursor=pointer]
        - link "Sign in" [ref=f1e22] [cursor=pointer]:
          - /url: /login
  - main [ref=f1e26]:
    - link "Station hall" [ref=f1e27] [cursor=pointer]:
      - /url: /
    - generic [ref=f1e30]:
      - paragraph [ref=f1e31]: Collect the city
      - heading "Reisepass" [level=1] [ref=f1e32]
      - paragraph [ref=f1e33]: A district stamps when you know 40% of its words (mastery 3 of 5). Keep travelling.
      - generic [ref=f1e34]:
        - generic [ref=f1e35]:
          - paragraph [ref=f1e36]: "0"
          - paragraph [ref=f1e37]: XP
        - generic [ref=f1e38]:
          - paragraph [ref=f1e39]: "0"
          - paragraph [ref=f1e40]: day streak
        - generic [ref=f1e41]:
          - paragraph [ref=f1e42]: "0"
          - paragraph [ref=f1e43]: of 804 known
        - generic [ref=f1e44]:
          - paragraph [ref=f1e45]: "0"
          - paragraph [ref=f1e46]: of 153 verbs
      - generic [ref=f1e47]:
        - paragraph [ref=f1e48]: "Best Speed 45: 0"
        - paragraph [ref=f1e49]:
          - text: "Best combo:"
          - generic [ref=f1e50]: ×0
      - generic [ref=f1e51]:
        - generic [ref=f1e52]:
          - paragraph [ref=f1e57]: Zahlen
          - paragraph [ref=f1e58]: Numbers
          - paragraph [ref=f1e59]: 0% · 0/49
        - generic [ref=f1e60]:
          - paragraph [ref=f1e65]: Zeit
          - paragraph [ref=f1e66]: Time
          - paragraph [ref=f1e67]: 0% · 0/80
        - generic [ref=f1e68]:
          - paragraph [ref=f1e73]: Person
          - paragraph [ref=f1e74]: People
          - paragraph [ref=f1e75]: 0% · 0/115
        - generic [ref=f1e76]:
          - paragraph [ref=f1e81]: Wohnen
          - paragraph [ref=f1e82]: Home
          - paragraph [ref=f1e83]: 0% · 0/44
        - generic [ref=f1e84]:
          - paragraph [ref=f1e89]: Umwelt
          - paragraph [ref=f1e90]: World
          - paragraph [ref=f1e91]: 0% · 0/20
        - generic [ref=f1e92]:
          - paragraph [ref=f1e97]: Reisen
          - paragraph [ref=f1e98]: Travel
          - paragraph [ref=f1e99]: 0% · 0/96
        - generic [ref=f1e100]:
          - paragraph [ref=f1e105]: Essen
          - paragraph [ref=f1e106]: Food
          - paragraph [ref=f1e107]: 0% · 0/57
        - generic [ref=f1e108]:
          - paragraph [ref=f1e113]: Einkaufen
          - paragraph [ref=f1e114]: Shopping
          - paragraph [ref=f1e115]: 0% · 0/40
        - generic [ref=f1e116]:
          - paragraph [ref=f1e121]: Dienste
          - paragraph [ref=f1e122]: Services
          - paragraph [ref=f1e123]: 0% · 0/46
        - generic [ref=f1e124]:
          - paragraph [ref=f1e129]: Lernen
          - paragraph [ref=f1e130]: Learning
          - paragraph [ref=f1e131]: 0% · 0/58
        - generic [ref=f1e132]:
          - paragraph [ref=f1e137]: Arbeit
          - paragraph [ref=f1e138]: Work
          - paragraph [ref=f1e139]: 0% · 0/23
        - generic [ref=f1e140]:
          - paragraph [ref=f1e145]: Freizeit
          - paragraph [ref=f1e146]: Leisure
          - paragraph [ref=f1e147]: 0% · 0/31
        - generic [ref=f1e148]:
          - paragraph [ref=f1e153]: Alltag
          - paragraph [ref=f1e154]: Everyday
          - paragraph [ref=f1e155]: 0% · 0/145
      - button "Reset local progress" [ref=f1e156] [cursor=pointer]
      - generic [ref=f1e157]:
        - paragraph [ref=f1e158]: Backup & Restore
        - paragraph [ref=f1e159]: Export your progress to a file, then import it on another device or browser.
        - generic [ref=f1e160]:
          - button "Export Backup" [ref=f1e161] [cursor=pointer]
          - generic [ref=f1e162] [cursor=pointer]:
            - button "Choose File" [ref=f1e163]: Import Backup
            - button "Choose File" [ref=f1e164]
        - generic [ref=f1e165]:
          - paragraph [ref=f1e166]: Debug
          - paragraph [ref=f1e167]: Inspect current store state and localStorage.
          - generic [ref=f1e168]:
            - button "Debug Store" [ref=f1e169] [cursor=pointer]
            - button "Force Hydrate" [ref=f1e170] [cursor=pointer]
            - button "List Voices" [ref=f1e171] [cursor=pointer]
            - button "Test German" [ref=f1e172] [cursor=pointer]
          - generic [ref=f1e173]: Click 'Debug' to inspect
```

# Test source

```ts
  116 |       const knownBefore = await page.locator("text=/\\d+ of \\d+ known/").first().textContent();
  117 | 
  118 |       await page.reload();
  119 |       await page.waitForLoadState("networkidle");
  120 | 
  121 |       const knownAfter = await page.locator("text=/\\d+ of \\d+ known/").first().textContent();
  122 |       expect(knownAfter).toBe(knownBefore);
  123 |     });
  124 |   });
  125 | 
  126 |   test.describe("Backup & Restore", () => {
  127 |     test("exports backup file", async ({ page }) => {
  128 |       await page.goto("/pass");
  129 |       await page.waitForLoadState("networkidle");
  130 | 
  131 |       // Set up download handler
  132 |       const downloadPromise = page.waitForEvent("download");
  133 |       await page.click('button:has-text("Export Backup")');
  134 |       const download = await downloadPromise;
  135 | 
  136 |       // Verify file
  137 |       expect(download.suggestedFilename()).toMatch(/wortreise-backup-\d{4}-\d{2}-\d{2}\.json/);
  138 | 
  139 |       // Read and validate JSON
  140 |       const fs = require("fs");
  141 |       const path = await download.path();
  142 |       if (path) {
  143 |         const content = fs.readFileSync(path, "utf-8");
  144 |         const backup = JSON.parse(content);
  145 |         expect(backup).toHaveProperty("version", 1);
  146 |         expect(backup).toHaveProperty("backupVersion", 1);
  147 |         expect(backup).toHaveProperty("timestamp");
  148 |         expect(backup).toHaveProperty("data");
  149 |         expect(backup.data).toHaveProperty("xp");
  150 |         expect(backup.data).toHaveProperty("streak");
  151 |         expect(backup.data).toHaveProperty("mastery");
  152 |       }
  153 |     });
  154 | 
  155 |     test("imports backup file", async ({ page }) => {
  156 |       await page.goto("/pass");
  157 |       await page.waitForLoadState("networkidle");
  158 | 
  159 |       // Create a test backup file
  160 |       const backup = {
  161 |         version: 1,
  162 |         backupVersion: 1,
  163 |         timestamp: new Date().toISOString(),
  164 |         data: {
  165 |           version: 1,
  166 |           xp: 999,
  167 |           streak: 99,
  168 |           lastPlayDate: "2026-01-15",
  169 |           mastery: { "test-word": 5 },
  170 |           seen: {},
  171 |           correct: {},
  172 |           wrong: {},
  173 |           bestSpeedScore: 50,
  174 |           bestCombo: 20,
  175 |           sound: true,
  176 |           direction: "mix",
  177 |         },
  178 |       };
  179 | 
  180 |       // Set up file input
  181 |       const fileInput = page.locator('input[type="file"]');
  182 |       await fileInput.setInputFiles({
  183 |         name: "test-backup.json",
  184 |         mimeType: "application/json",
  185 |         buffer: Buffer.from(JSON.stringify(backup, null, 2)),
  186 |       });
  187 | 
  188 |       // Should show success message
  189 |       await expect(page.locator("text=Backup imported successfully")).toBeVisible({ timeout: 5000 });
  190 | 
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
> 216 |       await page.locator("text=Voice Settings").scrollIntoViewIfNeeded();
      |                                                 ^ Error: locator.scrollIntoViewIfNeeded: Test timeout of 30000ms exceeded.
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
```