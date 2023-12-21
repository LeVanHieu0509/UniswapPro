import { Limit } from "components/table";
import IconSort from "components/table/icons/sort";
import useClickAway from "hooks/use-click-away";
import { useRef, useState } from "react";
import { EntriesPage, List, SelectFiled, SelectLimitedWrapper, SelectWrapper } from "./styled";

interface SelectLimitedProps {
  value: Limit;
  onChange: (value: Limit) => void;
}

export const listOptionEntriesPage = [5, 10, 20, 30, 40, 50];

function SelectLimited({ onChange, value }: SelectLimitedProps) {
  const [show, setShow] = useState(false);

  const ref = useRef(null);
  const refButton = useRef<HTMLButtonElement>(null);

  useClickAway(ref, () => {
    setShow(false);
  });

  const onSelectItem = (value: any) => {
    setShow(false);
    onChange(value);
    document.body.style.overflow = "unset";
  };

  const onShowList = () => {
    setShow(true);
  };

  return (
    <SelectLimitedWrapper>
      <SelectWrapper>
        <SelectFiled ref={refButton} onClick={onShowList}>
          <label className="label-4">{value}</label>
          <IconSort fill="#E87722" />
        </SelectFiled>
        {show ? (
          <List ref={ref}>
            {listOptionEntriesPage?.map((item, index) => (
              <button
                key={index}
                onClick={() => onSelectItem(item)}
                className={`${value === item ? "color-primary" : ""} label-4`}
              >
                {item}
              </button>
            ))}
          </List>
        ) : null}
      </SelectWrapper>
      <EntriesPage>dòng mỗi trang</EntriesPage>
    </SelectLimitedWrapper>
  );
}

export default SelectLimited;
