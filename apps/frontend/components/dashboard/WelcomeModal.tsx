"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Trophy, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as={Fragment}  onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    Welcome to PrernaTest! 🎉
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    You're all set to begin your exam preparation journey. Here's what you can do:
                  </p>

                  <div className="space-y-3">
                    <FeatureCard
                      icon={<Trophy className="h-5 w-5 text-blue-600" />}
                      title="Take Practice Tests"
                      description="Build your confidence with mock exams"
                      bg="bg-blue-50"
                      text="text-blue-900"
                      descText="text-blue-700"
                    />
                    <FeatureCard
                      icon={<Target className="h-5 w-5 text-green-600" />}
                      title="Track Your Progress"
                      description="Monitor your scores and improvement"
                      bg="bg-green-50"
                      text="text-green-900"
                      descText="text-green-700"
                    />
                    <FeatureCard
                      icon={<Zap className="h-5 w-5 text-purple-600" />}
                      title="Build Your Streak"
                      description="Practice daily to maintain momentum"
                      bg="bg-purple-50"
                      text="text-purple-900"
                      descText="text-purple-700"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 flex space-x-3">
                  <Button onClick={onClose} className="flex-1">
                    Get Started
                  </Button>
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Take Tour
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// FeatureCard component for reusability
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bg: string;
  text: string;
  descText: string;
}

function FeatureCard({ icon, title, description, bg, text, descText }: FeatureCardProps) {
  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg ${bg}`}>
      {icon}
      <div>
        <p className={`font-medium ${text}`}>{title}</p>
        <p className={`text-xs ${descText}`}>{description}</p>
      </div>
    </div>
  );
}
