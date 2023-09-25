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

  return (
    <section id="Practice" className="flex flex-col justify-center items-center px-6 md:px-12 scroll-mt-32">
      <h2 className="text-5xl font-bold text-center text-main-color">Practice</h2>
      <p className="max-w-4xl py-12 tracking-normal text-justify text-gray-200">Melakukan personal budgeting adalah langkah penting dalam mengelola keuangan pribadi Anda dengan baik. Ini membantu Anda mengontrol pengeluaran, mengalokasikan dana dengan bijaksana, dan mencapai tujuan keuangan Anda. Berikut adalah panduan langkah demi langkah untuk melakukan personal budgeting:</p>
      <ol className="relative max-w-4xl border-l border-gray-700">
        {
          practiceLists.map((list) => (
            <li className="mb-10 ml-6" key={list.id}>
              <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-bg-color bg-[#41a353]">
                <svg className="w-2.5 h-2.5  text-[#ccecd2]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-100">{list.title}</h3>
              <p className="text-base font-normal text-gray-400">{list.description}</p>
            </li>
          ))
        }
      </ol>
    </section>
  );
}
