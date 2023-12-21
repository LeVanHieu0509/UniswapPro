import p from "../../package.json";
import { RootState } from "../redux/store";

const getLocalStore = (): RootState => {
  const serializedState = localStorage.getItem(`state:${p.name}`);
  if (serializedState) {
    return JSON.parse(serializedState);
  }
};

export default getLocalStore;
