import { useState } from "react";
import RecordsActionAdd from "./RecordsActionAdd";
import RecordsChart from "./RecordsChart";
import RecordsFilterPeriod from "./RecordsFilterPeriod";
import RecordsInformation from "./RecordsInformation";
import RecordsPagination from "./RecordsPagination";
import RecordsSearch from "./RecordsSearch";
import RecordsSlice from "./RecordsSlice";
import RecordsTable from "./RecordsTable";

export default function RecordsView() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [timeRange, setTimeRange] = useState("");

  const handleSearchKeyword = (query: string) => {
    setSearchKeyword(query.toLowerCase());
    setCurrentPage(1);
  };

  const handleItemsPerPage = (range: number) => {
    setItemsPerPage(range);
    setCurrentPage(1);
  };

  const handleCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleTimeRange = (timeRange: string) => {
    setTimeRange(timeRange);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <RecordsInformation />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex items-center gap-2">
          <RecordsActionAdd />
          <RecordsSlice handleItemsPerPage={handleItemsPerPage} />
        </div>
        <div className="flex items-stretch">
          <RecordsFilterPeriod handleTimeRange={handleTimeRange} />
          <RecordsSearch handleSearchKeyword={handleSearchKeyword} />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <RecordsTable
            timeRange={timeRange}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            searchKeyword={searchKeyword}
          />
        </div>
      </div>

      {/* Pagination */}
      <RecordsPagination
        timeRange={timeRange}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        searchKeyword={searchKeyword}
        handleCurrentPage={handleCurrentPage}
      />

      {/* Chart */}
      <RecordsChart />
    </div>
  );
}
