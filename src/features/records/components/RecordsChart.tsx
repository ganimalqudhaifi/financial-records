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
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectAccounts } from "@/features/account/account.selector";
import { selectRecords } from "@/features/records/records.selector";
import Modal from "../../../shared/components/Modal";

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
  const chartRef = useRef<HTMLDivElement>(null);
  // Track reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const valueDate = (date: string | Date) => {
    const target = new Date(date);
    return `${target.getFullYear()}-${target.getMonth()}`;
  };

  useEffect(() => {
    if (records.length > 0) {
      const sortedRecords = [...records].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      const arrListPeriod = sortedRecords.reduce<string[]>((acc, record) => {
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
        sortedRecords
          .filter((record) => valueDate(record.date) === filterPeriod)
          .filter((record) => record.accountId === selectedAccount.id)
          .reduce((a, b) => a + (b.categoryId < 200 ? b.value : 0), 0),
      );

      const pengeluaran = arrListPeriod.map((filterPeriod) =>
        sortedRecords
          .filter((record) => valueDate(record.date) === filterPeriod)
          .filter((record) => record.accountId === selectedAccount.id)
          .reduce((a, b) => a + (b.categoryId > 200 ? b.value : 0), 0),
      );

      // Theme-aware colors
      const isDark =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");

      const incomeColor = isDark ? "#22C55E" : "#16A34A";
      const incomeBg = isDark ? "rgba(34,197,94,0.2)" : "rgba(22,163,74,0.15)";
      const expenseColor = isDark ? "#EF4444" : "#DC2626";
      const expenseBg = isDark ? "rgba(239,68,68,0.2)" : "rgba(220,38,38,0.15)";
      const textColor = isDark ? "#94A3B8" : "#475569";

      setChartData({
        labels: arrListPeriod.map((p) => {
          const [y, m] = p.split("-");
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Ags",
            "Sep",
            "Okt",
            "Nov",
            "Des",
          ];
          return `${months[parseInt(m)]} ${y}`;
        }),
        datasets: [
          {
            label: "Pemasukan",
            data: pemasukan,
            borderColor: incomeColor,
            backgroundColor: incomeBg,
            borderWidth: 2,
            borderRadius: 4,
          },
          {
            label: "Pengeluaran",
            data: pengeluaran,
            borderColor: expenseColor,
            backgroundColor: expenseBg,
            borderWidth: 2,
            borderRadius: 4,
          },
        ],
      });

      setChartOptions({
        responsive: true,
        maintainAspectRatio: false,
        animation: prefersReducedMotion
          ? false
          : { duration: 800, easing: "easeOutQuart" },
        plugins: {
          legend: {
            display: true,
            position: "top" as const,
            labels: {
              color: textColor,
              usePointStyle: true,
              padding: 16,
              font: { family: "'IBM Plex Sans', system-ui, sans-serif" },
            },
          },
          title: {
            display: true,
            text: "Financial Flow Chart",
            color: textColor,
            font: {
              family: "'IBM Plex Sans', system-ui, sans-serif",
              size: 16,
              weight: "600",
            },
            padding: { bottom: 16 },
          },
          tooltip: {
            callbacks: {
              label: function (context: {
                parsed: { y: number };
                dataset: { label: string };
              }) {
                return `${context.dataset.label}: Rp ${context.parsed.y.toLocaleString("id-ID")}`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: false,
            grid: { display: false },
            ticks: { color: textColor },
          },
          y: {
            stacked: false,
            grid: {
              color: isDark ? "rgba(148,163,184,0.1)" : "rgba(71,85,105,0.1)",
            },
            ticks: {
              color: textColor,
              callback: function (value: number | string) {
                return "Rp " + Number(value).toLocaleString("id-ID");
              },
            },
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records, selectedAccount]);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-shadow duration-200">
      <div
        ref={chartRef}
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsModalOpen(true);
          }
        }}
        aria-label="Perbesar grafik arus kas"
      >
        <Bar options={chartOptions} data={chartData} />
      </div>

      {/* Screen reader accessible data summary */}
      <div className="sr-only" role="table" aria-label="Data grafik arus kas">
        <p>Grafik perbandingan pemasukan dan pengeluaran per periode.</p>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} className="max-w-4xl">
          <div className="w-full p-2">
            <Bar options={chartOptions} data={chartData} />
          </div>
        </Modal>
      )}
    </div>
  );
}
