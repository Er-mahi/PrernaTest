import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative grid min-h-[92vh] place-items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-background dark:to-gray-800">
      <div className="container mx-auto max-w-5xl px-6 text-center">
        <span className="inline-block rounded-full border px-3 py-1 text-xs">Trusted by 50,000+ Students</span>
        <h1 className="mt-6 text-balance text-4xl font-bold md:text-6xl">
          Master Your Skills with Online Practice Tests
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
          Take practice tests, track your progress, and ace your exams. Join thousands of students who trust TestMitra for their test preparation.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/sign-up"><Button className="border-0 bg-blue-600 text-white">Start Testing Free</Button></Link>
          <Link href="/tests"><Button>Browse Tests</Button></Link>
        </div>
      </div>
    </section>
  );
}