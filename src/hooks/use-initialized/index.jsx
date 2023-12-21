import { useEffect } from "react";
import { useSelector } from "react-redux";

const useInitialized = (fn, desc = []) => {
  const initialized = useSelector((s) => s.rootReducer.initialized);
  useEffect(() => {
    if (!initialized) {
      return;
    }
    return fn?.();
  }, [initialized, ...desc]);
};

export default useInitialized;
