import styled from "styled-components";
import { css } from "styled-components";

//Label
interface LabelProps {
  focus?: boolean;
  disabled?: boolean;
  haveValue?: boolean;
  type?: string;
  required?: boolean;
  error?: boolean | string;
}

const LabelCss = css`
  max-width: calc(100% - 52px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;

const LabelNormal = css<LabelProps>`
  color: ${({ theme }) => theme.color.text.placeholder};
  top: ${({ type }) => (type !== "textarea" ? "50%" : "24px")};
  left: ${({ type }) => (type === "search" ? "35px" : "15px")};
  font-size: 16px;
`;

const LabelHaveValue = css<LabelProps>`
  color: ${({ theme, error }) => (error ? theme.color.status.red : theme.color.status.black)};
  top: -1px;
  left: 13px;
  font-size: 13px;
  background: #ffffff;

  span {
    color: ${({ theme, disabled }) => (disabled ? theme.color.text.disabled : theme.color.status.red)};
  }
  ${LabelCss}
`;

const LabelFocus = css<LabelProps>`
  color: ${({ theme }) => theme.color.status.primary};
  top: -1px;
  left: 13px;
  font-size: 13px;
  background: #ffffff;

  span {
    color: ${({ theme }) => theme.color.status.red};
  }
  ${LabelCss}
`;

const LabelDisabled = css<LabelProps>`
  color: ${({ theme }) => theme.color.text.disabled};
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

  span {
    padding-left: 3px;
    color: ${({ theme, disabled }) => (disabled ? theme.color.text.disabled : theme.color.status.red)};
  }

  ${({ type }) => (type !== "textarea" ? LabelCss : null)};
  ${({ haveValue, focus }) => (focus ? LabelFocus : haveValue ? LabelHaveValue : LabelNormal)}
  ${({ required }) => (required ? "padding-right: 10px;" : "")};
  ${({ disabled }) => (disabled ? LabelDisabled : null)};
`;

//Error
export const WrapperError = styled.div`
  margin-top: 4px;

  display: flex;
  align-items: center;

  svg {
    margin-right: 4px;
  }
`;

export const Error = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;

  color: ${({ theme }) => theme.color.status.red};
`;

export const Warning = styled.span`
  display: inline-block;

  font-size: 12px;
  color: ${({ theme }) => theme.color.status.primary};
`;
