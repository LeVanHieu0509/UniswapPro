import { createGlobalStyle, css } from "styled-components";
import { device } from "./media";

function renderSpace(type: "margin" | "padding", prefix = "") {
  return [0, 2, 6, 8, 10, 12, 16, 20, 24, 30, 36, 40, 60]
    .map((size) =>
      ["", "-top", "-left", "-bottom", "-right"]
        .map((dir) => {
          return `.${prefix}${type.slice(0, 1)}${dir.slice(1, 2)}-${size} { ${type}${dir}: ${size}px !important; }`;
        })
        .join("\n")
    )
    .join("\n");
}

const style = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family:
      "FWD",
      -apple-system,
      "sans-serif",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    font-style: normal;
    color: ${({ theme }) => theme.color.status.black};

    @media (max-width: 768px) {
      font-size: 16px;
      line-height: 22px;
    }
  }

  body {
    overflow-x: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  .tooltip-container {
    padding: 0;
    border-radius: 8px;
    border: none;
    box-shadow: (0px 16px 40px rgba(24, 48, 40, 0.1));
  }

  .tooltip-arrow[data-placement*="right"]::before {
    border-color: transparent rgba(24, 48, 40, 0.1) transparent transparent;
    border-width: 0.5rem 0.4rem 0.5rem 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h1 {
    font-size: 36px;
    font-weight: 500;
    line-height: 44px;
  }

  h2 {
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
  }

  h3 {
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
  }

  h4 {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }

  h5 {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }

  h6 {
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    line-height: 22px;
  }

  .tiny {
    font-size: 10px;
  }

  input,
  textarea,
  button,
  select {
    font-family:
      "FWD",
      -apple-system,
      "sans-serif",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 24px;
    /* border: 0 none;
    outline: 0 none; */
    background: transparent;

    :disabled {
      opacity: 1;
    }
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  label {
    font-size: 13px;
    line-height: 18px;
    font-weight: 500;
  }

  a {
    color: inherit;
    text-decoration: none;
    position: relative;

    /* :after {
      content: "";
      display: block;
      width: 0px;
      height: 1px;
      left: auto;
      top: 100%;
      right: 0px;
      position: absolute;
      background: currentColor;
      transition: width 0.3s ease-in-out;
    }

    :hover {
      :after {
        width: 100%;
        left: 0px;
        right: auto;
      }
    } */
  }

  p {
    font-style: normal;
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.color.text.body};

    :last-child {
      margin-bottom: 0px;
    }
  }

  hr {
    border-style: solid;
    margin: 16px 0px;
    border-bottom-width: 0px;
    color: ${({ theme }) => theme.color.page.border};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  dl,
  ol,
  ul {
    margin-top: 0;
    margin: 0;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.color.text.body};
  }

  .hide-mobile {
    @media ${device.mobile} {
      display: none !important;
    }
  }

  .hide-desktop {
    @media ${device.noMobile} {
      display: none !important;
    }
  }

  .text-center {
    text-align: center !important;
  }

  .text-left {
    text-align: left !important;
  }

  .link {
    :hover {
      text-decoration: underline;
    }
  }

  .danger {
    color: ${({ theme }) => theme.color.status.red};
  }

  .blue {
    color: ${({ theme }) => theme.color.status.blue};
  }

  .green {
    color: ${({ theme }) => theme.color.status.green};
  }

  .bold {
    font-weight: 700;
  }
  .primary {
    color: ${({ theme }) => theme.color.status.primary};
  }

  .primary-color {
    background: ${({ theme }) => theme.color.status.primary};
  }

  .semibold {
    font-weight: 600;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex {
    display: flex;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .align-items-center {
    align-items: center;
  }

  .justify-content-center {
    justify-content: center;
  }

  .justify-content-between {
    justify-content: space-between;
  }

  .justify-content-around {
    justify-content: space-around;
  }

  .justify-content-end {
    justify-content: flex-end;
  }

  .w-100 {
    width: 100%;
  }

  .w-50 {
    width: 50%;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-2 {
    flex: 2;
  }

  .flex-column {
    flex-direction: column;
  }

  ${renderSpace("margin")}
  ${renderSpace("padding")}

  .Toastify__toast-container--bottom-center {
    width: 80vw;
  }
  .Toastify__close-button {
    padding: 12px;
  }
  .Toastify__close-button > svg {
    height: 20px;
    width: 20px;
  }
  .Toastify__toast {
    display: flex;
    align-items: center;

    background: #183028;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    font-weight: 450;
    font-size: 16px;
    line-height: 150%;

    color: white;
  }
  .Toastify__close-button {
  }

  .text-tiny {
    font-size: 0.7em;
  }
  .text-small {
    font-size: 0.85em;
  }
  .text-big {
    font-size: 1.4em;
  }
  .text-huge {
    font-size: 1.8em;
  }

  .height-250 {
    height: 250px;
  }

  .height-200 {
    height: 200px;
  }

  .Toastify__toast-container {
    z-index: 100000;
  }

  .Toastify__toast-container--bottom-center {
    width: 80vw;
  }

  .Toastify__close-button {
    padding: 12px;
  }

  .Toastify__close-button > svg {
    height: 20px;
    width: 20px;
  }

  .Toastify__toast {
    display: flex;
    align-items: center;

    background: #183028;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    font-weight: 450;
    font-size: 16px;
    line-height: 150%;

    color: white;
  }

  .Toastify__close-button {
  }

  @media ${device.mobile} {
    .sm-w-100 {
      width: 100%;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${style}
`;
