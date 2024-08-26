import { UseFormReturn } from "react-hook-form";
import CustomFormLabel from "./form-label";
import { FormField, FormItem } from '@/components/ui/form';
import FormControlInput from './form-control-input';


export default function LabelWithInput({
  label,
  name,
  form,
}: {
  name: any;
  label: string;
  form: UseFormReturn<any, any, undefined>;
}): React.ReactNode {
  return (
    <div className="flex items-center justify-between gap-10 w-full max-w-[415px]">
      <CustomFormLabel text={label} className="sm:text-base" />
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControlInput field={field} placeholder="State time" />
            </FormItem>
          )}
        />
    </div>
  );
}