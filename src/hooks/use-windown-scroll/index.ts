import { useEffect, useState } from "react";

const useWindowScroll = () => {
  const [positionScroll, setWindowSize] = useState(0);

  useEffect(() => {
    const itemScroll = document.querySelector("#scroll-item");
    function handleScroll() {
      setWindowSize(itemScroll.scrollTop);
    }

    itemScroll.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => itemScroll.removeEventListener("scroll", handleScroll);
  }, []);

  return positionScroll;
};

export default useWindowScroll;
