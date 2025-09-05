"use client";
import * as React from "react";
export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
if (!open) return null;
return (
<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
<div className="w-full max-w-lg rounded-xl border bg-card p-6" onClick={(e)=>e.stopPropagation()}>{children}</div>
</div>
);
}
export default Modal;