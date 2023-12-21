import styled from "styled-components";
import { device } from "styles/media";

export const AdminLayoutWrapper = styled.div`
  width: 100%;
  background-color: #eceff180;
  overflow: auto;
  display: flex;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

export const MainContent = styled.div<{ showSidebar: boolean }>`
  width: 100%;
  padding-left: ${({ showSidebar }) => (showSidebar ? "96px" : "0px")};
  position: relative;

  @media ${device.mobile} {
    padding-left: 0px;
  }
`;
