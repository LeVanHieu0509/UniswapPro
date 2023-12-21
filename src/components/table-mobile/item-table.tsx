import { DataTable, TableConfig } from "@custom-types/config-table";
import CheckBox from "components/checkbox";
import CheckBoxWhite from "components/checkbox/checkbox-white";
import {} from "components/table";
import { isEqual } from "lodash";
import { Fragment, useMemo, useState } from "react";
import { Flex } from "styles/common";
import { formatNumberTwoString } from "utils";
import { HeaderItem, ItemList, ItemTableWrapper, RowData, ShowMore } from "./styled";
import IconArrowDown from "./arrow-down";

interface ItemTableProps {
  index: number;
  data: DataTable[];
  config: TableConfig[];
  showOrderNo?: boolean;
  showCollapse?: boolean;
  multiSelect?: any[];
  selected?: any;
  select?: Function;
  onMultiSelect?: (type: any, row?: any) => void;
}

const ItemTable = ({
  index,
  data,
  config,
  showOrderNo,
  showCollapse,
  multiSelect,
  selected,
  select,
  onMultiSelect,
}: ItemTableProps) => {
  const [showMore, setShowMore] = useState(false);

  const rowData = useMemo(() => {
    if (showMore) {
      return data;
    } else {
      return data.filter((row) => {
        return row.config.show === true;
      });
    }
  }, [showMore, config, data]);

  const onClickShow = () => {
    setShowMore((pre) => !pre);
  };

  return (
    <ItemTableWrapper>
      <HeaderItem>
        {typeof onMultiSelect === "function" ? (
          <CheckBox
            checked={multiSelect?.findIndex((item) => isEqual(item, data)) > -1}
            onChange={() => onMultiSelect("one", data)}
          />
        ) : null}

        {showOrderNo && (
          <Flex gapMb={8}>
            {select && <CheckBoxWhite checked={selected[index - 1]} onChange={() => select(index)} />}
            <h6 className="h7">{index ? formatNumberTwoString(index) : "-"}</h6>
          </Flex>
        )}

        {rowData.map((item: any, key: number) => {
          return item.config.primaryMobile ? <Fragment key={key}>{item.node}</Fragment> : "";
        })}
      </HeaderItem>

      <ItemList>
        {rowData.length ? (
          rowData.map((item: any, key: number) => {
            return item.config.key !== "icons" && !item.config.primaryMobile ? (
              <RowData key={key}>
                <label>{item.config.label}</label>
                <p>{item.node}</p>
              </RowData>
            ) : null;
          })
        ) : (
          <RowData>
            <label>-</label>
          </RowData>
        )}

        {showCollapse && (
          <ShowMore onClick={onClickShow} className={`${showMore ? "open" : ""}`}>
            <h6 className="h7 color-primary">{showMore ? "Ẩn bớt" : "Xem thêm"}</h6>
            <IconArrowDown />
          </ShowMore>
        )}
      </ItemList>
    </ItemTableWrapper>
  );
};

export default ItemTable;
