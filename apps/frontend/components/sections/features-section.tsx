import { Card } from "@/components/ui/Card";

const FEATURES = [
  { title: "Practice Tests", desc: "Access thousands of practice questions across multiple subjects and exam formats." },
  { title: "Real-time Scoring", desc: "Get instant results with detailed explanations to understand your mistakes." },
  { title: "Progress Tracking", desc: "Monitor your improvement over time with comprehensive analytics and insights." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding container mx-auto px-6">
      <h2 className="mb-6 text-center text-3xl font-bold">Everything you need to ace your exams</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.title} className="modern-card bg-white ">
            <h3 className="text-lg font-semibold text-gray-800">{f.title}</h3>
            <p className="mt-2 text-sm  text-muted-foreground text-gray-600">{f.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}