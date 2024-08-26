import { UseFormReturn } from "react-hook-form";
import CustomFormLabel from "./form-label";
import { FormField, FormItem } from "@/components/ui/form";
import CustomFormRadio from "./radio-input";
import FormControlInput from "./form-control-input";

export default function InputWithRadioButton({
  radioName,
  inputName,
  form,
}: {
  radioName: any;
  inputName: any;
  form: UseFormReturn<any, any, undefined>;
}): React.ReactNode {
  return (
    <div className="flex items-center justify-between gap-7 w-full max-w-[345px]">
      <FormField
        control={form.control}
        name={radioName}
        render={({ field }) => (
          <FormItem>
            <CustomFormRadio field={field} options={["yes", "no"]} />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={inputName}
        render={({ field }) => (
          <FormItem>
            <FormControlInput field={field} placeholder="Time of arrival" />
          </FormItem>
        )}
      />
    </div>
  );
}
