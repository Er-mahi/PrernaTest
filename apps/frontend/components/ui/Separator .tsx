import * as React from "react";
import { cn } from "@/lib/utils";

export function Separator({ 
  orientation = "horizontal", 
  className = "",
  decorative = true,
  ...props 
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
  decorative?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
}

export default Separator;