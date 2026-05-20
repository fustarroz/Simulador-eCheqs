import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium leading-none transition-colors whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-line bg-transparent text-ink2",
        // Sage badges
        sage:
          "bg-sage-100 text-sage-700 ring-1 ring-inset ring-sage-200 dark:bg-sage-500/15 dark:text-sage-200 dark:ring-sage-500/25",
        sageSolid:
          "bg-sage-700 text-paper",
        olive:
          "bg-olive-100 text-olive-600 ring-1 ring-inset ring-olive-400/30 dark:bg-olive-500/15 dark:text-olive-400",
        onDark:
          "bg-white/10 text-white/90 ring-1 ring-inset ring-white/15",
        // Institutional pill — used in hero (regulatory badge)
        regulatory:
          "bg-paper2 text-ink2 ring-1 ring-inset ring-line dark:bg-secondary dark:text-foreground/90 dark:ring-border",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
