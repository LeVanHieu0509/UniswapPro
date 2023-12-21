import styled, { DefaultTheme } from "styled-components";
import { device } from "./media";

export const renderColor = (color: string, theme: DefaultTheme) => {
  if (color == "primary") {
    return theme.color.status.primary;
  }
  if (color == "gray") {
    return theme.color.status.gray1;
  }
  return color;
};

export const Container = styled.div`
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Row = styled.div<{
  align?: "center" | "start" | "end";
  rowGap?: number;
  rowGapMb?: number;
}>`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
  min-width: 100%;
  align-items: ${({ align }) => align || "start"};
  row-gap: ${({ rowGap }) => rowGap || 0}px;

  @media ${device.mobile} {
    row-gap: ${({ rowGapMb }) => rowGapMb || 0}px;
  }
`;

export const Grid = styled.div<{
  gap?: number;
  columns?: string;
  smColumns?: string;
}>`
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: ${({ columns = "auto auto" }) => columns};

  min-width: 100%;
  gap: ${({ gap = 20 }) => gap}px;

  @media ${device.mobile} {
    grid-template-columns: ${({ smColumns = "auto auto" }) => smColumns};
  }
`;

interface FlexProps {
  align?: "center" | "start" | "end" | "inherit" | "baseline";
  justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
  gap?: number;
  gapMb?: number;
  directionMb?: "column" | "row";
}
export const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: ${({ align }) => align || "start"};
  gap: ${({ gap }) => gap || "0"}px;
  justify-content: ${({ justify }) => justify ?? "flex-start"};

  @media ${device.mobile} {
    gap: ${({ gapMb }) => gapMb || "0"}px;
    flex-direction: ${({ directionMb }) => directionMb || "row"};
  }
`;
export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexFill = styled.div`
  flex: 1;
`;

interface TextProps {
  size?: number;
  color?: string;
  bold?: boolean;
  bolder?: boolean;
}
export const Text = styled.p<TextProps>`
  margin: 0;
  font-size: ${({ size }) => size || 16}px;
  color: ${({ color, theme }) => renderColor(color, theme)};
  font-weight: ${({ bold, bolder }) => (bolder ? 500 : bold ? 700 : 400)};
`;

export const Label = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 125%;
  color: #636566;
  margin-bottom: 8px;

  @media ${device.mobile} {
    margin-bottom: 10px;
    font-size: 16px !important;
  }
`;
export const ValueText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 125%;
  color: #183028;
`;

interface ColProps {
  md?: number;
  sm?: number;
  lg?: number;
  flex?: number;
  pd?: number;
}
export const Col = styled.div<ColProps>`
  width: ${({ md }) => 100 * (md / 12)}%;
  padding: ${({ pd }) => (pd ? `0 ${pd}px` : "0 10px")};

  ${({ flex }) => flex && `flex: ${flex};`}

  @media ${device.mobile} {
    width: ${({ sm }) => 100 * (sm / 12)}%;
  }
`;

export const CardStyled = {
  Wrap: styled.div`
    padding: 24px 16px;
    background: #ffffff;
    border: 1px solid ${({ theme }) => theme.color.status.primary};
    border-radius: 16px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.3s linear;
    @media ${device.mobile} {
      padding: 20px 16px;
      min-width: 100%;
    }
    &:hover {
      transition: all 0.3s linear;
      background: ${({ theme }) => theme.color.status.primary};
      p {
        color: white;
      }
      .icon-hover {
        display: inline-block;
      }
      .icon-nohover {
        display: none;
      }
    }
  `,
  Icon: styled.div``,
  Header: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
    @media ${device.mobile} {
      margin-bottom: 8px;
      img.header-icon {
        height: 40px;
        bottom: 40px;
      }
    }
    .icon-hover {
      display: none;
    }
    .icon-nohover {
      display: inline-block;
    }
  `,
  Title: styled.p`
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;

    color: #183028;
    @media ${device.mobile} {
      font-size: 14px;
      margin-bottom: 8px;
      line-height: 125%;
    }
  `,
  Count: styled.p`
    color: #183028;
    font-weight: 700;
    font-size: 39px;
    line-height: 125%;

    @media ${device.mobile} {
      font-size: 20px;
    }
  `,
};

export const Item = styled.div<{ dark?: boolean }>`
  background: ${({ dark }) => (dark ? "#EDEFF0" : "#fff")};
  border: 1px solid ${({ dark }) => (dark ? "#EDEFF0" : "#dbdfe1")};
  border-radius: 16px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  .item-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .item-box {
    background: #f8f9f9;
    border-radius: 8px;
    padding: 16px;
  }
  .label {
    font-weight: 500;
    font-size: 14px;
    line-height: 125%;
    margin-bottom: 10px;

    color: #636566;
  }
  .value {
    font-weight: 700;
    font-size: 16px;
    line-height: 125%;
    color: #183028;
  }
`;

export const ScreenWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
`;

interface CardProps {
  rad?: number;
  pad?: number;
  bg?: string;
  bd?: number;
  mbd?: number;
  mpd?: number;
  mag?: number;
  mmt?: number;
}
export const Card = styled.div<CardProps>`
  background: ${({ bg = "#ffffff" }) => bg};
  border: ${({ bd = 1 }) => bd}px solid #dbdfe1;
  border-radius: ${({ rad = 24 }) => rad}px;
  padding: ${({ pad = 40 }) => pad}px;
  margin-top: ${({ mag = 24 }) => mag}px;

  @media ${device.mobile} {
    padding: ${({ mpd = 16 }) => mpd}px;
    margin-top: ${({ mmt = 16 }) => mmt}px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;

  :not(:first-child) {
    margin-top: 50px;
  }

  h5 {
    color: #183028;
  }
`;

export const IconCircle = styled.div`
  width: 36px;
  height: 36px;
  background: #e87722;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapStyled = styled.div`
  .content {
    background: #ffffff;

    border: 1px solid #dbdfe1;
    border-radius: 24px;
    padding: 40px;

    @media ${device.mobile} {
      padding: 16px;
    }
  }
`;

export const Note = styled.div`
  margin-top: 24px;
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.color.status.gray2_50};

  ul {
    margin-top: 10px;
  }

  a {
    color: ${({ theme }) => theme.color.status.primary};
  }

  @media ${device.mobile} {
    margin-top: 16px;
    padding: 16px;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;

  input {
    padding: 0px 12px;
  }
`;
