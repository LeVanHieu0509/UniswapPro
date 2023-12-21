import styled, { css } from "styled-components";

export const LoadingWrapper = styled.div<{ isFullContent: boolean }>`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isFullContent }) =>
    isFullContent
      ? css`
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1000;

          background: ${({ theme }) => theme.color.background.loadingBackground};
        `
      : null}
`;

export const UploadLoading = styled.div`
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  width: 24px;
  height: 24px;
  border: 2px dotted ${({ theme }) => theme.color.status.primary_50};
  border-radius: 50%;
  display: block;
  position: relative;

  :after {
    content: "";
    width: 24px;
    height: 24px;

    position: absolute;
    top: -2px;
    left: -2px;

    border: 2px solid ${({ theme }) => theme.color.status.primary_50};
    border-color: ${({ theme }) => theme.color.status.primary} ${({ theme }) => theme.color.status.primary} transparent
      transparent;

    border-radius: 50%;
    animation: rotation 1s linear infinite;
  }
`;
