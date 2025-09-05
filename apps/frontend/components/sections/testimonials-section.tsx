import { Card } from "@/components/ui/Card";

export function TestimonialsSection() {
  return (
    <section className="section-padding container mx-auto px-6">
      <h2 className="mb-6 text-center text-3xl font-bold">What students say about TestMitra</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <p className="text-sm">
            "TestMitra's practice tests helped me identify my weak areas and improve my scores significantly."
          </p>
          <p className="mt-3 text-xs text-muted-foreground">- Priya S., Engineering Student</p>
        </Card>
        <Card>
          <p className="text-sm">
            "The detailed explanations after each test really helped me understand concepts I was struggling with."
          </p>
          <p className="mt-3 text-xs text-muted-foreground">- Rohit K., Medical Aspirant</p>
        </Card>
        <Card>
          <p className="text-sm">
            "Great platform for exam preparation. The timer feature made me practice under real exam conditions."
          </p>
          <p className="mt-3 text-xs text-muted-foreground">- Sneha M., CA Student</p>
        </Card>
      </div>
    </section>
  );
}