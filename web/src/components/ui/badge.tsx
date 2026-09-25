import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-accent/25 bg-accent-soft text-accent-deep",
        success: "border-emerald-700/20 bg-emerald-50 text-emerald-800",
        warning: "border-amber-700/20 bg-amber-50 text-amber-900",
        danger: "border-rose-700/20 bg-rose-50 text-rose-800",
        muted: "border-ink/10 bg-paper-muted text-ink-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
