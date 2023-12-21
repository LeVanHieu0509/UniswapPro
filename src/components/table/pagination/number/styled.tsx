import styled, { css } from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;

  .active {
    color: #ffff;
    background-color: ${({ theme }) => theme.color.status.primary};
  }
`;

const PaginationButton = css`
  width: 24px;
  height: 24px;
  padding: 0px;

  position: relative;

  font-weight: 500;
  font-size: 16px;
  line-height: 125%;

  color: ${({ theme }) => theme.color.text.body};
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  :not(:last-child) {
    margin-right: 8px;
  }

  :disabled {
    cursor: not-allowed;

    :hover {
      border-color: ${({ theme }) => theme.color.status.gray2};
    }
  }
`;

const Shape = css`
  display: block;
  position: relative;

  &:disabled {
    svg {
      path {
        fill: ${({ theme }) => theme.color.status.gray2};
      }
    }
  }
`;

export const Previous = styled.button`
  ${PaginationButton}
  ${Shape}
`;

export const PageNumber = styled.button`
  ${PaginationButton}
`;

export const Next = styled.button`
  ${PaginationButton}
  ${Shape}
`;
