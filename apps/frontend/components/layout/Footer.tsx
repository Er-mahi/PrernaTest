export function Footer() {
return (
<footer className="border-t py-10">
<div className="container mx-auto px-4 text-sm text-muted-foreground">
<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
<p>© {new Date().getFullYear()} PrernaTest</p>
<div className="flex gap-4">
<a href="#" className="hover:underline">Privacy</a>
<a href="#" className="hover:underline">Terms</a>
<a href="#" className="hover:underline">Contact</a>
</div>
</div>
</div>
</footer>
);
}