"use client";

import { useState, useEffect, useCallback } from "react";

export function useResendTimer(initialSeconds: number = 60) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const resetTimer = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setIsActive(true);
  }, [initialSeconds]);

  const canResend = secondsLeft === 0;

  return {
    secondsLeft,
    canResend,
    resetTimer,
  };
}
