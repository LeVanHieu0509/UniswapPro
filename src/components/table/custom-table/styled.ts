import { CheckBoxWrapper } from "components/checkbox/styled";
import { sum } from "lodash";
import styled, { css } from "styled-components";
import { ButtonIcon } from "styles/buttons";
import { device } from "styles/media";
import { TableStyle, TableWrapper, TD, TH } from "styles/table";

export type StickyType = "left" | "right" | "";

export const CustomTableWrapper = styled.div`
  overflow: auto;
  border-radius: 16px;

  .${TableWrapper.styledComponentId} {
    max-height: 100% !important;
  }
`;

const StickyLeft = css`
  position: sticky;
  left: 0;
  z-index: 1;
  box-shadow: 4px 0px 5px rgba(0, 0, 0, 0.1);
`;

const StickyRight = css`
  position: sticky;
  right: 0;
  z-index: 1;
  box-shadow: -4px 0px 5px rgba(0, 0, 0, 0.1);
`;

function templateStyle(leftPosition: number[]) {
  const childList = [];
  for (let i = 0; i < leftPosition.length - 1; i++) {
    const element = leftPosition[i];
    const left = sum(leftPosition.slice(0, i));
    const style = `
      :nth-child(${i + 1}){
          width:${element}px;
          min-width:${element}px;
          max-width:${element}px;
          position: sticky;
          z-index: 2;
          left:${left}px;
      }
  `;
    childList.push(style);
  }
  return childList;
}

const Sticky = css<{ leftPosition?: number[] }>`
  ${({ leftPosition }) => templateStyle(leftPosition)}
`;

const TableSticky = css<{ leftPosition?: number[] }>`
  thead {
    tr {
      position: relative;

      :first-child {
        th {
          ${Sticky}

          :nth-child(${({ leftPosition }) => {
            return leftPosition.length - 1;
          }}) {
            box-shadow: 4px 0px 5px rgba(0, 0, 0, 0.1);

            ::before {
              display: none;
            }
          }
        }
      }
    }
  }

  tbody {
    tr {
      td {
        padding: 16px;
        min-width: 100px;

        h6 {
          display: flex;
          font-weight: bold;
          font-size: 13px;
          line-height: 16px;
          padding: 16px;
        }

        :first-child {
          border-left: none;
          h6 {
            color: ${({ theme }) => theme.color.status.primary};

            :hover {
              text-decoration: underline;
            }
          }
        }

        :last-child {
          border-right: none;
        }

        :nth-child(
            ${({ leftPosition }) => {
                return leftPosition.length - 1;
              }}
          ) {
          box-shadow: 4px 0px 5px rgba(0, 0, 0, 0.1);
          ::before {
            display: none;
          }
        }

        ${Sticky}
      }

      :last-child {
        td {
          border-bottom: none;
        }
      }
    }
  }
`;

export const TableCustom = styled(TableStyle)<{ leftPosition: number[] }>`
  ${({ leftPosition }) => (leftPosition.length > 0 ? TableSticky : null)};
`;

export const THCustom = styled(TH)<{ hasSort?: boolean; sticky?: StickyType }>`
  width: auto;
  padding-right: ${({ hasSort }) => (hasSort ? "36px" : null)};

  cursor: ${({ hasSort }) => (hasSort ? "pointer" : null)};

  ${({ sticky }) => (sticky === "left" ? StickyLeft : sticky === "right" ? StickyRight : null)}

  .${CheckBoxWrapper.styledComponentId} {
    :after {
      border-color: #ffffff;
    }
  }
`;

export const THLabel = styled.h6`
  &&& {
    font-size: 14px;
    font-weight: 700;
    line-height: 125%;

    color: white;
  }
`;

export const ButtonIconCustom = styled(ButtonIcon)`
  width: 20px;
  height: 20px;

  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

const RichTextStyled = css`
  min-width: 300px;
  max-width: 300px;
  white-space: normal;
  word-break: break-word;
`;

export const TDCustom = styled(TD)<{
  sticky?: StickyType;
  isRichText?: boolean;
}>`
  white-space: nowrap;

  ${({ isRichText }) => (isRichText ? RichTextStyled : null)}
  ${({ sticky }) => (sticky === "left" ? StickyLeft : sticky === "right" ? StickyRight : null)}
`;

export const ScrollBarWrapper = styled.div<{
  maxHeight: string;
  maxHeightMobile?: string;
}>`
  height: ${({ maxHeight }) => maxHeight};
  overflow: auto;
  @media ${device.mobile} {
    height: ${({ maxHeightMobile }) => maxHeightMobile};
  }
`;
