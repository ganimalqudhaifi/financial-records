/**
 * Landing page content — sourced from PRD.md.
 * Kept in one place so copy can be edited without touching markup.
 */
import { IconType } from "react-icons";
import {
  BiCategory,
  BiLineChart,
  BiLockAlt,
  BiMobileAlt,
  BiSearchAlt,
  BiSolidBank,
  BiSolidPieChartAlt2,
  BiWallet,
} from "react-icons/bi";

export type Feature = {
  icon: IconType;
  title: string;
  desc: string;
};

// PRD §4.1–§4.4 + §11 Must/Should-have
export const FEATURES: Feature[] = [
  {
    icon: BiSolidBank,
    title: "Multi-Account",
    desc: "Pisahkan Dompet, Tabungan, hingga Kartu Kredit ke dalam buku catatan terpisah — kelola hingga 10 akun dalam satu tempat.",
  },
  {
    icon: BiWallet,
    title: "Catatan Cepat",
    desc: "Tambah pemasukan atau pengeluaran lewat form ringkas dalam waktu kurang dari 30 detik. Edit dan hapus kapan saja.",
  },
  {
    icon: BiSolidPieChartAlt2,
    title: "Dashboard Analitik",
    desc: "Pantau total pemasukan, pengeluaran, dan saldo bersih bulan ini lewat ringkasan visual yang mudah dipahami.",
  },
  {
    icon: BiLineChart,
    title: "Arus Kas Bulanan",
    desc: "Bandingkan pemasukan vs pengeluaran selama 12 bulan terakhir dan kenali pola keuangan Anda dari waktu ke waktu.",
  },
  {
    icon: BiCategory,
    title: "Kategori Kustom",
    desc: "Gunakan kategori bawaan atau buat sendiri sesuai gaya hidup Anda, lengkap dengan warna dan ikon penanda.",
  },
  {
    icon: BiSearchAlt,
    title: "Filter & Pencarian",
    desc: "Saring catatan berdasarkan tanggal, kategori, dan tipe, atau cari cepat lewat kata kunci pada keterangan.",
  },
  {
    icon: BiLockAlt,
    title: "Privat & Aman",
    desc: "Password di-hash dan setiap data hanya bisa diakses pemiliknya. Data sensitif tidak pernah dikirim lewat URL.",
  },
  {
    icon: BiMobileAlt,
    title: "Mobile-First",
    desc: "Form dan tabel dirancang nyaman digunakan di layar kecil — catat keuangan dari mana saja, kapan saja.",
  },
];

export type Step = { num: string; title: string; desc: string };

export const STEPS: Step[] = [
  {
    num: "01",
    title: "Buat Akun Keuangan",
    desc: "Daftar dengan email, lalu buat akun keuangan pertama Anda — beri nama, warna, dan ikon agar mudah dikenali.",
  },
  {
    num: "02",
    title: "Catat Transaksi",
    desc: "Tambahkan setiap pemasukan dan pengeluaran lengkap dengan kategori, tanggal, dan keterangan singkat.",
  },
  {
    num: "03",
    title: "Pantau & Analisa",
    desc: "Buka dashboard untuk melihat ringkasan dan grafik, lalu ambil keputusan keuangan yang lebih cerdas.",
  },
];

export type Stat = { value: string; label: string };

// Illustrative product capabilities drawn from PRD non-functional targets.
export const STATS: Stat[] = [
  { value: "< 30 dtk", label: "Menambah satu catatan" },
  { value: "< 2 dtk", label: "Dashboard merender grafik" },
  { value: "10.000+", label: "Catatan per pengguna" },
  { value: "10", label: "Akun keuangan terpisah" },
];

export type Testimonial = { quote: string; name: string; role: string; avatar: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Akhirnya bisa lihat ke mana uang saya pergi tiap bulan. Grafik kategori-nya bikin saya sadar pengeluaran kopi ternyata besar juga.",
    name: "Rizky Pratama",
    role: "Mahasiswa",
    avatar: "/avatar/boy_03.svg",
  },
  {
    quote:
      "Saya pakai akun terpisah untuk dompet dan tabungan. Rapi, cepat, dan ringan dibuka dari HP. Persis yang saya butuhkan.",
    name: "Anita Salsabila",
    role: "Freelancer",
    avatar: "/avatar/girl_02.svg",
  },
  {
    quote:
      "Form tambah catatannya benar-benar cepat. Tidak ada fitur ribet — fokus mencatat dan memahami keuangan pribadi.",
    name: "Dimas Wicaksono",
    role: "Pekerja Kantoran",
    avatar: "/avatar/boy_06.svg",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Apakah Financial Records gratis?",
    a: "Ya. Financial Records adalah proyek personal yang dapat Anda gunakan untuk mencatat keuangan pribadi tanpa biaya.",
  },
  {
    q: "Apakah saya bisa punya lebih dari satu akun keuangan?",
    a: "Tentu. Anda dapat membuat hingga 10 akun keuangan terpisah, misalnya Dompet, BCA, atau Dana — masing-masing dengan catatannya sendiri.",
  },
  {
    q: "Seberapa aman data keuangan saya?",
    a: "Password Anda di-hash dan setiap data hanya dapat diakses oleh pemiliknya. Seluruh endpoint dilindungi autentikasi.",
  },
  {
    q: "Apakah bisa digunakan di ponsel?",
    a: "Bisa. Antarmuka dirancang mobile-first sehingga form dan tabel tetap nyaman digunakan pada layar mulai 375px.",
  },
];

export const NAV_LINKS = [
  { href: "#features", label: "Fitur" },
  { href: "#how", label: "Cara Kerja" },
  { href: "#guide", label: "Panduan" },
  { href: "#faq", label: "FAQ" },
];
