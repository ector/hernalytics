"use client";

import { FormField, FormItem } from "@/components/ui/form";
import { useVEOContext } from "@/providers/veo-context";
import VEOFormWrapper from "./form-wrapper";
import CustomFormLabel from "./form-label";
import FormNextButton from "./next-button";
import { easeOfAccessFormSchema } from "../../definitions/veo-form-schemas";
import { z } from "zod";
import CustomFormMessage from "./form-message";
import CustomFormRadio from "./radio-input";
import FormControlTextArea from "./form-control-textarea";
import FormControlInput from "./form-control-input";
import LabelWithRadioButton from "./label-with-radio-button";

export default function Q03Form(): React.ReactNode {
  const { easeOfAccesForm: form, formStep, setFormStep } = useVEOContext();

  function onSubmit(values: z.infer<typeof easeOfAccessFormSchema>) {
    setFormStep((formStep: number) => formStep + 1);
  }
  return (
    <VEOFormWrapper
      form={form}
      title="Voting and Registration – Ease of Access"
    >
      <div className="mt-10 space-y-10">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="easyLocating"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="Was polling unit easy to locate ?" />
                <CustomFormRadio field={field} options={["yes", "no"]} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="easyLocatingComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="adequateSignage"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="Was there adequate signage to direct voters to the polling unit?" />
                <CustomFormRadio field={field} options={["yes", "no"]} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adequateSignageComment"
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
            <CustomFormLabel text="Was there ease of entry and exit for: Women, PWDs, Elderly, Pregnant, Nursing Mothers?" />
            <div className="space-y-7">
              <LabelWithRadioButton
                label="Women"
                name="easeWomen"
                form={form}
              />
              <LabelWithRadioButton label="PWDs" name="easePWDs" form={form} />
              <LabelWithRadioButton
                label="Elderly"
                name="easeElderly"
                form={form}
              />
              <LabelWithRadioButton
                label="Pregnant"
                name="easePregnant"
                form={form}
              />
              <LabelWithRadioButton
                label="Nursing Mothers"
                name="easeNursingMothers"
                form={form}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="easeEntryComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="queue"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="Were people in the queue at 2:30pm given an opportunity to be accredited and to vote?" />
                <CustomFormRadio field={field} options={["yes", "no"]} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="queueComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="ballotInSecret"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="Were voters able to make their ballot paper in secret?" />
                <CustomFormRadio field={field} options={["yes", "no"]} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ballotInSecretComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="harrassment"
            render={({ field, fieldState }) => (
              <FormItem>
                <CustomFormLabel text="Did anyone attempt to harrass/intimidate voters/ polling officials/ observers during voting and accreditation?" />
                <CustomFormRadio field={field} options={["yes", "no"]} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="harrassmentComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="votesAccreditedByINECCount"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="How many people were accredited to vote as announced by the INEC official?" />
              <FormControlInput
                field={field}
                placeholder="1234"
                type="number"
              />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="votedEndedBy"
          render={({ field, fieldState }) => (
            <FormItem>
              <CustomFormLabel text="What time did accreditation and voting finish?" />
              <FormControlInput field={field} placeholder="4:30pm" />
              <CustomFormMessage fieldState={fieldState} />
            </FormItem>
          )}
        />
      </div>
      {/* <FormNextButton onClick={form.handleSubmit(onSubmit)} /> */}
    </VEOFormWrapper>
  );
}
