import { UseFormReturn } from "react-hook-form";
import CustomFormLabel from "./form-label";
import { FormField, FormItem } from "@/components/ui/form";
import CustomFormRadio from "./radio-input";
import { cn } from "@/lib/utils";

export default function LabelWithRadioButton({
  label,
  name,
  form,
  className = "",
}: {
  name: any;
  label: string;
  form: UseFormReturn<any, any, undefined>;
  className?: string;
}): React.ReactNode {
  return (
    <div
      className={cn("flex items-center justify-between gap-10 w-full max-w-xs", className)}
    >
      <CustomFormLabel text={label} className="sm:text-base" />
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <CustomFormRadio field={field} options={["yes", "no"]} />
          </FormItem>
        )}
      />
    </div>
  );
}
