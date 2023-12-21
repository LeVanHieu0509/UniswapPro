import { Dispatch, SetStateAction } from "react";

declare function useToggle<S>(initValue: S): [S, () => {}, Dispatch<SetStateAction<S>>];
export default useToggle;
