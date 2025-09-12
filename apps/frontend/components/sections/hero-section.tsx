import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative grid min-h-[92vh] place-items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-background dark:to-gray-800">
      <div className="container mx-auto max-w-5xl px-6 text-center mb-30">
        {/* Development Note in Hindi */}
        <div className="mb-20 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200">
          <p className="font-medium">
            📝 <strong>नोट:</strong> यह वेबसाइट अभी डेवलपमेंट फेज में है और अधिकतर डेटा हार्ड कोडेड है। 
            हालांकि, टेस्ट से संबंधित आपको पूरी सही जानकारी मिलेगी। 
          </p>
        </div>


        <span className="inline-block rounded-full border px-3 py-1 text-xs">Trusted by 50,000+ Students</span>
        <h1 className="mt-6 text-balance text-4xl font-bold md:text-6xl">
          Master Your Skills with Online Practice Tests
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
          Take practice tests, track your progress, and ace your exams. Join thousands of students who trust PrernaTest for their test preparation.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/tests"><Button className="border-0 bg-blue-600 text-white">Start Testing Free</Button></Link>
          <Link href="/tests"><Button>Browse Tests</Button></Link>
        </div>
      </div>
    </section>
  );
}
