"use client";

import { useVEOContext } from "@/providers/veo-context";
import VEOFormWrapper from "./form-wrapper";
import CustomFormLabel from "./form-label";
import FormNextButton from "./next-button";
import { womenParticipationFormSchema } from "@/definitions/veo-form-schemas";
import { z } from "zod";
import { FormField, FormItem } from "@/components/ui/form";
import CustomFormRadio from "./radio-input";
import LabelWithRadioButton from "./label-with-radio-button";
import FormControlTextArea from "./form-control-textarea";
import CustomFormMessage from "./form-message";

export default function Q05Form(): React.ReactNode {
  const {
    womenParticipationForm: form,
    formStep,
    setFormStep,
  } = useVEOContext();

  function onSubmit(values: z.infer<typeof womenParticipationFormSchema>) {
    setFormStep((formStep: number) => formStep + 1);
  }
  return (
    <VEOFormWrapper form={form} title="Women Participation & Inclusivity">
      <div className="mt-10 space-y-10">
        <div className="space-y-5">
          <CustomFormLabel text="Where there any obstacles to women's participation in the voting process? (If yes, specify)" />
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="obstaclesPresent"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
            <LabelWithRadioButton
              form={form}
              label="Gender discrimination"
              name="genderDisrimination"
              className="max-w-[391px]"
            />
            <LabelWithRadioButton
              form={form}
              label="Verbal Abuse"
              name="verbalAbuse"
              className="max-w-[391px]"
            />
            <LabelWithRadioButton
              form={form}
              label="Physical Abuse"
              name="physicalAbuse"
              className="max-w-[391px]"
            />
          </div>
        </div>
        <div className="space-y-7">
          <div className="space-y-5">
            <CustomFormLabel text="Was there supportive aid for people with disability such as magnifying lens, voting Procedure posters e.t.c?" />
            <FormField
              control={form.control}
              name="support"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="supportComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <CustomFormLabel text="Were any officials / stakeholders women? (If yes, specify)" />
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="womenOfficials"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
            <LabelWithRadioButton
              form={form}
              label="Presiding Officer"
              name="presidingOfficers"
              className="max-w-[391px]"
            />
            <LabelWithRadioButton
              form={form}
              label="Assistant Presiding Officers"
              name="assistantPresidingOfficers"
              className="max-w-[391px]"
            />
            <LabelWithRadioButton
              form={form}
              label="Security Officials"
              name="securityOfficials"
              className="max-w-[391px]"
            />
            <LabelWithRadioButton
              form={form}
              label="Party Agents"
              name="partyAgents"
              className="max-w-[391px]"
            />
          </div>
          <FormField
            control={form.control}
            name="womenOfficialsComment"
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
            <CustomFormLabel text="Was there any specific provisions made to assist women with young children or breastfeeding mothers?" />
            <FormField
              control={form.control}
              name="provideAssistance"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="provideAssistanceComment"
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
