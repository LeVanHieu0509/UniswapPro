import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useRedirect = (pathName: string) => {
  const [calledPush, setCalledPush] = useState(false); // <- add this state

  const router = useRouter();

  useEffect(() => {
    if (calledPush) {
      return;
    }

    router.replace(router.pathname + pathName + window.location.search);
    setCalledPush(true);
  }, [calledPush, router, pathName]);
};

export default useRedirect;
