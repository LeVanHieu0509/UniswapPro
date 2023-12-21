import { CheckBoxWrapper, Label } from "./styled";

interface CheckBoxProps {
  lineMiddleSquare?: boolean;
  style?: any;
  label?: string;
  checked: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  onChange?: () => void;
}

const CheckBoxWhite = ({ style, label, checked, disabled, readOnly, onChange }: CheckBoxProps) => {
  return (
    <CheckBoxWrapper
      style={style}
      checked={checked}
      disabled={disabled || readOnly}
      onClick={onChange}
      // isWhiteBorder={true}
    >
      {/* {checked ? <Icons icon="checked-box" color="white" /> : null} */}

      {label ? <Label>{label}</Label> : <Label noLabel></Label>}
    </CheckBoxWrapper>
  );
};

export default CheckBoxWhite;
