import Observer from "@/components/dashboard/observer";

interface PageProps {
  params: {
    role: "observer" | "super-user" | "admin" | "partner";
  };
}

export default function Page({ params }: PageProps): React.ReactNode {
  return <>{params.role === "observer" && <Observer />}</>;
}


export async function generateStaticParams() {
  return [
    { role: "observer" },
    { role: "super-user" },
    { role: "admin" },
    { role: "partner" },
  ];
}