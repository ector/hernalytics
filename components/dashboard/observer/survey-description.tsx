import React from "react";

import { useVEOContext } from "@/providers/veo-context";
import { Button } from "@/components/ui/button";
import { DashboardSurvey } from "@/store/slices/dashboardSurvey";

export default function SurveyDescription({
  data,
}: {
  data: DashboardSurvey;
}): React.ReactNode {
  const { setSelectedSurvey } = useVEOContext();
  return (
    <div className="pl-8 pr-14 py-10 bg-primary-cGreen0D flex items-center justify-between rounded-[8px]">
      <div className="md:w-[50%] w-full flex flex-col items-start gap-y-4">
        <p className="md:text-[20px] text-[16px] text-primary-cDark1D font-medium">
          {data?.caption}
        </p>
        {/* <p className="md:block hidden text-[16px] text-primary-cDark1D font-normal">
          {data?.description}
        </p> */}
        <p className="md:hidden block text-[16px] text-primary-cDark1D font-normal">
          Catch up with the top discussions
        </p>
        
        <Button
          variant={"default"}
          className="px-[30px]"
          onClick={() => setSelectedSurvey(data)}
        >
          START SURVEY
        </Button>
      </div>

      <div className="hidden md:flex flex-col gap-y-2">
        <div className="flex flex-col items-start">
          <p className="text-[16px] text-primary-cDark1D font-medium">Date</p>
          <p className="text-[16px] text-primary-cDark1D font-normal">
            {data?.completion_date}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[16px] text-primary-cDark1D font-medium">Time</p>
          <p className="text-[16px] text-primary-cDark1D font-normal">
            {data?.completion_time}
          </p>
        </div>
        {/* <div className="flex flex-col items-start">
          <p className="text-[16px] text-primary-cDark1D font-medium">
            Polling Unit Name
          </p>
          <p className="text-[16px] text-primary-cDark1D font-normal">
            {data?.unitName}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[16px] text-primary-cDark1D font-medium">
            Polling Unit Address
          </p>
          <p className="text-[16px] text-primary-cDark1D font-normal">
            {data?.unitAddress}
          </p>
        </div> */}
      </div>
    </div>
  );
}
