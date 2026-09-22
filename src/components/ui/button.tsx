import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,background-color,color,opacity,border-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-fg hover:bg-accent-hover active:scale-[0.98]",
        secondary:
          "bg-surface text-fg border border-border hover:border-border-strong hover:bg-surface-2 active:scale-[0.98]",
        ghost: "bg-transparent text-fg hover:bg-surface-2 active:scale-[0.98]",
        outline:
          "bg-transparent text-fg border border-border-strong hover:bg-surface active:scale-[0.98]",
        danger:
          "bg-danger text-accent-fg hover:opacity-90 active:scale-[0.98]",
      },
      size: {
        default: "h-11 rounded-[12px] px-4 text-sm",
        sm: "h-9 rounded-[10px] px-3 text-sm",
        lg: "h-12 rounded-[14px] px-5 text-base",
        icon: "size-11 rounded-[12px]",
        pill: "h-9 rounded-full px-3.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
