import * as React from "react";
export function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
return <input className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500/30 ${className}`} {...props} />;
}
export default Input;