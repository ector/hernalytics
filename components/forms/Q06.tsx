"use client";

import { useVEOContext } from "@/providers/veo-context";
import VEOFormWrapper from "./form-wrapper";
import CustomFormLabel from "./form-label";
import FormNextButton from "./next-button";
import { interferenceFormSchema } from "@/definitions/veo-form-schemas";
import { z } from "zod";
import { FormField, FormItem } from "@/components/ui/form";
import CustomFormRadio from "./radio-input";
import LabelWithRadioButton from "./label-with-radio-button";
import FormControlTextArea from "./form-control-textarea";
import CustomFormMessage from "./form-message";

export default function Q06Form(): React.ReactNode {
  const { interferenceForm: form, formStep, setFormStep } = useVEOContext();

  function onSubmit(values: z.infer<typeof interferenceFormSchema>) {
    setFormStep((formStep: number) => formStep + 1);
  }
  return (
    <VEOFormWrapper form={form} title="Violence and Interference">
      <div className="mt-10 space-y-10">
        <div className="space-y-7">
          <div className="space-y-5">
            <CustomFormLabel text="Were there any instances of others influencing the voting process (e.g giving money, food, gifts, drink etc). (If yes, specify)" />
            <FormField
              control={form.control}
              name="influenced"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="influencedComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <CustomFormLabel text="Who are those involved: Women, Men, Youths, Security, Party Agents , others?" />
          <div className="space-y-5">
            <LabelWithRadioButton
              form={form}
              label="Women"
              name="womenInvolved"
              className="max-w-[391px]"
            />
            <LabelWithRadioButton
              form={form}
              label="Men"
              name="menInvolved"
              className="max-w-[391px]"
            />
            <LabelWithRadioButton
              form={form}
              label="Youths"
              name="youthsInvolved"
              className="max-w-[391px]"
            />
            <LabelWithRadioButton
              form={form}
              label="Security Personnel"
              name="securityPersonnelInvolved"
              className="max-w-[391px]"
            />
            <LabelWithRadioButton
              form={form}
              label="Party Agents"
              name="partyAgentInvolved"
              className="max-w-[391px]"
            />
            <LabelWithRadioButton
              form={form}
              label="Others"
              name="othersInvolved"
              className="max-w-[391px]"
            />
          </div>
          <FormField
            control={form.control}
            name="othersComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-7">
          <div className="space-y-5">
            <CustomFormLabel text="Were there any form of GBV: Hate speech, physical attacks, damage to election materials, images of symbols that intimidated voters, especially women?" />
            <FormField
              control={form.control}
              name="gbv"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="gbvComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-7">
          <div className="space-y-5">
            <CustomFormLabel text="Were there any measures taken to prevent or address harassment / intimidation?" />
            <FormField
              control={form.control}
              name="preventHarassment"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="preventHarassmentComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
      </div>
      {/* <FormNextButton onClick={form.handleSubmit(onSubmit)} /> */}
    </VEOFormWrapper>
  );
}
