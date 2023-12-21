import styled, { css } from "styled-components";
import { device } from "styles/media";

export const BannerSlideWrapper = styled.div<{ type?: any }>`
  width: 100%;
  position: relative;
`;

export const PlanMobile = styled.div`
  overflow: hidden;
  width: 100%;

  display: flex;
  align-items: center;
`;

export const SlideWrapper = styled.div`
  display: flex;
  gap: 22px !important;

  @media ${device.mobile} {
    gap: 8px !important;
    width: 100%;
  }
`;

export const Slide = styled.div`
  min-width: 100%;

  display: flex;
  justify-content: center;
`;

export const PaginationDot = styled.div`
  position: absolute;
  bottom: 47px;
  z-index: 7;
  left: 48%;

  display: flex;
  justify-content: center;
  padding: 40px 0px;

  .active {
    width: 24px;
    height: 6px;
    background: #e87722;
    border-radius: 100px;
  }
`;

export const Dot = styled.div`
  background: #dbdfe1;
  width: 6px;
  height: 6px;
  transition: all 0.3s ease-in-out;

  border-radius: 50%;

  :not(:first-child) {
    margin-left: 10px;
  }
`;
//icon
const ButtonIconCss = css`
  padding: 0px;
  position: absolute;
`;

export const ButtonIconLeft = styled.button<{ col: any; hide: any }>`
  transition: all 0.4s ease-in-out;
  border-radius: 4px;
  height: 32px;
  width: 32px;
  background: transparent;
  :hover {
    transition: all 0.4s ease-in-out;
    border-radius: 4px;
    background: #cccccc;
  }

  top: 10%;
  left: 7px;
  z-index: 8;

  cursor: ${({ disabled }) => (disabled == true ? "not-allowed" : "pointer")} ${ButtonIconCss};

  svg {
    width: 24px;
    height: 24px;

    path {
      fill: ${({ theme, disabled }) => (disabled == true ? theme.color.status.primary_50 : theme.color.status.white)};
    }
  }
  ${({ hide }) => (hide ? "display: none" : "")};

  @media ${device.mobile} {
    left: 0px;
    svg {
      left: 2px;
    }
  }
`;

export const ButtonIconRight = styled.button<{ hide: any }>`
  transition: all 0.4s ease-in-out;
  height: 32px;
  width: 32px;
  border-radius: 4px;
  background: transparent;
  right: 0px;

  top: 10%;
  :hover {
    transition: all 0.4s ease-in-out;
    border-radius: 4px;
    background: ${({ theme }) => theme.color.status.grey};
  }
  ${ButtonIconCss}
  cursor: ${({ disabled }) => (disabled == true ? "not-allowed" : "pointer")} ${ButtonIconCss};

  svg {
    width: 24px;
    height: 24px;

    path {
      fill: ${({ theme, disabled }) => (disabled == true ? theme.color.status.primary_50 : theme.color.status.white)};
    }
  }

  ${({ hide }) => (hide ? "display: none" : "")};

  @media ${device.mobile} {
    right: -8px;

    svg {
      left: 0px;
    }
  }
`;
