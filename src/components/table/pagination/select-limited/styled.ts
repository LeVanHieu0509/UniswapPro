import styled from "styled-components";

export const SelectLimitedWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const EntriesPage = styled.span`
  font-size: 14px;
  line-height: 18px;
  white-space: nowrap;
  color: ${({ theme }) => theme.color.input.placeholder};
`;

export const SelectWrapper = styled.div`
  width: 90px;
  height: 32px;
  margin-right: 8px;

  position: relative;
`;

export const SelectFiled = styled.button`
  width: 100%;
  height: 100%;
  padding: 7px 16px;

  display: flex;
  align-items: center;

  position: relative;

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.status.gray2};
  background-color: #ffff;
  transition: all 0.3s ease-in-out;

  svg {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
  }
`;

export const List = styled.div`
  width: 100%;
  padding: 8px 0px;
  margin-bottom: 0px;

  position: absolute;
  bottom: 100%;
  left: 0;
  z-index: 100;
  overflow: auto;

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.status.gray2};
  background-color: #ffffff;

  button {
    width: 100%;
    padding: 7px 16px;

    display: flex;
    position: relative;

    transition: all 0.3s ease-in-out;
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.color.status.primary};
    }
  }
`;
