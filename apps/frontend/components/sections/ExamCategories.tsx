"use client";

const categories = [
  {
    name: "Engineering Exams",
    description: "JEE Main, JEE Advanced, State CETs",
    icon: "⚙️",
  },
  {
    name: "Medical Exams",
    description: "NEET, AIIMS, JIPMER",
    icon: "🧬",
  },
  {
    name: "Government Jobs",
    description: "SSC, UPSC, Banking, Railways",
    icon: "🏛️",
  },
  {
    name: "School Boards",
    description: "CBSE, ICSE, State Boards",
    icon: "📚",
  },
  {
    name: "IT Certifications",
    description: "AWS, Azure, Google Cloud",
    icon: "💻",
  },
  {
    name: "Languages",
    description: "IELTS, TOEFL, GRE, GMAT",
    icon: "🌍",
  },
];

export function ExamCategories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-800">
          Explore Exam Categories
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="text-4xl">{cat.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
