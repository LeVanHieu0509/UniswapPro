import { useAppSelector } from "hooks/use-redux";
import LoadingPage from "../loading-page";

const RootAppLoading = () => {
  const { loading } = useAppSelector((state) => state.rootReducer);

  return <LoadingPage loading={loading && Object.values(loading).findIndex((value) => value === "global") > -1} />;
};

export default RootAppLoading;
