"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import HomeHeader from "./header";

type TIntroButtons = {
  text: string;
  link: string;
  bordered: boolean;
};

const images: Array<string> = [
  "bg-[url('/images/home-hero-1.png')]",
  "bg-[url('/images/home-hero-2.png')]",
  "bg-[url('/images/home-hero-3.png')]",
  "bg-[url('/images/home-hero-4.png')]",
  "bg-[url('/images/home-hero-5.png')]",
  "bg-[url('/images/home-hero-6.png')]",
];

const introLinks: Array<TIntroButtons> = [
  { text: "Go to VEO PLATFORM", link: "/auth/login", bordered: false },
  { text: "Get election Update", link: "/election update", bordered: true },
];

export default function HomeIntro(): React.ReactNode {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative z-0 overflow-hidden px-[26px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute z-0 inset-x-0 inset-y-0 bg-no-repeat bg-cover bg-center transition-opacity duration-1000",
            image,
            {
              "opacity-0": index !== currentImageIndex,
              "opacity-100": index === currentImageIndex,
            }
          )}
        ></div>
      ))}
      <div className="absolute z-[1] inset-x-0 inset-y-0 bg-home-intro-gradient"></div>
      <div className="relative z-[2] ">
        <HomeHeader />
        <div className="pt-[134px] pb-[245px]">
          <div className="w-full max-w-[881px] text-center mx-auto">
            <h1 className="text-2xl sm:text-4xl lg:text-[61px] lg:leading-tight font-bold text-white">
              Get Real-Time updates on the Nigeria 2024 Elections
            </h1>
            <p className="font-medium text-white mt-6 mb-10 text-base sm:text-2xl">
              Become a more informed and active citizen by accessing and
              engaging on just the information you need on the coming elections.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {introLinks.map((button, index) => (
                <Link
                  key={index}
                  href={button.link}
                  className={cn(
                    "w-full py-[15px] rounded uppercase text-center",
                    button.bordered
                      ? "border border-white text-white font-semibold"
                      : "border border-primary-cOrange05 bg-primary-cOrange05 text-black font-medium"
                  )}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
