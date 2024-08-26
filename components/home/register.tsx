import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Register(): React.ReactNode {
  return (
    <section className="relative z-0 px-6 pt-[86px] pb-[48.51px] bg-primary-cDark1D">
      <div className="absolute z-0 inset-x-0 inset-y-0 bg-primary-cBlueEC/15"></div>
      <div className="relative z-[1] flex flex-col md:flex-row items-center gap-10 justify-between w-full max-w-[1224px] mx-auto">
        <div className="w-full max-w-[444px] text-white">
          <p className="text-[28px] leading-tight font-medium mb-10">
            Register or Join as a Verified Election Observer (VEO) Member
          </p>
          <p className="mb-10">
            Through the VEO Portal organisations can onboard accredited
            observers to observe and report an election...
          </p>
          <Link
            href="/auth/sign up"
            className="w-fit flex items-center gap-3 py-[12.5px] rounded px-6 font-medium border border-primary-cBlueCF text-primary-cBlueCF"
          >
            <span>Register</span>
            <IoIosArrowForward />
          </Link>
        </div>
        <div className="w-full">
          <Image
            src="/images/watch-ballot.png"
            width={698}
            height={449.49}
            alt="watch ballot"
          />
        </div>
      </div>
    </section>
  );
}
