import styled from "styled-components";
import { device } from "styles/media";

export const TableMobileWrapper = styled.div``;

export const DescriptionWrapper = styled.div`
  margin-bottom: 16px;

  h6 {
    :not(:last-child) {
      margin-bottom: 12px;
    }

    span {
      font-weight: bold;
    }
  }
`;

export const MultiSelectWrapper = styled.div`
  padding-left: 16px;
  margin-bottom: 8px;
`;

/** Item */
export const ItemTableWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const HeaderItem = styled.div`
  padding: 16px;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${({ theme }) => theme.color.status.primary};

  border-radius: 16px 16px 0px 0px;

  h6 {
    color: #ffffff;
  }

  @media ${device.mobile} {
    h6 {
      font-size: 16px;
    }
  }
`;

export const ItemList = styled.div`
  padding: 0px 16px;

  border-radius: 0px 0px 16px 16px;
  border: 1px solid ${({ theme }) => theme.color.status.gray2};
  border-top: none;
  background: #ffff;
`;

export const RowData = styled.div`
  padding: 6px 0px;

  display: flex;
  flex-direction: column;

  :not(:last-child) {
    border-bottom: 1px solid #dbdfe1;
  }

  label {
    width: 100%;
    margin-bottom: 4px;

    font-weight: 400;
    font-size: 14px;
    line-height: 125%;
  }

  p {
    width: 100%;

    font-weight: 700;
    font-size: 16px;
    line-height: 125%;
    word-break: break-all;
  }
`;

export const ShowMore = styled.div`
  padding: 16px 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  user-select: none;
  cursor: pointer;

  span {
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    color: #e87722;
  }

  svg {
    margin-left: 10px;
    transform: rotateZ(180deg);
  }

  &.open {
    svg {
      transform: rotateZ(0deg);
    }
  }
`;
