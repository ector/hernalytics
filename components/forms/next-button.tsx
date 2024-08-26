import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface FormNextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export default function FormNextButton({
  text = "NEXT",
  ...props
}: FormNextButtonProps): React.ReactNode {
  return (
    <div className="w-full !mt-[60px]">
      <button
        {...props}
        type="button"
        className="w-full py-[15px] bg-primary-cGreen74 text-center text-white font-medium rounded"
      >
        {text}
      </button>
    </div>
  );
}
