import { useEffect, useRef } from "react";

const defaultEvents = ["mousedown", "touchstart"];

export default function useClickAway(ref, callback, events = defaultEvents) {
  const r = useRef();
  r.current = callback;
  useEffect(() => {
    const handler = (event) => {
      const { current: el } = ref;
      el && !el.contains(event.target) && r.current(event);
    };
    for (const eventName of events) {
      document.addEventListener(eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handler);
      }
    };
  }, [events, ref]);
}
