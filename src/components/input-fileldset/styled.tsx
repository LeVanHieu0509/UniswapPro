import ReactInputMask from "react-input-mask";
import styled, { css } from "styled-components";
import { device } from "styles/media";

export const FieldSetWrapper = styled.div<{ mbMargin: number }>`
  width: 100%;

  @media ${device.mobile} {
    margin-top: ${({ mbMargin }) => mbMargin}px;
  }
`;

const ErrorStyle = css`
  border-color: ${({ theme }) => theme.color.status.red};
  :hover {
    border-color: ${({ theme }) => theme.color.status.red};
  }
`;

interface InputWrapperProps {
  active?: boolean;
  error?: boolean;
  hidden?: boolean;
  disabled?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  width: 100%;
  position: relative;
  border: ${({ hidden, active }) => (hidden ? "none" : active ? "1px solid #e87722" : "1px solid #DBDFE1")};
  border-radius: 4px;
  padding: 0;
  margin: 0;
  ${({ error }) => (error ? ErrorStyle : "")}
  transition: all 0.2s ease-in-out;

  :hover {
    border: 1px solid
      ${({ theme, active, disabled }) =>
        active ? theme.color.status.primary : disabled ? theme.color.text.disabled : theme.color.input.placeholder};
  }
`;

export const InputLeft = styled.div`
  position: absolute;
  top: 14px;
  left: 8px;
`;

export const InputGroup = styled.div`
  width: 100%;
  position: relative;
`;

interface InputProps {
  isuppercase?: boolean;
  size?: number;
}

const InputStyle = css<InputProps>`
  width: 100%;
  height: ${({ size }) => size || 48}px;

  padding: 12px 16px 12px 16px;
  display: block;

  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  overflow: hidden;
  text-overflow: ellipsis;

  border-radius: 4px;

  text-transform: ${({ isuppercase }) => (isuppercase ? "capitalize" : "unset")};
  background: white;

  :disabled {
    cursor: not-allowed;
    background: #f8f9f9;
    border-color: #dbdfe1;
    opacity: 1;
    border: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

interface FieldSetProp {
  readonly disabled: boolean;
  readonly active: boolean;
  readonly error: string | boolean;
}

export const Input = styled.input<any>`
  ${InputStyle}
`;

export const TextArea = styled.textarea`
  height: 104px;
  min-height: 48px;
  min-width: 100%;
`;

interface LabelProps {
  focus?: boolean;
  disabled?: boolean;
  haveValue?: boolean;
  type?: string;
  required?: boolean;
}

const LabelCss = css`
  max-width: calc(100% - 52px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    position: absolute;
    top: 0px;
    right: 2px;
  }
`;

const LabelNomal = css<LabelProps>`
  color: ${({ theme }) => theme.color.input.placeholder};
  top: ${({ type }) => (type !== "textarea" ? "10%" : "24px")};
  left: 15px;
  font-size: 12px;
`;

const FocusCSS = css`
  top: -1px;
  left: 13px;
  font-size: 13px;
  // background: linear-gradient(
  //   180deg,
  //   transparent 12px,
  //   white 12px,
  //   white 13px,
  //   transparent 13px
  // );
  background: white;
  ::before {
    content: "";
    position: absolute;
    background-color: white;
    height: 1px;
    width: 100%;
    top: 12px;
    left: 0px;
    z-index: -1;
  }
`;

const LabelHaveValue = css<LabelProps>`
  color: ${({ theme }) => theme.color.status.black};
  ${FocusCSS}
  ${LabelCss}
`;

const LabelFocus = css<LabelProps>`
  color: ${({ theme }) => theme.color.status.primary};
  ${FocusCSS}
  ${LabelCss}
`;

export const Label = styled.label<LabelProps>`
  position: absolute;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  height: 24px;
  transform: translate(0, -50%);
  transition: 0.2s;
  text-align: left;
  pointer-events: none;
  padding-left: 3px;
  padding-right: 3px;
  user-select: none;
  background-color: ${({ disabled }) => (disabled ? "transparent" : "")};
  z-index: 1;

  font-size: 0.875rem;

  span {
    padding-left: 3px;
    color: ${({ theme }) => theme.color.status.red};
  }

  ${({ haveValue, focus }) => (focus ? LabelFocus : haveValue ? LabelHaveValue : LabelNomal)}
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.color.status.red};
  display: block;
  font-size: 12px;
`;

export const Warning = styled.span`
  color: ${({ theme }) => theme.color.status.primary};
  display: inline-block;
  font-size: 12px;
`;

export const InputMask = styled(ReactInputMask)<any>`
  ${InputStyle}
`;

// : type === "mask" ? (
//   <InputMask
//     ref={refInput}
//     id={id}
//     name={name}
//     formatChars={{
//       A: "[A-Za-z0-9]",
//       9: "[0-9]",
//     }}
//     type="text"
//     maskChar={null}
//     mask={mask}
//     value={value}
//     onChange={onChange}
//     style={{ textTransform: "uppercase" }}
//     disabled={disabled}
//     onKeyDown={onKeyDown}
//     readOnly={disabled || readOnly}
//     maxLength={maxLength}
//     onInput={() => setAutoComplete(false)}
//   />
// )
