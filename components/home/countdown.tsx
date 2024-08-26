"use client"

import useCountdown from "@/hooks/useCountdown";
import Image from "next/image";

function TimeLeft({ text }: { text: string }) {
  const data = text.split(" ");
  return (
    <div className="flex flex-col items-center justify-center px-0 sm:px-6 gap-0 sm:gap-2 w-full text-white py-4 md:py-8 rounded-[17.06px] bg-primary-cGreen53">
      <p className="font-semibold text-2xl sm:text-3xl md:text-[49.62px] leading-tight">{data[0]}</p>
      <p className="text-[9.23px] sm:text-base md:text-[18px] leading-tight uppercase">{data[1]}</p>
    </div>
  );
}

export default function CountDown({
}: {
}): React.ReactNode {
  const times = useCountdown(new Date("2024-09-16T23:59:59"));

  return (
    <section className="relative z-0 px-6 sm:px-8 md:px-20 lg:px-[120px] pt-20 pb-[115px] bg-primary-cBlueFF overflow-hidden">
      <Image
        src="/images/spiral.svg"
        width={240}
        height={240}
        className="absolute z-0 -bottom-[5px] -left-[10px]"
        alt="spiral bg"
      />
      <div className="relative z-[1] space-y-10 w-full max-w-[960px] mx-auto">
        <h2 className="text-xl sm:text-[39px] sm:leading-tight text-primary-cGreen24 font-bold text-center">
          Countdown to Edo Governorship Elections
        </h2>
        <div className="flex items-center gap-3 md:gap-[20.94px] justify-center w-full max-w-[349px] mx-auto">
          {times.map((time, index) => (
            <TimeLeft key={index} text={time} />
          ))}
        </div>
      </div>
    </section>
  );
}
