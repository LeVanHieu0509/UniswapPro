import styled, { css } from "styled-components";

type Size = "large" | "medium" | "small" | "tiny";

// eslint-disable-next-line no-unused-vars
const ButtonSize: { [key in Size]: number } = {
  tiny: 32,
  small: 40,
  medium: 44,
  large: 52,
};

interface ButtonStyleProps {
  readonly size?: Size;
  readonly long?: boolean;
  readonly withIcon?: boolean;
  readonly maxWidth?: boolean;
}

const WithIconStyled = css`
  svg {
    margin-right: 4px;
  }
`;

export const ButtonStyle: any = css<ButtonStyleProps>`
  min-width: ${({ long, maxWidth }) => (maxWidth ? "100%" : long ? "200px" : "max-content")};
  max-width: ${({ maxWidth }) => (maxWidth ? "100%" : "360px")};
  height: ${({ size = "medium" }) => ButtonSize[size]}px;
  min-height: ${({ size = "medium" }) => ButtonSize[size]}px;
  padding: 0px 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  font-weight: 700;
  font-size: 16px;
  line-height: 125%;
  text-align: center;
  color: #ffffff;
  border-radius: 4px;
  /* color: #ffffff; */
  cursor: pointer;
  transition: 0.3s all ease-in-out;

  ${({ withIcon }) => (withIcon ? WithIconStyled : null)}

  :disabled {
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
    cursor: not-allowed;

    :hover {
      background: ${({ theme }) => theme.color.status.primary};
    }
  }
`;

export const ButtonPrimary = styled.button<{ size?: any; withIcon?: any }>`
  ${ButtonStyle}
  background: ${({ theme }) => theme.color.status.blue};

  &:hover {
    color: ${({ theme }) => theme.color.status.primary};
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

    svg {
      path {
        fill: ${({ withIcon, theme }) => (withIcon ? theme.color.status.primary : null)};
      }
    }
  }
`;

export const ButtonLinkPrimary = styled.a`
  ${ButtonStyle}

  text-decoration: none;
  background: ${({ theme }) => theme.color.status.primary};
`;

export const ButtonSecondary = styled.button<{ size?: any; withIcon?: any }>`
  ${ButtonStyle}

  color: ${({ theme }) => theme.color.status.primary};
  background: #ffffff;
  border: 2px solid ${({ theme }) => theme.color.status.primary};

  &:hover {
    color: #ffffff;
    background: ${({ theme }) => theme.color.status.primary};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

    svg {
      path {
        fill: ${({ withIcon }) => (withIcon ? "#ffffff;" : null)};
      }
    }
  }
`;

export const ButtonLinkSecondary = styled.a`
  ${ButtonStyle}

  text-decoration: none;
  border: 2px solid ${({ theme }) => theme.color.status.primary};
  color: ${({ theme }) => theme.color.status.primary};
  background: #ffffff;
`;

export const ButtonIcon = styled.button`
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0px;
  cursor: pointer;

  :disabled {
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
    cursor: not-allowed;
  }
`;

export const ButtonNoLine = styled.button`
  ${ButtonStyle}

  color: ${({ theme }) => theme.color.status.primary};
`;
