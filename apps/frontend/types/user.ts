export type Profile = { id: string; email: string; name?: string | null; image?: string | null };

// export interface UserStats {
//   testsCompleted: number;
//   averageScore: number;
//   totalTimeSpent: number; // ✅ Match your API field name
//   streak: number; // ✅ Match your API field name
// }

interface UserStats {
  testsCompleted: number;
  averageScore: number;
  totalScore: number;
  rank: number;
  streakDays: number;
}
