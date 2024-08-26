import React from "react";

import { Button } from "@/components/ui/button";
import { surveyType } from "@/definitions/survey-types";
import { DashboardSurvey } from "@/store/slices/dashboardSurvey";
import { useRouter } from "next/navigation";
export default function ProcessCard({
  data
}: {
  data: any;
}): React.ReactNode {
  const router = useRouter();
  return (
    <div className="pl-8 pr-14 py-10 bg-primary-cGreen0D flex items-start justify-between rounded-[8px]">
      <div className="md:w-[50%] w-full flex flex-col items-start gap-y-4">
        <p className="md:block hidden text-[16px] text-primary-cDark1D font-normal">
          {data?.title}
        </p>
        <p className="md:text-[20px] text-[16px] text-primary-cDark1D font-medium">
          {data.description}
        </p>
        <p className="md:hidden block text-[16px] text-primary-cDark1D font-normal">
          Catch up with the top discussions
        </p>

        <Button onClick={()=>{
          localStorage.setItem('currentSurveyId', data.id);
          router.push(`survey/${data.id}`)
        }} disabled={!data.is_active} className="px-[30px]">START SURVEY</Button>
      </div>

      <>{data.status}</>
    </div>
  );
}
