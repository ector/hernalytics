import type { Metadata } from "next";
import { Jost, Space_Grotesk } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

// const jost = Jost({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-jost",
// });

const jost = localFont({
  src: "../public/fonts/Jost/Jost-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-jost",
});

const spaceGrotesk = localFont({
  src: "../public/fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-space-grotesk",
});

// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-space-grotesk",
// });

export const metadata: Metadata = {
  title: "Hernalytics",
  description: "Hernalytics Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${spaceGrotesk.variable}`}>
        <main> {children}</main>
      </body>
    </html>
  );
}
