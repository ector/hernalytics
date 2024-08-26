import { cn } from "@/lib/utils";
import Link from "next/link";

interface IData {
  title: string;
  text: string;
  bg: string;
  link?: string;
}

const data: Array<IData> = [
  {
    title: "General User",
    text: "Register/join as a General User to engage on Hernalytics",
    link: "#",
    bg: "bg-[url('/images/community-1.png')]",
  },
  {
    title: "Female Candidate Community",
    text: "Coming Soon",
    link: "#",
    bg: "bg-[url('/images/community-2.png')]",
  },
  {
    title: "Decide To Run (DTR) Community",
    text: "Coming Soon",
    link: "#",
    bg: "bg-[url('/images/community-3.png')]",
  },
  {
    title: "Reporter / Observer",
    text: "At bibendum leo eu libero arcu. Condimentum sed nunc volutpat pulvinar.",
    link: "#",
    bg: "bg-[url('/images/community-3.png')]",
  },
];

export default function Communities(): React.ReactNode {
  return (
    <section className="pt-[70px] pb-[116px] px-6">
      <div className="w-full max-w-[1202px] mx-auto">
        <p className="font-medium text-primary-cGreen74 mb-2">Communities</p>
        <h3 className="text-[26px] font-medium leading-tight text-primary-cDark1D">
          We are changing the narratives
        </h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-[22.16px]">
          {data.map((item, index) => (
            <div
              key={index}
              className={cn(
                "relative z-0 rounded-[14.77px] px-[66px] pt-[66px] pb-[84px] overflow-hidden bg-no-repeat bg-cover bg-center", item.bg
              )}
            >
              <div
                className="absolute z-0 inset-x-0 inset-y-0 bg-black/50"
              ></div>
              <div className="relative z-[1] text-white">
                <p className="font-sm font-medium font-spaceGrotesk mb-6">
                  Become a member
                </p>
                <h3 className="font-jost font-bold text-2xl mb-1">
                  {item.title}
                </h3>
                <p className="font-xl font-medium mb-16">{item.text}</p>
                <Link
                  href="/auth/sign up"
                  className="w-fit flex items-center gap-3 py-3.5 rounded px-[62px] font-semibold border border-white text-white"
                >
                  JOIN
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
