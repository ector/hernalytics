import Link from "next/link";

export default function VEOFormSubmittedSuccessfully(): React.ReactNode {
  return (
    <div className="px-[13px]">
      <div className="flex flex-col gap-10 justify-center items-center h-[calc(100vh-60px)] sm:h-[calc(100vh-112px)] w-full max-w-[580px] mx-auto">
        <p className="text-[22px] sm:text-39px leading-tight font-bold text-primary-cDark65">
          Thank you for your input!
        </p>
        <div className="w-full flex flex-col gap-3 items-center justify-center">
          <Link
            href="/"
            className="w-full py-[15px] bg-primary-cGreen74 text-center text-white font-medium rounded"
          >
            GO HOME
          </Link>
          {/* <button className="w-full py-[15px] bg-none text-center text-primary-cDark7D font-medium rounded">
            EDIT INPUT
          </button> */}
        </div>
      </div>
    </div>
  );
}
