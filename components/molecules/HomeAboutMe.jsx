import { motion } from 'framer-motion';

export default function HomeAboutMe() {
  return (
    <section
      id="About"
      className="scroll-mt-32 flex flex-col justify-start items-center min-h-screen md:pb-28 px-6 md:px-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-5xl font-bold text-center text-main-color"
      >
        About
      </motion.h2>

      <div className="grid gap-12 max-w-4xl pt-12 tracking-normal text-justify text-gray-200">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Pada era modern ini, menjaga rekaman keuangan yang akurat telah menjadi hal yang sangat penting dalam menjalani kehidupan pribadi yang sehat secara finansial. Financial records, baik itu dalam bentuk catatan manual atau menggunakan aplikasi keuangan digital, adalah alat yang memainkan peran utama dalam membantu individu mengelola uang mereka dengan bijak dan mencapai tujuan keuangan mereka.
          {' '}

        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Financial records adalah sebuah aplikasi berbasis web yang dapat membantu anda dalam mengelola pencatatan keuangan. Dengan menggunakan financial records Anda bukan hanya tentang mencatat uang masuk dan keluar, tetapi juga tentang mengambil kendali atas keuangan Anda, mengurangi stres keuangan, dan memastikan bahwa Anda dapat meraih impian keuangan Anda dengan lebih baik. Jika Anda belum memulainya, sekarang mungkin saat yang tepat untuk mulai.

        </motion.p>
      </div>
    </section>
  );
}
