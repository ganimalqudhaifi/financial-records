# Raw Research — Chart & UX Domains

> Source: `ui-ux-pro-max` skill. Captured 2026-06-25. Raw output.

## Chart — Query: `cash flow income expense trend monthly comparison`

- **Trend Over Time → Line Chart** ⭐ (Arus Kas Bulanan)
  - Secondary: Area Chart, Smooth Area
  - Color: Primary `#0080FF`; multiple series distinct colors; fill 20% opacity
  - A11y: clear line patterns for colorblind; add pattern overlays
  - Library: **Chart.js**, Recharts, ApexCharts · Hover + Zoom
- Flow/Process → Sankey (overkill here; for future transfer-between-accounts)
- Funnel/Flow → Funnel/Waterfall (waterfall = good future fit for running balance)
- Multi-Variable Comparison → Radar/Grouped Bar (account comparison → use Grouped Bar)

## Chart — Query: `category proportion spending breakdown pie donut`

- **Part-to-Whole → Pie or Donut** ⭐ (Pengeluaran per Kategori)
  - Colors: 5–6 max, contrasting palette, large slices first, use labels
  - ⚠ A11y: hard for screen readers. **If >5 items, prefer stacked bar with legend.** Always provide a data-table alternative.
  - Library: **Chart.js**, Recharts, D3.js · Hover + Drill
- Proportional/Percentage → Waffle (better a11y than pie; optional future)

## UX — Query: `accessibility forms validation loading`

- **Forms / Inline Validation** (Medium): validate on blur, not submit-only.
- **Performance / Lazy Loading** (Medium): `loading="lazy"` below-fold.
- **Animation / Loading States** (High): skeleton or spinner; never frozen UI.
- **Performance / Font Loading** (Medium): `font-display: swap` to avoid FOIT.
- **Feedback / Loading Indicators** (High): show spinner/skeleton for ops > 300ms.

## UX — Query: `animation z-index modal transitions`

- **Layout / Stacking Context** (Medium): a parent with z-index isolates children.
- **Animation / Continuous Animation** (Medium): infinite anim for loaders only.
- **Layout / Z-Index Management** (High): use a scale (10/20/30/50), never `z-[9999]`.
- **Animation / Reduced Motion** (High): respect `prefers-reduced-motion`.

## React Performance — Query: `waterfall suspense cache bundle rerender`

- **Async Waterfall / Suspense Boundaries** (High): wrap async in `<Suspense fallback={<Skeleton/>}>`.
- **Cache Storage API** (Low-Med): cache `localStorage` reads in a `Map`.
- **Cache Function Results** (Med): module-level `Map` for repeated pure calls.
- **LRU Cache Cross-Request** (High): LRU for data shared across requests.
