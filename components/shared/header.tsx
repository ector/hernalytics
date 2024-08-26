import AppLogo from "@/components/shared/app-logo";

export default function VEOHeader(): React.JSX.Element {
  return (
    <header className="bg-transparent text-white h-[60px] sm:h-[112px] px-8 lg:px-[86px] transition-colors duration-300">
      <div className="flex items-center w-full h-full">
        <AppLogo />
      </div>
    </header>
  );
}
