import { motion } from "framer-motion";
import { BiSolidCalendarWeek } from "react-icons/bi";

export default function HomeBudgetingGuide() {
  const practiceLists = [
    {
      id: 1,
      title: "Pahami Tujuan Keuangan Anda",
      description:
        "Mulailah dengan menentukan tujuan keuangan Anda. Apakah Anda menabung untuk liburan, membeli rumah, membayar utang, atau merencanakan masa pensiun? Menetapkan tujuan ini akan membantu Anda merancang anggaran yang lebih sesuai dengan kebutuhan Anda.",
    },
    {
      id: 2,
      title: "Identifikasi Sumber Pendapatan",
      description:
        "Pastikan Anda mencatat semua sumber pendapatan Anda, termasuk gaji, bonus, pendapatan dari investasi, atau penghasilan sampingan. Dengan begitu, Anda akan memiliki gambaran yang jelas tentang aliran pendapatan bulanan Anda.",
    },
    {
      id: 3,
      title: "Rincikan Pengeluaran Anda",
      description:
        "Buat daftar semua pengeluaran, mulai dari kebutuhan dasar seperti sewa, tagihan, hingga pengeluaran untuk hiburan. Memiliki rincian ini penting untuk mengetahui kemana uang Anda sebenarnya pergi setiap bulan.",
    },
    {
      id: 4,
      title: "Hitung Selisih Pendapatan dan Pengeluaran",
      description:
        "Kurangkan total pengeluaran dari total pendapatan Anda. Jika Anda masih memiliki surplus, itu kabar baik! Namun, jika pengeluaran Anda lebih besar dari pendapatan, ini saatnya untuk meninjau kembali anggaran Anda.",
    },
    {
      id: 5,
      title: "Kelompokkan Pengeluaran Berdasarkan Kategori",
      description:
        "Pisahkan pengeluaran Anda ke dalam beberapa kategori seperti kebutuhan dasar, utang, tabungan, dan hiburan. Dengan demikian, Anda dapat lebih mudah melihat area yang membutuhkan penyesuaian.",
    },
    {
      id: 6,
      title: "Prioritaskan Pengeluaran",
      description:
        "Susun prioritas berdasarkan kebutuhan penting seperti tempat tinggal, utang, dan tabungan. Setelah itu, Anda bisa mengalokasikan dana untuk hiburan atau keinginan lainnya.",
    },
    {
      id: 7,
      title: "Pantau dan Tinjau Secara Berkala",
      description:
        "Tinjau anggaran Anda secara rutin, setidaknya setiap bulan. Pastikan Anda tetap berada di jalur yang tepat dan buat penyesuaian jika diperlukan. Aplikasi Financial Records dapat membantu memantau anggaran Anda secara otomatis.",
    },
    {
      id: 8,
      title: "Sesuaikan Dengan Perubahan",
      description:
        "Ketika pendapatan atau pengeluaran berubah, jangan ragu untuk menyesuaikan anggaran Anda. Fleksibilitas adalah kunci untuk memastikan rencana keuangan Anda selalu relevan dengan situasi terkini.",
    },
    {
      id: 9,
      title: "Disiplin dan Konsistensi",
      description:
        "Disiplin dan konsistensi adalah fondasi dalam pengelolaan keuangan yang sukses. Komitmen dalam mengikuti rencana keuangan akan membantu Anda mencapai tujuan jangka panjang.",
    },
  ];

  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const itemIcon = {
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.3 },
    }),
    hidden: { opacity: 0 },
  };

  const itemText = {
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, ease: "circOut" },
    }),
    hidden: { opacity: 0, x: 50 },
  };

  return (
    <section
      id="Practice"
      className="flex flex-col justify-center items-center px-6 scroll-mt-32 md:px-12"
    >
      <motion.h2 className="text-5xl font-bold text-center text-main-color">
        Budgeting Guide
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: "circOut" }}
        className="max-w-4xl py-12 tracking-normal text-justify text-gray-200"
      >
        Mengelola keuangan pribadi dengan bijak adalah kunci untuk mencapai
        kestabilan finansial dan mewujudkan impian Anda. Personal budgeting
        bukan hanya tentang membatasi pengeluaran, tetapi juga tentang
        merencanakan masa depan, memprioritaskan kebutuhan, dan memastikan
        setiap rupiah yang Anda miliki bekerja untuk mencapai tujuan finansial
        Anda. Dengan panduan langkah demi langkah ini, Anda dapat mulai
        mengendalikan keuangan secara lebih terorganisir dan efektif:
      </motion.p>

      <motion.ol
        initial="hidden"
        whileInView="visible"
        variants={list}
        className="relative max-w-4xl border-l border-gray-700"
      >
        {practiceLists.map((list, i) => (
          <li className="mb-10 ml-6" key={list.id}>
            <motion.span
              custom={i}
              variants={itemIcon}
              className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-bg-color bg-[#41a353]"
            >
              <BiSolidCalendarWeek className=" text-[#ccecd2]" />
            </motion.span>
            <motion.div custom={i} variants={itemText}>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-100">
                {list.title}
              </h3>
              <p className="text-base font-normal text-gray-400">
                {list.description}
              </p>
            </motion.div>
          </li>
        ))}
      </motion.ol>
    </section>
  );
}
