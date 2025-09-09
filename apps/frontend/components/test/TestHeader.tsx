// components/test/TestHeader.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { Clock, AlertTriangle } from "lucide-react";

interface TestHeaderProps {
  testTitle: string;
  timeRemaining: number;
  onSubmit: () => void;
}

export function TestHeader({ testTitle, timeRemaining, onSubmit }: TestHeaderProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isTimeRunningOut = timeRemaining < 600; // Less than 10 minutes

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg lg:text-xl font-bold text-gray-900 truncate">
            {testTitle}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Timer */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-mono text-lg font-bold ${
            isTimeRunningOut 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            <Clock className="h-5 w-5" />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Submit Button */}
          <Button
            onClick={onSubmit}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Submit Test
          </Button>
        </div>
      </div>
    </header>
  );
}
