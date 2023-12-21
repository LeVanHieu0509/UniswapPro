import IconChecked from "./icons/checked";
import IconCheckedMiddle from "./icons/checked-middle";
import { CheckBoxWrapper, Label } from "./styled";

interface CheckBoxProps {
  label?: string;
  checked: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  isCheckedWhite?: boolean;
  className?: string;
  middle?: boolean;
  onChange: () => void;
}

const CheckBox = ({
  label,
  checked,
  disabled,
  readOnly,
  isCheckedWhite,
  className,
  middle,
  onChange,
}: CheckBoxProps) => {
  return (
    <CheckBoxWrapper
      className={className}
      checked={checked}
      isCheckedWhite={isCheckedWhite}
      disabled={disabled || readOnly}
      onClick={onChange}
    >
      {middle ? (
        <IconCheckedMiddle
          fill={isCheckedWhite ? "#ffffff" : "#E87722"}
          stroke={isCheckedWhite ? "#E87722" : "#ffffff"}
        />
      ) : checked ? (
        <>
          {disabled ? (
            <IconCheckedMiddle
              // fill={isCheckedWhite ? "#ffffff" : "#ffffff"}
              stroke={isCheckedWhite ? "#ffffff" : "#ffffff"}
            />
          ) : (
            <IconChecked fill={isCheckedWhite ? "#ffffff" : "#E87722"} />
          )}
        </>
      ) : null}
      {label ? <Label dangerouslySetInnerHTML={{ __html: label }} /> : <Label noLabel></Label>}
    </CheckBoxWrapper>
  );
};

export default CheckBox;
