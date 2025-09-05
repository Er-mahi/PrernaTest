import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          
          // Variants
                    // Variants
          variant === "default" &&
            "bg-blue-600 text-white shadow hover:bg-blue-700 hover:shadow-md",
          variant === "destructive" &&
            "bg-red-600 text-white shadow hover:bg-red-700 hover:shadow-md",
          variant === "outline" &&
            "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400",
          variant === "secondary" &&
            "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200",
          variant === "ghost" &&
            "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          variant === "link" &&
            "text-blue-600 underline-offset-4 hover:underline",

          
          // Sizes
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 rounded-md px-3 text-xs",
          size === "lg" && "h-12 rounded-lg px-8 text-base",
          size === "icon" && "h-10 w-10",
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };