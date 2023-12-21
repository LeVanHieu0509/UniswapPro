import { Limit } from "..";
import NumberPagination from "./number";
import SelectLimited from "./select-limited";
import { PaginationWrapper } from "./styled";

interface PaginationProps {
  limited?: Limit;
  totalPage?: number;
  currentPage?: number;
  onChangePage?: (page: number) => void;
  onChangeLimited?: (limited: Limit) => void;
}

const Pagination = ({ limited, totalPage, currentPage, onChangeLimited, onChangePage }: PaginationProps) => {
  return (
    <PaginationWrapper>
      <SelectLimited value={limited} onChange={onChangeLimited} />
      <NumberPagination totalPage={totalPage} currentPage={currentPage} onChangePage={onChangePage} />
    </PaginationWrapper>
  );
};

export default Pagination;
