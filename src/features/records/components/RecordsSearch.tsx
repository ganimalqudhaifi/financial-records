import { IoSearchOutline } from "react-icons/io5";

interface RecordsSearchProps {
  handleSearchKeyword: (query: string) => void;
}

export default function RecordsSearch({
  handleSearchKeyword,
}: RecordsSearchProps) {
  return (
    <div className="relative">
      <input
        className="rounded-r-lg border-y border-r border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 pr-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-full md:w-60 lg:w-80"
        type="text"
        placeholder="Cari keterangan..."
        onChange={(e) => handleSearchKeyword(e.target.value)}
        aria-label="Cari catatan"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <IoSearchOutline className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  );
}
