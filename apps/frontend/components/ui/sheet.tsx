"use client";
import * as React from "react";

export function Sheet({ children, open, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (o: boolean)=>void; }) {
// Controlled wrapper – just render children; SheetTrigger/SheetContent manage visibility via parent state (as in your Navbar).
return <>{children}</>;
}

export function SheetTrigger({ asChild, children, onClick }: { asChild?: boolean; children: React.ReactNode; onClick?: () => void }) {
if (asChild && React.isValidElement(children)) {
return React.cloneElement(children as any, { onClick: (e: any) => { (children as any).props?.onClick?.(e); onClick?.(); } });
}
return <button onClick={onClick}>{children}</button>;
}

export function SheetContent({ side = "right", className = "", children }: { side?: "left" | "right" | "top" | "bottom"; className?: string; children: React.ReactNode }) {
// Minimal slide-over panel
const sideClasses: Record<string, string> = {
right: "right-0 inset-y-0 w-80",
left: "left-0 inset-y-0 w-80",
top: "top-0 inset-x-0 h-80",
bottom: "bottom-0 inset-x-0 h-80"
};
return (
<div className="fixed inset-0 z-50">
<div className="absolute inset-0 bg-black/40" />
<div className={`absolute bg-card border p-4 ${sideClasses[side]} ${className}`} role="dialog">
{children}
</div>
</div>
);
}
export default Sheet