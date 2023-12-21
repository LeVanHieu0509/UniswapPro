import { useEffect, useState } from "react";

const useOnWindowResize = (callback: () => void, deps: any[] = []) => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [state] = useState({ cb: callback });
  state.cb = callback;

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      state.cb();
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, deps); // Empty array ensures that effect is only run on mount

  return state;
};

export default useOnWindowResize;
