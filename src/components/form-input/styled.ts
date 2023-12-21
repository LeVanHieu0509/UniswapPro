import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  margin-bottom: 24px;

  label {
    background: white;
    line-height: 1.25rem !important;
    width: unset;
    height: 20px;
    margin-top: -4px;
    padding: 2px;
    color: ${({ theme }) => theme.color.text.body} !important;
  }
`;
