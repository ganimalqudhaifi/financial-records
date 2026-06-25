# Records Page — Overrides

> **Overrides `../MASTER.md`.** Only deviations + page-specific rules are here.
> **Routes:** `/records`, `/accounts/[id]`, `/accounts/[id]/new` · **PRD:** §4.2, F-08–F-12

---

## Intent
Fast capture and review of transactions. The table/list is the workhorse; adding a record must take < 30s (PRD metric). Density + scannability over decoration.

## Layout
- Sidebar shell (`lg:ml-64`) + content `max-w-7xl`, `px-4 sm:px-6 lg:px-8`.
- Order:
  1. Header: account name + balance summary, primary CTA **"Tambah Catatan"** (opens modal).
  2. Filter/search bar (sticky `z-10`).
  3. Records table (desktop) / card list (mobile).
  4. Pagination or infinite scroll (F-11).

## Records Table (desktop ≥ lg) — page-specific component
- Columns: Tanggal · Keterangan · Kategori · Tipe · Jumlah · Aksi.
- **Money column right-aligned, `tabular-nums`**, semantic color + sign (`+`/`−`). Color is never the only signal (Master §8).
- Row height comfortable (`py-3`); zebra striping `odd:bg-slate-50 dark:odd:bg-slate-900/50`; hover `hover:bg-slate-100 dark:hover:bg-slate-800`.
- Header row: caption style (12px, uppercase, `tracking-wide`, `text-slate-500`), sticky on vertical scroll.
- Category shown as a colored pill (category color + label). Type as a subtle badge (green/red tint).
- Aksi: icon buttons (edit/delete) from react-icons, each with `aria-label`; `cursor-pointer`; delete confirms via modal/sweetalert.
- Sortable headers (date, amount) — show sort direction with an icon, not color alone.

## Mobile (< lg) — card list
- Each record = a card: top row keterangan + amount (colored, right), bottom row date · category pill.
- Tap card → edit. Swipe or kebab menu for delete. Touch targets ≥ 44×44px.

## Add / Edit Form (modal — PRD §4.2)
- Fields (Master input spec): **Jumlah** (numeric, required, > 0), **Tipe** (Pemasukan/Pengeluaran toggle), **Kategori** (select, filtered by type), **Tanggal** (date, default today), **Keterangan** (optional text), **Akun** (select, only on global add).
- **Tipe toggle** = segmented control; selecting it recolors the Jumlah field accent (green/red) and filters the category list.
- Validation on **blur**, inline error below field; submit disabled until valid; amount must be positive (F-10).
- Submit button shows spinner + disables during async; success → toast + close + return focus to trigger.
- Modal: `role="dialog"`, `aria-modal`, focus trap, Esc/backdrop close (Master §5).

## Filters & Search (F-12)
- Date range (preset + custom), Kategori (multi), Tipe (income/expense/all).
- Search by keterangan (debounced input, `placeholder:text-slate-400`).
- Active filters shown as removable chips. "Reset" clears all.
- Empty filtered result: clear "Tidak ada catatan untuk filter ini" state, not a blank table.

## Performance
- Virtualize or paginate long lists (F-11; up to 10k records per user, NF-04). Default page size 25–50.
- Memoize row components (`React.memo`) for large lists (research/stack-search.md).

## Anti-patterns (page)
- ❌ Amount column left-aligned or without `tabular-nums`.
- ❌ Color-only income/expense distinction (must include sign/badge).
- ❌ Inline-editing without clear save/cancel.
- ❌ Loading the full 10k rows at once.
