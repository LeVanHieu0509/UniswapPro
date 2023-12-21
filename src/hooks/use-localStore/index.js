import { useState, useEffect } from "react";

const useLocalStorage = (key) => {
  const isBrowser = typeof window === "object";
  const value = isBrowser ? localStorage.getItem(key) || "" : "";
  const [state, setState] = useState(value);

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
