# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wortreise.spec.ts >> Wortreise - Critical User Journeys >> Progress Persistence >> mastery data persists
- Location: e2e/wortreise.spec.ts:111:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=/\\d+ of \\d+ known/').first()

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - banner [ref=f1e3]:
    - generic [ref=f1e4]:
      - link "Wortreise" [ref=f1e6]:
        - /url: /
      - generic [ref=f1e8]:
        - generic [ref=f1e9]: 0 XP
        - generic [ref=f1e10]: ·
        - generic [ref=f1e11]: 0 days
        - button "Mute sounds" [ref=f1e12] [cursor=pointer]
        - link "Sign in" [ref=f1e17]:
          - /url: /login
  - main [ref=f1e21]:
    - link "Station hall" [ref=f1e22]:
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
            - button "List Voices" [ref=f1e166] [cursor=pointer]
            - button "Test German" [ref=f1e167] [cursor=pointer]
          - generic [ref=f1e168]: Click 'Debug' to inspect
        - generic [ref=f1e169]:
          - generic [ref=f1e170]:
            - generic [ref=f1e171]:
              - paragraph [ref=f1e172]: Voice Settings
              - paragraph [ref=f1e173]: Choose your preferred German voice (saved locally).
            - generic [ref=f1e174]: 1 German voice available
          - generic [ref=f1e175]:
            - generic [ref=f1e176]:
              - generic [ref=f1e177]: "Current:"
              - combobox "Current:" [ref=f1e178]:
                - option "Anna (de-DE)" [selected]
            - button "Test Selected Voice" [ref=f1e179] [cursor=pointer]
  - navigation [ref=f1e180]:
    - generic [ref=f1e181]:
      - link "Play" [ref=f1e182]:
        - /url: /
      - link "Words" [ref=f1e186]:
        - /url: /words
      - link "Pass" [ref=f1e189]:
        - /url: /pass
      - link "Study" [ref=f1e193]:
        - /url: /play/cards
```

# Test source

```ts
  16  |     test("shows game mode cards on home page", async ({ page }) => {
  17  |       await expect(page.locator("text=Quiz Rally")).toBeVisible();
  18  |       await expect(page.locator("text=Speed 45")).toBeVisible();
  19  |       await expect(page.locator("text=Type the Word")).toBeVisible();
  20  |       await expect(page.locator("text=Verb Lab")).toBeVisible();
  21  |       await expect(page.locator("text=Match Pairs")).toBeVisible();
  22  |       await expect(page.locator("text=Flash Study")).toBeVisible();
  23  |     });
  24  | 
  25  |     test("navigates to Quiz Rally and starts a game", async ({ page }) => {
  26  |       await page.click("a[href='/play/quiz']");
  27  |       await expect(page).toHaveURL(/.*play\/quiz/);
  28  |       await expect(page.locator("text=Quiz Rally")).toBeVisible();
  29  |     });
  30  | 
  31  |     test("navigates to Words dictionary", async ({ page }) => {
  32  |       await page.click("a[href='/words']");
  33  |       await expect(page).toHaveURL(/.*words/);
  34  |     });
  35  | 
  36  |     test("navigates to Pass (Reisepass)", async ({ page }) => {
  37  |       await page.click("a[href='/pass']");
  38  |       await expect(page).toHaveURL(/.*pass/);
  39  |       await expect(page.locator("text=Reisepass")).toBeVisible();
  40  |     });
  41  |   });
  42  | 
  43  |   test.describe("Game Play - Quiz Rally", () => {
  44  |     test.beforeEach(async ({ page }) => {
  45  |       await page.goto("/play/quiz");
  46  |       await page.waitForLoadState("networkidle");
  47  |     });
  48  | 
  49  |     test("shows game setup with topic selector", async ({ page }) => {
  50  |       await expect(page.locator("text=Quiz Rally")).toBeVisible();
  51  |       await expect(page.locator("text=Four choices")).toBeVisible();
  52  |     });
  53  | 
  54  |     test("can select topic and start game", async ({ page }) => {
  55  |       // Select a topic (first available)
  56  |       const topicButton = page.locator('button:has-text("Zahlen"), button:has-text("All")').first();
  57  |       await topicButton.click();
  58  | 
  59  |       // Start game
  60  |       await page.click('button:has-text("Start")');
  61  |       await expect(page.locator("text=Which article?")).toBeVisible({ timeout: 5000 }).catch(() => {});
  62  |     });
  63  | 
  64  |     test("answers question and shows result", async ({ page }) => {
  65  |       await page.click('button:has-text("All")'); // Select all topics
  66  |       await page.click('button:has-text("Start")');
  67  | 
  68  |       // Wait for question to appear
  69  |       await page.waitForSelector("button:has-text('1')", { timeout: 10000 });
  70  | 
  71  |       // Answer first question (click option 1)
  72  |       await page.click("button:has-text('1')");
  73  | 
  74  |       // Should show feedback and next button
  75  |       await expect(page.locator("button:has-text('Next')")).toBeVisible({ timeout: 5000 });
  76  |     });
  77  |   });
  78  | 
  79  |   test.describe("Progress Persistence", () => {
  80  |     test("XP and streak persist across page reloads", async ({ page }) => {
  81  |       // Play a quick game to earn XP
  82  |       await page.goto("/play/quiz");
  83  |       await page.waitForLoadState("networkidle");
  84  |       await page.click('button:has-text("All")');
  85  |       await page.click('button:has-text("Start")');
  86  |       await page.waitForSelector("button:has-text('1')", { timeout: 10000 });
  87  |       await page.click("button:has-text('1')");
  88  |       await expect(page.locator("button:has-text('Next')")).toBeVisible({ timeout: 5000 });
  89  |       await page.click("button:has-text('Next')");
  90  | 
  91  |       // Check XP in header
  92  |       const xpBefore = await page.locator("text=/\\d+ XP/").textContent();
  93  | 
  94  |       // Reload page
  95  |       await page.reload();
  96  |       await page.waitForLoadState("networkidle");
  97  | 
  98  |       // XP should persist
  99  |       const xpAfter = await page.locator("text=/\\d+ XP/").textContent();
  100 |       expect(xpAfter).toBe(xpBefore);
  101 |     });
  102 | 
  103 |     test("streak persists across page reloads", async ({ page }) => {
  104 |       const streakBefore = await page.locator("text=/\\d+ day/").textContent();
  105 |       await page.reload();
  106 |       await page.waitForLoadState("networkidle");
  107 |       const streakAfter = await page.locator("text=/\\d+ day/").textContent();
  108 |       expect(streakAfter).toBe(streakBefore);
  109 |     });
  110 | 
  111 |     test("mastery data persists", async ({ page }) => {
  112 |       await page.goto("/pass");
  113 |       await page.waitForLoadState("networkidle");
  114 | 
  115 |       // Get known words count
> 116 |       const knownBefore = await page.locator("text=/\\d+ of \\d+ known/").first().textContent();
      |                                                                                   ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
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
  216 |       await page.locator("text=Voice Settings").scrollIntoViewIfNeeded();
```