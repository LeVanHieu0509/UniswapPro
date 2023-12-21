import styled, { css } from "styled-components";
import { device } from "styles/media";

const PrimaryStyle = css<{ checked: boolean }>`
  border: 2px solid ${({ theme }) => theme.color.status.primary};
  background: ${({ checked }) => (checked ? "transparent" : "#ffffff")};
`;

const WhiteStyle = css<{ checked: boolean; disabled?: boolean }>`
  border: 2px solid #ffffff;
  background: ${({ checked, theme }) => (checked ? "transparent" : theme.color.status.ButtonNoLine)};
`;

export const CheckBoxWrapper = styled.button<{
  checked: boolean;
  isCheckedWhite?: boolean;
  disabled?: boolean;
}>`
  min-height: 20px;
  padding: 0px;

  position: relative;
  cursor: pointer;

  svg {
    position: absolute;
    left: -2px;
    top: 50%;
    transform: translateY(-50%);
  }

  :after {
    content: "";
    width: 20px;
    height: 20px;

    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);

    border-radius: 4px;
    ${({ isCheckedWhite }) => (isCheckedWhite ? WhiteStyle : PrimaryStyle)}

    transition: 0.2s all ease-in-out;
  }

  @media ${device.noMobile} {
    :hover {
      ::after {
        background: ${({ checked, theme }) => (checked ? "transparent" : theme.color.status.primary)};
      }
    }
  }
`;

export const Label = styled.p<{ noLabel?: boolean }>`
  padding-left: ${({ noLabel }) => (noLabel ? "20px" : "34px")};

  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.color.text.body};

  br {
    display: none;
  }
`;

export const CheckBoxWhiteWrapper = styled.div<{ checked: boolean }>`
  height: 100%;

  display: flex;
  align-items: center;

  button {
    ::after {
      background: transparent;
      border: ${({ checked }) => (checked ? "none" : "2px solid white")};
    }
  }
`;
