"use client";

interface TestTimerProps {
  timeRemaining: number;
  isUrgent?: boolean;
}

export function TestTimer({ timeRemaining, isUrgent }: TestTimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div
      className={`px-3 py-1 rounded-lg font-semibold ${
        isUrgent ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
      }`}
    >
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
