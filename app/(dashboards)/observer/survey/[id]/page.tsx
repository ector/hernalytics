import Footer from "@/components/dashboard/observer/footer";
import SurveyQuestion from "@/components/dashboard/observer/question";

export default function Page({ params }: any): React.ReactNode {
  return (
    <>
      <SurveyQuestion id={params.id} />
      {/* <Footer /> */}
    </>
  );
}

export async function generateStaticParams() {
  return [{ id: "4" }];
}
