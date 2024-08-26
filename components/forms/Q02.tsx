"use client";

import { FormField, FormItem } from "@/components/ui/form";
import { useVEOContext } from "@/providers/veo-context";
import VEOFormWrapper from "./form-wrapper";
import CustomFormLabel from "./form-label";
import FormControlInput from "./form-control-input";
import FormNextButton from "./next-button";
import { z } from "zod";
import CustomFormMessage from "./form-message";
import { electionLocationFormSchema } from "@/definitions/veo-form-schemas";
import FormControlSelect from "./form-control-select";

export default function Q02Form(): React.ReactNode {
  const { electionLocationForm, formStep, setFormStep } = useVEOContext();

  function onSubmit(values: z.infer<typeof electionLocationFormSchema>) {
    setFormStep((formStep: number) => formStep + 1);
  }

  return (
    <VEOFormWrapper
      form={electionLocationForm}
      title="Election Location and Information"
    >
      <div className="mt-6 space-y-10">
        <FormField
          control={electionLocationForm.control}
          name="state"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="State *" />
              <FormControlSelect
                placeholder="Select state..."
                field={field}
                options={[
                  {
                    label: "State 1",
                    value: "state1",
                  },
                  {
                    label: "State 2",
                    value: "state2",
                  },
                  {
                    label: "State 3",
                    value: "state3",
                  },
                  {
                    label: "State 4",
                    value: "state4",
                  },
                ]}
              />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />

        <FormField
          control={electionLocationForm.control}
          name="electionName"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Name *" />
              <FormControlInput placeholder="Full Name" field={field} />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />

        <FormField
          control={electionLocationForm.control}
          name="electionArea"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Local Government Area *" />
              <FormControlInput placeholder="" field={field} />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />

        <FormField
          control={electionLocationForm.control}
          name="wardName"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Ward Name *" />
              <FormControlInput placeholder="" field={field} />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />

        <FormField
          control={electionLocationForm.control}
          name="wardCode"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Ward Code *" />
              <FormControlInput placeholder="" field={field} />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />

        <FormField
          control={electionLocationForm.control}
          name="pollingUnit"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Polling Unit Number *" />
              <FormControlSelect
                placeholder=""
                field={field}
                options={[
                  {
                    label: "Unit 1",
                    value: "unit1",
                  },
                  {
                    label: "Unit 2",
                    value: "unit2",
                  },
                  {
                    label: "Unit 3",
                    value: "unit3",
                  },
                  {
                    label: "Unit 4",
                    value: "unit4",
                  },
                ]}
              />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />

        <FormField
          control={electionLocationForm.control}
          name="totalVotersCount"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Total Number of Registered Voters In your polling station *" />
              <FormControlInput
                placeholder="1234"
                field={field}
                type="number"
              />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />
        <FormField
          control={electionLocationForm.control}
          name="totalFemaleVotersCount"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Total Number of female voters in your polling station *" />
              <FormControlInput
                placeholder="1234"
                field={field}
                type="number"
              />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />
        <FormField
          control={electionLocationForm.control}
          name="totalAccreditedVotersCount"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Total number of accredited voters *" />
              <FormControlInput
                placeholder="1234"
                field={field}
                type="number"
              />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />
        <FormField
          control={electionLocationForm.control}
          name="totalAccreditedFemaleVotersCount"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="Total number of accredited female voters in your polling unit *" />
              <FormControlInput
                placeholder="1234"
                field={field}
                type="number"
              />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />
      </div>
      {/* <FormNextButton onClick={electionLocationForm.handleSubmit(onSubmit)} /> */}
    </VEOFormWrapper>
  );
}
