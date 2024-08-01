import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectRecords } from "@/lib/redux/features/records/recordsSlice";

// import { useGlobalContext } from "../../hooks/useGlobalContext";

interface RecordsPaginantionProps {
  handleCurrentPage: (pageNumber: number) => void;
  searchKeyword: string;
  itemsPerPage: number;
  currentPage: number;
  timeRange: string;
}

export default function RecordsPaginantion({
  handleCurrentPage,
  searchKeyword,
  itemsPerPage,
  currentPage,
  timeRange,
}: RecordsPaginantionProps) {
  const { records } = useSelector(selectRecords);

  // const { state, handleCurrentPage } = useGlobalContext();
  // const {
  // searchKeyword,
  // itemsPerPage,
  // currentPage,
  // timeRange,
  // } = state;

  const [arrPagination, setArrPagination] = useState<number[]>([]);

  const valueDate = (date: Date | string) => {
    const target = new Date(date);
    return `${target.getFullYear()}-${target.getMonth()}`;
  };

  useEffect(() => {
    const filteredRecords = records.filter(
      (record) =>
        record.description.toLowerCase().includes(searchKeyword) &&
        valueDate(record.date).includes(timeRange),
    );

    const totalPages = Math.ceil(
      records.length && filteredRecords.length / itemsPerPage,
    );

    const newArrPagination = [];
    for (let i = 1; i < totalPages + 1; i++) {
      newArrPagination.push(i);
    }
    setArrPagination(newArrPagination);
  }, [records, searchKeyword, itemsPerPage, timeRange]);

  const entires =
    records.length &&
    records.filter((record) =>
      record.description.toLowerCase().includes(searchKeyword),
    ).length;

  const displayRangeStart = arrPagination.length
    ? itemsPerPage * (currentPage - 1) + 1
    : 0;

  const displayRangeEnd =
    itemsPerPage * currentPage > entires ? entires : itemsPerPage * currentPage;

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

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">{`Menampilkan ${displayRangeStart} sampai ${displayRangeEnd} dari ${entires} data`}</p>
      <div className="float-right text-slate-700">
        <button
          className="py-2 px-3 text-2xl hover:text-slate-900 hover:scale-125 active:scale-100 transition duration-150"
          onClick={handlePrevPage}
        >
          &laquo;
        </button>
        {arrPagination.map((btnpagination) =>
          shouldHideButton(btnpagination) ? (
            <button
              id={`pgnt${btnpagination}`}
              key={btnpagination}
              onClick={() => handleCurrentPage(btnpagination)}
              className="hidden py-2 px-3"
            >
              {btnpagination}
            </button>
          ) : (
            <button
              id={`pgnt${btnpagination}`}
              key={btnpagination}
              onClick={() => handleCurrentPage(btnpagination)}
              className={
                btnpagination === currentPage
                  ? "text-sm py-1.5 px-3 bg-slate-700 text-slate-100 mx-1 hover:scale-110 active:scale-100 transition duration-300 rounded"
                  : "text-sm py-1.5 px-3 mx-1 hover:scale-110 active:scale-100 transition duration-300 rounded"
              }
            >
              {btnpagination}
            </button>
          ),
        )}
        <button
          className="py-2 px-3 text-2xl hover:text-slate-900 hover:scale-125 active:scale-100 transition duration-150"
          onClick={handleNextPage}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}
