import { useEffect, useRef, useState } from "react";

const useNumberAnimation = (end: number, time: number = 0.1) => {
  const [state, setState] = useState(0);
  const ref = useRef(0);

  const accumulator = end / 200;

  const updateCounterState = () => {
    if (ref.current < end) {
      const result = Math.ceil(ref.current + accumulator);
      if (result > end) {
        return setState(end);
      }

      setState(result);
      ref.current = result;
    }

    setTimeout(updateCounterState, time);
  };

  useEffect((): any => {
    let isMounted = true;

    if (!end) {
      return;
    }

    if (isMounted) {
      updateCounterState();
    }

    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);

  return state;
};

export default useNumberAnimation;
