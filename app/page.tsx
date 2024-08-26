import CountDown from "@/components/home/countdown";
import GetInfo from "@/components/home/get-info";
import HomeIntro from "@/components/home/intro";
import ReportSection from "@/components/home/report";
import Footer from "@/components/dashboard/observer/footer";

export default function Home() {
  return (
    <>
      <HomeIntro />
      <CountDown />
      <GetInfo />
      <ReportSection />
      <Footer />
    </>
  );
}
