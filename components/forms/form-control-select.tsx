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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FormControlSelectProps<TFieldValues extends FieldValues> {
  border?: boolean;
  placeholder: string;
  field: ControllerRenderProps<TFieldValues, any>;
  fieldState?: ControllerFieldState;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  options?: {value: string, label: string}[];
}

export default function FormControlSelect<TFieldValues extends FieldValues>({
  placeholder,
  field,
  fieldState,
  border = true,
  className = "",
  type = "text",
  options,
}: FormControlSelectProps<TFieldValues>): React.ReactNode {
  return (
    <>
      <FormControl>
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {
              options?.map((option) => (
                <SelectItem value={option?.value}>{option?.label}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </FormControl>
    </>
  );
}
