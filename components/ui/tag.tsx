import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "px-2 py-[1px] inline-flex items-center justify-center rounded-[2px] text-[16px] font-normal transition-colors",
  {
    variants: {
      variant: {
        danger:
          "bg-primary-cRed99 text-primary-cRed00",
        pending:
          "bg-primary-cYellow99 text-primary-cYellow08",
        complete:
          "bg-primary-cGreenD4D text-primary-cGreen06",
      },
    },
    defaultVariants: {
      variant: "complete",
    },
  }
);

export interface TagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tagVariants> {
  asChild?: boolean;
}

const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
  ({ className, variant, ...props }, ref) => {
    const Comp = "span";
    return (
      <Comp
        className={cn(tagVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Tag.displayName = "Tag";

export { Tag, tagVariants };
