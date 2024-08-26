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

export default function FormControlSettingInput<TFieldValues extends FieldValues>({
  placeholder,
  field,
  fieldState,
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
            "w-full h-12 text-base border-b border-primary-cGrey7B bg-transparent placeholder:text-primary-cGreyAC placeholder:text-back placeholder:font-normal px-4 text-primary-cDark65 focus-visible:outline-none focus:outline-none",
            fieldState?.invalid && "border-destructive",
            className
          )}
        />
      </FormControl>
    </>
  );
}
