# Product Requirements Document (PRD)
# Project: financial-records

**Versi:** 1.0  
**Tanggal:** 25 Juni 2026  
**Status:** Draft  
**Author:** [Nama Kamu]

---

## 1. Ringkasan Proyek

`financial-records` adalah aplikasi web pencatatan keuangan pribadi yang memungkinkan pengguna mengelola catatan pemasukan dan pengeluaran mereka secara terorganisir. Setiap pengguna dapat memiliki beberapa **akun keuangan terpisah** (misalnya: Dompet Pribadi, Tabungan, Kartu Kredit), lengkap dengan dasbor analitik visual untuk memantau kondisi keuangan secara keseluruhan.

---

## 2. Tujuan Proyek

### Tujuan Utama
- Menyediakan tools pencatatan keuangan pribadi yang sederhana, cepat, dan terorganisir.
- Membantu pengguna memahami pola pengeluaran dan pemasukan mereka melalui visualisasi data.
- Memberikan fleksibilitas pengelolaan keuangan multi-akun dalam satu platform.

### Metrik Keberhasilan
- Pengguna dapat menambahkan catatan dalam < 30 detik.
- Dasbor memuat dan merender grafik dalam < 2 detik.
- Semua operasi CRUD berjalan tanpa error pada data valid.

---

## 3. Target Pengguna

**Pengguna Utama:** Individu yang ingin mencatat keuangan pribadi secara mandiri, mulai dari pelajar, mahasiswa, hingga pekerja.

**Karakteristik Pengguna:**
- Melek teknologi dasar (bisa menggunakan web app).
- Tidak memerlukan fitur akuntansi yang kompleks.
- Ingin tampilan yang bersih dan mudah dipahami.

---

## 4. Fitur Utama

### 4.1 Manajemen Akun Keuangan (Multi-Account)

Setiap pengguna dapat memiliki lebih dari satu akun keuangan. Setiap akun berdiri sendiri sebagai "buku catatan" terpisah.

**Kemampuan:**
- Membuat akun baru dengan nama dan ikon/warna kustom (contoh: "Dompet", "BCA", "Dana").
- Mengedit nama dan detail akun.
- Menghapus akun beserta seluruh catatannya (dengan konfirmasi).
- Melihat ringkasan saldo per akun di halaman beranda.

---

### 4.2 Manajemen Catatan Keuangan (CRUD)

Inti dari aplikasi — pengguna dapat membuat, membaca, memperbarui, dan menghapus catatan transaksi pada akun yang dipilih.

**Form Tambah / Edit Catatan:**

| Field | Tipe | Keterangan |
|---|---|---|
| `Jumlah` | Number | Nominal transaksi (wajib, > 0) |
| `Tipe` | Enum | `Pemasukan` atau `Pengeluaran` |
| `Kategori` | Select | Pilih dari daftar kategori yang tersedia |
| `Tanggal` | Date | Tanggal transaksi (default: hari ini) |
| `Keterangan` | Text | Catatan singkat / deskripsi (opsional) |
| `Akun` | Select | Akun mana yang dicatat (jika dari halaman global) |

**Kemampuan:**
- Menambahkan catatan baru melalui form modal atau halaman terpisah.
- Mengedit catatan yang sudah ada.
- Menghapus catatan (dengan konfirmasi).
- Melihat daftar catatan dalam tabel/list yang dapat difilter dan diurutkan.
- Filter catatan berdasarkan: rentang tanggal, kategori, dan tipe (pemasukan/pengeluaran).
- Pencarian catatan berdasarkan keterangan.

---

### 4.3 Manajemen Kategori

**Kategori Default (Pengeluaran):**
Makanan & Minuman, Transportasi, Belanja, Hiburan, Kesehatan, Tagihan & Utilitas, Pendidikan, Lainnya.

**Kategori Default (Pemasukan):**
Gaji, Freelance, Bonus, Investasi, Hadiah, Lainnya.

**Kemampuan:**
- Pengguna dapat menambahkan kategori kustom.
- Setiap kategori memiliki nama dan ikon/warna.

---

### 4.4 Halaman Dashboard & Analitik

Halaman utama yang menampilkan ringkasan dan visualisasi data keuangan pengguna.

**Ringkasan (Summary Cards):**
- Total Pemasukan bulan ini.
- Total Pengeluaran bulan ini.
- Saldo bersih bulan ini (Pemasukan − Pengeluaran).
- Saldo keseluruhan per akun.

**Grafik & Visualisasi:**

| Grafik | Tipe | Deskripsi |
|---|---|---|
| Arus Kas Bulanan | Line / Bar Chart | Perbandingan pemasukan vs pengeluaran per bulan (12 bulan terakhir) |
| Pengeluaran per Kategori | Pie / Donut Chart | Proporsi pengeluaran berdasarkan kategori pada periode yang dipilih |
| Tren Harian | Bar Chart | Pengeluaran per hari dalam bulan yang dipilih |
| Perbandingan Akun | Bar Chart | Saldo atau aktivitas masing-masing akun |

**Filter Dashboard:**
- Pilihan periode: Bulan ini, 3 bulan, 6 bulan, 1 tahun, atau rentang kustom.
- Filter per akun (tampilkan semua atau per akun tertentu).

---

## 5. User Stories

### Autentikasi
- Sebagai pengguna, saya ingin mendaftar dengan email dan password agar data saya tersimpan secara pribadi.
- Sebagai pengguna, saya ingin login dan logout dari akun saya.
- Sebagai pengguna, saya ingin mereset password jika lupa.

### Manajemen Akun Keuangan
- Sebagai pengguna, saya ingin membuat akun keuangan baru agar saya bisa memisahkan catatan per sumber dana.
- Sebagai pengguna, saya ingin mengganti nama akun agar tetap relevan dengan situasi keuangan saya.
- Sebagai pengguna, saya ingin menghapus akun yang tidak lagi digunakan.

### Catatan Keuangan
- Sebagai pengguna, saya ingin menambahkan catatan pengeluaran dengan cepat menggunakan form yang ringkas.
- Sebagai pengguna, saya ingin mengedit catatan yang salah input tanpa harus menghapus dan membuat ulang.
- Sebagai pengguna, saya ingin menghapus catatan yang tidak relevan.
- Sebagai pengguna, saya ingin memfilter catatan berdasarkan bulan agar mudah direview.

### Dashboard
- Sebagai pengguna, saya ingin melihat grafik pengeluaran per kategori agar tahu ke mana uang saya pergi.
- Sebagai pengguna, saya ingin melihat tren keuangan bulanan agar bisa membandingkan antar periode.
- Sebagai pengguna, saya ingin melihat ringkasan saldo semua akun dalam satu halaman.

---

## 6. Persyaratan Fungsional

### Autentikasi & Otorisasi
- [F-01] Sistem mendukung registrasi pengguna baru dengan email dan password.
- [F-02] Sistem mendukung login dengan session/token (JWT atau session cookie).
- [F-03] Setiap data (akun keuangan & catatan) hanya bisa diakses oleh pemiliknya.
- [F-04] Pengguna dapat logout dan session diinvalidasi.

### Akun Keuangan
- [F-05] Pengguna dapat membuat minimal 1 dan maksimal 10 akun keuangan.
- [F-06] Setiap akun memiliki: nama, warna/ikon (opsional), dan tanggal dibuat.
- [F-07] Penghapusan akun bersifat cascade — semua catatan terkait ikut terhapus.

### Catatan Transaksi
- [F-08] Setiap catatan wajib memiliki: jumlah, tipe, tanggal, dan akun tujuan.
- [F-09] Field kategori dan keterangan bersifat opsional namun direkomendasikan.
- [F-10] Sistem memvalidasi bahwa jumlah adalah angka positif.
- [F-11] Daftar catatan ditampilkan dengan pagination atau infinite scroll.
- [F-12] Sistem menyediakan filter catatan berdasarkan tanggal, kategori, dan tipe.

### Dashboard
- [F-13] Dashboard menampilkan data sesuai filter periode yang dipilih pengguna.
- [F-14] Semua grafik dirender di sisi klien menggunakan library chart (Recharts / Chart.js).
- [F-15] Data grafik diambil melalui API endpoint yang terpisah dan di-cache jika memungkinkan.

---

## 7. Persyaratan Non-Fungsional

| ID | Kategori | Persyaratan |
|---|---|---|
| NF-01 | Performa | Halaman utama dan dashboard load dalam < 3 detik pada koneksi 4G |
| NF-02 | Keamanan | Password di-hash (bcrypt). Data sensitif tidak pernah dikirim di URL. |
| NF-03 | Keamanan | Semua endpoint API dilindungi autentikasi. Input di-sanitasi untuk mencegah XSS/SQL Injection. |
| NF-04 | Skalabilitas | Desain database mendukung hingga 10.000 catatan per pengguna tanpa degradasi signifikan. |
| NF-05 | Usability | Aplikasi responsif dan dapat digunakan di layar mobile (min 375px). |
| NF-06 | Maintainability | Kode diorganisir dengan struktur folder yang jelas dan terdokumentasi. |
| NF-07 | Ketersediaan | Uptime target 99% (tidak kritis, ini project personal). |

---

## 8. Desain UI/UX

### Halaman & Navigasi

```
/                    → Landing page / redirect ke dashboard jika sudah login
/login               → Halaman login
/register            → Halaman registrasi
/dashboard           → Dashboard analitik utama
/accounts            → Daftar semua akun keuangan
/accounts/:id        → Detail catatan per akun (tabel + filter)
/accounts/:id/new    → Form tambah catatan baru
/settings            → Pengaturan profil & kategori kustom
```

### Prinsip Desain
- **Simpel dan bersih:** Minimalisir clutter, fokus pada data.
- **Dark/Light mode:** Opsional, sebagai nice-to-have.
- **Mobile-first:** Form dan tabel harus nyaman digunakan di smartphone.
- **Feedback yang jelas:** Loading state, success toast, dan error message untuk setiap aksi.

---

## 9. Model Data (Database Schema)

### Tabel `users`
```
id              UUID / INT  (PK)
email           VARCHAR     (unique)
password_hash   VARCHAR
name            VARCHAR
created_at      TIMESTAMP
```

### Tabel `financial_accounts`
```
id              UUID / INT  (PK)
user_id         FK → users
name            VARCHAR
color           VARCHAR     (hex color, opsional)
icon            VARCHAR     (opsional)
created_at      TIMESTAMP
```

### Tabel `categories`
```
id              UUID / INT  (PK)
user_id         FK → users  (null = kategori default sistem)
name            VARCHAR
type            ENUM        (income | expense)
icon            VARCHAR     (opsional)
```

### Tabel `records`
```
id              UUID / INT  (PK)
account_id      FK → financial_accounts
category_id     FK → categories
amount          DECIMAL(15, 2)
type            ENUM        (income | expense)
note            TEXT        (opsional)
date            DATE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

---

## 10. Tech Stack (Rekomendasi)

> Sesuaikan dengan preferensi dan stack yang sudah kamu kuasai.

| Layer | Pilihan Rekomendasi | Alternatif |
|---|---|---|
| Frontend | Next.js / React | Vue 3, SvelteKit |
| Styling | Tailwind CSS | ShadCN UI |
| Charting | Recharts | Chart.js, ApexCharts |
| Backend | Next.js API Routes / Express | Hono, Fastify |
| Database | PostgreSQL | MySQL, SQLite (dev) |
| ORM | Prisma | Drizzle ORM |
| Auth | NextAuth.js / Lucia | Supabase Auth, Clerk |
| Deployment | Vercel | Railway, Render |

---

## 11. Prioritas Fitur (MoSCoW)

### Must Have (MVP)
- [x] Registrasi & Login
- [x] CRUD Akun Keuangan (multi-account)
- [x] CRUD Catatan Transaksi (jumlah, tipe, kategori, tanggal, keterangan)
- [x] Daftar catatan per akun dengan filter tanggal
- [x] Dashboard: summary cards (total pemasukan, pengeluaran, saldo)
- [x] Dashboard: grafik pengeluaran per kategori (pie chart)

### Should Have
- [ ] Dashboard: grafik arus kas bulanan (line/bar chart)
- [ ] Filter catatan multi-parameter (kategori + rentang tanggal)
- [ ] Kategori kustom buatan pengguna
- [ ] Pencarian catatan berdasarkan keterangan
- [ ] Pagination pada daftar catatan

### Could Have
- [ ] Dark/light mode
- [ ] Export data ke CSV
- [ ] Dashboard: tren harian dalam satu bulan
- [ ] Perbandingan periode (bulan ini vs bulan lalu)
- [ ] Notifikasi / reminder pencatatan

### Won't Have (untuk sekarang)
- [ ] Fitur berbagi/kolaborasi antar pengguna
- [ ] Scan nota/struk via kamera
- [ ] Integrasi dengan rekening bank
- [ ] Fitur budgeting / target pengeluaran per kategori

---

## 12. Milestone & Timeline (Estimasi)

| Fase | Konten | Estimasi |
|---|---|---|
| **Fase 1 - Setup & Auth** | Inisiasi project, konfigurasi DB, registrasi & login | 3–5 hari |
| **Fase 2 - Core CRUD** | Manajemen akun keuangan + CRUD catatan transaksi | 5–7 hari |
| **Fase 3 - Dashboard** | Summary cards + grafik kategori & arus kas | 4–6 hari |
| **Fase 4 - Polish** | Responsif, validasi form, filter & search, error handling | 3–5 hari |
| **Fase 5 - Deploy** | Setup deployment, testing end-to-end, dokumentasi | 2–3 hari |
| **Total Estimasi** | | **~3–4 minggu** |

---

## 13. Open Questions

- [ ] Apakah ada fitur transfer antar akun (memindahkan dana dari satu akun ke akun lain)?
- [ ] Apakah kategori bersifat global (sama untuk semua akun) atau per akun?
- [ ] Apakah perlu fitur saldo awal saat membuat akun (opening balance)?
- [ ] Apakah catatan bisa dilampiri foto/bukti transaksi?
- [ ] Apakah akan ada fitur multi-mata uang di masa depan?

---

*Dokumen ini bersifat living document dan akan diperbarui seiring perkembangan project.*
