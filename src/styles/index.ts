import styled, { css } from "styled-components";

import { device } from "./media";

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 769px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1240px) {
    max-width: 1270px;
  }

  @media (max-width: 768px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export const Spacing = styled.div`
  flex: 1;
`;

interface ScrollCustomProps {
  tableScroll?: boolean;
  overFlowY?: boolean;
  overFlowYWidth?: number; // width cho scroll Y
  radius?: number;
  heightContainer?: number;

  padding?: number;
}

export const ScrollCustom = styled.div<ScrollCustomProps>`
  max-height: ${({ heightContainer }) => (heightContainer ? heightContainer + "px" : null)};

  z-index: 100;
  padding-right: ${({ padding }) => (padding ? padding + "px" : null)};

  @media ${device.mobile} {
    max-height: ${({ heightContainer }) => (heightContainer ? heightContainer + "px" : null)};
    overflow: auto;
  }

  ::-webkit-scrollbar {
    width: ${({ overFlowY, overFlowYWidth }) => (overFlowY ? overFlowYWidth + "px" : "0px")};
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: none;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #dbdfe1;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: ${({ radius }) => (radius ? radius + "px" : "0px")};
    background-clip: padding-box;
  }
  ${({ tableScroll }) => tableScroll && TableScrollStyle}
`;

export const TableScrollStyle = css`
  /* width */
  div {
    div {
      div {
        ::-webkit-scrollbar {
          height: 7px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #dbdfe1;
          border-radius: 8px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
      }
    }
  }
`;

export const FormWrapper = styled.div`
  width: 58%;

  @media ${device.mobile} {
    width: 100%;
  }
`;

export const ActionsWrapper = styled.div<{ justify?: string }>`
  margin-bottom: 24px;
  display: flex;
  width: 100%;
  justify-content: ${({ justify }) => justify ?? "end"};

  align-items: center;

  @media ${device.mobile} {
    gap: 16px;
    flex-direction: column-reverse;
  }
`;

export const ServicesScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${device.mobile} {
    gap: 16px;
  }
`;

export const QuanLyServicesScreenWrapper = styled.div``;

interface FieldSetProp {
  readonly active: boolean;
  readonly error: string | boolean;
}

export const FieldSet = styled.fieldset<FieldSetProp>`
  padding: 0;
  margin: 0;
  border: 1px solid ${({ active, error, theme }) => (error ? theme.color.status.red : "#ccc")};

  border-radius: 4px;
  position: relative;
  max-width: 100%;
`;

export const StickyWrapper = styled.div<{ top?: number; zIndex?: number }>`
  position: sticky;
  top: ${({ top }) => top ?? "0"}px;
  z-index: ${({ zIndex }) => zIndex};
`;
