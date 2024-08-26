import React from "react";

import ProcessCard from "./process-card";
import { Tag } from "@/components/ui/tag";
import { useVEOContext } from "@/providers/veo-context";
import { surveyType } from "@/definitions/survey-types";
import { DashboardSurvey } from "@/store/slices/dashboardSurvey";


export default function StartSurvey() {
  const { selectedSurvey } = useVEOContext();
  return (
    <div className="flex flex-col gap-y-5">
      {selectedSurvey?.surveyparts.map((item: DashboardSurvey, index: React.Key | null | undefined) => (
        <ProcessCard key={index} data={item} />
      ))}
    </div>
  );
}
