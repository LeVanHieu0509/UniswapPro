import { DataTable, TableConfig } from "@custom-types/config-table";
import { cloneDeep, isNil } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Spacing } from "styles";
import ConfigTable from "./config-table";
import CustomTable from "./custom-table";
import Pagination from "./pagination";
import { ConfigWrapper, TableWrapper } from "./styled";

export type Limit = 5 | 10 | 20 | 30 | 40 | 50;

export interface Sort {
  isASC?: boolean | null;
  attribute?: TableConfig | null;
}

export interface Table {
  config: TableConfig[];
  data: DataTable[][];
  columnSticky?: number;
  showConfig?: boolean;
  showOrderNo?: boolean;
  showPagination?: boolean;
  limitPagination?: Limit;
  loading?: string | boolean;
  isStickyHeader?: boolean;
  extendHead?: any;
  multiSelect?: any;
  customEmptyData?: any;
  onChangeMultiSelect?: (data: any) => void;
}

/**
 * @param config // to render head
 * @param data // to render body
 * @param columnSticky // to render sticky column
 * @param showConfig // to show setting
 * @param showOrderNo // to show STT
 * @param showPagination // to show pagination
 * @param limitPagination // to limit pagination
 * @param loading // to loading inside table
 * @param isStickyHeader // to sticky header
 * @param extendHead // to add head row
 * @param multiSelect // to select per row
 * @param onChangeMultiSelect // to change value of multi select
 * @param customEmptyData // to custom table if empty data
 */
const Table = ({
  config,
  data,
  columnSticky,
  showConfig = true,
  showOrderNo = true,
  showPagination = true,
  limitPagination = 10,
  loading,
  isStickyHeader,
  extendHead,
  multiSelect,
  customEmptyData,
  onChangeMultiSelect,
}: Table) => {
  const [dataPerPage, setDataPerPage] = useState<DataTable[][]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limited, setLimited] = useState(limitPagination);
  const [orderNo, setOrderNoRender] = useState(1);
  const [configSate, setConfigState] = useState(config);
  const [sort, setSort] = useState<Sort>({ attribute: null, isASC: true });

  useEffect(() => {
    if (config !== configSate) {
      setConfigState(config);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  useEffect(() => {
    const limit = showPagination ? limited : data?.length;
    const total = Math.ceil(data?.length / limit);
    const page = currentPage > total ? 1 : currentPage;
    const start = (page - 1) * limit;
    const end = limit * page;

    const sortData = !isNil(sort.attribute)
      ? [...data].sort((a, b) => {
          const compare = sort.isASC ? 1 : -1;
          const fieldA = a.find((data) => data.config.key === sort.attribute.key).originData;
          const fieldB = b.find((data) => data.config.key === sort.attribute.key).originData;

          if (sort.attribute.type === "string") {
            return compare * (fieldA?.localeCompare(fieldB) ?? 0);
          } else if (sort.attribute.type === "number" || sort.attribute.type === "percent") {
            return compare * (fieldA - fieldB);
          } else if (sort.attribute.type === "date") {
            if (fieldA === fieldB) {
              return 0;
            }

            const mA = moment(fieldA).isValid() ? moment(fieldA) : moment(fieldA, "DD/MM/YYYY");
            const mB = moment(fieldB).isValid() ? moment(fieldB) : moment(fieldB, "DD/MM/YYYY");

            return compare * (mA.isAfter(mB) ? 1 : -1);
          }

          return 0;
        })
      : [...data];
    const newData = sortData.slice(start, end);

    setOrderNoRender(start);
    setTotalPage(total);
    setCurrentPage(page);
    setDataPerPage(newData);
  }, [showPagination, data, currentPage, limited, sort]);

  const currentConfig = useMemo(() => {
    return configSate.filter((attribute) => attribute.show);
  }, [configSate]);

  const currentData = useMemo(() => {
    return dataPerPage?.map((row) =>
      configSate.filter((config) => config.show).map((data) => row?.find((i) => i.config.key === data.key))
    );
  }, [configSate, dataPerPage]);

  const onChangeLimited = useCallback((limitedChange: Limit) => {
    setLimited(limitedChange);
  }, []);

  const onChangePage = (pageChange: number) => {
    setCurrentPage(pageChange);
  };

  const handleSort = useCallback((attribute: TableConfig) => {
    setSort((pre) =>
      pre.attribute?.key !== attribute.key
        ? { attribute: attribute, isASC: true }
        : pre.isASC === true
        ? { attribute: attribute, isASC: false }
        : { attribute: null, isASC: null }
    );
  }, []);

  const handleReset = useCallback(() => {
    const cloneConfig = cloneDeep(configSate);
    cloneConfig.forEach((attribute) => (attribute.show = true));
    setConfigState(cloneConfig);
  }, [configSate]);

  return (
    <TableWrapper className="hide-mobile">
      {showConfig ? (
        <ConfigWrapper>
          <Spacing />
          {showConfig && <ConfigTable config={configSate} onChangeConfig={setConfigState} onReset={handleReset} />}
        </ConfigWrapper>
      ) : null}
      <CustomTable
        sort={sort}
        data={currentData}
        config={currentConfig}
        loading={loading}
        orderNo={orderNo}
        showOrderNo={showOrderNo}
        columnSticky={columnSticky}
        isStickyHeader={isStickyHeader}
        extendHead={extendHead}
        multiSelect={multiSelect}
        currentPage={currentPage}
        customEmptyData={customEmptyData}
        onSort={handleSort}
        onChangeMultiSelect={onChangeMultiSelect}
      />
      {data?.length && showPagination ? (
        <Pagination
          limited={limited}
          totalPage={totalPage}
          currentPage={currentPage}
          onChangeLimited={onChangeLimited}
          onChangePage={onChangePage}
        />
      ) : null}
    </TableWrapper>
  );
};

export default Table;
