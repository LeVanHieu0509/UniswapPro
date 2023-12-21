import styled from "styled-components";

export const SearchTokenWrapper = styled.div`
  width: 300px;
`;

export const ButtonToken = styled.button<{ active: boolean }>`
  border: 2px solid orange;
  border-radius: 16px;
  background: ${({ active }) => (active ? "orange" : "")};
`;
