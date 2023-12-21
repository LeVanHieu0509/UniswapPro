import styled, { css } from "styled-components";
import { device } from "styles/media";
import { ModalSizeDesktop, ModalSizeMobile } from ".";

export const WrapperModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: calc(100 * var(--vh));
  z-index: 1100;
  background: rgba(0, 0, 0, 0.6);
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div<{ isBorderMb?: boolean }>`
  padding: 24px 24px 0 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media ${device.mobile} {
    ${({ isBorderMb }) =>
      isBorderMb
        ? `
            border-bottom: 1px solid #dbdfe1;
            padding: 16px;
            `
        : ``}
  }
`;

export const BackgroundModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

export const ContentModal = styled.div<{ mbFull?: boolean }>`
  width: 100%;
  position: relative;
  max-height: 100%;
  height: 100%;
  padding: 40px 0;
  display: flex;
  align-items: center;

  @media ${device.noDesktop} {
    padding-bottom: 0px;
    ${({ mbFull }) =>
      mbFull
        ? `
        height: 100%;
        padding: 0;
    `
        : ""}
  }
`;

export const Main = styled.div<{
  sizeMobile?: string;
  overFlow?: string;
  size?: ModalSizeDesktop;
}>`
  background-color: white;
  border-radius: 16px;
  padding: 0px 24px;
  position: relative;
  z-index: 1;

  ${({ size = "md" }) => (size == "md" ? "width: 775px;" : "")}
  ${({ size = "full" }) => (size == "full" ? "width: calc(100% - 30px);" : "")}
  ${({ size = "huge" }) => (size == "huge" ? "width: 1264px;" : "")}
  ${({ size = "lg" }) => (size == "lg" ? "width: 952px;" : "")}
  ${({ size = "sm" }) => (size == "sm" ? "width: 477px;" : "")}
  ${({ size = "xs" }) => (size == "xs" ? "width: 380px;" : "")}

  max-width:  calc(100% - 30px);

  margin: 0px auto;
  overflow: ${({ overFlow }) => (overFlow ? overFlow : "auto")};

  display: flex;
  flex-direction: column;
  max-height: 100%;
  @media ${device.mobile} {
    width: ${({ size = "xs" }) => (size == "xs" ? null : "100%")};
    max-width: 100vw;
    height: ${({ sizeMobile }) => (sizeMobile == "full" ? "100%" : "auto")};

    padding-top: 0%;
    border-radius: unset;
    margin-bottom: 0px !important;
    padding: ${({ sizeMobile }) => (sizeMobile == "md" ? "24px" : "0px")};

    ${({ sizeMobile }) => sizeMobile == "md" && cssMdPage};
  }
  @media ${device.noDesktop} {
    width: ${({ sizeMobile }) => (sizeMobile == "md" ? null : "100%")};
  }
`;

const cssMdPage = css`
  border-radius: 16px;
  svg {
    position: absolute;
    right: 4px;
    top: 5px;
  }
  width: calc(100% - 32px);
  padding: 0px 8px 8px 8px;
`;

type WrapperTitleProp = {
  haveTitle?: boolean;
};
export const WrapperTitle = styled.div<WrapperTitleProp>`
  position: sticky;
  top: 0;
  display: flex;
  z-index: 3;
  background-color: white;
  padding: ${({ haveTitle }) => (haveTitle ? "24px 0" : "0")};
`;

export const Title = styled.h3<{ sizeMobile?: ModalSizeMobile }>`
  font-weight: 700;
  font-size: 20px;
  line-height: 125%;
  color: #183028;
  margin-bottom: 24px;
`;

export const WrapperIconClose = styled.div<{ sizeMobile?: string }>`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 22px;
  z-index: 10;
  width: 24px;
  height: 24px;

  @media ${device.mobile} {
    position: absolute;
    right: ${({ sizeMobile }) => (sizeMobile === "md" ? "16px" : "16px")};
    top: ${({ sizeMobile }) => (sizeMobile === "md" ? "16px" : "16px")};
  }
`;

export const WrapperChildren = styled.div`
  padding: 0 24px;
  flex: 1;
  /* overflow: auto; */
  @media ${device.mobile} {
    padding: 16px;
  }
`;

export const BorderChildren = styled.div`
  padding: 20px;
  background: #ffffff;
  border: 1px solid #dbdfe1;
  border-radius: 16px;
`;

export const ModelFooter = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  width: 100%;

  @media ${device.mobile} {
    justify-content: center;
    button {
      flex: 1;
      min-width: 0;
      padding: 0;
    }
  }
`;

export const NoAction = styled.div`
  padding: 24px;

  @media ${device.mobile} {
    padding: 0;
  }
`;
