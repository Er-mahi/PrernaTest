import { Card } from "@/components/ui/Card";

export function TestimonialsSection() {
  return (
    <section className="section-padding container mx-auto px-6 mt-6">
      <h2 className="mb-6 text-center text-3xl font-bold">What students say about PrernaTest</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="bg-white">
          <p className="text-sm text-gray-800">
            "PrernaTest's practice tests helped me identify my weak areas and improve my scores significantly."
          </p>
          <p className="mt-3 text-xs text-muted-foreground text-gray-600">- Priya S., Engineering Student</p>
        </Card>
        <Card className="bg-white">
          <p className="text-sm text-gray-800">
            "The detailed explanations after each test really helped me understand concepts I was struggling with."
          </p>
          <p className="mt-3 text-xs text-muted-foreground text-gray-600">- Rohit K., Medical Aspirant</p>
        </Card>
        <Card className="bg-white">
          <p className="text-sm text-gray-800">
            "Great platform for exam preparation. The timer feature made me practice under real exam conditions."
          </p>
          <p className="mt-3 text-xs text-muted-foreground text-gray-600">- Sneha M., CA Student</p>
        </Card>
      </div>
    </section>
  );
}