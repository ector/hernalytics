"use client";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputType } from "@/definitions/veo-form-input-type";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export default function CustomFormRadio({
  options,
  field,
}: {
  options: Array<string>;
  field: ControllerRenderProps<FieldValues, InputType | any>;
}): React.ReactNode {
  return (
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={field.value}
        className="flex items-center gap-10"
      >
        {options.map((option, key) => (
          <FormItem key={key} className="flex items-center gap-2">
            <FormControl>
              <RadioGroupItem value={option} />
            </FormControl>
            <FormLabel className="capitalize text-sm text-primary-cGrey70 !m-0">
              {option}
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
