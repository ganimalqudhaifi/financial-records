import React, { useState, useEffect, useContext } from 'react';
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
import { RootContext } from '../../../context';
import { showModal } from '../../../context/action/demoAction';
import { Text, Table } from '../../atoms';
import { Modal } from '../../molecules';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function FinancialRecordsChart() {
  const action = 'chartModal';
  const { state, dispatch } = useContext(RootContext);
  const { saldoAwal, records } = state;
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  const listPeriod = new Set();
  records.map((record) => {
    const d = new Date(record.tanggal);
    const year = d.getFullYear();
    const month = d.getMonth();
    listPeriod.add(`${year}-${month}`);
  });
  const arrListPeriod = Array.from(listPeriod);

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
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Pencatatan Keuangan',
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },

    });
  }, [saldoAwal, records]);

  return (
    <>
      <Table style="graph-table">
        <caption>Grafik</caption>
        <div onClick={() => dispatch(showModal(action))}>
          <tbody>
            <tr>
              <th>
                <div className="w-[16.4rem]">
                  <Bar options={chartOptions} data={chartData} />
                </div>
              </th>
            </tr>
          </tbody>
        </div>
      </Table>

      <Modal action={action} style="modal-content-graph">
        <Text style="modal-title-graph" title="Grafik" />

        <div className="p-4">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </Modal>

    </>
  );
}
