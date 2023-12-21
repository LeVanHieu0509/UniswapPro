import styled from "styled-components";

export const ConfigTableWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

export const DisplayFieldsWrapper = styled.div`
  overflow: hidden;
  min-width: 330px;
  max-height: 400px;
  height: 400px;

  position: absolute;
  top: calc(100% + 10px);
  right: 0px;
  z-index: 1001;
  overflow: auto;

  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 0px 16px;
`;

export const List = styled.ul`
  padding: 16px;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  padding-left: 30px;

  position: relative;

  :not(:last-child) {
    margin-bottom: 14px;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
  }
`;

export const CheckBoxWrapper = styled.div`
  width: 100%;
  padding: 8px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.status.gray2};
`;

export const ButtonWrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;

  position: sticky;
  bottom: 0px;

  background: #ffffff;

  border-top: 1px solid ${({ theme }) => theme.color.status.gray2};

  button {
    width: calc(50% - 8px);
  }
`;
