# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wortreise.spec.ts >> Wortreise - Critical User Journeys >> New User Onboarding >> navigates to Pass (Reisepass)
- Location: e2e/wortreise.spec.ts:36:5

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Wortreise" [ref=e6]:
        - /url: /
      - generic [ref=e8]:
        - generic [ref=e9]: 0 XP
        - generic [ref=e10]: ·
        - generic [ref=e11]: 0 days
        - button "Mute sounds" [ref=e12] [cursor=pointer]
        - link "Sign in" [ref=e17]:
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
          - link "Start with a quiz" [ref=e32]:
            - /url: /play/quiz
          - link "Browse the list" [ref=e33]:
            - /url: /words
      - generic [ref=e34]:
        - heading "Choose a ticket" [level=2] [ref=e36]
        - generic [ref=e37]:
          - link [ref=e38]:
            - /url: /play/quiz
            - heading "Quiz Rally" [level=3] [ref=e43]
            - paragraph [ref=e44]: Four choices, articles included.
          - link [ref=e45]:
            - /url: /play/speed
            - heading "Speed 45" [level=3] [ref=e50]
            - paragraph [ref=e51]: A 45-second combo run.
          - link [ref=e52]:
            - /url: /play/type
            - heading "Type the Word" [level=3] [ref=e56]
            - paragraph [ref=e57]: English in, German out.
          - link [ref=e58]:
            - /url: /play/verbs
            - heading "Verb Lab" [level=3] [ref=e63]
            - paragraph [ref=e64]: Regular, irregular, modal.
          - link [ref=e65]:
            - /url: /play/match
            - heading "Match Pairs" [level=3] [ref=e71]
            - paragraph [ref=e72]: Pair DE with EN on a board.
          - link [ref=e73]:
            - /url: /play/cards
            - heading "Flash Study" [level=3] [ref=e77]
            - paragraph [ref=e78]: Hear it, flip it, stamp it.
      - generic [ref=e79]:
        - heading "City districts" [level=2] [ref=e81]
        - generic [ref=e82]:
          - link [ref=e83]:
            - /url: /play/quiz
            - paragraph [ref=e85]: Zahlen
            - paragraph [ref=e86]: Numbers
            - paragraph [ref=e88]: 0/49
          - link [ref=e89]:
            - /url: /play/quiz
            - paragraph [ref=e91]: Zeit
            - paragraph [ref=e92]: Time
            - paragraph [ref=e94]: 0/80
          - link [ref=e95]:
            - /url: /play/quiz
            - paragraph [ref=e97]: Person
            - paragraph [ref=e98]: People
            - paragraph [ref=e100]: 0/115
          - link [ref=e101]:
            - /url: /play/quiz
            - paragraph [ref=e103]: Wohnen
            - paragraph [ref=e104]: Home
            - paragraph [ref=e106]: 0/44
          - link [ref=e107]:
            - /url: /play/quiz
            - paragraph [ref=e109]: Umwelt
            - paragraph [ref=e110]: World
            - paragraph [ref=e112]: 0/20
          - link [ref=e113]:
            - /url: /play/quiz
            - paragraph [ref=e115]: Reisen
            - paragraph [ref=e116]: Travel
            - paragraph [ref=e118]: 0/96
          - link [ref=e119]:
            - /url: /play/quiz
            - paragraph [ref=e121]: Essen
            - paragraph [ref=e122]: Food
            - paragraph [ref=e124]: 0/57
          - link [ref=e125]:
            - /url: /play/quiz
            - paragraph [ref=e127]: Einkaufen
            - paragraph [ref=e128]: Shopping
            - paragraph [ref=e130]: 0/40
          - link [ref=e131]:
            - /url: /play/quiz
            - paragraph [ref=e133]: Dienste
            - paragraph [ref=e134]: Services
            - paragraph [ref=e136]: 0/46
          - link [ref=e137]:
            - /url: /play/quiz
            - paragraph [ref=e139]: Lernen
            - paragraph [ref=e140]: Learning
            - paragraph [ref=e142]: 0/58
          - link [ref=e143]:
            - /url: /play/quiz
            - paragraph [ref=e145]: Arbeit
            - paragraph [ref=e146]: Work
            - paragraph [ref=e148]: 0/23
          - link [ref=e149]:
            - /url: /play/quiz
            - paragraph [ref=e151]: Freizeit
            - paragraph [ref=e152]: Leisure
            - paragraph [ref=e154]: 0/31
          - link [ref=e155]:
            - /url: /play/quiz
            - paragraph [ref=e157]: Alltag
            - paragraph [ref=e158]: Everyday
            - paragraph [ref=e160]: 0/145
  - navigation [ref=e161]:
    - generic [ref=e162]:
      - link "Play" [ref=e163]:
        - /url: /
      - link "Words" [ref=e167]:
        - /url: /words
      - link "Pass" [ref=e170]:
        - /url: /pass
      - link "Study" [ref=e174]:
        - /url: /play/cards
```