import { FormMessage } from "@/components/ui/form";
import { ControllerFieldState } from "react-hook-form";

export default function CustomFormMessage({
  fieldState,
}: {
  fieldState: ControllerFieldState;
}): React.ReactNode {
  return (
    <>
      {fieldState.invalid && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </>
  );
}
