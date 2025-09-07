"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { TestLite } from "@/types/test";

export default function TestsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await api.tests.getAll();
      // Always return just the array of tests
      return Array.isArray(res) ? res : res.tests;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        Loading tests…
      </div>
    );
  }

  // ✅ Ensure data is always an array
  const tests: TestLite[] = data ?? [];

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="mb-6 text-2xl text-slate-700 font-bold">Available Tests</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tests.map((t) => (
          <Card key={t.id} className="modern-card bg-slate-700">
            <h3 className="text-lg font-semibold">{t.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
              {t.description}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Duration: {t.duration}m</span>
              <span>Marks: {t.totalMarks}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm">
                {t.isFree ? "Free" : `₹${t.price ?? 0}`}
              </span>
              <Link href={`/tests/${t.id}`}>
                <Button>Start</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
