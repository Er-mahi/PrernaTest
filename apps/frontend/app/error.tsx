"use client";
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
return (
<div className="grid min-h-screen place-items-center p-6">
<div className="max-w-md rounded-xl border bg-card p-6 text-center">
<h1 className="text-2xl font-bold">Something went wrong</h1>
<p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
</div>
</div>
);
}