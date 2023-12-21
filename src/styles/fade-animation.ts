import { css } from "styled-components";

/** CSS */
export const FadeStyled = css`
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease-in-out;
`;

export const FadeReverseStyled = css`
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  user-select: none;
  transition: all 0.3s ease-in-out;
`;

export const FadeWithTransformStyled = css`
  ${FadeStyled}
  transform: translateY(0px);
`;

export const FadeWithTransformReverseStyled = css`
  ${FadeReverseStyled}
  transform: translateY(-8px);
`;

/** Animation */
// const fade = keyframes`
// 0% {
//   opacity: 0;
// }
// 100% {
//   opacity: 1;
// }
// `;

// const slide = keyframes`
// 0% {
//   margin-top: -10px;
// }
// 100% {
//   margin-top: 0px;
// }
// `;
// const fade_reverse = keyframes`
// 0% {
//   opacity: 1;
// }
// 100% {
//   opacity: 0;
// }
// `;

// const slide_reverse = keyframes`
// 0% {
//   margin-top: 0px;
// }
// 100% {
//   margin-top: -10px;
// }
// `;

// export const FadeStyled = css`
//   pointer-events: initial;
//   animation-name: ${fade}, ${slide};
//   animation-duration: 200ms, 400ms;
//   animation-fill-mode: forwards;
//   animation-timing-function: linear, cubic-bezier(0.23, 1, 0.32, 1);
//   animation-delay: 200ms, 0;
// `;

// export const FadeReverseStyled = css`
//   pointer-events: none;
//   animation-name: ${fade_reverse}, ${slide_reverse};
//   animation-duration: 100ms, 200ms;
//   animation-timing-function: linear, cubic-bezier(0.23, 1, 0.32, 1);
//   animation-delay: 100ms, 0;
// `;
