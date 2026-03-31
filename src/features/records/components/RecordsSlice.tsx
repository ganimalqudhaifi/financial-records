interface RecordsSliceProps {
  handleItemsPerPage: (range: number) => void;
}

export default function RecordsSlice({
  handleItemsPerPage,
}: RecordsSliceProps) {
  return (
    <select
      className="py-1.5 md:py-2 px-1.5 md:px-2 lg:px-3 border border-slate-300 bg-slate-50 focus:outline-1 focus:outline-slate-800 rounded"
      onChange={(e) => handleItemsPerPage(parseInt(e.target.value, 10))}
    >
      <option>10</option>
      <option>20</option>
    </select>
  );
}
