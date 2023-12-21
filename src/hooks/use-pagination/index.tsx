import { useMemo, useState } from "react";

/**
 * @param data any.
 * @param volume số item 1 page.
 */

export const usePagination = (data: any[], volume: number = 5) => {
  const [page, setPage] = useState(1);

  const start = (page - 1) * volume;
  const end = volume * page;

  const totalPages = useMemo(() => Math.ceil(data.length / volume), [volume, data.length]);
  const slicedData = useMemo(() => data.slice(start, end), [volume, page]);

  return { data: slicedData, page, totalPages, setPage };
};
