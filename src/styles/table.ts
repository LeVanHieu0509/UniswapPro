import { TextAlign } from "@custom-types";
import styled, { css } from "styled-components";
interface THProps {
  disabled?: boolean;
  textAlign?: TextAlign;
  background?: string;
  numberColumn?: any;
  rowIndex?: any;
  parentThRef?: any;
}

interface TDProps {
  primary?: boolean;
  textAlign?: TextAlign;
  background?: string;
}

const PrimaryCss = css`
  color: ${({ theme }) => theme.color.status.primary};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const LineSeparate = css`
  :before {
    content: "";
    width: 1px;
    height: calc(100% - 16px);

    position: absolute;
    right: 1px;
    top: 50%;
    transform: translateY(-50%);

    background: #ffffff;
  }

  :last-child::before {
    display: none;
  }
`;

export const TableWrapper = styled.div<{ isSticky?: boolean; maxHeight?: string }>`
  width: 100%;
  max-height: ${({ maxHeight }) => maxHeight ?? "100%"};

  position: relative;

  overflow: hidden;

  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.color.status.grey};

  ${({ isSticky }) =>
    isSticky
      ? css`
          table {
            position: relative;

            thead {
              position: sticky;
              top: 0;
              z-index: 10;
            }
          }
        `
      : null}
`;

export const TableStyle = styled.table`
  width: 100%;

  border-spacing: 0;
  border-collapse: separate;
`;

export const THEAD = styled.thead`
  tr {
    :first-child {
      th {
        :first-child {
          border-top-left-radius: 16px;
        }
        :last-child {
          border-top-right-radius: 16px;
        }
      }
    }

    :not(:first-child) {
      th {
        border-top: 1px solid #ffffff;
      }
    }
  }
`;

export const TBODY = styled.tbody`
  tr {
    :nth-child(even) td {
      background: ${({ theme }) => theme.color.status.grey_20};
    }

    :first-child {
      td {
        border-top: none;
      }
    }

    :last-child {
      td {
        :first-child {
          border-bottom-left-radius: 16px;
        }
        :last-child {
          border-bottom-right-radius: 16px;
        }
      }
    }
  }
`;

export const TR = styled.tr`
  :hover {
    td {
      background: ${({ theme }) => theme.color.status.primary_10};
    }

    :nth-child(even) td {
      background: ${({ theme }) => theme.color.status.primary_10};
    }
  }
`;

export const TH = styled.th<THProps>`
  height: 50px;
  min-height: 50px;
  padding: 8px 16px;

  position: relative;

  font-weight: 700;
  font-size: 14px;
  line-height: 125%;
  text-align: ${({ textAlign }) => textAlign || "left"};
  white-space: nowrap;

  color: #ffffff;
  background: ${({ theme }) => theme.color.status.blue};

  user-select: none;

  ${LineSeparate}
`;

export const TD = styled.td<TDProps>`
  min-height: 50px;
  padding: 15px 12px;
  position: relative;

  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  text-align: ${({ textAlign }) => textAlign ?? "left"};

  border-top: 1px solid ${({ theme }) => theme.color.status.grey};
  background: #ffffff;

  ${({ primary }) => (primary ? PrimaryCss : null)};

  ${LineSeparate}

  :before {
    background: #edeff0;
  }

  /* 
  :first-child {
    border-left: 1px solid ${({ theme }) => theme.color.status.grey};
  }

  :last-child {
    border-right: 1px solid ${({ theme }) => theme.color.status.grey};
  } */
`;
