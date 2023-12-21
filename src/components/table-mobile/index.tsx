import { ValueLabel } from "@custom-types";
import { DataTable, TableConfig } from "@custom-types/config-table";
import CheckBox from "components/checkbox";
import { Limit } from "components/table";
import Pagination from "components/table/pagination";
import { useCallback, useEffect, useState } from "react";
import ItemTable from "./item-table";
import { DescriptionWrapper, MultiSelectWrapper, TableMobileWrapper } from "./styled";

interface TableMobileProp {
  config: TableConfig[];
  data: DataTable[][];
  description?: ValueLabel[];
  multiSelect?: any[];
  showOrderNo?: boolean;
  showCollapse?: boolean;
  showPagination?: boolean;
  limitPagination?: Limit;
  selected?: any;
  select?: Function;
  onMultiSelect?: (type: any, row?: any) => void;
}

const TableMobile = ({
  data,
  config,
  showOrderNo = true,
  description,
  multiSelect,
  showCollapse = false,
  showPagination = false,
  limitPagination = 10,
  selected,
  select,
  onMultiSelect,
}: TableMobileProp) => {
  const [dataPerPage, setDataPerPage] = useState<DataTable[][]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limited, setLimited] = useState(limitPagination);

  useEffect(() => {
    const limit = showPagination ? limited : data.length;
    const total = Math.ceil(data.length / limit);
    const page = currentPage > total ? 1 : currentPage;
    const start = (page - 1) * limit;
    const end = limit * page;

    const newData = data.slice(start, end);

    setTotalPage(total);
    setCurrentPage(page);
    setDataPerPage(newData);
  }, [showPagination, data, currentPage, limited]);

  const onChangeLimited = useCallback((limitedChange: Limit) => {
    setLimited(limitedChange);
  }, []);

  const onChangePage = useCallback((pageChange: number) => {
    setCurrentPage(pageChange);
    onMultiSelect?.("none");
  }, []);

  return (
    <TableMobileWrapper className="hide-desktop">
      {description?.length > 0 ? (
        <DescriptionWrapper>
          {description.map((item, index) => (
            <h6 key={index}>
              {item.label} : <span>{item.value}</span>
            </h6>
          ))}
        </DescriptionWrapper>
      ) : null}
      {typeof onMultiSelect === "function" ? (
        <MultiSelectWrapper>
          <CheckBox
            checked={multiSelect.length === data.length}
            onChange={() => onMultiSelect(multiSelect.length !== data.length ? "all" : "none")}
          />
        </MultiSelectWrapper>
      ) : null}
      {data?.length ? (
        dataPerPage.map((item, index) => (
          <ItemTable
            key={index}
            showOrderNo={showOrderNo}
            index={index + 1}
            data={item}
            config={config}
            showCollapse={showCollapse}
            multiSelect={multiSelect}
            onMultiSelect={onMultiSelect}
            selected={selected}
            select={select}
          />
        ))
      ) : (
        <ItemTable index={0} data={[]} config={config} />
      )}
      {data?.length && showPagination ? (
        <Pagination
          limited={10}
          totalPage={totalPage}
          currentPage={currentPage}
          onChangeLimited={onChangeLimited}
          onChangePage={onChangePage}
        />
      ) : null}
    </TableMobileWrapper>
  );
};

export default TableMobile;
