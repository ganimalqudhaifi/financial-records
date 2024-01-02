import { motion } from 'framer-motion';
import { BiSolidCalendarWeek } from 'react-icons/bi';

export default function HomePractice() {
  const practiceLists = [
    {
      id: 1,
      title: 'Pahami Tujuan Keuangan Anda',
      description: 'Pertama-tama, tentukan tujuan keuangan Anda. Apakah Anda ingin menghemat uang untuk liburan, membeli rumah, membayar utang, atau merencanakan masa pensiun? Menentukan tujuan akan membantu Anda merancang anggaran yang sesuai.',
    },
    {
      id: 2,
      title: 'Identifikasi Pendapatan Anda',
      description: 'Catat semua sumber pendapatan Anda, seperti gaji, bonus, pendapatan investasi, atau penghasilan sampingan. Pastikan Anda memiliki gambaran yang jelas tentang berapa banyak uang yang masuk setiap bulan.',
    },
    {
      id: 3,
      title: 'Rincikan Pengeluaran Anda',
      description: 'Buat daftar semua pengeluaran Anda, termasuk biaya rutin seperti sewa/mortgage, tagihan utilitas, transportasi, makanan, hiburan, dan pengeluaran diskresioner lainnya.',
    },
    {
      id: 4,
      title: 'Hitung Selisih Pendapatan dan Pengeluaran',
      description: 'Kurangkan total pengeluaran bulanan dari total pendapatan bulanan Anda. Jika pendapatan Anda lebih besar dari pengeluaran, ini adalah situasi yang baik. Namun, jika pengeluaran melebihi pendapatan, Anda perlu mencari cara untuk mengurangi pengeluaran atau meningkatkan pendapatan.',
    },
    {
      id: 5,
      title: 'Tentukan Kategori Anggaran',
      description: 'Bagi pengeluaran Anda menjadi kategori yang jelas seperti kebutuhan dasar (makanan, tempat tinggal, transportasi), utang, tabungan, dan hiburan. Ini akan membantu Anda melihat dengan lebih baik di mana uang Anda sebenarnya digunakan.',
    },
    {
      id: 6,
      title: 'Atur Prioritas Keuangan',
      description: 'Prioritaskan tujuan keuangan Anda. Bayar dulu kebutuhan dasar dan utang, lalu alokasikan sebagian pendapatan untuk tabungan dan investasi, dan sisakan uang untuk hiburan atau keinginan pribadi.',
    },
    {
      id: 7,
      title: 'Monitor dan Tinjau Anggaran Anda',
      description: 'Lakukan pemantauan secara teratur terhadap anggaran Anda, setidaknya sebulan sekali. Tinjau apakah Anda mengikuti anggaran dan apakah ada perubahan yang perlu Anda lakukan. Aplikasi keuangan dapat membantu memantau secara otomatis.',
    },
    {
      id: 8,
      title: 'Adaptasi dan Koreksi',
      description: 'Terkadang, keadaan keuangan Anda dapat berubah. Jika ada perubahan dalam pendapatan atau pengeluaran, atau jika tujuan Anda berubah, sesuaikan anggaran Anda sesuai kebutuhan. Fleksibilitas adalah kunci untuk kesuksesan anggaran pribadi.',
    },
    {
      id: 9,
      title: 'Disiplin dan Konsistensi',
      description: 'Yang paling penting adalah menjaga disiplin dan konsistensi dalam mengikuti anggaran Anda. Ini memerlukan komitmen dan kesabaran untuk mencapai tujuan keuangan Anda.',
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
      transition: { delay: i * 0.3, ease: 'circOut' },
    }),
    hidden: { opacity: 0, x: 50 },
  };

  return (
    <section id="Practice" className="flex flex-col justify-center items-center px-6 scroll-mt-32 md:px-12">
      <motion.h2 className="text-5xl font-bold text-center text-main-color">Practice</motion.h2>

      <motion.p
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: 'circOut' }}
        className="max-w-4xl py-12 tracking-normal text-justify text-gray-200"
      >
        Melakukan personal budgeting adalah langkah penting dalam mengelola keuangan pribadi Anda dengan baik. Ini membantu Anda mengontrol pengeluaran, mengalokasikan dana dengan bijaksana, dan mencapai tujuan keuangan Anda. Berikut adalah panduan langkah demi langkah untuk melakukan personal budgeting:
      </motion.p>

      <motion.ol
        initial="hidden"
        whileInView="visible"
        variants={list}
        className="relative max-w-4xl border-l border-gray-700"
      >
        {
          practiceLists.map((list, i) => (
            <li className="mb-10 ml-6" key={list.id}>
              <motion.span
                custom={i}
                variants={itemIcon}
                className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-bg-color bg-[#41a353]"
              >
                <BiSolidCalendarWeek className=" text-[#ccecd2]" />
              </motion.span>
              <motion.div
                custom={i}
                variants={itemText}
              >
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-100">{list.title}</h3>
                <p className="text-base font-normal text-gray-400">{list.description}</p>
              </motion.div>
            </li>
          ))
        }
      </motion.ol>
    </section>
  );
}
