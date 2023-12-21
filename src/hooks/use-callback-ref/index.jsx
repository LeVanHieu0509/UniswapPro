import { useCallback, useRef } from "react";

export default function useCallbackRef(func) {
  const ref = useRef();
  ref.current = func;
  return useCallback((...a) => {
    ref.current(...a);
  }, []);
}
