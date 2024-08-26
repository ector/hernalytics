"use client";

import { useVEOContext } from "@/providers/veo-context";
import VEOFormWrapper from "./form-wrapper";
import CustomFormLabel from "./form-label";
import FormNextButton from "./next-button";
import { resultFormSchema } from "@/definitions/veo-form-schemas";
import { z } from "zod";
import { FormField, FormItem } from "@/components/ui/form";
import CustomFormRadio from "./radio-input";
import FormControlTextArea from "./form-control-textarea";
import CustomFormMessage from "./form-message";
import FormControlInput from "./form-control-input";

export default function Q07Form(): React.ReactNode {
  const { resultForm: form, formStep, setSubmitted } = useVEOContext();

  function onSubmit(values: z.infer<typeof resultFormSchema>) {
    setSubmitted((prev: boolean) => true);
  }
  return (
    <VEOFormWrapper form={form} title="Result sorting and Counting">
      <div className="mt-10 space-y-10">
        <div className="space-y-3">
          <CustomFormLabel text="What time did sorting and counting of result commence ?" />
          <FormField
            control={form.control}
            name="sortCommenceTime"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlInput
                  placeholder="Time of result counting"
                  field={field}
                  className="max-w-[189px]"
                />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-7">
          <div className="space-y-5">
            <CustomFormLabel text="Did the presiding officer scan / take a snapshot of the result sheet using the BVAS (Form EC.8A)?" />
            <FormField
              control={form.control}
              name="tookSnapshot"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="tookSnapshotComment"
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
            <CustomFormLabel text="Did the presiding officer attempt to transmit/ send the image / picture of the result form EC.8A to the iNEC's Irev Portal" />
            <FormField
              control={form.control}
              name="sendSnapshot"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="sendSnapshotComment"
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
            <CustomFormLabel text="Did the posted result match the announced result?" />
            <FormField
              control={form.control}
              name="resultsMatched"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="resultsMatchedComment"
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
            <CustomFormLabel text="General atmosphere in the polling unit after results were announced" />
            <FormField
              control={form.control}
              name="atmosphere"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio
                    field={field}
                    options={["tense", "relaxed", "violent"]}
                  />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="atmosphereComment"
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
            <CustomFormLabel text="Were there any disruptions during the counting process?" />
            <FormField
              control={form.control}
              name="anyDisruption"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="anyDisruptionComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <CustomFormLabel text="Any other comments or observation" />
          <FormField
            control={form.control}
            name="anyComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
      </div>
      {/* <FormNextButton text="SUBMIT" onClick={form.handleSubmit(onSubmit)} /> */}
    </VEOFormWrapper>
  );
}
