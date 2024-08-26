"use client";

import React, { useEffect } from "react";

import ObserverNav from "./nav";
import Footer from "./footer";
import SurveysTable from "./surveys-table";
import { Tag } from "@/components/ui/tag";
import Q01Form from "@/components/forms/Q01";
import Q02Form from "@/components/forms/Q02";
import Q03Form from "@/components/forms/Q03";
import Q04Form from "@/components/forms/Q04";
import Q05Form from "@/components/forms/Q05";
import Q06Form from "@/components/forms/Q06";
import Q07Form from "@/components/forms/Q07";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCurrentUser } from "@/store/slices/auth";
import { fetchUpcomingSurveys } from "@/store/slices/dashboardSurvey";

const surveyHeaderRows = [
  "S/N",
  "Survey",
  "Survey status",
  "Date",
  "Time Taken",
];

export default function ObserverSurvey(): React.ReactNode {
  const [showSurvey, setShowSurvey] = React.useState<boolean>(false);
  const user: any = useSelector((state: RootState) => state.auth.user);
  const { surveys, previousSurveys, status: prevStatus, error: prevError } = useSelector(
    (state: RootState) => state.dashboard
  );
 

  return (
    <>
      <ObserverNav user={user} />
      <div className="pt-5 pb-20 px-8 lg:px-20">
        {!showSurvey && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start gap-y-3">
                <p className="text-[26px] text-primary-cDark32 font-semibold">
                  Survey
                </p>
                <p className="text-[13px] text-primary-cGreyAC">
                  Here is everything you need to stay updated
                </p>
              </div>
            </div>

            {/* Survey Table */}
            <div className="mt-20">
              <SurveysTable
                headerRows={surveyHeaderRows}
                tableData={previousSurveys}
              />
            </div>
          </>
        )}

        {showSurvey && (
          <div className="w-full flex justify-center">
            <div className="xl:w-[50%] lg:w-[60%] md:w-[70%] ms:w-[80%] w-[90%] flex flex-col items-center gap-y-5">
              <Q01Form />
              <Q02Form />
              <Q03Form />
              <Q04Form />
              <Q05Form />
              <Q06Form />
              <Q07Form />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
