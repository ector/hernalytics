"use client";

import { usePathname } from "next/navigation";
import RoleIndicator from "../role-indicator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@/store/slices/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const links = [
  { text: "Home", href: "/observer/" },
  { text: "Survey", href: "/observer/survey/" },
  { text: "Account Settings", href: "/observer/settings/" },
];

export default function ObserverNav(): React.JSX.Element {
  const pathname = usePathname();

  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <nav className="bg-white text-white py-5 px-8 lg:px-20 border-b">
      <div className="flex items-center justify-between w-full h-full">
        <div className="flex items-center gap-12">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={cn(
                "text-primary-cDark65 font-jost text-base hover:text-primary-cGreen74 hover:font-bold duration-300",
                // pathname.startsWith(link.href) &&
                pathname === link.href &&
                  "text-primary-cGreen74 font-bold"
              )}
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* <RoleIndicator role={user?.role} /> */}
      </div>
    </nav>
  );
}
