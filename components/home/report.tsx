import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function ReportSection() {
  return (
    <section className="relative z-0 bg-primary-cGreen53 pt-[115px] pb-[59px]">
      <div className="block lg:hidden absolute z-0 inset-y-0 inset-x-0 bg-[url('/images/home-hero-1.png')] bg-center bg-cover bg-no-repeat"></div>
      <div className="block lg:hidden absolute z-1 inset-y-0 inset-x-0 bg-home-get-report-gradient"></div>
      <div className="relative z-[2] flex items-center lg:justify-end gap-20 text-white px-6 lg:pl-[85px]">
        <div className="w-full max-w-md lg:max-w-full space-y-5 mx-auto">
          <h2 className="font-bold text-xl sm:text-4xl">
            Give Election Report as a Verified Election Observer (VEO)
          </h2>
          <p>
            Through the VEO Portal, organisations can onboard accredited
            observers to observe and report an election...
          </p>
          <Link
            href="/observer"
            className="flex items-center gap-2 font-semibold py-[12.5px] px-6 w-fit text-center rounded border border-white"
          >
            <span>CONTINUE</span> <IoIosArrowForward />
          </Link>
        </div>
        <div className="hidden lg:flex justify-end w-full">
          <Image
            src="/images/get-hero-image.png"
            alt="get report"
            width={840}
            height={410}
          />
        </div>
      </div>
    </section>
  );
}