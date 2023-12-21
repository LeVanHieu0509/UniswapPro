import styled from "styled-components";
import { device } from "styles/media";

export const DropDownWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  /* .changeColor {
    border-color: ${({ theme }) => theme.color.status.primary};

    border-radius: 4px 4px 0px 0px;

    :after {
      border-top-color: ${({ theme }) => theme.color.status.primary};
    }

    :hover {
      border-color: ${({ theme }) => theme.color.status.primary};
    }
  } */

  .view-jobs {
    position: absolute;
    z-index: 2;
    top: -5px;
    left: 100px;
  }
  @media ${device.mobile} {
    margin-top: 8px;
  }
`;

export const DropDownFiled = styled.div<{
  active?: boolean;
  error?: boolean;
  disabled?: boolean;
  size?: "sm" | "lg" | "md";
}>`
  align-items: center;
  border-radius: 4px;
  height: ${({ size }) => (size == "sm" ? 40 : size == "lg" ? 60 : 40)}px;
  position: relative;

  transition: all 0.3s ease-in-out;

  background-color: #ffff;
  cursor: pointer;
  border: 1px solid
    ${({ active, error, theme }) =>
      error ? theme.color.status.red : active ? theme.color.status.primary : theme.color.status.grey};
  border-radius: 10px;
  svg {
    position: absolute;
    top: 50%;
    right: 0px;
    width: 24px;
    height: 24px;
    transform: translate(-50%, -50%);
  }

  :hover {
    border-color: ${({ theme }) => theme.color.status.primary_50};
  }

  ${({ active }) =>
    active
      ? `
    :before {
      position: absolute;
      border-radius: 4px;
      content: "";
      top: -1.5px;
      left: -1.5px;
      right: -1.5px;
      user-select: none;
      pointer-events: none;
    }
  `
      : ""};

  ${({ disabled, theme }) =>
    disabled
      ? `
    cursor: not-allowed;
    background: ${theme.color.status.gray2_20};
    border-color: ${theme.color.status.gray2};`
      : ""};

  p {
    white-space: nowrap;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
    margin: 0;
    padding-left: 12px;
    padding-top: ${({ size }) => (size == "sm" ? 8 : size == "lg" ? 15 : 12)}px;
    color: ${({ theme }) => theme.color.status.gray1_50};
    &.value {
      color: ${({ theme }) => theme.color.text.body};
    }
  }

  input {
    border: none;
    box-shadow: none;
    :focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
`;

export const ListWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 0px;
  width: 100%;
  z-index: 1200;
  max-height: 320px;
  overflow: auto;
  border: 1px solid #dbdfe1;
  box-shadow: 0px 16px 30px rgba(132, 156, 152, 0.2);
  border-radius: 4px;
`;

export const List = styled.div`
  padding: 8px 0px;
  background-color: #ffffff;

  li {
    display: flex;
    position: relative;
    list-style: none;
    padding-bottom: 16px;

    .check {
      position: absolute;
      right: -320px;
      padding: 0px;

      :focus {
        :before {
          top: 3.5px;
          left: -0.5px;
          z-index: 100;
        }
      }
    }
  }

  > button {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    padding: 10px 16px;
    transition: all 0.3s ease-in-out;

    span {
      text-align: left;
      width: calc(100% - 20px);
      color: #000000;
    }
    svg {
      display: block;
      position: absolute;
      top: calc(50% - 5px);
      right: 10px;
      z-index: 10;

      width: 20px;
      height: 10px;
    }

    :hover {
      color: ${({ theme }) => theme.color.status.primary};
    }
    :focus {
      :before {
        position: absolute;
        border-radius: 4px;
        content: "";
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        border: 3px solid ${({ theme }) => theme.color.status.primary_50};
        user-select: none;
        pointer-events: none;
      }
    }
  }
`;

export const WrapperDetailJob = styled.div`
  h5 {
    font-style: normal;
    font-weight: bold;
  }
  ul {
    margin-bottom: 0;
    margin-top: 0;
  }
  li {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
  }
`;

export const Error = styled.span`
  margin-top: 4px;
  color: ${({ theme }) => theme.color.status.red};
  display: block;
  font-size: 12px;
`;
export const ItemWrapper = styled.span``;
