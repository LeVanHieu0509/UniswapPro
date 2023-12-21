import styled from "styled-components";

export const LoadingPageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100 * var(--vh));
  z-index: 19000;
  background: "rgb(255, 255, 255, 0.2)";
  backdrop-filter: blur(5px);
`;
