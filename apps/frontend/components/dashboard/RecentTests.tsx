// components/dashboard/RecentTests.tsx
import { Clock, Trophy } from "lucide-react";

interface Test {
  id: number;
  title: string;
  score: number;
  date: string;
  duration: number;
  status: string;
}

interface RecentTestsProps {
  tests: Test[];
}

export function RecentTests({ tests }: RecentTestsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 75) return "text-blue-600 bg-blue-50";
    if (score >= 60) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">{test.title}</h4>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{formatDate(test.date)}</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{test.duration} min</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(test.score)}`}>
              {test.score}%
            </div>
            {test.score >= 85 && <Trophy className="h-4 w-4 text-amber-500" />}
          </div>
        </div>
      ))}
    </div>
  );
}
