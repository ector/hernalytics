import type { Metadata } from "next";
import ObserverClient from "./client-layout";

export const metadata: Metadata = {
  title: "VEO | Hernalytics",
  description: "Hernalytics VEO Platform",
};

export default function VEOLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ObserverClient children={children} />
  );
}
