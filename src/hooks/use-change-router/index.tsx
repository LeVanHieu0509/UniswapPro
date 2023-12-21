import { isEmpty, isEqual, omitBy } from "lodash";
import { NextRouter, useRouter } from "next/router";
import { stringifyUrl } from "query-string";
import { ParsedUrlQuery } from "querystring";
import { useCallback, useState } from "react";

type OnChangeRouterType = (data: ParsedUrlQuery, keepPage?: false) => void;
const useChangeRouter = (): [NextRouter, OnChangeRouterType] => {
  const router = useRouter();
  const [state] = useState<{ func?: OnChangeRouterType }>({});

  state.func = (data, keepPage) => {
    if (!keepPage && !data.page) {
      data.page = "1";
    }
    const newQuery = omitBy({ ...router.query, ...data }, isEmpty);
    if (isEqual(newQuery, router.query)) {
      return;
    }
    router.push(
      stringifyUrl({
        url: router.pathname,
        query: newQuery,
      }),
      null,
      { shallow: true }
    );
  };

  const onChangeRouter = useCallback<OnChangeRouterType>((data, keepPage) => {
    state.func(data, keepPage);
  }, []);

  return [router, onChangeRouter];
};

export default useChangeRouter;
