"use client";

import { TbAlertCircle } from "react-icons/tb";
import { Form } from "@/components/ui/form";
import { useVEOContext } from "@/providers/veo-context";
import FormBackButton from "./back-button";
import { UseFormReturn } from "react-hook-form";
import {
  IEaseOfAccessFormType,
  IElectionLocationFormType,
  IObserverFormType,
} from "@/definitions/veo-form-schemas";

export default function VEOFormWrapper({
  title,
  children,
  form,
}: {
  title: string;
  children: React.ReactNode;
  form: UseFormReturn<
    IObserverFormType | IElectionLocationFormType | IEaseOfAccessFormType,
    any,
    undefined
  >;
}): React.ReactNode {
  const { formStep, setFormStep, error } = useVEOContext();

  return (
    <Form {...form}>
      <form className="space-y-5 max-w-full sm:max-w-full pt-0 sm:pt-10 w-full mx-auto fade-in-30 mb-0">
        <h1 className="text-xl sm:text-[39px] leading-tight text-left text-primary-cDark65 font-jost font-bold">
          {title}
        </h1>
        {!!error && (
          <div className="relative w-full rounded-lg border px-4 py-3 text-sm border-destructive/50 text-destructive flex items-center gap-2">
            <TbAlertCircle className="size-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        {children}
        {formStep > 0 && <FormBackButton />}
      </form>
    </Form>
  );
}
