"use client";

import { useVEOContext } from "@/providers/veo-context";

export default function FormBackButton(): React.ReactNode {
  const { formStep, setFormStep } = useVEOContext();

  const goBackHandler = () => {
    if (formStep > 0) {
      setFormStep((formStep: number) => formStep - 1);
    }
  };

  return (
    <button
      onClick={goBackHandler}
      className="w-full py-[15px] text-center text-primary-cDark7D font-medium rounded mt-3"
    >
      GO BACK
    </button>
  );
}
