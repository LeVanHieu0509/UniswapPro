import styled from "styled-components";
import { device } from "styles/media";

export const DialogWrapper = styled.div<{ size?: string }>`
  overflow-x: scroll;
  width: 100%;

  @media ${device.mobile} {
    max-height: 500px;
  }
`;
