import { FormControl, FormMessage } from "@/components/ui/form";
import { AuthInputType } from "@/definitions/auth-form-input-type";
import { InputType } from "@/definitions/veo-form-input-type";
import { cn } from "@/lib/utils";
import React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

interface FormControlInputProps<TFieldValues extends FieldValues> {
  border?: boolean;
  placeholder: string;
  field: ControllerRenderProps<TFieldValues, any>;
  fieldState?: ControllerFieldState;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
}

export default function FormControlInput<TFieldValues extends FieldValues>({
  placeholder,
  field,
  fieldState,
  border = true,
  className = "",
  type = "text",
}: FormControlInputProps<TFieldValues>): React.ReactNode {
  return (
    <>
      <FormControl>
        <input
          placeholder={placeholder}
          {...field}
          type={type}
          className={cn(
            "w-full h-12 rounded-lg text-base placeholder:text-primary-cGreyAC border border-primary-cGrey92 placeholder:text-back placeholder:font-normal px-4 text-primary-cDark65 focus-visible:outline-none focus:outline-none",
            fieldState?.invalid && "border-destructive",
            className
          )}
        />
      </FormControl>
    </>
  );
}
