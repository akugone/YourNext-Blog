import { useState } from 'react';

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number,
): ((...args: any[]) => void) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return (...args: any[]): void => {
    clearTimeout(timeoutId!);
    setTimeoutId(setTimeout(() => callback(...args), delay));
  };
};
