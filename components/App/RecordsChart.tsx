import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectAccounts } from "@/lib/redux/features/accounts/accountsSlice";
import { selectRecords } from "@/lib/redux/features/records/recordsSlice";
import Modal from "../Modal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function RecordsChart() {
  const { selectedAccount } = useSelector(selectAccounts);
  const { records } = useSelector(selectRecords);

  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const valueDate = (date: string | Date) => {
    const target = new Date(date);
    return `${target.getFullYear()}-${target.getMonth()}`;
  };

  useEffect(() => {
    if (records.length) {
      records.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      const arrListPeriod = records.reduce<string[]>((acc, record) => {
        const d = new Date(record.date);
        const year = d.getFullYear();
        const month = d.getMonth();
        const period = `${year}-${month}`;

        if (!acc.includes(period)) {
          acc.push(period);
        }
        return acc;
      }, []);

      const pemasukan = arrListPeriod.map((filterPeriod) =>
        records
          .filter((record) => valueDate(record.date) === filterPeriod)
          .filter((record) => record.accountId === selectedAccount.id)
          .reduce((a, b) => a + (b.categoryId < 200 ? b.value : 0), 0),
      );

      const pengeluaran = arrListPeriod.map((filterPeriod) =>
        records
          .filter((record) => valueDate(record.date) === filterPeriod)
          .filter((record) => record.accountId === selectedAccount.id)
          .reduce((a, b) => a + (b.categoryId > 200 ? b.value : 0), 0),
      );

      setChartData({
        labels: arrListPeriod,
        datasets: [
          {
            label: "Pemasukan Rp",
            data: pemasukan,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
          },
          {
            label: "Pengeluaran Rp",
            data: pengeluaran,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 1,
          },
        ],
      });
    }

    setChartOptions({
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Financial Flow Chart",
        },
      },
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records, selectedAccount]);

  return (
    <div className="flex items-start justify-center mt-5 p-5 w-full bg-white rounded">
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-5 w-full cursor-pointer border border-slate-200 shadow-slate-700/10 shadow-lg rounded"
      >
        <div className="p-4">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="w-screen max-w-4xl p-4">
            <Bar options={chartOptions} data={chartData} />
          </div>
        </Modal>
      )}
    </div>
  );
}
