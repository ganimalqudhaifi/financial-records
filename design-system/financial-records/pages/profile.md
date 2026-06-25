# Profile / Settings Page — Overrides

> **Overrides `../MASTER.md`.** Only deviations + page-specific rules are here.
> **Routes:** `/profile`, `/settings` · **PRD:** §4.3 (categories), §8 (settings), user stories (auth/account mgmt)

---

## Intent
Calm, form-centric management screen: profile, theme, financial accounts, and custom categories. Low visual noise, clear sections, safe destructive actions.

## Layout
- Sidebar shell (`lg:ml-64`) + content `max-w-3xl` (narrower than data pages — forms read better constrained), `px-4 sm:px-6 lg:px-8`.
- Vertical stack of **section cards**, each with H2 title + short description, divided by `space-y-6`.
- Sections:
  1. **Profil** — avatar, displayName, email (read-only), edit name.
  2. **Tampilan** — theme toggle (Light / Dark / System).
  3. **Akun Keuangan** — list + add/edit/delete (PRD §4.1, F-05 max 10).
  4. **Kategori** — default (read-only) + custom add/edit/delete (PRD §4.3).
  5. **Akun & Keamanan** — change password, logout, delete account (danger zone).

## Profile Header
- Avatar (next/image, `rounded-full`, alt text), name (H3), email (`text-slate-500`).
- Online/offline dot keeps the green/gray status dot — acceptable use of green (status, not money).

## Theme Toggle — page-specific component
- Segmented control: Light · Dark · System (System = follow `prefers-color-scheme`).
- Persists to `localStorage`; applies `dark` class on `<html>` (Master §6). Icon + label (sun/moon/monitor from react-icons), `aria-pressed` on active.

## Financial Accounts manager (PRD §4.1)
- Each account = a row/card: color swatch + icon, name, balance (`tabular-nums`), edit + delete icon buttons (`aria-label`, `cursor-pointer`).
- Add account: modal with name + color picker (swatch grid) + optional icon.
- **Delete = cascade** (removes all records, F-07) → require an explicit confirm modal that states the consequence ("Semua catatan di akun ini akan ikut terhapus"). Destructive red button.
- Enforce 1–10 accounts (F-05): disable "Tambah" at 10 with a hint.

## Categories manager (PRD §4.3)
- Two groups: Pengeluaran (8 defaults) and Pemasukan (6 defaults). Defaults read-only/locked (lock icon).
- Custom category: name + icon/color. Edit/delete only for user-created.
- Show each as a category pill (color + label) consistent with the records table.

## Danger Zone
- Visually separated card with red top border / red heading.
- Logout (secondary), Delete account (destructive, double-confirm with typed confirmation or sweetalert).

## Forms
- All inputs use Master input spec, `<label for>`, validate on blur, inline errors, spinner on submit, success toast.

## Anti-patterns (page)
- ❌ Wide multi-column forms on this page (keep single column, `max-w-3xl`).
- ❌ Destructive delete without stating cascade consequence.
- ❌ Editing/deleting default system categories.
