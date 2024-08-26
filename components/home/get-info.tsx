import Image from "next/image";

export default function GetInfo(): React.ReactNode {
  return (
    <section className="px-6 pt-[91px] pb-[123px]">
      <div className="w-full max-w-[1191px] mx-auto">
        <div className="w-full max-w-[902px] mx-auto text-center">
          <p className="text-base sm:text-2xl font-medium text-primary-cGreen76 mb-2">
            Elections
          </p>
          <h1 className="text-xl sm:text-[39px] leading-tight font-bold text-primary-cDark24 mb-[42px]">
            Get Information on the Nigeria Elections
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-10 items-center mt-10 md:mt-[125px]">
          <div className="flex justify-end relative z-0 w-full">
            <Image
              src="/images/election-map.svg"
              alt="election table"
              width={475.9}
              height={499}
            />
            <div className="absolute z-[1] bottom-[67px] left-0 space-y-4 w-full max-w-[239px] text-[10px] md:text-base">
              {/*<p className="text-primary-cGreen4D font-medium">*/}
              {/*  Explore the data;*/}
              {/*</p>*/}
              {/*<div className="py-2 sm:py-3.5 px-5 sm:px-8 bg-white w-fit text-center text-primary-cGreen76 rounded border border-primary-cGreen74">*/}
              {/*  Post-Election Information*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="flex justify-end w-full max-w-[676px]">
            <Image
              src="/images/election-table.svg"
              alt="election table"
              width={476}
              height={440}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
