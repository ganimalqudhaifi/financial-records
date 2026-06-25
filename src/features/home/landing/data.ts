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

export const FEATURES: Feature[] = [
  {
    icon: BiSolidBank,
    title: "Pisahkan setiap akun",
    desc: "Atur dompet, tabungan, atau kartu kredit ke dalam akun terpisah agar saldo dan catatannya tidak tercampur.",
  },
  {
    icon: BiWallet,
    title: "Tambah transaksi lebih cepat",
    desc: "Form yang ringkas membantu Anda mencatat pemasukan atau pengeluaran tanpa harus berhenti lama dari aktivitas harian.",
  },
  {
    icon: BiSolidPieChartAlt2,
    title: "Lihat ringkasan yang jelas",
    desc: "Pantau pemasukan, pengeluaran, dan saldo bersih bulan ini dalam kartu ringkas yang mudah dibaca.",
  },
  {
    icon: BiLineChart,
    title: "Baca tren bulanan",
    desc: "Bandingkan arus kas 12 bulan terakhir untuk melihat apakah kebiasaan belanja Anda sedang membaik atau memburuk.",
  },
  {
    icon: BiCategory,
    title: "Kategori yang fleksibel",
    desc: "Gunakan kategori bawaan atau buat kategori kustom agar pengeluaran Anda selalu relevan dengan kebutuhan pribadi.",
  },
  {
    icon: BiSearchAlt,
    title: "Cari dan filter cepat",
    desc: "Saring catatan berdasarkan tanggal, tipe, dan kategori, lalu cari keterangan yang Anda butuhkan dalam hitungan detik.",
  },
  {
    icon: BiLockAlt,
    title: "Privasi tetap terjaga",
    desc: "Data hanya dapat diakses oleh pemilik akun, dengan autentikasi yang melindungi seluruh catatan keuangan Anda.",
  },
  {
    icon: BiMobileAlt,
    title: "Nyaman di layar kecil",
    desc: "Layout mobile-first menjaga form, kartu ringkasan, dan daftar catatan tetap mudah dipakai di ponsel.",
  },
];

export type Step = { num: string; title: string; desc: string };

export const STEPS: Step[] = [
  {
    num: "01",
    title: "Buat akun keuangan",
    desc: "Mulai dari satu atau beberapa akun terpisah agar setiap sumber dana punya ruang pencatatan sendiri.",
  },
  {
    num: "02",
    title: "Catat transaksi harian",
    desc: "Tambahkan jumlah, tipe, kategori, tanggal, dan keterangan singkat untuk setiap pemasukan atau pengeluaran.",
  },
  {
    num: "03",
    title: "Tinjau dashboard",
    desc: "Buka ringkasan dan grafik untuk melihat saldo, pola pengeluaran, dan performa setiap akun.",
  },
  {
    num: "04",
    title: "Sesuaikan kebiasaan",
    desc: "Gunakan data yang sudah terkumpul untuk memangkas pengeluaran yang tidak perlu dan menjaga target keuangan.",
  },
];

export type Stat = { value: string; label: string };

export const STATS: Stat[] = [
  { value: "< 30 dtk", label: "Menambahkan satu catatan" },
  { value: "< 2 dtk", label: "Dashboard memuat grafik" },
  { value: "10", label: "Akun keuangan terpisah" },
  { value: "10.000+", label: "Catatan yang tetap responsif" },
];

export type Testimonial = { quote: string; name: string; role: string; avatar: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Saya jadi tahu pola pengeluaran bulanan dengan cepat. Ringkasan kategori-nya sangat membantu buat menahan belanja impulsif.",
    name: "Rizky Pratama",
    role: "Mahasiswa",
    avatar: "/avatar/boy_03.svg",
  },
  {
    quote:
      "Saya pisahkan akun dompet dan tabungan, jadi lebih mudah melihat saldo mana yang bisa dipakai dan mana yang harus aman.",
    name: "Anita Salsabila",
    role: "Freelancer",
    avatar: "/avatar/girl_02.svg",
  },
  {
    quote:
      "Tambah transaksi di HP terasa cepat. Saya bisa mencatat pengeluaran saat itu juga tanpa form yang bertele-tele.",
    name: "Dimas Wicaksono",
    role: "Karyawan",
    avatar: "/avatar/boy_06.svg",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Apakah Financial Records gratis?",
    a: "Ya. Aplikasi ini bisa dipakai untuk pencatatan keuangan pribadi tanpa biaya.",
  },
  {
    q: "Bisakah saya punya lebih dari satu akun?",
    a: "Bisa. Anda dapat memisahkan dompet, tabungan, kartu kredit, atau akun lain sesuai kebutuhan.",
  },
  {
    q: "Seberapa aman data saya?",
    a: "Password di-hash dan data hanya bisa diakses oleh pemilik akun yang sah.",
  },
  {
    q: "Apakah nyaman dipakai di ponsel?",
    a: "Ya. Seluruh layout dibuat mobile-first agar form, tabel, dan ringkasan tetap nyaman di layar kecil.",
  },
];

export const NAV_LINKS = [
  { href: "#features", label: "Fitur" },
  { href: "#how", label: "Cara Kerja" },
  { href: "#guide", label: "Panduan" },
  { href: "#faq", label: "FAQ" },
];
