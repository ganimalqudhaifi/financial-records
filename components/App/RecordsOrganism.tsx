import { useState } from "react";
import RecordsActionAdd from "./RecordsActionAdd";
import RecordsFilterPeriod from "./RecordsFilterPeriod";
import RecordsPaginantion from "./RecordsPagination";
import RecordsSearch from "./RecordsSearch";
import RecordsSlice from "./RecordsSlice";
import RecordsTable from "./RecordsTable";

export default function RecordsOrganism() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [timeRange, setTimeRange] = useState("");

  const handleSearchKeyword = (query: string) => {
    setSearchKeyword(query.toLowerCase());
  };

  const handleItemsPerPage = (range: number) => {
    setItemsPerPage(range);
  };

  const handleCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleTimeRange = (timeRange: string) => {
    setTimeRange(timeRange);
  };

  return (
    <div className="w-full min-w-fit bg-gray-50/90 p-4 rounded">
      <div className="flex justify-between min-w-max flex-wrap px-0.5 mb-1">
        <div className="space-x-2">
          <span>
            <RecordsActionAdd />
          </span>
          <RecordsSlice handleItemsPerPage={handleItemsPerPage} />
        </div>
        <div className="flex items-stretch">
          <RecordsFilterPeriod handleTimeRange={handleTimeRange} />
          <RecordsSearch handleSearchKeyword={handleSearchKeyword} />
        </div>
      </div>
      <RecordsTable
        timeRange={timeRange}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        searchKeyword={searchKeyword}
      />
      <RecordsPaginantion
        timeRange={timeRange}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        searchKeyword={searchKeyword}
        handleCurrentPage={handleCurrentPage}
      />
    </div>
  );
}
