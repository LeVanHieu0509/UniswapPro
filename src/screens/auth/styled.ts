import styled from "styled-components";

export const LoginLayoutWrapper = styled.div`
  label {
    background: #ffffff;
    line-height: 1.25rem !important;
    width: unset;
    height: 20px;
    margin-top: -4px;
    padding: 2px;
    color: ${({ theme }) => theme.color.text.body} !important;
  }
`;
