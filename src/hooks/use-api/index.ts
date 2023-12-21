import { AxiosResponse, CancelToken } from "axios";
import useActionApi from "hooks/use-action-api";
import { useCallback, useState } from "react";
import { handleError } from "utils";

type ApiResponse<T> = {
  loading?: boolean;
  data?: AxiosResponse<T>;
  error?: any;
};
function useApi<P = any, T = any>(
  api: (cancelToken?: CancelToken, body?: P) => Promise<AxiosResponse<T>>
): [ApiResponse<T>, (body: P, successResponse?: any) => void] {
  const [response, setResponse] = useState<ApiResponse<T>>();

  const actionApi = useActionApi(api);

  const action = useCallback(
    async (body?: P, successResponse?: any) => {
      try {
        setResponse({ loading: true });
        const { data } = await actionApi({ ...body });
        setResponse({ data: { data: data }, ...successResponse });
      } catch (e) {
        console.error(e);
        handleError(e);
        setResponse({ error: e });
      }
    },
    [api]
  );

  return [response, action];
}

export default useApi;
