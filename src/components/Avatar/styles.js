import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme, size }) => css`
    border-color: ${theme.colors.primary};
    width: ${size === 'lg' ? '100px' : '45px'};
    height: ${size === 'lg' ? '100px' : '45px'};
  `}
  border-radius: 9999px;
  border-width: 3px;
  overflow: hidden;
`;

export const AvatarImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
`;
