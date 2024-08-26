import { DashboardSurvey } from "@/store/slices/dashboardSurvey";
import React from "react";

export default function Table({
  headerRows,
  tableData,
}: {
  headerRows: string[];
  tableData: DashboardSurvey[] | any;
}): React.ReactNode {
  return (
    <table
      className="min-w-[500px]"
      // style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}
      style={{ width: "100%" }}
    >
      <thead>
        <tr className="text-center bg-[#F2FBFD] border border-primary-cGreyCA">
          {headerRows?.map((item: any, index: number) => (
            <th
              key={index}
              className={`relative text-primary-cDark1D text-[16px] font-normal py-4`}
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="">
        {tableData?.map((item: any, index: number) => {
          const date = new Date(item?.completion_date);
          const formattedDate = date.toLocaleDateString('en-US');
          return (
          <tr key={index} className={`text-center`}>
            <td
              className={`py-4 text-primary-cDark1D text-[16px] font-normal  ${
                index === tableData?.length - 1 &&
                "border-b border-primary-cGreyCA"
              }
                   border-l border-l-primary-cGreyCA border-t border-t-primary-cGreyCA`}
            >
              {index + 1}
            </td>
            <td
              className={`py-3 text-primary-cDark1D text-[16px] font-normal border-t border-t-primary-cGreyCA ${
                index === tableData?.length - 1 &&
                "border-b border-b-primary-cGreyCA"
              }`}
            >
              {item?.caption}
            </td>
            <td
              className={`py-3 text-primary-cDark1D text-[16px] font-normal border-t border-t-primary-cGreyCA ${
                index === tableData?.length - 1 &&
                "border-b border-b-primary-cGreyCA"
              }`}
            >
              {item?.survey_status}
            </td>
            <td
              className={`py-3 text-primary-cDark1D text-[16px] font-normal border-t border-t-primary-cGreyCA ${
                index === tableData?.length - 1 &&
                "border-b border-b-primary-cGreyCA"
              }`}
            >
              {formattedDate}
            </td>
            <td
              className={`py-3 text-primary-cDark1D text-[16px] font-normal border-t border-t-primary-cGreyCA border-r border-r-primary-cGreyCA  ${
                index === tableData?.length - 1 &&
                "border-b border-b-primary-cGreyCA"
              }`}
            >
              {item?.completion_time}
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
  );
}
