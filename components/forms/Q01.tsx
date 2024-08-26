"use client";

import { FormField, FormItem } from "@/components/ui/form";
import { useVEOContext } from "@/providers/veo-context";
import VEOFormWrapper from "./form-wrapper";
import CustomFormLabel from "./form-label";
import FormControlInput from "./form-control-input";
import CustomFormRadio from "./radio-input";
import FormNextButton from "./next-button";
import { z } from "zod";
import { observerFormSchema } from "@/definitions/veo-form-schemas";
import CustomFormMessage from "./form-message";

export default function Q01Form(): React.ReactNode {
  const { observerForm, formStep, setFormStep } = useVEOContext();

  function onSubmit(values: z.infer<typeof observerFormSchema>) {
    setFormStep((formStep: number) => formStep + 1);
  }

  return (
    <VEOFormWrapper form={observerForm} title="Observer&#39;s Information">
      <div className="mt-6 space-y-10">
        <FormField
          control={observerForm.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Name *" />
              <FormControlInput placeholder="Full Name" field={field} />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />
        <FormField
          control={observerForm.control}
          name="phoneNo"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Phone *" />
              <div className="flex gap-3.5 items-center h-12 px-4 rounded-lg border border-primary-cGrey92 overflow-hidden">
                <span className="text-base font-medium text-primary-cDark20">
                  +234
                </span>
                <FormControlInput
                  border={false}
                  placeholder="(123) 456-7890"
                  field={field}
                  type="number"
                />
              </div>
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />

        <FormField
          control={observerForm.control}
          name="identifier"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Unique Identifier *" />
              <FormControlInput placeholder="(123) 456-7890" field={field} />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />

        <FormField
          control={observerForm.control}
          name="gender"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Gender *" />
              <CustomFormRadio field={field} options={["male", "female"]} />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />
      </div>
      {/* <FormNextButton onClick={observerForm.handleSubmit(onSubmit)} /> */}
    </VEOFormWrapper>
  );
}
