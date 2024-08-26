import Link from "next/link";
import AppLogo from "../shared/app-logo";
import Image from "next/image";
import Newsletter from "./newsletter";

const socials: Array<{ img: string; link: string }> = [
  {
    img: "/icons/instagram.svg",
    link: "https://www.instagram.com/hernalytics",
  }
];

export default function Footer(): React.ReactNode {
  return (
    <footer className="flex overflow-hidden flex-wrap gap-10 px-20 py-20 bg-white max-md:px-5">
      <div className="flex flex-col md:flex-row gap-10 text-primary-cDark1E w-full max-w-7xl mx-auto">
        <div className="w-1/4 flex flex-col self-start">
          <div className="flex flex-col max-w-full w-[183px]">
            <AppLogo/>
          </div>
          <p className="mt-3 text-base">Hernalytics is an election-tech platform driving transparency, accountability,
            and public participation, by enhancing election monitoring and reporting in Africa through technology.</p>
          <p className="mt-3 text-base">&copy; 2024 Hernalytics</p>
        </div>
        <div className="w-full md:w-3/4 flex gap-5 justify-between flex-wrap">
          <div className="flex flex-col w-full max-w-[242px]">
            {/*<div className="flex flex-col text-base text-[18px]">*/}
            {/*  <p className="font-bold text-[18px] leading-tight">Resources</p>*/}
            {/*  <p className="mt-6">Election Laws</p>*/}
            {/*  <p className="mt-6">Guidelines</p>*/}
            {/*  <p className="mt-6">*/}
            {/*    Educational Materials for voters and stakeholders*/}
            {/*  </p>*/}
            {/*</div>*/}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="font-bold text-[18px] leading-tight">Follow us!</p>
              <p className="mt-6 text-base ">hernalytics@gmail.com</p>
              <div className="flex gap-6 items-center self-start mt-6">
                {socials.map((social, index) => (
                  <Link href={social.link} key={index}>
                    <Image
                      src={social.img}
                      alt="social"
                      width={24}
                      height={24}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div></div>
          {/* <Newsletter /> */}
        </div>
      </div>
    </footer>
  );
}
