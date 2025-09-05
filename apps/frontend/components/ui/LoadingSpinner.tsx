export function LoadingSpinner(){
return (
<svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
<path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" fill="none"/>
</svg>
);
}
export default LoadingSpinner;