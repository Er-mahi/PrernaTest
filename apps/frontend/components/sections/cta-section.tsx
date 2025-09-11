import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="section-padding container mx-auto px-6 mt-10 mb-2">
      <div className="rounded-2xl border bg-card p-10 text-center">
        <h2 className="text-2xl font-bold">Ready to start your test preparation?</h2>
        <p className="mt-2 text-muted-foreground">Join thousands of students and start practicing today.</p>
        <div className="mt-6">
          <Link href="/sign-up"><Button className="border-0 bg-blue-600 text-white">Start Practicing Free</Button></Link>
        </div>
      </div>
    </section>
  );
}