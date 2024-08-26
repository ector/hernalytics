import { FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues } from "react-hook-form";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";


interface FormControlPasswordInputProps<TFieldValues extends FieldValues> {
  border?: boolean;
  placeholder: string;
  field: ControllerRenderProps<TFieldValues, any>;
  fieldState: ControllerFieldState;
  className?: string;
}

export default function FormControlPasswordInput<
  TFieldValues extends FieldValues
>({
  placeholder,
  field,
  fieldState,
  className = "",
}: FormControlPasswordInputProps<TFieldValues>): React.ReactNode {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <>
      <FormControl>
        <div
          className={cn(
            "flex gap-3.5 items-center h-12 px-4 rounded-lg border border-primary-cGrey92 text-primary-cDark65 overflow-hidden",
            fieldState.invalid && "border-destructive"
          )}
        >
          <input
            placeholder={placeholder}
            {...field}
            type={showPassword ? "text" : "password"}
            className={cn(
              "w-full h-12 rounded-lg text-base border-none outline-none placeholder:text-primary-cGreyAC placeholder:text-back placeholder:font-normal pr-4 text-primary-cDark65 focus-visible:outline-none focus:outline-none",
              className
            )}
          />
          <span
            className="cursor-pointer"
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? (
              <MdOutlineVisibilityOff size={22} />
            ) : (
              <MdOutlineVisibility size={22} />
            )}
          </span>
        </div>
      </FormControl>
    </>
  );
}
