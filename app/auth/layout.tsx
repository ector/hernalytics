import AuthHeader from "@/components/auth/header";
import type { Metadata } from "next";
import ClientAuthLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Auth | Hernalytics",
  description: "Hernalytics VEO Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientAuthLayout children={children} />
  );
}
