import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuMenu } from "react-icons/lu";
import AppLogo from "../shared/app-logo";

interface INav {
  text: string;
  link: string;
}

const links: Array<INav> = [
  { text: "DATA VISUALIZATION DASHBOARD", link: "/data visualization/dashboard" },
  { text: "VEO PLATFORM", link: "/auth/login" },
];

function Nav({ text, link }: INav): React.ReactNode {
  return (
    <Link href={link} className="text-sm font-semibold">
      {text}
    </Link>
  );
}

export default function AppNavs(): React.JSX.Element {
  return (
    <>
      <div className={cn("hidden sm:flex gap-12 justify-between")}>
        {links.map((item, index) => (
          <Nav key={index} text={item.text} link={item.link} />
        ))}
      </div>
      <div className="block sm:hidden">
        <Sheet>
          <SheetTrigger className="text-white">
            <LuMenu size={28} />
          </SheetTrigger>
          <SheetContent side="top" className="bg-white w-full">
            <SheetHeader className="h-[60px]">
              <SheetTitle>
                <AppLogo />
              </SheetTitle>
            </SheetHeader>
            <div className={cn("flex flex-col gap-8 mt-8 mb-[173px] text-primary-cDark1D")}>
              {links.map((item, index) => (
                <Nav key={index} text={item.text} link={item.link} />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
