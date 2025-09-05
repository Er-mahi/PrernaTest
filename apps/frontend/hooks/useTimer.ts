"use client";

import { useEffect, useState } from "react";

export function useTimer(durationMinutes: number) {
  const [timeRemaining, setTimeRemaining] = useState(durationMinutes * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsTimeUp(true);
      return;
    }
    const timer = setInterval(() => setTimeRemaining((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return { timeRemaining, isTimeUp, formatTime };
}
