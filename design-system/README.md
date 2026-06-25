# Design System — Financial Records

Persistent, cross-session design system generated with the `ui-ux-pro-max` skill and curated for this project's PRD and stack. **Read this before any UI work, in every session.**

## How to use (retrieval order)

1. **Building or editing a page?** First open `financial-records/pages/<page>.md`.
   - If it exists, its rules **override** the master for that page.
   - If not, follow `financial-records/MASTER.md` exclusively.
2. **MASTER.md** is the global source of truth: tokens, color (light+dark), typography, spacing, components, charts, a11y, motion, anti-patterns, and a pre-delivery checklist.
3. **research/** holds the raw skill search output (color, typography/style, chart/ux, stack). Don't edit these — they're the evidence behind the decisions. Re-run searches and append here when extending the system.

## Map

```
design-system/
├─ README.md                      ← you are here (index + usage)
└─ financial-records/
   ├─ MASTER.md                   ← global source of truth (start here)
   ├─ pages/
   │  ├─ dashboard.md             ← /dashboard (Executive Dashboard, KPIs + charts)
   │  ├─ records.md               ← /records, /accounts/[id] (table + CRUD modal)
   │  └─ profile.md               ← /profile, /settings (forms, accounts, categories, theme)
   └─ research/
      ├─ color-search.md
      ├─ typography-style-search.md
      ├─ chart-ux-search.md
      └─ stack-search.md          ← Next.js + React only
```

## Project snapshot

- **Product:** Personal finance / multi-account expense tracker (see `../PRD.md`).
- **Stack:** Next.js 16 · React 19 · Tailwind 3 · Chart.js + react-chartjs-2 · Redux Toolkit · Firebase · react-icons · framer-motion · sweetalert2.
- **Direction:** Fresh fintech — Trust navy `#0F172A` + single blue accent `#2563EB`, premium gold `#CA8A04` sparingly. Semantic money colors (income green / expense red) are reserved for amounts only.
- **Themes:** Light **and** Dark, both first-class (`darkMode: 'class'`).
- **Type:** IBM Plex Sans (trust + tabular data), `tabular-nums` for all money.

## Status & next steps

- **This session:** docs only — no app components were modified.
- **Not yet wired:** tokens are documented but not yet in `tailwind.config.js` / `globals.css`, and the app still uses Poppins/Ubuntu + the old teal-green palette. A future session can:
  1. Wire tokens into `tailwind.config.js` (colors, fontFamily, darkMode: 'class') + `globals.css`.
  2. Add the IBM Plex Sans import and theme-toggle mechanism.
  3. Refactor components page-by-page against the relevant `pages/*.md`.

## Extending

- Add a new page override: `python ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Financial Records" --page "<name>"`, then curate it like the others (replace any mismatched auto-reasoned pattern with finance-appropriate content).
- Keep MASTER.md and the actual Tailwind/CSS config in sync once tokens are wired.
