import { FormControl, FormMessage } from "@/components/ui/form";
import { InputType } from "@/definitions/veo-form-input-type";
import { cn } from "@/lib/utils";
import React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

export default function FormControlTextArea({
  placeholder,
  field,
  fieldState,
  border = true,
  className = "",
}: {
  border?: boolean;
  placeholder: string;
  field: ControllerRenderProps<FieldValues, InputType>;
  fieldState?: ControllerFieldState;
  className?: string;
}): React.ReactNode {
  return (
    <>
      <FormControl>
        <textarea
          placeholder={placeholder}
          {...field}
          className={cn(
            "w-full h-[103px] rounded-lg text-base placeholder:text-primary-cGreyAC border border-primary-cGrey92 placeholder:text-back placeholder:font-normal p-4 text-primary-cDark65 focus-visible:outline-none focus:outline-none",
            fieldState?.invalid && "border-destructive",
            className
          )}
        />
      </FormControl>
    </>
  );
}
