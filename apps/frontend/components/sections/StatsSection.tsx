"use client";

export function StatsSection() {
  const stats = [
    { label: "Registered Students", value: "50,000+" },
    { label: "Tests Available", value: "1,200+" },
    { label: "Average Success Rate", value: "78%" },
    { label: "Active Daily Users", value: "5,000+" },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-10 text-2xl font-bold text-gray-800">
          Our Impact in Numbers
        </h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-3xl font-extrabold text-blue-600">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
