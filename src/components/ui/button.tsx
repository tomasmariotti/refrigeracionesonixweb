import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn, mergeRefs } from "@/lib/utils";
import { useTiltGlow } from "@/hooks/use-tilt-glow";

const buttonVariants = cva(
  "cursor-glow inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium cursor-pointer transition-[color,background-color,border-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-steel text-steel-foreground hover:brightness-105",
        ink: "bg-ink text-ink-foreground hover:bg-navy",
        outlineLight:
          "border border-ink-foreground/30 text-ink-foreground hover:border-ink-foreground/70 hover:bg-ink-foreground/10",
        outlineInk: "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-10 rounded-sm px-8",
        xl: "h-12 px-8 text-[0.9rem] tracking-wide",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const glowRef = useTiltGlow<HTMLButtonElement>({ maxTiltDeg: 0 });
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={mergeRefs(ref, glowRef)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
