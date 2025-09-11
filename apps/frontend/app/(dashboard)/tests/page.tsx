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
      <div className="container mx-auto px-3 sm:px-6 py-6 sm:py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700 mx-auto mb-4"></div>
            <p className="text-slate-600 text-sm sm:text-base">Loading tests…</p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Ensure data is always an array
  const tests: TestLite[] = data ?? [];

  return (
    <div className="container mx-auto px-3 sm:px-6 py-6 sm:py-12">
      {/* Header Section - Better mobile spacing */}
      <div className="mb-4 sm:mb-8">
        <h1 className="text-lg sm:text-2xl lg:text-3xl text-slate-700 font-bold leading-tight">
          Available Tests
        </h1>
        <p className="mt-1 sm:mt-2 text-xs sm:text-base text-slate-600 hidden sm:block">
          Choose from our collection of practice tests and mock exams
        </p>
      </div>
      
      {/* Tests Grid - Optimized for mobile */}
      <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {tests.map((t) => (
          <Card key={t.id} className="modern-card bg-slate-700 p-3 sm:p-6 hover:shadow-lg transition-shadow duration-200 min-h-[180px] sm:min-h-[200px]">
            <div className="flex flex-col h-full">
              {/* Header - Compact for mobile */}
              <div className="flex-1 min-h-0">
                <h3 className="text-sm sm:text-lg font-semibold text-white line-clamp-2 mb-1 sm:mb-2 leading-snug">
                  {t.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-4 leading-relaxed">
                  {t.description}
                </p>
              </div>

              {/* Test Details - Compact layout */}
              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 sm:mb-3">
                  <span className="flex items-center space-x-1">
                    <span>⏱</span>
                    <span>{t.duration}m</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>📊</span>
                    <span>{t.totalMarks} marks</span>
                  </span>
                </div>

                {/* Price and Action - Mobile-first design */}
                <div className="border-t border-slate-600 pt-2 sm:pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-base font-medium text-white">
                      {t.isFree ? (
                        <span className="text-green-400 text-xs sm:text-sm">Free</span>
                      ) : (
                        <span className="text-xs sm:text-sm">₹{t.price ?? 0}</span>
                      )}
                    </span>
                    <Link href={`/tests/${t.id}`}>
                      <Button className="px-3 sm:px-6 py-1.5 sm:py-2.5 text-xs sm:text-base font-medium bg-blue-600 hover:bg-blue-700">
                        Start
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State - Mobile optimized */}
      {tests.length === 0 && (
        <div className="text-center py-8 sm:py-20 px-4">
          <div className="text-slate-400 mb-3 sm:mb-4">
            <svg className="mx-auto h-10 w-10 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-base sm:text-xl font-medium text-slate-700 mb-1 sm:mb-2">No Tests Available</h3>
          <p className="text-xs sm:text-base text-slate-500 max-w-sm sm:max-w-md mx-auto leading-relaxed">
            Tests are being prepared. Check back later for practice tests and mock exams.
          </p>
        </div>
      )}
    </div>
  );
}
