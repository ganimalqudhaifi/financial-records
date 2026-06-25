interface RecordsSliceProps {
  handleItemsPerPage: (range: number) => void;
}

export default function RecordsSlice({
  handleItemsPerPage,
}: RecordsSliceProps) {
  return (
    <select
      className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
      onChange={(e) => handleItemsPerPage(parseInt(e.target.value, 10))}
      aria-label="Jumlah item per halaman"
    >
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  );
}
