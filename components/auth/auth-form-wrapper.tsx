"use client";

import { TbAlertCircle } from "react-icons/tb";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import {
  ILoginFormType,
  IResetFormType,
} from "@/definitions/auth-form-schemas";

export default function AuthFormWrapper({
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
      <form className="max-w-[584px] sm:max-w-[584px] my-20 md:my-[186px] w-full mx-auto fade-in-30 mb-0">
        <h1 className="text-xl sm:text-[26px] leading-tight text-left text-primary-cDark65 font-jost font-bold">
          {title}
        </h1>
        <p className="mt-2 text-base text-primary-cDark7D">{desc}</p>
        {!!error && (
          <div className="relative w-full rounded-lg border px-4 py-3 text-sm border-destructive/50 text-destructive flex items-center gap-2">
            <TbAlertCircle className="size-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        <div className="mt-20">{children}</div>
      </form>
    </Form>
  );
}
