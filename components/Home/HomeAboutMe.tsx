import { motion } from "framer-motion";

export default function HomeAboutMe() {
  return (
    <section
      id="About"
      className="scroll-mt-32 flex flex-col justify-start items-center min-h-screen md:pb-28 px-6 md:px-12"
    >
      <h2 className="text-5xl font-bold text-center text-main-color">About</h2>

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: "circOut" }}
        className="grid gap-12 max-w-4xl pt-12 tracking-normal text-justify text-gray-200"
      >
        <p>
          Menjaga catatan keuangan yang akurat menjadi kunci penting untuk
          menjaga kesehatan finansial. <b>Financial Records</b> hadir sebagai
          solusi berbasis web yang dirancang untuk membantu Anda dalam mengelola
          arus keuangan dengan lebih bijak. Aplikasi ini bukan hanya sekadar
          alat untuk mencatat pemasukan dan pengeluaran, namun juga sebuah
          langkah strategis untuk mengambil kendali penuh atas keuangan Anda.
        </p>
        <p>
          Dengan <b>Financial Records</b>, Anda dapat memantau setiap transaksi
          secara rinci, meminimalkan stres finansial, dan merencanakan masa
          depan dengan lebih baik. Alat ini membantu Anda meraih impian
          keuangan, apapun tujuannya. Tidak ada kata terlambat untuk memulai
          perjalanan keuangan yang lebih teratur dan cerdas. Mari mulai sekarang
          dan nikmati kebebasan dalam pengelolaan keuangan Anda!
        </p>
      </motion.div>
    </section>
  );
}
