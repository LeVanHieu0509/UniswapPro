import { LoadingKey, LoadingName, LoadingType } from "@custom-types/loading";
import axios, { AxiosResponse, CancelToken } from "axios";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";

interface LoadingProps {
  type: LoadingType;
  name: LoadingName;
}

function useActionApi<P = any, T = any>(
  api: (cancelToken?: CancelToken, body?: P) => Promise<AxiosResponse<T>>
): (body: P, loading?: LoadingProps) => Promise<AxiosResponse<T>> {
  const dispatch = useDispatch();

  const [state] = useState({
    cancelToken: axios.CancelToken.source(),
  });

  const action = useCallback(
    async (body: P, loading?: LoadingProps) => {
      try {
        state.cancelToken?.cancel();
      } catch (e) {}
      state.cancelToken = axios.CancelToken.source();
      try {
        //set loading
        if (loading) {
          dispatch(
            rootAction.setLoading({
              [loading.name]: loading.type,
            } as LoadingKey)
          );
        }
        return await api(state.cancelToken.token, { ...body });
      } catch (e) {
        throw e;
      } finally {
        if (loading) {
          dispatch(
            rootAction.setLoading({
              [loading.name]: "",
            } as LoadingKey)
          );
        }
      }
    },
    [api]
  );

  return action;
}

export default useActionApi;
