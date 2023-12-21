import { useCallback, useEffect, useRef, useState } from "react";

const useInterval = (delay = 1000) => {
  const [time, setTime] = useState(null);
  const refInterval = useRef<any>();
  const ref = useRef<any>();

  ref.current = () => {
    if (time === 0) {
      clearInterval(refInterval.current);
      setTime(null);
      return;
    }
    setTime(time - 1);
  };

  const action = useCallback(
    (time: any) => {
      setTime(time);
      clearInterval(refInterval.current);
      refInterval.current = setInterval(() => {
        ref.current();
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      clearInterval(refInterval.current);
    };
  }, []);
  return [time, action];
};

export default useInterval;
