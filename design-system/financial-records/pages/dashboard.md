# Dashboard Page — Overrides

> **Overrides `../MASTER.md`.** Only deviations + page-specific rules are here; everything else inherits from Master.
> **Route:** `/dashboard` · **Pattern:** Executive Dashboard (BI/Analytics) · **PRD:** §4.4, F-13–F-15

---

## Intent
At-a-glance financial health. Summary KPIs first, charts below, filters on top. Numbers are the hero — minimal chrome.

## Layout
- Shell: persistent sidebar (`lg:ml-64`) + content; content max-width `max-w-7xl`, `px-4 sm:px-6 lg:px-8`.
- Order (top → bottom):
  1. **Page header** — title "Dashboard" (H1) + period & account filters (right-aligned, wrap on mobile).
  2. **Summary cards row** — 4 KPI cards, `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4`.
  3. **Cash-flow chart** (Arus Kas Bulanan) — full width.
  4. **Two-up row** — Category donut + Account comparison, `grid grid-cols-1 lg:grid-cols-2 gap-6`.
  5. **(optional)** Daily trend bar for selected month.

## Summary (KPI) Cards — page-specific component
- Max 4–6 cards (Executive Dashboard rule). Here: **Pemasukan**, **Pengeluaran**, **Saldo Bersih (bulan ini)**, **Total Saldo (semua akun)**.
- KPI value uses **48px / 700 / `tabular-nums`** (Master type scale "KPI value").
- Each card: small caption label (uppercase, `text-slate-500`), big number, and a trend chip (`▲ 12%` green / `▼ 5%` red vs last month — Could-Have, wire when available).
- Semantic color: Pemasukan green, Pengeluaran red, Saldo Bersih neutral navy (red if negative), Total Saldo premium gold accent allowed.
- Left border accent per card (`border-l-4`) using the card's semantic color for quick scanning.
- Count-up animation on mount allowed; **gate behind `prefers-reduced-motion`**.

```html
<div class="rounded-xl border-l-4 border-green-600 border-y border-r border-slate-200
  dark:border-slate-800 dark:border-l-green-500 bg-white dark:bg-slate-900 p-5 shadow-sm">
  <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Pemasukan (Juni)</p>
  <p class="mt-2 text-4xl font-bold tabular-nums text-green-600 dark:text-green-500">Rp 8.250.000</p>
  <p class="mt-1 text-sm text-slate-500"><span class="text-green-600">▲ 12%</span> vs Mei</p>
</div>
```

## Charts (see Master §7)
- **Arus Kas Bulanan:** Line, 2 series (income green `#16A34A`, expense red `#DC2626`), 20% fill, 12 months. Theme-aware text/grid colors.
- **Pengeluaran per Kategori:** Donut, ≤6 slices then "Lainnya"; legend with %; data-table fallback.
- **Perbandingan Akun:** Grouped Bar, one group per account.
- All charts: wrap in a Card; show **skeleton** while data loads (`<Suspense>` or loading state); `aria-label` summarizing the trend.

## Filters (PRD F-13)
- Period selector: Bulan ini · 3 bulan · 6 bulan · 1 tahun · kustom (segmented control or select).
- Account filter: "Semua akun" + per-account.
- Sticky within page header on scroll (`z-10`). Re-fetch/cache chart data per filter (Master §6, F-15).

## Empty / Loading
- New user, no records: friendly empty state with a primary CTA "Tambah Catatan Pertama" (blue primary button), not a blank chart.
- Loading: skeleton KPI cards + chart placeholders (never frozen/blank — UX High severity).

## Anti-patterns (page)
- ❌ More than 6 KPI cards.
- ❌ Donut with >6 categories.
- ❌ Decorative gauge/leaderboard animations (not relevant to personal finance).
