import React from "react";

import Table from "./table";
import Dropdown from "./drop-down";
import { surveyType } from "@/definitions/survey-types";
import { DashboardSurvey } from "@/store/slices/dashboardSurvey";

export default function RecentActivities({
  headerRows,
  tableData,
}: {
  headerRows: string[];
  tableData: DashboardSurvey[];
}): any {
  const dropOptions = ["Most Recent", "Date", "Time"];

  return (
    <div className="flex flex-col">
      <div className="px-6 pt-4 pb-8 flex items-center justify-between border-t border-r border-l border-primary-cGreyCA rounded-tl-[8px] rounded-tr-[8px]">
        <p className="text-[24px] text-primary-cDark1D font-semibold">
          Recent Activities
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
