import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number = 500, defaultValue?: T) {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    const handle = setTimeout(() => {
      setState(value);
    }, delay);
    return () => {
      clearTimeout(handle);
    };
  }, [value, delay]);

  return state;
}

export default useDebounce;
