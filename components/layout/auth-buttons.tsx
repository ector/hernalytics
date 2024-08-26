import { cn } from "@/lib/utils";
import Link from "next/link";

type TAuthButtons = {
  text: string;
  link: string;
  transparent: boolean;
};

const authButtons: Array<TAuthButtons> = [
  {
    text: "Login",
    link: "/auth/login",
    transparent: true,
  },
  {
    text: "Sign Up",
    link: "/auth/sign up",
    transparent: false,
  },
];

export default function AuthButtons(): React.JSX.Element {
  return (
    <div className="hidden md:flex items-center gap-3.5">
      {authButtons.map((button, index) => (
        <Link
          key={index}
          href={button.link}
          className={cn(
            "rounded py-3 px-8 text-base font-semibold uppercase",
            !button.transparent ? "bg-primary-cOrange05 text-black" : "text-inherit"
          )}
        >
          {button.text}
        </Link>
      ))}
    </div>
  );
}
