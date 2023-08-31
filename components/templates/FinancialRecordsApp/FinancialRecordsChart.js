import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useGlobalContext } from '../../../context';
import { Modal } from '../../molecules';
import { modal } from '../../../utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function FinancialRecordsChart() {
  const { state } = useGlobalContext();
  const { saldoAwal, records } = state;

  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  const uniqueId = 'chartModal';

  records.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  const arrListPeriod = records.reduce((acc, record) => {
    const d = new Date(record.tanggal);
    const year = d.getFullYear();
    const month = d.getMonth();
    const period = `${year}-${month}`;

    if (!acc.includes(period)) {
      acc.push(period);
    }
    return acc;
  }, []);

  const valueDate = (date) => {
    const target = new Date(date);
    return `${target.getFullYear()}-${target.getMonth()}`;
  };

  useEffect(() => {
    const penerimaan = arrListPeriod.map((filterPeriod) => records
      .filter((record) => valueDate(record.tanggal) === filterPeriod)
      .reduce((a, b) => a + (b.jenis === 'Penerimaan' ? b.value : 0), 0));

    const pengeluaran = arrListPeriod.map((filterPeriod) => records
      .filter((record) => valueDate(record.tanggal) === filterPeriod)
      .reduce((a, b) => a + (b.jenis === 'Pengeluaran' ? b.value : 0), 0));

    setChartData({
      labels: arrListPeriod,
      datasets: [
        {
          label: 'Penerimaan Rp',
          data: penerimaan,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1,
        },
        {
          label: 'Pengeluaran Rp',
          data: pengeluaran,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Financial Records',
        },
      },
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },

    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saldoAwal, records]);

  return (
    <div className="flex items-start justify-center mt-5 p-5 w-full bg-white rounded">
      <div onClick={() => modal.show(uniqueId)} className="p-5 w-full cursor-pointer border border-slate-200 shadow-slate-700/10 shadow-lg rounded">
        <div className="p-4">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>

      <Modal id={uniqueId} style="modal-content-graph">
        <div className="p-4">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </Modal>

    </div>
  );
}
