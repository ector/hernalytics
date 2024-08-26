"use client";

import { TbAlertCircle } from "react-icons/tb";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

export default function ProfileDetailsFormWrapper({
  title,
  desc,
  children,
  form,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
  form: UseFormReturn<any, any, undefined>;
}): React.ReactNode {
  const [error, setError] = useState<string>("");

  return (
    <Form {...form}>
      <form className="w-full mx-auto fade-in-30 mb-0">
        <div className="flex items-center justify-between">
          <h1 className="text-[16px] text-primary-cDark1D text-left font-medium font-jost">
            {title}
          </h1>
          <p className="text-[16px] text-primary-cGrey7B">{desc}</p>
        </div>
        {!!error && (
          <div className="relative w-full rounded-lg border px-4 py-3 text-sm border-destructive/50 text-destructive flex items-center gap-2">
            <TbAlertCircle className="size-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        <div className="mt-10 grid sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-8">{children}</div>
      </form>
    </Form>
  );
}
