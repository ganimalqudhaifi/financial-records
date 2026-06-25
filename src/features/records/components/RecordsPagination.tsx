import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccounts } from "@/features/account/account.selector";
import { selectRecords } from "@/features/records/records.selector";
import { generatePeriodYM } from "@/shared/utils/templateDate";

interface RecordsPaginationProps {
  handleCurrentPage: (pageNumber: number) => void;
  searchKeyword: string;
  itemsPerPage: number;
  currentPage: number;
  timeRange: string;
}

export default function RecordsPagination({
  handleCurrentPage,
  searchKeyword,
  itemsPerPage,
  currentPage,
  timeRange,
}: RecordsPaginationProps) {
  const { records } = useSelector(selectRecords);
  const { selectedAccount } = useSelector(selectAccounts);

  const [arrPagination, setArrPagination] = useState<number[]>([]);

  useEffect(() => {
    const filteredRecords = records.filter(
      (record) =>
        record.accountId === selectedAccount.id &&
        record.description.toLowerCase().includes(searchKeyword) &&
        generatePeriodYM(record.date).includes(timeRange),
    );

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

    const newArrPagination = [];
    for (let i = 1; i < totalPages + 1; i++) {
      newArrPagination.push(i);
    }
    setArrPagination(newArrPagination);
  }, [records, searchKeyword, itemsPerPage, timeRange, selectedAccount.id]);

  const entries =
    (records.length &&
    records.filter(
      (record) =>
        record.accountId === selectedAccount.id &&
        record.description.toLowerCase().includes(searchKeyword),
    ).length) || 0;

  const displayRangeStart = arrPagination.length
    ? itemsPerPage * (currentPage - 1) + 1
    : 0;

  const displayRangeEnd =
    itemsPerPage * currentPage > entries ? entries : itemsPerPage * currentPage;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handleCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < arrPagination.length) {
      handleCurrentPage(currentPage + 1);
    }
  };

  const shouldHideButton = (btnpagination: number) => {
    return (
      (btnpagination > 5 && currentPage <= 3) ||
      (currentPage > 3 &&
        currentPage <= arrPagination.length - 2 &&
        (btnpagination > currentPage + 2 || btnpagination < currentPage - 2)) ||
      (btnpagination < arrPagination.length - 4 &&
        currentPage + 2 >= arrPagination.length)
    );
  };

  if (arrPagination.length <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
      <p className="text-slate-500 dark:text-slate-400">
        Menampilkan {displayRangeStart} sampai {displayRangeEnd} dari{" "}
        {entries} data
      </p>
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
            currentPage === 1
              ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          aria-label="Halaman sebelumnya"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Page numbers */}
        {arrPagination.map((btnpagination) =>
          shouldHideButton(btnpagination) ? (
            <button
              id={`pgnt${btnpagination}`}
              key={btnpagination}
              onClick={() => handleCurrentPage(btnpagination)}
              className="hidden px-3 py-1.5 text-sm rounded-lg"
            >
              {btnpagination}
            </button>
          ) : (
            <button
              id={`pgnt${btnpagination}`}
              key={btnpagination}
              onClick={() => handleCurrentPage(btnpagination)}
              className={`inline-flex items-center justify-center min-w-[36px] h-9 px-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                btnpagination === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              aria-current={btnpagination === currentPage ? "page" : undefined}
              aria-label={`Halaman ${btnpagination}`}
            >
              {btnpagination}
            </button>
          ),
        )}

        {/* Next */}
        <button
          className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
            currentPage === arrPagination.length
              ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === arrPagination.length}
          aria-label="Halaman selanjutnya"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
