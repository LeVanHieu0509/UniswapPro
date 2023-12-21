import { PatternFormat } from "react-number-format";
import styled, { css } from "styled-components";
import { ButtonStyle } from "styles/buttons";
import { device } from "styles/media";

// const ButtonStyle = styled.button<{ currentMonth?: boolean; dateActive?: boolean }>`
//   outline: 0 none;
//   border: 0 none;
//   padding: 0;
//   margin: 0;
//   transition: all 0.3s ease-in-out;
//   font-weight: 500;
//   position: relative;

//   :hover {
//     background: ${({ theme }) => theme.color.status.primary_20};
//   }
//   :focus {
//     :after {
//       position: absolute;
//       border-radius: 4px;
//       content: "";
//       top: -1.5px;
//       left: -1.5px;
//       right: -1.5px;
//       bottom: -1.5px;
//       border: 3px solid ${({ theme }) => theme.color.status.primary_50};
//       user-select: none;
//       pointer-events: none;
//     }
//   }
// `;

export const DatePickerWrapper = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.color.status.primary};
  border-radius: 4px;
  padding: 20px 16px;
  width: 320px;
  box-shadow: 0px 12px 60px rgba(219, 223, 225, 0.5);
`;

export const DatePickerContent = styled.div``;

export const DatePickerHeader = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderButton = styled.button`
  ${ButtonStyle}
  font-weight: 500;
  text-transform: unset;
  padding: 0px 10px;
`;

export const WeekWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

export const WeekTitleWrapper = styled(WeekWrapper)`
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.color.status.gray2};

  h4:last-child {
    color: ${({ theme }) => theme.color.status.primary};
  }
`;

export const DaysWrapper = styled.div``;

export const DayButton = styled.button<{
  dateActive?: boolean;
  currentMonth?: boolean;
}>`
  ${ButtonStyle}
  padding: 0px;
  width: 38px;
  height: 38px;
  min-height: 38px;
  border-radius: 50%;
  color: ${({ currentMonth, dateActive }) => {
    if (dateActive) {
      return "white";
    }
    if (currentMonth) {
      return "#183028";
    }
    return "#DBDFE1";
  }};
  background: ${({ dateActive, theme }) => (dateActive ? `${theme.color.status.primary} !important` : "transparent")};
  :hover {
    background: #fae4d3;
    color: "#183028";
  }
  :disabled {
    color: ${({ theme }) => theme.color.status.gray1};
    background: #f2f2f2;
    cursor: not-allowed;
  }
`;

export const MonthsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const MonthButton = styled.button<{ dateActive?: boolean }>`
  ${ButtonStyle}
  width: 90px;
  height: 36px;
  padding: 0px;
  min-height: 36px;
  border-radius: 18px;
  margin-bottom: 16px !important;
  color: ${({ theme, dateActive }) => (dateActive ? "white" : "#183028")};
  background: ${({ dateActive, theme }) => (dateActive ? `${theme.color.status.primary} !important` : "transparent")};
  :hover {
    background: #fae4d3;
    color: "#183028";
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  > button {
    position: absolute;
    top: 12px;
    right: 16px;
  }

  @media ${device.mobile} {
    margin-top: 8px;
  }
`;

const DisabledStyle = css`
  cursor: not-allowed;
  background: ${({ theme }) => theme.color.status.gray2_50};
  border: none;
  opacity: 1;
`;

export const WrapperInputContent = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px 0 0;
  width: 100%;

  background-color: white;
  ${({ disabled }) => (disabled ? DisabledStyle : "")};
  border-radius: 4px;

  > span {
    font-size: 13px;
  }
`;

export const InputMask = styled(PatternFormat)`
  width: 100%;
  font-size: 13px;

  font-weight: 400;
  border-radius: 4px;

  :disabled {
    ${DisabledStyle}
  }

  border: none;
  box-shadow: none !important;
`;

export const DatePickerAbsoluteWrapper = styled.div<{
  isDouble?: boolean;
  rightAbs?: boolean;
}>`
  position: absolute;
  top: calc(100% + 8px);
  /* left: 0px; */
  ${({ rightAbs }) => (rightAbs ? `right:0px;` : "left:0px;")}
  background-color: #ffffff;
  z-index: 2000;

  ${({ isDouble }) =>
    isDouble
      ? css`
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 664px;
          max-width: calc(100vw - 56px);
          box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.25);
          border-radius: 8px;
          padding: 0px 0px 8px 8px;
          > div {
            margin-right: 8px;
            margin-top: 8px;
          }
        `
      : null};
`;
