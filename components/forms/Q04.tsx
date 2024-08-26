"use client";

import { FormField, FormItem } from "@/components/ui/form";
import { useVEOContext } from "@/providers/veo-context";
import VEOFormWrapper from "./form-wrapper";
import CustomFormLabel from "./form-label";
import FormNextButton from "./next-button";
import { electionOrganizationFormSchema } from "../../definitions/veo-form-schemas";
import { z } from "zod";
import CustomFormMessage from "./form-message";
import CustomFormRadio from "./radio-input";
import FormControlTextArea from "./form-control-textarea";
import InputWithRadioButton from "./input-with-radio-button";
import LabelWithRadioButtonAndInput from "./label-with-radio-button-input";
import LabelWithInput from "./label-with-input";

export default function Q04Form(): React.ReactNode {
  const {
    electionOrganizationForm: form,
    formStep,
    setFormStep,
  } = useVEOContext();

  function onSubmit(values: z.infer<typeof electionOrganizationFormSchema>) {
    setFormStep((formStep: number) => formStep + 1);
  }
  return (
    <VEOFormWrapper form={form} title="Election Organization">
      <div className="mt-10 space-y-10">
        <div className="space-y-5">
          <CustomFormLabel text="Were INEC adhoc staff present on time (before 8:30am)? (If not, what time did they arrive?)" />
          <InputWithRadioButton
            form={form}
            radioName="presentOnTime"
            inputName="timeOfArrival"
          />
        </div>
        <div className="space-y-7">
          <div className="space-y-5">
            <CustomFormLabel text="Was the voting space (e.g booth) set up in line with INEC regulations" />
            <FormField
              control={form.control}
              name="isBootSetup"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="isBootSetupComment"
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
            <CustomFormLabel text="Checking of ballot box: did the returning officer get members of the parties and observers to check that the ballot box was empty before it was sealed?" />
            <FormField
              control={form.control}
              name="isBallotSealed"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="isBallotSealedComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <CustomFormLabel text="Did the following people arrive on time: Party Agents, Electoral Officers, Security, Observers, Monitors and Media?" />
          <div className="space-y-7">
            <LabelWithRadioButtonAndInput
              form={form}
              label="Party Agents"
              inputName="partyAgentComment"
              radioName="partyAgent"
            />
            <LabelWithRadioButtonAndInput
              form={form}
              label="Electoral Officers"
              inputName="electoralOfficersComment"
              radioName="electoralOfficers"
            />
            <LabelWithRadioButtonAndInput
              form={form}
              label="Security Personnel"
              inputName="securityPersonnelComment"
              radioName="securityPersonnel"
            />
            <LabelWithRadioButtonAndInput
              form={form}
              label="INEC Monitors"
              inputName="inecMonitorsComment"
              radioName="inecMonitors"
            />
            <LabelWithRadioButtonAndInput
              form={form}
              label="Media"
              inputName="mediaComment"
              radioName="media"
            />
          </div>
        </div>
        <div className="space-y-7">
          <div className="space-y-5">
            <CustomFormLabel text="Was there any delay in the delivery of election materials? (If yes, specify the type of materials delayed and the duration)" />
            <FormField
              control={form.control}
              name="delayDelivery"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="delayDeliveryComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControlTextArea field={field} placeholder="Comments" />
                <CustomFormMessage fieldState={fieldState} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <CustomFormLabel text="Did the election process start on time as follows (state time)?" />
          <div className="space-y-7">
            <LabelWithInput
              form={form}
              label="Accreditation"
              name="accreditation"
            />
            <LabelWithInput form={form} label="Voting" name="voting" />
            <LabelWithInput form={form} label="Counting" name="counting" />
            <LabelWithInput form={form} label="Collation" name="collation" />
          </div>
        </div>
        <div className="space-y-7">
          <div className="space-y-5">
            <CustomFormLabel text="Did BVAS work?" />
            <FormField
              control={form.control}
              name="bvas"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bvasComment"
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
            <CustomFormLabel text="Did Ink Pads work?" />
            <FormField
              control={form.control}
              name="inkPad"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="inkPadComment"
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
            <CustomFormLabel text="Where election materials sufficient and in good condition ? (If No, specify which materials were insufficient or damaged)" />
            <FormField
              control={form.control}
              name="sufficientMaterial"
              render={({ field }) => (
                <FormItem>
                  <CustomFormRadio field={field} options={["yes", "no"]} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="sufficientMaterialComment"
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
