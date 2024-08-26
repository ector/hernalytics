import React from "react";

import Table from "./table";
import Dropdown from "./drop-down";

interface tableData {
  survey: React.ReactNode;
  status: React.ReactNode;
  date: string;
  time: string;
}

export default function SurveysTable({
  headerRows,
  tableData,
}: {
  headerRows: string[];
  tableData: tableData[];
}): React.ReactNode {
  const dropOptions = ["Most Recent", "Date", "Time"];

  return (
    <div className="flex flex-col">
      <div className="px-6 pt-4 pb-8 flex items-center justify-between border-t border-r border-l border-primary-cGreyCA rounded-tl-[8px] rounded-tr-[8px]">
        <p className="text-[24px] text-primary-cDark1D font-semibold">
          Surveys ({tableData?.length})
        </p>
        <div className="flex items-center">
          <p className="text-[16px] text-primary-cGrey7B">Sort By:</p>
          <Dropdown options={dropOptions} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table headerRows={headerRows} tableData={tableData} />
      </div>
    </div>
  );
}
