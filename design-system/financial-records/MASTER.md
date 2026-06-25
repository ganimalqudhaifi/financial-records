# Design System — Master (Global Source of Truth)

> **HOW TO USE THIS FOLDER (read first, every session):**
> 1. When building/editing a page, first check `pages/<page>.md`. If it exists, its rules **override** this file. Otherwise follow this file strictly.
> 2. This file is the single source of truth for tokens, color, type, spacing, and components.
> 3. Raw skill search output is archived in `research/` — don't edit those; edit decisions here.
> 4. Keep this file in sync with `tailwind.config.js` and `globals.css` when tokens are wired in.

**Project:** Financial Records — personal finance / multi-account expense tracker (see `../../PRD.md`)
**Category:** Fintech / Personal Finance
**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 3 · Chart.js + react-chartjs-2 · Redux Toolkit · Firebase
**Themes:** Light **and** Dark (both first-class)
**Last updated:** 2026-06-25

> **Note on generation:** The skill's `--design-system` auto-reasoner mislabeled this project ("Event/Conference Landing" pattern, "Dark Mode OLED" style with a contradictory light background + "no light backgrounds" anti-pattern). Those were corrected here using the finance-specific `color`, `style`, and `typography` domain searches archived in `research/`.

---

## 1. Design Principles

1. **Clarity over decoration.** This is a money app — numbers are the hero. Minimal chrome, generous white space (Swiss Modernism discipline: 12-col grid, 8px base unit, single accent).
2. **Trust through restraint.** Navy + neutral foundation, one accent. No neon, no gradients on data, no glassmorphism over numbers.
3. **Semantic money colors are sacred.** Income = green, Expense = red, Balance = neutral/navy. Never use green/red decoratively elsewhere — they carry meaning.
4. **Both themes, equal quality.** Every token has a light and dark value. Test both before shipping (PRD §8 lists dark/light as a goal).
5. **Mobile-first.** Min 375px. Forms and tables must be thumb-friendly (PRD NF-05).
6. **Fast feedback.** Skeleton/spinner for any op > 300ms; success toast; inline form validation on blur.

---

## 2. Color Palette

Chosen from `research/color-search.md`: **"Banking/Traditional Finance — Trust navy + premium gold"** as the light base, and **"Financial Dashboard — dark bg + green positive indicators"** as the dark base. Accent unified to **blue** (the app's existing brand leans blue) with gold reserved as a premium highlight.

### 2.1 Brand & Accent (theme-independent)

| Role | Hex | Notes |
|------|-----|-------|
| Brand / Primary | `#0F172A` (slate-900) | Trust navy. Headers, primary text, sidebar. |
| Brand Secondary | `#1E3A8A` (blue-900) | Deeper brand accents, active nav. |
| Accent / CTA | `#2563EB` (blue-600) | Primary buttons, links, focus rings. The single accent. |
| Accent Hover | `#1D4ED8` (blue-700) | CTA hover. |
| Premium Highlight | `#CA8A04` (yellow-600) | Sparingly — premium/upgrade, "total balance" emphasis. |

### 2.2 Semantic — Money (theme-independent meaning, theme-tuned shade)

| Role | Light | Dark | Usage |
|------|-------|------|-------|
| Income / Positive | `#16A34A` (green-600) | `#22C55E` (green-500) | Pemasukan amounts, positive net, up-trends |
| Expense / Negative | `#DC2626` (red-600) | `#EF4444` (red-500) | Pengeluaran amounts, negative net, alerts |
| Warning | `#D97706` (amber-600) | `#F59E0B` (amber-500) | Near-limit, pending |
| Neutral / Info | `#2563EB` (blue-600) | `#3B82F6` (blue-500) | Balance, info states |

### 2.3 Surfaces & Text

| Token | Light | Dark |
|-------|-------|------|
| `--bg-base` (page) | `#F8FAFC` (slate-50) | `#020617` (slate-950) |
| `--bg-surface` (card) | `#FFFFFF` | `#0F172A` (slate-900) |
| `--bg-surface-2` (raised) | `#F1F5F9` (slate-100) | `#1E293B` (slate-800) |
| `--bg-sidebar` | `#0F172A` (slate-900) | `#020617` (slate-950) |
| `--border` | `#E2E8F0` (slate-200) | `#1E293B` (slate-800) |
| `--text-primary` | `#020617` (slate-950) | `#F8FAFC` (slate-50) |
| `--text-secondary` | `#475569` (slate-600) | `#94A3B8` (slate-400) |
| `--text-muted` | `#64748B` (slate-500) | `#64748B` (slate-500) |
| `--text-on-accent` | `#FFFFFF` | `#FFFFFF` |

> **Contrast (WCAG):** `text-primary` on `bg-surface` ≥ 16:1 both themes. `text-secondary` light `#475569` on white = 7.4:1 ✓. Never use slate-400 for body text in light mode (fails 4.5:1).

### 2.4 Chart Categorical Palette (for category breakdown, max 6 before grouping)

`#2563EB` · `#16A34A` · `#CA8A04` · `#9333EA` · `#0891B2` · `#DC2626` → then group remainder as "Lainnya" `#64748B`.

---

## 3. Typography

Chosen from `research/typography-style-search.md`: **"Financial Trust — IBM Plex Sans"** (conveys trust, excellent for tabular data). Current app uses Poppins/Ubuntu — migrate to IBM Plex Sans for the app shell; keep a geometric option only if a marketing landing needs personality.

- **Heading + Body:** `IBM Plex Sans` (300/400/500/600/700)
- **Numeric / tabular:** `IBM Plex Sans` with `font-variant-numeric: tabular-nums` for all money figures (aligns decimals in tables).
- **Fallback:** `system-ui, sans-serif`
- **Loading:** `font-display: swap` (avoid FOIT).

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
```

```js
// tailwind.config.js → theme.extend.fontFamily
fontFamily: { sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'] }
```

### Type Scale

| Token | Size / Line | Weight | Usage |
|-------|-------------|--------|-------|
| Display | 36px / 1.1 | 700 | Page hero numbers (net balance) |
| H1 | 30px / 1.2 | 600 | Page title ("Dashboard") |
| H2 | 24px / 1.3 | 600 | Section title |
| H3 | 20px / 1.4 | 600 | Card title |
| Body | 16px / 1.5 | 400 | Default (min 16px on mobile) |
| Small | 14px / 1.5 | 400 | Secondary/meta |
| Caption | 12px / 1.4 | 500 | Labels, table headers (uppercase, tracking-wide) |
| KPI value | 48px / 1.0 | 700 | Summary card big numbers (`tabular-nums`) |

Body line length: 65–75 chars. Body line-height 1.5–1.75.

---

## 4. Spacing, Radius, Shadow, Z-Index

### Spacing (8px base unit — Swiss grid)
| Token | Value |
|-------|-------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |
| `2xl` | 48px |
| `3xl` | 64px |

Responsive padding: `px-4 sm:px-6 lg:px-8`.

### Radius
| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 8px | inputs, buttons |
| `md` | 12px | cards |
| `lg` | 16px | modals |
| `full` | 9999px | avatars, pills, status dots |

### Shadow (light theme; in dark, prefer borders over shadows)
| Token | Value |
|-------|-------|
| `sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| `md` | `0 4px 6px rgba(0,0,0,0.10)` |
| `lg` | `0 10px 15px rgba(0,0,0,0.10)` |
| `xl` | `0 20px 25px rgba(0,0,0,0.15)` |

### Z-Index scale (never use arbitrary `z-[9999]`)
| Layer | Value |
|-------|-------|
| base content | `0` |
| sticky header / dropdown | `10` |
| sidebar | `20` |
| overlay/backdrop | `30` |
| modal / toast | `50` |

---

## 5. Component Specs (Tailwind-first)

> Express tokens as Tailwind classes. Dark variants via `dark:` prefix (`darkMode: 'class'`).

### Buttons
```html
<!-- Primary -->
<button class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3
  font-semibold text-white transition-colors duration-200 cursor-pointer
  hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
  disabled:opacity-60 disabled:cursor-not-allowed">
  Save
</button>

<!-- Secondary (outline) -->
<button class="rounded-lg border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold
  text-slate-900 dark:text-slate-100 transition-colors duration-200 cursor-pointer
  hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-blue-500">
  Cancel
</button>

<!-- Destructive -->
<button class="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700
  transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-red-500">
  Delete
</button>
```
Loading buttons: disable + spinner during async (PRD feedback requirement).

### Card
```html
<div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900
  p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
  ...
</div>
```
Hover = shadow/color change only. **No scale transforms** (they shift layout in grids).

### Input + Label
```html
<label for="amount" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Jumlah</label>
<input id="amount" inputmode="numeric"
  class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900
  px-4 py-3 text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400
  transition-colors duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
```
Every input has a `<label for>`. Validate on blur, error message inline below the field.

### Modal (used heavily for add/edit record — PRD §4.2)
```html
<div class="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"></div>
<div role="dialog" aria-modal="true"
  class="fixed inset-0 z-50 grid place-items-center p-4">
  <div class="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-xl">...</div>
</div>
```
Trap focus; close on Esc + backdrop click; return focus to trigger.

### Status / Amount text
```html
<span class="font-semibold tabular-nums text-green-600 dark:text-green-500">+ Rp 1.500.000</span>
<span class="font-semibold tabular-nums text-red-600 dark:text-red-500">− Rp 250.000</span>
```

---

## 6. Theming Mechanism (Next.js + Tailwind)

- Use Tailwind **class strategy**: `darkMode: 'class'` in `tailwind.config.js`.
- Toggle by adding/removing `dark` on `<html>`. Persist choice in `localStorage` (cache the read in a `Map` per `research/stack-search.md`).
- Respect system default on first load via `prefers-color-scheme`.
- Set `<meta name="color-scheme" content="light dark">` and `color-scheme` CSS so native controls (scrollbars, date pickers) match.
- Avoid theme flash: set the class in an inline script before hydration.

---

## 7. Charts (Chart.js — PRD F-14 / §4.4)

From `research/chart-ux-search.md`:

| PRD Chart | Type | Notes |
|-----------|------|-------|
| Arus Kas Bulanan (income vs expense, 12 mo) | **Line** (or grouped Bar) | 2 series: income green, expense red. Fill 20%. Hover + tooltip. |
| Pengeluaran per Kategori | **Donut** | Max 5–6 slices, then "Lainnya". Provide data-table alt for a11y. |
| Tren Harian | **Bar** | Single series per selected month. |
| Perbandingan Akun | **Grouped Bar** | One group per account. |

Rules:
- Always pass theme-aware colors (read CSS vars / pass via props) so charts work in dark mode.
- Provide a `<table>` alternative or `aria-label` summary for every chart (a11y — pie/donut are weak for screen readers).
- Money axes: format `Rp` + thousands separators; tabular nums in tooltips.
- Animate on mount only; respect `prefers-reduced-motion` (disable animation when set).

---

## 8. Accessibility (CRITICAL — non-negotiable)

- Color contrast ≥ 4.5:1 normal text, 3:1 large. (Tokens in §2.3 are pre-checked.)
- Visible focus on every interactive element (`focus-visible:ring-2 ring-blue-500`).
- Icon-only buttons need `aria-label`. Images need alt text. Form inputs need `<label for>`.
- Tab order matches visual order. Modals trap focus and restore it on close.
- Color is never the only signal: pair income/expense color with `+`/`−` sign or an arrow icon.
- Respect `prefers-reduced-motion`.

---

## 9. Motion

- Micro-interactions: 150–300ms, `ease`.
- Use `transform`/`opacity` only (never animate width/height/top).
- Loading: skeleton screens for cards/tables, spinner for buttons. Op > 300ms must show feedback.
- Infinite animation = loaders only (`animate-spin`). No decorative bouncing.
- KPI count-up on dashboard cards is allowed (Executive Dashboard pattern) but gated behind reduced-motion.

---

## 10. Anti-Patterns (Do NOT do)

- ❌ Emojis as icons → use `react-icons` (already installed) consistently.
- ❌ Green/red for non-money decoration (dilutes semantic meaning).
- ❌ Scale-transform hovers that shift layout.
- ❌ `slate-400` (or lighter) for body text in light mode (fails contrast).
- ❌ Invisible borders (`border-white/10`) in light mode.
- ❌ Arbitrary z-index (`z-[9999]`) — use the §4 scale.
- ❌ Neon glow, glassmorphism, or gradients layered over numeric data.
- ❌ Pie/donut with >6 slices.
- ❌ Pure black `#000` backgrounds — use slate-950 `#020617` for the dark theme.

---

## 11. Pre-Delivery Checklist

- [ ] Both light AND dark themes verified.
- [ ] No emojis as icons; icon set consistent (react-icons).
- [ ] `cursor-pointer` on all clickable elements.
- [ ] Hover states smooth (150–300ms), no layout shift.
- [ ] Light-mode text contrast ≥ 4.5:1; muted text ≥ slate-600.
- [ ] Focus states visible for keyboard nav; modals trap/restore focus.
- [ ] Money figures use `tabular-nums` and semantic color + sign.
- [ ] Charts have data-table/aria alternative and theme-aware colors.
- [ ] `prefers-reduced-motion` respected.
- [ ] Responsive at 375 / 768 / 1024 / 1440px; no horizontal scroll on mobile.
- [ ] All form inputs have `<label for>`; validation on blur with inline errors.
