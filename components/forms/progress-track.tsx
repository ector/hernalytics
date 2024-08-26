"use client";

import { useVEOContext } from "@/providers/veo-context";

export default function ProgressTrack(): React.ReactNode {
  const { formStep } = useVEOContext();
  return (
    <div className="flex gap-2.5 items-center w-full max-w-[577px] mb-[26px] sm:mb-[34px]">
      {Array.from({ length: 7 }, (_, index) => (
        <div
          key={index}
          className="w-full h-1 bg-[#E1E3E3] rounded-lg overflow-hidden"
        >
          <div
            className={`h-full bg-primary-cGreen76 ${
              formStep >= index ? "translate-x-0" : "-translate-x-full"
            } duration-300`}
          ></div>
        </div>
      ))}
    </div>
  );
}
