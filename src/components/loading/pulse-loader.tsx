import styled, { keyframes } from "styled-components";
import React from "react";

const pulse = keyframes`
0% {
  transform: scale(1);
  opacity: 1;
}
45% {
  transform: scale(0.1);
  opacity: 0.7;
}
80% {
  transform: scale(1);
  opacity: 1;
}
`;

interface WrapperProp {
  fillWrapper?: boolean;
}
const Wrapper = styled.div<WrapperProp>`
  margin-right: 0 !important;

  display: flex;

  & > div {
    background-color: ${({ theme, color }) => (color ? color : theme.color.status.primary)};
  }
  ${({ fillWrapper }) =>
    fillWrapper
      ? `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  `
      : ""}
`;

const Loader = styled.div`
  width: 15px;
  height: 15px;
  margin: 2px;

  border-radius: 100%;
  display: inline-block;
  animation-fill-mode: both;

  :nth-child(1) {
    animation: ${pulse} 1.25s 0.5s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }
  :nth-child(2) {
    animation: ${pulse} 1.25s 0.65s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }
  :nth-child(3) {
    animation: ${pulse} 1.25s 0.8s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }
`;

interface PulseLoaderProp {
  fill?: boolean;
  loading?: boolean;
  color?: string;
}

const PulseLoader = ({ fill, loading, color }: PulseLoaderProp) => {
  return !loading ? null : (
    <Wrapper fillWrapper={fill} color={color}>
      <Loader />
      <Loader />
      <Loader />
    </Wrapper>
  );
};

export default PulseLoader;
