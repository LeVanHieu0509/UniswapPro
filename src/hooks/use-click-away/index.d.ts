import { RefObject } from "react";

declare function useClickAway<E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  callback: (event: E) => void,
  events: [string] = ["mousedown", "touchstart"]
): void;

export default useClickAway;
