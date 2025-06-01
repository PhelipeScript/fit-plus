import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme, size }) => css`
    border-color: ${theme.colors.primary};
    width: ${size === 'lg' ? '100px' : '30px'};
    height: ${size === 'lg' ? '100px' : '30px'};
    border-width: ${size === 'lg' ? '3px' : '1px'};
  `}
  border-radius: 9999px;
  overflow: hidden;
`;

export const AvatarImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
`;
