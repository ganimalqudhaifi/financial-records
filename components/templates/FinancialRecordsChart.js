import React, { useState, useEffect, useContext } from "react";
import { Context } from './FinancialRecords';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FinancialRecordsChart() {
  const action = "chartModal"
  const {state,showModal,hideModal,closeModal} = useContext(Context)
  const {saldoAwal,records} = state
  
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  
  const [chartOptions, setChartOptions] = useState({});
  
  useEffect(() => {
    const penerimaan = records.filter(record => record.jenis === "Penerimaan").reduce((previousValue, currentValue) => previousValue + currentValue.jumlah,0);
    const pengeluaran = records.filter(record => record.jenis === "Pengeluaran").reduce((previousValue, currentValue) => previousValue + currentValue.jumlah,0);
    setChartData({
      labels: ['Saldo Awal', 'Penerimaan','Pengeluaran', 'Saldo Akhir',],
      datasets: [
        {
          label: "Rp",
          data: [saldoAwal, penerimaan, pengeluaran, (saldoAwal+penerimaan-pengeluaran), Math.max(saldoAwal, penerimaan, pengeluaran, (saldoAwal+penerimaan-pengeluaran))*1.2],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: ["rgba(71, 85, 105, .9)","rgba(51, 65, 85, .9)","rgba(30, 41, 59, .9)","rgba(15, 23, 42, .9)"],
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
          text: "Pencatatan Keuangan",
        },
      },
    });
  }, [saldoAwal,records]);

  return (
    <>
      <table className="mx-auto">
        <caption className="font-bold mt-0 lg:mt-6 mb-1">Grafik</caption>
        <tbody className="cursor-pointer border border-slate-200 shadow-slate-700/10 shadow-lg" onClick={() => showModal(action)}>
          <tr>
            <th>
              <div className="w-[16.4rem]">
              <Bar options={chartOptions} data={chartData} />

              </div>
            </th>
          </tr>
        </tbody>
      </table>

      <div id={action} className="modal" onClick={(e) => closeModal(e,action)}>
        <div className="modal-content box-border text-center mt-[23%] md:mt-[15%] lg:mt-[1.1%] w-9/12">
          <span className="close" onClick={() => hideModal(action)}>&times;</span>

          <h2 className="text-xl md:text-2xl lg:text-3xl pt-6 pb-2 font-semibold">Grafik</h2>
          
          <div className="p-4">
            <Bar options={chartOptions} data={chartData} />
          </div>
          </div>
      </div>
    </>

    
  );
}