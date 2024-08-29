"use client";

import React, { useEffect } from "react";
import { useVEOContext } from "@/providers/veo-context";

import SurveyDescription from "./survey-description";
import RecentActivities from "./recent-activities";
import { Tag } from "@/components/ui/tag";
import StartSurvey from "./start-survey";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  DashboardSurvey,
  fetchActiveSurveyParts,
  fetchPreviousSurveys,
  fetchSurveys,
} from "@/store/slices/dashboardSurvey";

const activityHeaderRows = [
  "S/N",
  "Survey",
  "Survey status",
  "Date",
  "Time Taken",
];

export default function ObserverHome(props: any) {
  const { selectedSurvey, setSelectedSurvey } = useVEOContext();
  const { user } = props;

  // Get the current day and date
  const currentDate = new Date();
  const dayOptions = { weekday: "long" } as const;
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  } as const;
  const day = currentDate.toLocaleDateString(undefined, dayOptions);
  const date = currentDate.toLocaleDateString(undefined, dateOptions);

  const dispatch = useDispatch<AppDispatch>();

  // Select state from the store
  const { surveys, previousSurveys, status, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  // Fetch surveys and previous surveys on component mount
  useEffect(() => {
    dispatch(fetchSurveys());
    dispatch(fetchPreviousSurveys());
  }, [dispatch]);

  // Separate states for loading and errors
  const currentSurveysLoading = status === "loading" && !previousSurveys.length;
  const previousSurveysLoading = status === "loading" && !surveys.length;
  const currentSurveysError = error;
  const previousSurveysError = error;

  return (
    <div className="pt-5 pb-20 px-8 lg:px-20">
      {/* Page Header */}
      {!selectedSurvey && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-y-3">
            <p className="text-[26px] text-primary-cDark32 font-semibold">
              Good Day, {user.firstname}
            </p>
            <p className="text-[13px] text-primary-cGreyAC">
              Here is everything you need to stay updated
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-y-2">
            <p className="text-[16px] text-primary-cDark32 font-semibold">
              {day}
            </p>
            <p className="text-[16px] text-primary-cGrey78">{date}</p>
          </div>
        </div>
      )}

      {selectedSurvey && (
        <p className="text-[26px] text-primary-cDark32 font-semibold">
          {selectedSurvey?.survey}
        </p>
      )}

      {!selectedSurvey && (
        <>
          {/* Survey Detail Component */}
          {currentSurveysLoading ? (
            <div className="w-full p-10 mt-5 border border-gray-200 rounded-md text-center">
              Loading surveys...
            </div>
          ) : surveys.length > 0 ? (
            surveys.map((survey: DashboardSurvey, index: number) => (
              <div className="md:mt-20 mt-10" key={index}>
                <SurveyDescription data={survey} />
              </div>
            ))
          ) : (
            <div className="w-full p-10 mt-5 border border-gray-200 rounded-md text-center">
              You have no active survey. Please, check back.
            </div>
          )}

          {currentSurveysError && (
            <div className="w-full p-10 border border-gray-400 rounded-md text-center">
              {currentSurveysError}
            </div>
          )}

          {/* Recent Activities Table */}
          <div className="mt-20">
            {previousSurveysLoading ? (
              <div className="w-full my-2 p-20 border border-gray-200 rounded-md text-center">
                Loading recent activities...
              </div>
            ) : (
              <RecentActivities
                headerRows={activityHeaderRows}
                tableData={previousSurveys}
              />
            )}

            {previousSurveys.length === 0 && (
              <div className="w-full p-10 border border-gray-400  rounded-md text-center">
                <span>You have not taken a survey yet.</span>
              </div>
            )}

            {previousSurveysError && (
              <div className="w-full p-10 border border-gray-400 rounded-md text-center">
                <span>{previousSurveysError}</span>
              </div>
            )}
          </div>
        </>
      )}

      {selectedSurvey && (
        <div className="md:mt-20 mt-10">
          <StartSurvey
          // onStartSurvey={ (id: number)=> dispatch(fetchActiveSurveyParts(id))}
          />
        </div>
      )}
    </div>
  );
}
