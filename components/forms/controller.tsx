"use client";

import { useVEOContext } from "@/providers/veo-context";
import ProgressTrack from "./progress-track";
import Q01Form from "./Q01";
import Q02Form from "./Q02";
import Q03Form from "./Q03";
import Q04Form from "./Q04";
import Q05Form from "./Q05";
import Q06Form from "./Q06";
import Q07Form from "./Q07";
import VEOFormSubmittedSuccessfully from "./successful";

export default function VEOSurveyFormController(): React.ReactNode {
  const { formStep, submitted } = useVEOContext();
  console.log('submitted', submitted)
  return (
    <>
      {submitted ? (
        <VEOFormSubmittedSuccessfully />
      ) : (
        <div className="px-[13px] mt-[39px] sm:mt-[96px] w-full max-w-[584px] mx-auto pb-[106px] sm:pb-[158px]">
          <ProgressTrack />
          <div>
            {formStep === 0 && <Q01Form />}
            {formStep === 1 && <Q02Form />}
            {formStep === 2 && <Q03Form />}
            {formStep === 3 && <Q04Form />}
            {formStep === 4 && <Q05Form />}
            {formStep === 5 && <Q06Form />}
            {formStep === 6 && <Q07Form />}
          </div>
        </div>
      )}
    </>
  );
}
