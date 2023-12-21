import styled from "styled-components";

export const SearchInputWrapper = styled.div``;
export const ListWrapper = styled.div`
  position: absolute;
  background: white;
  z-index: 100;
  padding: 10px;
  border-radius: 5px;
  width: 300px;

  height: 300px;
  overflow: auto;
  max-width: 100%;
`;

export const ItemWrapper = styled.div`
  width: 500px;
  :hover {
    background: ${({ theme }) => theme.color.status.light_green_20};
  }
`;
