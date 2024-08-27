import React, { useState, useMemo } from "react";
import Table from "./table";
import Dropdown from "./drop-down";
import { DashboardSurvey } from "@/store/slices/dashboardSurvey";

export default function RecentActivities({
  headerRows,
  tableData,
}: {
  headerRows: string[];
  tableData: DashboardSurvey[];
}) {
  const [sortOption, setSortOption] = useState<string>("Most Recent");
  
  const dropOptions = ["Most Recent", "Date", "Time"];
  
  const sortedData = useMemo(() => {
    switch (sortOption) {
      case "Date":
        return [...tableData].sort((a, b) => new Date(b.completion_date).getTime() - new Date(a.completion_date).getTime());
      case "Time":
        return [...tableData].sort((a, b) => {
          const timeA = new Date(a.completion_date + 'T' + a.completion_time).getTime();
          const timeB = new Date(b.completion_date + 'T' + b.completion_time).getTime();
          return timeB - timeA;
        });
      default:
        return tableData;
    }
  }, [tableData, sortOption]);
  
  return (
    <div className="flex flex-col">
      <div className="px-6 pt-4 pb-8 flex items-center justify-between border-t border-r border-l border-primary-cGreyCA rounded-tl-[8px] rounded-tr-[8px]">
        <p className="text-[24px] text-primary-cDark1D font-semibold">
          Recent Activities
        </p>
        <div className="flex items-center">
          <p className="text-[16px] text-primary-cGrey7B">Sort By:</p>
          <Dropdown options={dropOptions} onChange={(value) => setSortOption(value)} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table headerRows={headerRows} tableData={sortedData} />
      </div>
    </div>
  );
}
