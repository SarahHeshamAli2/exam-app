"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils/tailwind-merge";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden  bg-blue-50", className)}
    {...props}>
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-blue-600 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    displayText?: string;
  }
>(({ className, value, displayText, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative h-16 w-16 overflow-hidden rounded-full bg-primary/20 flex justify-center items-center`,
      className
    )}
    {...props}
    style={{
      background: `radial-gradient(closest-side, white 76%, transparent 77% 100%), conic-gradient(from -90deg, rgb(37 99 235) ${
        value || 0
      }%, rgb(239 246 255) ${value || 0}%)`,
    }}>
    <div className="text-sm font-semibold">
      {displayText || `${value || 0}`}
    </div>
  </ProgressPrimitive.Root>
));
CircleProgress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, CircleProgress };
