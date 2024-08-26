import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface CustomFormSettingLabelProps<TFieldValues extends FieldValues> {
  text: string;
  className?: string;
  field: ControllerRenderProps<TFieldValues, any>;
}

export default function CustomFormSettingLabel<
  TFieldValues extends FieldValues
>({
  text,
  className = "",
  field,
}: CustomFormSettingLabelProps<TFieldValues>): React.ReactNode {
  const calculatePasswordStrength = (password: any) => {
    const criteria = [
      /.{8,}/, // at least 8 characters
      /[A-Z]/, // at least one uppercase letter
      /[a-z]/, // at least one lowercase letter
      /[0-9]/, // at least one number
    ];

    let strength = 0;

    criteria.forEach((regex) => {
      if (regex.test(password)) {
        strength += 1;
      }
    });

    // Calculate strength as a percentage (0 to 100)
    return (strength / criteria.length) * 100;
  };

  let strength = calculatePasswordStrength(field?.value);
  console.log("strength", strength);

  return (
    <div className="flex items-center justify-between">
      <FormLabel
        className={cn("text-primary-cDark65 font-medium text-base", className)}
      >
        {text}
      </FormLabel>
      <div className="bg-[#E1E3E3] h-1 w-28 rounded-full">
        <div
          className="h-full rounded-full"
          style={{
            width: strength !== 0 ? `${strength}%` : 0,
            background:
              strength <= 25
                ? "#dc6c2e"
                : strength > 25 && strength <= 50
                ? "#E5B805"
                : "#009306",
          }}
        />
      </div>
    </div>
  );
}
