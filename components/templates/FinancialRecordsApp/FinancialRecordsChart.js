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
import { Text, Table, Wrapper } from '../../atoms';
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

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const penerimaan = records.filter((record) => record.jenis === 'Penerimaan').reduce((previousValue, currentValue) => previousValue + currentValue.jumlah, 0);
    const pengeluaran = records.filter((record) => record.jenis === 'Pengeluaran').reduce((previousValue, currentValue) => previousValue + currentValue.jumlah, 0);
    setChartData({
      labels: ['Saldo Awal', 'Penerimaan', 'Pengeluaran', 'Saldo Akhir'],
      datasets: [
        {
          label: 'Rp',
          data: [saldoAwal, penerimaan, pengeluaran, (saldoAwal + penerimaan - pengeluaran), Math.max(saldoAwal, penerimaan, pengeluaran, (saldoAwal + penerimaan - pengeluaran)) * 1.2],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: ['rgba(71, 85, 105, .9)', 'rgba(51, 65, 85, .9)', 'rgba(30, 41, 59, .9)', 'rgba(15, 23, 42, .9)'],
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
    });
  }, [saldoAwal, records]);

  return (
    <>
      <Table style="graph-table">
        <caption>Grafik</caption>
        <tbody onClick={() => dispatch(showModal(action))}>
          <tr>
            <th>
              <Wrapper style="graph-bar">
                <Bar options={chartOptions} data={chartData} />
              </Wrapper>
            </th>
          </tr>
        </tbody>
      </Table>

      <Modal action={action} style="modal-content-graph">
        <Text style="modal-title-graph" title="Grafik" />

        <Wrapper style="graph-bar-modal">
          <Bar options={chartOptions} data={chartData} />
        </Wrapper>
      </Modal>

    </>
  );
}
