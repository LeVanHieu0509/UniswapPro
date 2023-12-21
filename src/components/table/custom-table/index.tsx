import { DataTable, TableConfig } from "@custom-types/config-table";
import CheckBox from "components/checkbox";
import { cloneDeep, get, range } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatNumberTwoString } from "utils";
import { TBODY, THEAD, TR, TableWrapper } from "styles/table";
import IconSort from "../icons/sort";
import IconSortDown from "../icons/sort-down";
import IconSortUp from "../icons/sort-up";
import {
  ButtonIconCustom,
  CustomTableWrapper,
  ScrollBarWrapper,
  TDCustom,
  THCustom,
  THLabel,
  TableCustom,
} from "./styled";

export interface CustomTableProps {
  config: TableConfig[];
  data: DataTable[][];
  loading: string | boolean;
  showOrderNo?: boolean;
  orderNo?: number;
  sort?: any;
  columnSticky?: number;
  isStickyHeader: boolean;
  extendHead: any;
  multiSelect?: any[];
  currentPage?: number;
  customEmptyData?: any;
  onSort?: (attribute: TableConfig) => void;
  onChangeMultiSelect?: (data: any) => void;
}

const CustomTable = ({
  config,
  data,
  loading,
  showOrderNo,
  orderNo,
  sort,
  columnSticky,
  isStickyHeader,
  extendHead,
  multiSelect,
  currentPage,
  customEmptyData,
  onSort,
  onChangeMultiSelect,
}: CustomTableProps) => {
  const [height, setHeight] = useState("");
  const [leftPosition, setLeftPosition] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const ref = useRef<HTMLTableRowElement>(null);
  const tableRef = useRef<HTMLTableElement>();

  const isMultiSelect = typeof onChangeMultiSelect === "function";

  useEffect(() => {
    const list = range(0, columnSticky + 1).map((item) => {
      return get(ref.current, ["children", item, "offsetWidth"]);
    });

    setLeftPosition(list);
  }, [columnSticky]);

  useEffect(() => {
    let tableHeight = "";

    if (isStickyHeader) {
      if (tableRef.current?.offsetHeight >= 500) {
        tableHeight = "500px";
      } else {
        tableHeight = `${tableRef.current?.offsetHeight}px`;
      }
    } else {
      tableHeight = "100%";
    }

    setHeight(tableHeight);
  }, [data, isStickyHeader]);

  useEffect(() => {
    if (isMultiSelect) {
      setIsSelectAll(false);
    }
  }, [currentPage, isMultiSelect]);

  useEffect(() => {
    if (isMultiSelect && data.length) {
      if (isSelectAll) {
        const originData = data.map((item) => item[0].originData);

        onChangeMultiSelect(originData);
      } else {
        onChangeMultiSelect([]);
      }
    }
  }, [data, isMultiSelect]);

  const handleChangeMultiSelect = useCallback(
    (row: DataTable[]) => {
      const rowData = row[0].originData;

      let cloneMulti = cloneDeep(multiSelect);

      if (multiSelect.findIndex((item) => item?.multiSelectId === rowData.multiSelectId) > -1) {
        cloneMulti = cloneMulti.filter((item) => item.multiSelectId != rowData.multiSelectId);
      } else {
        cloneMulti.push(rowData);
      }

      if (data?.length === cloneMulti?.length) {
        setIsSelectAll(true);
      }

      if (cloneMulti?.length === 0) {
        setIsSelectAll(false);
      }

      onChangeMultiSelect(cloneMulti);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multiSelect, data]
  );

  const handleSelectAll = useCallback(
    (isSelectAll: boolean) => {
      if (!data.length) {
        return;
      }

      setIsSelectAll(isSelectAll);

      if (isSelectAll) {
        const originData = data.map((item) => item[0].originData);

        onChangeMultiSelect(originData);
      } else {
        onChangeMultiSelect([]);
      }
    },
    [data, onChangeMultiSelect]
  );

  return (
    <CustomTableWrapper>
      <TableWrapper isSticky={isStickyHeader}>
        <ScrollBarWrapper maxHeight={height}>
          {/* <ScrollBar> */}
          <TableCustom ref={tableRef} leftPosition={leftPosition}>
            <THEAD>
              {extendHead && extendHead}
              <TR ref={ref}>
                {isMultiSelect ? (
                  <THCustom textAlign="center">
                    <CheckBox
                      isCheckedWhite
                      middle={isSelectAll && multiSelect.length !== data.length}
                      checked={isSelectAll}
                      onChange={() => handleSelectAll(!isSelectAll)}
                    />
                  </THCustom>
                ) : null}
                {showOrderNo ? (
                  <THCustom style={{ width: 58 }} textAlign="center">
                    STT
                  </THCustom>
                ) : null}
                {config.map((attribute, index) => (
                  <THCustom
                    key={index}
                    hasSort={attribute.sort}
                    sticky={attribute?.sticky}
                    onClick={attribute.sort ? () => onSort(attribute) : null}
                  >
                    <THLabel dangerouslySetInnerHTML={{ __html: attribute.label }} />
                    {attribute.sort ? (
                      <ButtonIconCustom>
                        {sort?.attribute?.key !== attribute.key ? (
                          <IconSort />
                        ) : !sort?.isASC ? (
                          <IconSortDown />
                        ) : (
                          <IconSortUp />
                        )}
                      </ButtonIconCustom>
                    ) : null}
                  </THCustom>
                ))}
              </TR>
            </THEAD>
            <TBODY>
              {data?.length ? (
                data.map((row, index) => (
                  <TR key={index} ref={ref}>
                    {isMultiSelect ? (
                      <TDCustom textAlign="center">
                        <CheckBox
                          disabled={
                            multiSelect.find(
                              (item) =>
                                item?.multiSelectId === row[0].originData.multiSelectId && item?.disabled === true
                            )?.disabled
                          }
                          checked={
                            multiSelect.findIndex((item) => item?.multiSelectId === row[0].originData.multiSelectId) >
                            -1
                          }
                          onChange={() => handleChangeMultiSelect(row)}
                        />
                      </TDCustom>
                    ) : null}
                    {showOrderNo ? (
                      <TDCustom style={{ width: 58 }} textAlign="center">
                        {formatNumberTwoString(orderNo + 1 + index)}
                      </TDCustom>
                    ) : null}
                    {row.map((col, i) => (
                      <TDCustom
                        key={col.config.key + i}
                        sticky={col.config?.sticky}
                        textAlign={col.config.textAlign}
                        isRichText={col.config.type === "rich-text"}
                      >
                        {col.node}
                      </TDCustom>
                    ))}
                  </TR>
                ))
              ) : customEmptyData ? (
                customEmptyData
              ) : (
                <TR>
                  {isMultiSelect ? (
                    <TDCustom style={{ width: 58 }} textAlign="center">
                      -
                    </TDCustom>
                  ) : null}
                  {showOrderNo ? (
                    <TDCustom style={{ width: 58 }} textAlign="center">
                      -
                    </TDCustom>
                  ) : null}
                  {config.map((attribute, index) => (
                    <TDCustom key={index} textAlign="center" sticky={attribute?.sticky}>
                      -
                    </TDCustom>
                  ))}
                </TR>
              )}
            </TBODY>
          </TableCustom>
          {/* </ScrollBar> */}
        </ScrollBarWrapper>
        {/* <LoadingSection loading={Boolean(loading)} isFullContent /> */}
      </TableWrapper>
    </CustomTableWrapper>
  );
};

export default CustomTable;
