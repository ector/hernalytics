"use client";
import SurveyQuestion from "@/components/dashboard/observer/question";

export default function Page({ params }: any): React.ReactNode {
  // const router = useRouter()
  return (
    <>
      <SurveyQuestion id={params.id} />
    </>
  );
}

