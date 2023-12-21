import styled from "styled-components";
import { device } from "styles/media";

export const PaginationWrapper = styled.div`
  margin-top: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${device.mobile} {
    flex-direction: column;
    gap: 16px;
  }
`;

export const ListNumberWrapper = styled.div``;
