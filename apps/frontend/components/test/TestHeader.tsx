// components/test/TestHeader.tsx
import { Button } from "@/components/ui/Button";

interface TestHeaderProps {
  testTitle: string;
  timeRemaining: number;
  onSubmit: () => void;
}

export function TestHeader({ testTitle, timeRemaining, onSubmit }: TestHeaderProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Test Title */}
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-0">
          {testTitle}
        </h1>
        
        {/* Timer and Submit Button - Stack on mobile, inline on desktop */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* Timer */}
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-blue-600 font-mono text-sm sm:text-base font-medium">
              {formatTime(timeRemaining)}
            </span>
          </div>
          
          {/* Submit Button */}
          <Button 
            onClick={onSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm sm:text-base w-full sm:w-auto"
          >
            Submit Test
          </Button>
        </div>
      </div>
    </div>
  );
}
