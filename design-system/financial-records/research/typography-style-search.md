# Raw Research — Typography & Style Domains

> Source: `ui-ux-pro-max` skill. Captured 2026-06-25. Raw output.

## Typography — Query: `fintech finance professional trustworthy modern`

### Result 1 — Financial Trust ⭐ (chosen)
- Heading: **IBM Plex Sans** · Body: **IBM Plex Sans** · Category: Sans + Sans
- Mood: financial, trustworthy, professional, corporate, banking, serious
- Best For: Banks, finance, insurance, investment, fintech, enterprise
- CSS: `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');`
- Tailwind: `fontFamily: { sans: ['IBM Plex Sans', 'sans-serif'] }`
- Notes: IBM Plex conveys trust and professionalism. Excellent for data.

### Result 2 — Corporate Trust (alt, accessibility-first)
- Heading: **Lexend** · Body: **Source Sans 3**
- Notes: Lexend designed for readability. Excellent accessibility.

### Result 3 — Modern Professional (current app uses Poppins)
- Heading: **Poppins** · Body: **Open Sans**
- Notes: Geometric Poppins for headings, humanist Open Sans for readability.

### Result 4 — Legal Professional
- Heading: **EB Garamond** · Body: **Lato** (Serif + Sans)

## Style — Query: `minimal clean professional dashboard light dark mode`

### Result 1 — Dark Mode (OLED)
- Colors: Deep Black `#000000`, Dark Grey `#121212`, Midnight Blue `#0A0E27`
- Accessibility: WCAG AAA · Performance: Excellent · Tailwind 10/10
- Use for: the **dark theme** baseline (but NOT pure-black; we soften to slate-950 for finance).

### Result 2 — Executive Dashboard ⭐ (chosen for app/dashboard)
- Keywords: High-level KPIs, large key metrics, trend indicators, at-a-glance insights
- Effects: KPI count-up animation, trend-arrow animation, metric card hover lift, alert pulse
- Status vars: `--status-green: #22C55E`, `--status-yellow: #F59E0B`, `--status-red: #EF4444`, `--card-min-width: 280px`, `--kpi-font-size: 48px`, `--sparkline-height: 32px`
- Accessibility: WCAG AA · Recharts 9/10, Chart.js 9/10

### Result 3 — Neumorphism (rejected — ⚠ low contrast, not for finance data)

### Result 4 — Swiss Modernism 2.0 ⭐ (chosen for layout discipline)
- 12-column grid, mathematical 8px base spacing, single accent, high contrast
- `--grid-columns: 12`, `--grid-gap: 1rem`, `--base-unit: 8px`
- Accessibility: WCAG AAA · Tailwind 10/10
- Use for: overall layout grid + restraint (single accent color rule).
