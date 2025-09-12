// components/test/TestSubmitModal.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { X, AlertTriangle } from "lucide-react";

interface TestSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  stats: {
    total: number;
    answered: number;
    notAnswered: number;
    markedForReview: number;
  };
}

export function TestSubmitModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  stats,
}: TestSubmitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <h3 className="text-lg font-medium text-gray-900">
                Submit Test
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Are you sure you want to submit your test? You won't be able to make changes after submission.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-gray-400">
              <div className="flex justify-between text-sm">
                <span>Total Questions:</span>
                <span className="font-medium">{stats.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Answered:</span>
                <span className="font-medium text-green-600">{stats.answered}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Not Answered:</span>
                <span className="font-medium text-red-600">{stats.notAnswered}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Marked for Review:</span>
                <span className="font-medium text-purple-600">{stats.markedForReview}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Test'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
