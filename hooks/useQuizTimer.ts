import { useState, useEffect, useRef, useCallback } from 'react';

export function useQuizTimer(initialTime: number, isActive: boolean = false) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isTimerActive, setIsTimerActive] = useState(isActive);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeUpRef = useRef<(() => void) | null>(null);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsTimerActive(isActive);
  }, [isActive]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isTimerActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            // Call onTimeUp callback if provided
            if (onTimeUpRef.current) {
              onTimeUpRef.current();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTimerActive, timeRemaining]);

  const resetTimer = useCallback((newTime?: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimeRemaining(newTime || initialTime);
    setIsTimerActive(isActive);
  }, [initialTime, isActive]);

  const pauseTimer = useCallback(() => {
    setIsTimerActive(false);
  }, []);

  const resumeTimer = useCallback(() => {
    if (timeRemaining > 0) {
      setIsTimerActive(true);
    }
  }, [timeRemaining]);

  const setOnTimeUp = useCallback((callback: () => void) => {
    onTimeUpRef.current = callback;
  }, []);

  return {
    timeRemaining,
    isActive: isTimerActive,
    resetTimer,
    pauseTimer,
    resumeTimer,
    setOnTimeUp,
  };
}