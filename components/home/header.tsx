import AppLogo from "@/components/shared/app-logo";
import AppNavs from "./nav";

export default function HomeHeader(): React.JSX.Element {

  return (
    <header className="bg-transparent text-white  h-[116px] px-1.5 lg:px-[86px] transition-colors duration-300">
      <div className="w-full h-full mx-auto">
        <div className="h-full flex gap-7 items-center justify-between">
          <AppLogo />
          <AppNavs />
        </div>
      </div>
    </header>
  );
}
