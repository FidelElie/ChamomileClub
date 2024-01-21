import { useEffect, useRef, useState } from "react";

export const useDebounce = <T>(value: T, delay: number) => {
  // State and setters for debounced value
  const initialised = useRef(false);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [debouncing, setDebouncing] = useState(false);

  useEffect(
    () => {
      if (initialised.current) {
        if (value === debouncedValue) { return; }
        setDebouncing(true);
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
          setDebouncing(false);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      } else {
        initialised.current = true;
      }
    },
    [value, delay], // Only re-call effect if value or delay changes
  );

  return {
    value: debouncedValue,
    isDebouncing: debouncing,
    setValue: setDebouncedValue,
  };
};
