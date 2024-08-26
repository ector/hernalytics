import React from "react";
import Image from "next/image";
import Link from "next/link";

import AppLogo from "@/components/shared/app-logo";
import { Button } from "@/components/ui/button";

const socials: Array<{ img: string; link: string }> = [
  {
    img: "/icons/instagram.svg",
    link: "https://www.instagram.com/hernalytics",
  }
];

export default function Footer(): React.ReactNode {
  return (
    <div className="py-14 px-8 lg:px-20 grid md:grid-cols-3 grid-cols-1 items-start lg:gap-x-[10rem] md:gap-x-[4rem] gap-y-[3rem]">
      <div className="col-span-1 flex flex-col items-start gap-y-2">
        <AppLogo />
        <p className="text-black text-[16px]">© 2024 Hernalytics</p>
      </div>

      <div className="col-span-1 flex flex-col gap-y-2">
        <p className="text-[18px] text-primary-cDark1E font-bold">About Us</p>
        <p className="text-[16px] text-primary-cDark1E">
          Hernalytics is an election-tech platform driving transparency,
          accountability, and public participation, by enhancing election
          monitoring and reporting in Africa through technology.
        </p>
        <div className="flex items-center gap-x-4">
          <p className="text-[16px] text-primary-cDark1E font-medium">
            Follow Us:
          </p>
          <div className="flex gap-6 items-center self-start">
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

      <div className="col-span-1 flex flex-col gap-y-2">
        <p className="text-[18px] text-primary-cDark1E font-bold">
          Subscribe to our newsletter
        </p>
        <p className="text-[16px] text-primary-cDark1E">
          Join a community of socially conscious people, get the latest updates.
        </p>

        <input
          placeholder="Email Address"
          className="my-2 px-2 py-2 border border-primary-cGrey92 rounded-[8px]"
        />

        <Button className="py-[12px]">SUBSCRIBE NOW</Button>
      </div>
    </div>
  );
}
