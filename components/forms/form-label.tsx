import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export default function CustomFormLabel({
  text,
  className = "",
  size,
}: {
  text: string;
  className?: string;
  size?: string;
}): React.ReactNode {
  return (
    <FormLabel
      className={cn(
        "text-primary-cDark65 font-medium", size == 'small' ? "text-[16px]" : "text-[20px]",
        className
      )}
    >
      {text}
    </FormLabel>
  );
}
