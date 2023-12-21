import { useCallback, useState } from "react";

const useToggle = (initValue) => {
  const [value, setValue] = useState(initValue);
  const action = useCallback(() => {
    setValue((pre) => !pre);
  }, []);

  return [value, action, setValue];
};

export default useToggle;
